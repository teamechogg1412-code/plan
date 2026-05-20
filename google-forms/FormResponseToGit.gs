/**
 * 구글 폼 제출 시:
 *  - GitHub responses/ 에 .txt 저장 (선택)
 *  - 텔레그램으로 전체 내용 전송 (선택)
 *
 * [최초 1회]
 * 1. NOTIFY 아래 true/false 설정
 * 2. setGitConfig / setTelegramConfig 각각 실행 (쓰는 것만)
 * 3. installFormTriggers 실행
 */

var AGENCY_NAME = '에코글로벌그룹';

var NOTIFY = {
  saveToGit: true,
  sendTelegram: false,
};

var GIT_CONFIG = {
  token: '',
  repo: '',
  branch: 'main',
};

/** @BotFather 로 봇 만들고 chat_id 확인 (@userinfobot 등) */
var TELEGRAM_CONFIG = {
  botToken: '',
  chatId: '',
};

/** 1회 실행: 위 GIT_CONFIG 저장 */
function setGitConfig() {
  if (!GIT_CONFIG.token || !GIT_CONFIG.repo) {
    throw new Error('GIT_CONFIG 에 token, repo 를 입력하세요.');
  }
  var p = PropertiesService.getScriptProperties();
  p.setProperty('GITHUB_TOKEN', GIT_CONFIG.token);
  p.setProperty('GITHUB_REPO', GIT_CONFIG.repo);
  p.setProperty('GITHUB_BRANCH', GIT_CONFIG.branch || 'main');
  Logger.log('Git 설정 저장됨: ' + GIT_CONFIG.repo);
}

function setTelegramConfig() {
  if (!TELEGRAM_CONFIG.botToken || !TELEGRAM_CONFIG.chatId) {
    throw new Error('TELEGRAM_CONFIG 에 botToken, chatId 를 입력하세요.');
  }
  var p = PropertiesService.getScriptProperties();
  p.setProperty('TELEGRAM_BOT_TOKEN', TELEGRAM_CONFIG.botToken);
  p.setProperty('TELEGRAM_CHAT_ID', String(TELEGRAM_CONFIG.chatId));
  Logger.log('텔레그램 설정 저장됨');
}

/** 테스트 메시지 1통 */
function testTelegram() {
  sendTelegramFull(
    '🧪 테스트 — 마케팅 플랜 폼',
    '연결 확인용 메시지입니다.\n시간: ' + new Date(),
    'test.txt'
  );
  Logger.log('텔레그램 테스트 전송 완료');
}

function getGitProps() {
  var p = PropertiesService.getScriptProperties();
  return {
    token: p.getProperty('GITHUB_TOKEN'),
    repo: p.getProperty('GITHUB_REPO'),
    branch: p.getProperty('GITHUB_BRANCH') || 'main',
  };
}

function getTelegramProps() {
  var p = PropertiesService.getScriptProperties();
  return {
    botToken: p.getProperty('TELEGRAM_BOT_TOKEN'),
    chatId: p.getProperty('TELEGRAM_CHAT_ID'),
  };
}

/** 폼 3개에 제출 트리거 연결 (createAllThreeForms 후 실행) */
function installFormTriggers() {
  var actor = typeof ACTOR_NAME !== 'undefined' ? ACTOR_NAME : '';
  var forms = FormApp.getForms();
  var count = 0;
  for (var i = 0; i < forms.length; i++) {
    var f = forms[i];
    var title = f.getTitle();
    if (actor && title.indexOf('[' + actor + ']') === -1) continue;
    if (title.indexOf('①') === -1 && title.indexOf('②') === -1 && title.indexOf('③') === -1) continue;

    ScriptApp.getProjectTriggers().forEach(function (t) {
      if (t.getTriggerSourceId() === f.getId()) ScriptApp.deleteTrigger(t);
    });

    ScriptApp.newTrigger('onFormSubmitToGit')
      .forForm(f)
      .onFormSubmit()
      .create();
    count++;
    Logger.log('트리거 연결: ' + title);
  }
  Logger.log('총 ' + count + '개 폼에 제출 트리거 설정 완료 (Git/Telegram은 NOTIFY 설정 따름)');
}

