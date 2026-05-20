# 구글 폼

**👉 [구글폼-만들기-가이드.md](./구글폼-만들기-가이드.md) 를 먼저 보세요.**

## 빠른 시작

1. [script.google.com](https://script.google.com) → 새 프로젝트
2. `CreateMarketingForms3Tabs.gs` 전체 복사 → 붙여넣기
3. `ACTOR_NAME` 수정
4. `createAllThreeForms` 실행 → 로그에서 URL 3개

## 생성되는 폼

1. PR·마케팅·세일즈·콘텐츠  
2. 팬미팅  
3. 스타일·로드맵·작품  

| 파일 | 용도 |
|------|------|
| `CreateMarketingForms3Tabs.gs` | 폼 3개 생성 |
| `FormResponseToGit.gs` | **제출 시 Git TXT + 텔레그램 알림** (각각 on/off) |
| `CreateMarketingForms.gs` | 예전 8팀 버전 (사용 X) |
