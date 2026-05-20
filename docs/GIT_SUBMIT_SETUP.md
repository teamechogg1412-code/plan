# Git에 응답 자동 저장 — 설정 가이드 (4명용)

HTML 폼만으로는 Git에 **직접** 쓸 수 없습니다.  
**Vercel 무료 API**(1회 설정)를 두면 제출 시 이 저장소 `responses/` 폴더에 TXT가 **자동 커밋**됩니다.

---

## 동작 방식

```
[4명 브라우저] → 제출 버튼
      ↓
[Vercel /api/submit]  ← GitHub 토큰은 서버에만 보관
      ↓
[GitHub] responses/배우명/날짜_탭_작성자.txt 커밋
```

제출 실패 시에도 **TXT 다운로드**는 그대로 됩니다.

---

## 1단계: GitHub 토큰 만들기

1. GitHub → **Settings** → **Developer settings** → **Fine-grained tokens**
2. **Generate new token**
3. Repository access: **이 저장소만** 선택
4. Permissions: **Contents → Read and write**
5. 토큰 복사 (한 번만 보임)

---

## 2단계: Vercel 배포

1. [vercel.com](https://vercel.com) 가입 (GitHub 연동)
2. **Add New Project** → 이 저장소 Import
3. **Root Directory** → `marketing-intake` 로 설정
4. **Environment Variables** 추가:

| 이름 | 값 |
|------|-----|
| `GITHUB_TOKEN` | 1단계 토큰 |
| `GITHUB_REPO` | `아이디/저장소이름` (예: `isy73/Global-Branding_Noh-main`) |
| `GITHUB_BRANCH` | `main` |
| `SUBMIT_SECRET` | 아무 문자열 (예: `echo2026secret`) — 4명만 공유 |
| `ALLOWED_ORIGIN` | GitHub Pages URL (선택) |

5. **Deploy** → 배포 URL 확인 (예: `https://xxx.vercel.app`)

6. API 주소: `https://xxx.vercel.app/api/submit`

---

## 3단계: 폼에 API 연결

`marketing-intake/form.js` 맨 위 `INTAKE_SUBMIT` 수정 후 **Git push**:

```javascript
const INTAKE_SUBMIT = {
  url: 'https://xxx.vercel.app/api/submit',
  secret: 'echo2026secret',  // Vercel SUBMIT_SECRET 과 동일 (선택)
};
```

(또는 `config.js` 사용 — `config.example.js` 참고)

GitHub Pages에 반영되면 4명이 쓰는 폼에서 자동 저장됩니다.

---

## 4명에게 보낼 때

1. **폼 링크** (GitHub Pages)
2. **탭별 바로가기** (해당 시)
   - PR·마케팅: `?team=brand`
   - 팬미팅: `?team=fan`
   - 로드맵·작품: `?team=strategy`
3. 안내 문구:

> 제출 시 회사 Git 저장소에 자동 저장됩니다.  
> 실패하면 TXT 파일이 내려받아지니 그 파일을 슬랙/메일로 보내 주세요.

---

## 응답 확인

GitHub 저장소 → `responses/` 폴더 → 배우명 하위 TXT 파일

또는:

```bash
git pull
ls responses/
```

---

## 비용·한계

- Vercel Hobby: 무료 (개인/소규모 충분)
- GitHub API: 제출 1건 = 커밋 1개
- 토큰·submitSecret 을 HTML에 넣으면 유출 위험 → **config.js는 비공개 전달** 또는 private repo 권장

---

## config.js 없이 쓰는 경우

`submitUrl` 이 비어 있으면 **예전처럼 TXT만** 저장됩니다.  
Git 자동 저장은 위 설정 후에만 동작합니다.