/** 제출 시 자동 실행 (트리거) */
function onFormSubmitToGit(e) {
  var text = formatResponseAsGitTxt(e.response);
  var actor = extractActorFromResponse(e.response) || '배우명미입력';
  var formTitle = e.source.getTitle();
  var section = formSectionLabel(formTitle);
  var writer = extractField(e.response, '작성자') || '익명';
  var ts = Utilities.formatDate(new Date(), 'Asia/Seoul', "yyyy-MM-dd'T'HH-mm-ss");
  var fileName = ts + '_' + section + '_' + slug(writer) + '.txt';
  var path = 'responses/' + slug(actor) + '/' + fileName;
  var header =
    '📋 마케팅 플랜 제출\n' +
    '배우: ' +
    actor +
    '\n탭: ' +
    section +
    '\n작성: ' +
    writer;

  if (NOTIFY.sendTelegram) {
    try {
      sendTelegramFull(header, text, fileName);
      Logger.log('텔레그램 전송 OK');
    } catch (err) {
      Logger.log('텔레그램 실패: ' + err.message);
    }
  }

  if (NOTIFY.saveToGit) {
    try {
      commitToGitHub(path, text, 'form: ' + actor + ' / ' + section + ' / ' + writer);
      Logger.log('Git TXT 저장 OK: ' + path);
    } catch (err) {
      Logger.log('Git 저장 실패: ' + err.message);
    }
  }
}

/** 수동: 지금까지 쌓인 응답 전부 Git에 올리기 */
function exportAllFormsToGit() {
  var actor = typeof ACTOR_NAME !== 'undefined' ? ACTOR_NAME : '';
  var forms = FormApp.getForms();
  var n = 0;
  for (var i = 0; i < forms.length; i++) {
    var f = forms[i];
    var title = f.getTitle();
    if (actor && title.indexOf('[' + actor + ']') === -1) continue;
    if (title.indexOf('①') === -1 && title.indexOf('②') === -1 && title.indexOf('③') === -1) continue;

    var responses = f.getResponses();
    for (var r = 0; r < responses.length; r++) {
      var resp = responses[r];
      var text = formatResponseAsGitTxt(resp);
      var act = extractActorFromResponse(resp) || actor || 'unknown';
      var section = formSectionLabel(title);
      var writer = extractField(resp, '작성자') || '익명';
      var ts = Utilities.formatDate(resp.getTimestamp(), 'Asia/Seoul', "yyyy-MM-dd'T'HH-mm-ss");
      var path =
        'responses/' +
        slug(act) +
        '/' +
        ts +
        '_' +
        slug(section) +
        '_' +
        slug(writer) +
        '.txt';
      commitToGitHub(path, text, 'export: ' + act + ' / ' + section);
      n++;
      Utilities.sleep(300);
    }
  }
  Logger.log('Git 업로드 완료: ' + n + '건');
}

