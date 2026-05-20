# 마케팅 플랜 기초 자료 — HTML 폼

구글 Apps Script 없이 **브라우저만**으로 쓰는 설문 페이지입니다.

> **한글이 깨질 때:** `index.html`을 메모장이 아니라 **Chrome/Edge**로 열고, `Ctrl+F5`로 새로고침.  
> 파일이 깨졌다면 터미널에서 `python build_form.py` 실행 후 다시 열기.

## 로컬에서 바로 쓰기

1. `marketing-intake/index.html` 더블클릭 (Chrome 권장)
2. 상단 **작성 방법** 박스 30초 읽기
3. **배우명** 입력 → **팀 탭** 선택
4. 각 칸의 **💡 안내**·회색 예시 문구 참고 (짧게만 써도 OK)
5. 막막하면 **「예시 문구 넣기」** 버튼 → 내용 수정 후 **제출 · 파일 저장**

## GitHub에 올려서 링크로 공유 (GitHub Pages)

**General 탭이 아니라 왼쪽 메뉴 `Pages` 입니다.**

1. 저장소 push (이미 되어 있으면 생략)
2. **Settings** → 왼쪽 **Pages** (Code and automation 아래)
3. **Build and deployment** → Source: **GitHub Actions** 선택  
   (`Deploy from a branch` 가 아님 — `marketing-intake` 는 branch 폴더로 배포 불가)
4. **Actions** 탭에서 `Deploy marketing-intake to Pages` 워크플로가 ✅ 되면 1~3분 대기
5. Pages 화면 상단에 URL 표시  
   **https://teamechogg1412-code.github.io/plan/**

### 팀별 바로가기 링크

| 탭 | URL |
|----|-----|
| PR·마케팅·세일즈·콘텐츠 | `?team=brand` |
| 팬미팅 | `?team=fan` |
| 스타일·로드맵·작품 | `?team=strategy` |

예: `https://teamechogg1412-code.github.io/plan/?team=fan`

## 응답 받는 방법

### A. Git 자동 저장 (권장, 4명 제출용)

**[GIT_SUBMIT_SETUP.md](./GIT_SUBMIT_SETUP.md)** — Vercel + GitHub 토큰 1회 설정  
→ 제출 시 `responses/배우명/*.txt` 가 저장소에 **자동 커밋**

### B. 수동 (설정 전·실패 시)

1. **제출** → TXT 다운로드 → 메일/슬랙
2. **복사하기** → 붙여넣기

## Apps Script vs HTML

| | HTML (이 폴더) | Apps Script |
|--|----------------|-------------|
| 난이도 | ★ 쉬움 | ★★★ |
| 설치 | 파일 열기 / Git push | script.google.com |
| 응답 수집 | TXT·복사 (수동) | Google Form 자동 |
| Git | ✅ 적합 | 스크립트만 Git 가능 |
