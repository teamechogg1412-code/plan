/**
 * Vercel Serverless — 폼 제출 → GitHub 저장소에 파일 커밋
 *
 * 환경 변수 (Vercel Dashboard):
 *   GITHUB_TOKEN   — repo Contents 쓰기 권한 PAT (fine-grained)
 *   GITHUB_REPO    — owner/repo (예: myorg/Global-Branding_Noh)
 *   GITHUB_BRANCH  — 기본 main
 *   SUBMIT_SECRET  — (선택) config.js 와 동일한 비밀값
 *   ALLOWED_ORIGIN — (선택) GitHub Pages URL
 */

function cors(res, origin) {
  const allow = process.env.ALLOWED_ORIGIN || '*';
  res.setHeader('Access-Control-Allow-Origin', allow === '*' ? '*' : origin || allow);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Submit-Secret');
}

function slug(s) {
  return String(s || 'unknown')
    .trim()
    .slice(0, 60)
    .replace(/[\\/:*?"<>|]/g, '_')
    .replace(/\s+/g, '_') || 'unknown';
}

export default async function handler(req, res) {
  const origin = req.headers.origin;
  cors(res, origin);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST only' });
  }

  const secret = process.env.SUBMIT_SECRET;
  if (secret && req.headers['x-submit-secret'] !== secret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';

  if (!token || !repo) {
    return res.status(500).json({ error: 'Server not configured (GITHUB_TOKEN / GITHUB_REPO)' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'Invalid JSON' });
    }
  }

  const content = body.content || body.text;
  const actor = body.actor || '배우명미입력';
  const team = body.team || body.teamId || 'tab';
  const writer = body.writer || '';
  const agency = body.agency || '';

  if (!content || String(content).trim().length < 10) {
    return res.status(400).json({ error: 'Content too short' });
  }

  const now = new Date();
  const ts = now.toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const fileName = `${ts}_${slug(team)}_${slug(writer || '익명')}.txt`;
  const filePath = `responses/${slug(actor)}/${fileName}`;

  const commitMessage = `intake: ${actor} / ${team} / ${writer || agency || '제출'}`;

  const apiUrl = `https://api.github.com/repos/${repo}/contents/${encodeURIComponent(filePath)}`;

  const putRes = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: commitMessage,
      content: Buffer.from(String(content), 'utf-8').toString('base64'),
      branch,
    }),
  });

  const putData = await putRes.json();

  if (!putRes.ok) {
    return res.status(putRes.status).json({
      error: putData.message || 'GitHub API error',
      details: putData,
    });
  }

  return res.status(200).json({
    ok: true,
    path: filePath,
    url: putData.content?.html_url || `https://github.com/${repo}/blob/${branch}/${filePath}`,
  });
}