function formatResponseAsGitTxt(response) {
  var lines = [
    '======================================',
    '2026 마케팅 플랜 기초 자료',
    '======================================',
    '제출: ' +
      Utilities.formatDate(response.getTimestamp(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss'),
    '소속사: ' + AGENCY_NAME,
    '--------------------------------------',
  ];
  var items = response.getItemResponses();
  for (var i = 0; i < items.length; i++) {
    var title = items[i].getItem().getTitle();
    if (
      title.indexOf('소속사') !== -1 ||
      title.indexOf('매니지먼트') !== -1 ||
      title.indexOf('연락처') !== -1 ||
      title.indexOf('공개 범위') !== -1 ||
      title.indexOf('첨부') !== -1 ||
      title.indexOf('캐릭터 vs') !== -1 ||
      title.indexOf('작년 광고') !== -1 ||
      title.indexOf('드랍') !== -1 ||
      title.indexOf('세일즈 자료') !== -1
    )
      continue;
    var ans = items[i].getResponse();
    if (ans === null || ans === undefined || ans === '') continue;
    if (Object.prototype.toString.call(ans) === '[object Array]') ans = ans.join(', ');
    lines.push('\n[' + title + ']');
    lines.push(String(ans).trim());
  }
  lines.push('\n======================================');
  return lines.join('\n');
}

function extractActorFromResponse(response) {
  return extractField(response, '배우명');
}

function extractField(response, fieldTitle) {
  var items = response.getItemResponses();
  for (var i = 0; i < items.length; i++) {
    if (items[i].getItem().getTitle().indexOf(fieldTitle) !== -1) {
      return String(items[i].getResponse() || '').trim();
    }
  }
  return '';
}

function formSectionLabel(formTitle) {
  if (formTitle.indexOf('①') !== -1) return 'PR마케팅세일즈콘텐츠';
  if (formTitle.indexOf('②') !== -1) return '팬미팅';
  if (formTitle.indexOf('③') !== -1) return '스타일로드맵작품';
  return slug(formTitle).slice(0, 30);
}

function slug(s) {
  return String(s || 'unknown')
    .trim()
    .slice(0, 50)
    .replace(/[\\/:*?"<>|]/g, '_')
    .replace(/\s+/g, '_') || 'unknown';
}

function commitToGitHub(filePath, content, message) {
  var cfg = getGitProps();
  if (!cfg.token || !cfg.repo) {
    throw new Error('Git 미설정. setGitConfig() 먼저 실행하세요.');
  }

  var url =
    'https://api.github.com/repos/' +
    cfg.repo +
    '/contents/' +
    encodeURIComponent(filePath).replace(/%2F/g, '/');

  var payload = {
    message: message,
    content: Utilities.base64Encode(content, Utilities.Charset.UTF_8),
    branch: cfg.branch,
  };

  var res = UrlFetchApp.fetch(url, {
    method: 'put',
    headers: {
      Authorization: 'Bearer ' + cfg.token,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  });

  var code = res.getResponseCode();
  var body = res.getContentText();
  if (code !== 200 && code !== 201) {
    throw new Error('GitHub API ' + code + ': ' + body);
  }
  return JSON.parse(body);
}

/** 텔레그램: TXT 파일 첨부 + 내용이 길면 추가 메시지 */
function sendTelegramFull(header, txtBody, fileName) {
  var cfg = getTelegramProps();
  if (!cfg.botToken || !cfg.chatId) {
    throw new Error('텔레그램 미설정. setTelegramConfig() 실행');
  }

  var blob = Utilities.newBlob(txtBody, 'text/plain; charset=utf-8', fileName || 'response.txt');
  var docUrl = 'https://api.telegram.org/bot' + cfg.botToken + '/sendDocument';
  var docRes = UrlFetchApp.fetch(docUrl, {
    method: 'post',
    payload: {
      chat_id: cfg.chatId,
      caption: header.substring(0, 1024),
      document: blob,
    },
    muteHttpExceptions: true,
  });
  if (docRes.getResponseCode() !== 200) {
    Logger.log('sendDocument 실패, 텍스트 분할 전송: ' + docRes.getContentText());
    sendTelegramChunks(header + '\n\n' + txtBody);
    return;
  }

  if (txtBody.length > 3500) {
    sendTelegramChunks('(이어서) ' + header + '\n\n' + txtBody.substring(3500));
  }
}

function sendTelegramChunks(fullText) {
  var cfg = getTelegramProps();
  var max = 4000;
  var url = 'https://api.telegram.org/bot' + cfg.botToken + '/sendMessage';
  for (var i = 0; i < fullText.length; i += max) {
    var chunk = fullText.substring(i, i + max);
    UrlFetchApp.fetch(url, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({
        chat_id: cfg.chatId,
        text: chunk,
      }),
      muteHttpExceptions: true,
    });
    Utilities.sleep(400);
  }
}
