/**
 * [배우명] 2026 마케팅 플랜 — 구글 폼 자동 생성 스크립트
 *
 * 사용법:
 * 1. https://script.google.com 접속 → 새 프로젝트
 * 2. 이 파일 내용 전체 복사 → 붙여넣기
 * 3. 상단 ACTOR_NAME 수정 (예: "홍길동")
 * 4. 함수 선택: createAllForms → 실행(▶)
 * 5. 최초 1회: 권한 승인 → 로그에서 생성된 폼 URL 확인
 *
 * 생성물:
 * - 마스터 폼 1개 (전체)
 * - 팀별 축약 폼 8개
 */

var ACTOR_NAME = '배우명'; // ← 여기만 수정
var DEADLINE = '2026년 6월 30일'; // 회신 기한
var CONTACT = '담당자 이름 / 이메일'; // 문의처

var FORM_DESC =
  '에코글로벌그룹 2026 연간 마케팅 로드맵 PT 제작을 위한 기초 자료 수집입니다.\n' +
  '• 회신 기한: ' +
  DEADLINE +
  '\n• 담당 영역만 작성해도 됩니다. 해당 없는 섹션은 건너뛰세요.\n' +
  '• 첨부(프로필·일정표·세일즈)는 드라이브 링크로 제출해 주세요.\n' +
  '• 문의: ' +
  CONTACT;

var TEAM_OPTIONS = [
  '매니지먼트/소속사',
  'PR·홍보',
  '마케팅·브랜딩',
  '세일즈·비즈',
  '팬덤·팬미팅',
  '콘텐츠·SNS·바이럴',
  '스타일링·패션',
  '작품(드라마·영화) 홍보',
  '재무·계약',
  '기타',
];

var VISIBILITY_OPTIONS = ['내부 전용', '배우·매니지먼트 공유 가능', '대외비'];

/** 마스터 + 팀별 폼 전부 생성 */
function createAllForms() {
  var urls = [];
  urls.push(['마스터 (전체)', createMasterForm()]);
  urls.push(['매니지먼트', createTeamForm('management')]);
  urls.push(['PR·홍보', createTeamForm('pr')]);
  urls.push(['마케팅·브랜딩', createTeamForm('marketing')]);
  urls.push(['세일즈', createTeamForm('sales')]);
  urls.push(['팬덤·팬미팅', createTeamForm('fan')]);
  urls.push(['콘텐츠·SNS', createTeamForm('content')]);
  urls.push(['스타일링', createTeamForm('styling')]);
  urls.push(['작품 홍보', createTeamForm('production')]);

  Logger.log('=== 생성 완료 ===');
  for (var i = 0; i < urls.length; i++) {
    Logger.log(urls[i][0] + ': ' + urls[i][1]);
  }
  return urls;
}

/** 마스터 폼만 생성 */
function createMasterForm() {
  var title = '[' + ACTOR_NAME + '] 2026 글로벌 브랜딩·마케팅 플랜 — 기초 자료 (마스터)';
  var form = FormApp.create(title);
  form.setDescription(FORM_DESC);
  form.setConfirmationMessage('제출해 주셔서 감사합니다. 검토 후 추가 요청이 있으면 연락드리겠습니다.');
  form.setCollectEmail(true);
  form.setAllowResponseEdits(true);

  addRespondentBlock(form);
  addCommonSection(form);

  addManagementSection(form);
  addPRSection(form);
  addMarketingSection(form);
  addSalesSection(form);
  addFanSection(form);
  addContentSection(form);
  addStylingSection(form);
  addProductionSection(form);
  addFinanceSection(form);
  addClosingSection(form);

  return form.getPublishedUrl();
}

/** 팀별 축약 폼 */
function createTeamForm(teamKey) {
  var names = {
    management: '매니지먼트/소속사',
    pr: 'PR·홍보',
    marketing: '마케팅·브랜딩',
    sales: '세일즈·비즈',
    fan: '팬덤·팬미팅',
    content: '콘텐츠·SNS·바이럴',
    styling: '스타일링·패션',
    production: '작품 홍보',
  };
  var title =
    '[' + ACTOR_NAME + '] 2026 마케팅 플랜 — ' + names[teamKey] + ' (축약)';
  var form = FormApp.create(title);
  form.setDescription(
    FORM_DESC + '\n\n※ 이 폼은 【' + names[teamKey] + '】 담당용 축약 버전입니다.'
  );
  form.setConfirmationMessage('제출 완료. 감사합니다.');
  form.setCollectEmail(true);

  addRespondentBlock(form);
  addCommonShortSection(form);

  switch (teamKey) {
    case 'management':
      addManagementShort(form);
      break;
    case 'pr':
      addPRShort(form);
      break;
    case 'marketing':
      addMarketingShort(form);
      break;
    case 'sales':
      addSalesShort(form);
      break;
    case 'fan':
      addFanShort(form);
      break;
    case 'content':
      addContentShort(form);
      break;
    case 'styling':
      addStylingShort(form);
      break;
    case 'production':
      addProductionShort(form);
      break;
  }

  addClosingSection(form);
  return form.getPublishedUrl();
}

// ─── 공통 블록 ─────────────────────────────────────────

function addRespondentBlock(form) {
  form.addPageBreakItem().setTitle('응답자 정보');
  form.addTextItem().setTitle('배우명 (한글)').setRequired(true);
  form.addTextItem().setTitle('배우명 (영문)').setRequired(false);
  form.addTextItem().setTitle('소속사·매니지먼트명').setRequired(true);
  form.addTextItem().setTitle('작성자 성함').setRequired(true);
  form
    .addListItem()
    .setTitle('소속 팀')
    .setChoiceValues(TEAM_OPTIONS)
    .setRequired(true);
  form.addTextItem().setTitle('연락처 (이메일 또는 전화)').setRequired(true);
  form
    .addListItem()
    .setTitle('자료 공개 범위')
    .setChoiceValues(VISIBILITY_OPTIONS)
    .setRequired(true);
  form
    .addTextItem()
    .setTitle('첨부 파일 (Google Drive 링크)')
    .setHelpText('프로필, 일정표, 세일즈 시트 등')
    .setRequired(false);
}

function addCommonSection(form) {
  form.addPageBreakItem().setTitle('01. 공통 기초 정보');
  form
    .addTextItem()
    .setTitle('2026 브랜드 키워드 (3~5개, 쉼표로 구분)')
    .setRequired(true);
  form.addTextItem().setTitle('한 줄 포지셔닝').setRequired(false);
  form
    .addCheckboxItem()
    .setTitle('타깃 시장')
    .setChoices([
      '국내 20~30대',
      '국내 30~40대',
      '동아시아',
      '동남아',
      '북미·유럽',
      '기타',
    ]);
  form
    .addParagraphTextItem()
    .setTitle('희망 이미지·강조 매력')
    .setRequired(true);
  form.addParagraphTextItem().setTitle('피하고 싶은 이미지').setRequired(false);
  form.addTextItem().setTitle('벤치마크·경쟁 배우').setRequired(false);
  form
    .addListItem()
    .setTitle('2026년 1순위 KPI')
    .setChoiceValues([
      '브랜드 인지도·단가',
      '작품·연기 이미지',
      '팬덤 확장',
      '해외 진출',
      '광고·세일즈 성사',
      '기타',
    ])
    .setRequired(true);
  form.addParagraphTextItem().setTitle('공식 SNS·채널 URL').setRequired(false);
  form.addParagraphTextItem().setTitle('팬덤 규모·특성').setRequired(false);
  form
    .addParagraphTextItem()
    .setTitle('제약·불가 사항 (광고/SNS/해외/팬미팅/화보 등)')
    .setRequired(true);
}

function addCommonShortSection(form) {
  form.addPageBreakItem().setTitle('공통 (필수 4문항)');
  form
    .addTextItem()
    .setTitle('브랜드 키워드 3~5개')
    .setRequired(true);
  form
    .addParagraphTextItem()
    .setTitle('2026 한 줄 목표 / KPI')
    .setRequired(true);
  form
    .addParagraphTextItem()
    .setTitle('월별 확정·유력 일정 요약 (또는 시트 링크)')
    .setRequired(true);
  form
    .addParagraphTextItem()
    .setTitle('제약·불가 사항')
    .setRequired(true);
}

function addClosingSection(form) {
  form.addPageBreakItem().setTitle('마무리');
  form
    .addParagraphTextItem()
    .setTitle('PT에 반드시 반영해 달라는 요청')
    .setRequired(false);
  form.addParagraphTextItem().setTitle('추가 코멘트').setRequired(false);
  form.addTextItem().setTitle('후속 미팅 가능 일정').setRequired(false);
}

// ─── 마스터: 팀별 전체 섹션 ───────────────────────────

function addManagementSection(form) {
  form.addPageBreakItem().setTitle('02. 매니지먼트 / 소속사');
  form.addParagraphTextItem().setTitle('2026 우선순위 Top 3');
  form.addParagraphTextItem().setTitle('확정·협의 중 작품 (제목/역할/일정)');
  form.addParagraphTextItem().setTitle('2026 월별 일정 (촬영·방영·휴식·행사)');
  form.addParagraphTextItem().setTitle('해외 활동 의향');
  form
    .addListItem()
    .setTitle('팬미팅 진행 의사')
    .setChoiceValues([
      '국내 단독 예정',
      '해외 투어 검토',
      '미정',
      '올해 없음',
    ]);
  form.addParagraphTextItem().setTitle('광고·협찬 승인 라인·소요 기간');
  form.addParagraphTextItem().setTitle('배우 성향·커뮤니케이션 스타일');
  form.addParagraphTextItem().setTitle('금기·민감 이슈');
  form.addParagraphTextItem().setTitle('에코·외부 역할 분담');
}

function addPRSection(form) {
  form.addPageBreakItem().setTitle('03. PR / 홍보');
  form.addParagraphTextItem().setTitle('프로필 리셋 계획');
  form.addParagraphTextItem().setTitle('연간 보도·인터뷰 로드맵');
  form.addParagraphTextItem().setTitle('작품별 홍보 일정');
  form.addParagraphTextItem().setTitle('화보 계획');
  form.addParagraphTextItem().setTitle('레드카펫·시상식·브랜드 행사');
  form.addParagraphTextItem().setTitle('희망 홍보 매체·프로그램');
  form.addParagraphTextItem().setTitle('과거 홍보 성공·실패 사례');
  form.addParagraphTextItem().setTitle('SNS·공식 채널 운영 방향');
}

function addMarketingSection(form) {
  form.addPageBreakItem().setTitle('04. 마케팅 / 브랜딩');
  form.addTextItem().setTitle('2026 한 줄 전략').setRequired(true);
  form.addParagraphTextItem().setTitle('월별 핵심 마일스톤');
  form
    .addScaleItem()
    .setTitle('캐릭터 브랜딩 vs 배우 본인 (1=캐릭터 ~ 10=배우 상시)')
    .setBounds(1, 10)
    .setRequired(true);
  form.addParagraphTextItem().setTitle('럭셔리·패션·라이프스타일 목표');
  form.addParagraphTextItem().setTitle('체험형·콜라보 아이디어');
  form.addParagraphTextItem().setTitle('작품별 바이럴 타임라인');
  form.addParagraphTextItem().setTitle('경쟁 대비 차별화');
  form.addParagraphTextItem().setTitle('2027 모멘텀 설계');
}

function addSalesSection(form) {
  form.addPageBreakItem().setTitle('05. 세일즈 / 비즈니스');
  form.addTextItem().setTitle('2025 총 제안 건수 (대략)');
  form.addParagraphTextItem().setTitle('카테고리별 제안·성사');
  form.addParagraphTextItem().setTitle('진행 중·협의 중 브랜드');
  form
    .addCheckboxItem()
    .setTitle('강점 업종')
    .setChoices([
      '뷰티',
      '식품·음료',
      '건강기능',
      '패션',
      '금융',
      '가전·통신',
      '자동차',
      '기타',
    ]);
  form.addParagraphTextItem().setTitle('희망·비희망 브랜드·업종');
  form
    .addCheckboxItem()
    .setTitle('드랍 사유 Top')
    .setChoices([
      '일정',
      '이미지 미스매치',
      '단가',
      '경쟁 모델',
      '브랜드 내부',
      '기타',
    ]);
  form.addParagraphTextItem().setTitle('2026 브랜드 매칭 로드맵');
  form.addParagraphTextItem().setTitle('해외 세일즈·목표 시장');
  form.addTextItem().setTitle('미디어·광고 포트폴리오 링크');
}

function addFanSection(form) {
  form.addPageBreakItem().setTitle('06. 팬덤 / 팬미팅');
  form
    .addListItem()
    .setTitle('2026 팬미팅 계획')
    .setChoiceValues([
      '국내 단독',
      '해외 투어',
      '둘 다',
      '검토 중',
      '없음',
    ]);
  form.addParagraphTextItem().setTitle('희망 시기·도시');
  form.addParagraphTextItem().setTitle('과거 팬미팅 피드백');
  form.addParagraphTextItem().setTitle('선호 콘셉트');
  form.addParagraphTextItem().setTitle('MD·굿즈 방향');
  form.addParagraphTextItem().setTitle('팬덤 거점·아카이브 계획');
  form.addParagraphTextItem().setTitle('아시아 투어 일정·예산');
  form.addParagraphTextItem().setTitle('배우 부담·선호');
}

function addContentSection(form) {
  form.addPageBreakItem().setTitle('07. 콘텐츠 / 바이럴 / SNS');
  form.addParagraphTextItem().setTitle('채널별 전략');
  form.addParagraphTextItem().setTitle('추천 1안 채널·근거');
  form.addParagraphTextItem().setTitle('작품별 바이럴 일정');
  form.addParagraphTextItem().setTitle('레퍼런스 URL (3~5개)');
  form.addParagraphTextItem().setTitle('홍보 프로그램 후보');
  form
    .addScaleItem()
    .setTitle('캐릭터 vs 배우 철학 콘텐츠 (1~10)')
    .setBounds(1, 10);
  form.addParagraphTextItem().setTitle('촬영·편집 리소스');
  form.addParagraphTextItem().setTitle('금지·자제 콘텐츠');
}

function addStylingSection(form) {
  form.addPageBreakItem().setTitle('08. 스타일링 / 패션');
  form.addTextItem().setTitle('비주얼·스타일 키워드');
  form.addParagraphTextItem().setTitle('협찬·착용 브랜드');
  form.addParagraphTextItem().setTitle('희망 브랜드·패션위크');
  form.addParagraphTextItem().setTitle('레드카펫·시상식 방향');
  form.addTextItem().setTitle('스타일 레퍼런스 링크');
  form.addParagraphTextItem().setTitle('워치·주얼리 포지션');
}

function addProductionSection(form) {
  form.addPageBreakItem().setTitle('09. 작품 홍보');
  form.addParagraphTextItem().setTitle('작품 1 — 제목/역할/로그라인');
  form.addParagraphTextItem().setTitle('작품 1 — 일정·홍보');
  form.addParagraphTextItem().setTitle('작품 1 — 캐릭터 마케팅 허용 범위');
  form.addParagraphTextItem().setTitle('작품 2 (있을 경우)');
  form.addParagraphTextItem().setTitle('작품 3 (있을 경우)');
  form.addParagraphTextItem().setTitle('PPL·브랜드 연계');
  form.addParagraphTextItem().setTitle('글로벌 OTT·해외 홍보');
}

function addFinanceSection(form) {
  form.addPageBreakItem().setTitle('10. 재무 / 계약 (해당 시)');
  form.addParagraphTextItem().setTitle('2026 예산 범위');
  form
    .addCheckboxItem()
    .setTitle('ROI 기대 항목')
    .setChoices(['광고 성사', '팬미팅', '콘텐츠', '해외', '기타']);
  form.addParagraphTextItem().setTitle('계약 만료·갱신 예정');
}

// ─── 팀별 축약 (각 8~10문항) ─────────────────────────

function addManagementShort(form) {
  form.addPageBreakItem().setTitle('매니지먼트 (축약)');
  form.addParagraphTextItem().setTitle('2026 우선순위 Top 3').setRequired(true);
  form
    .addParagraphTextItem()
    .setTitle('확정·협의 작품 + 월별 일정 (또는 시트 링크)')
    .setRequired(true);
  form.addParagraphTextItem().setTitle('해외·팬미팅 의향').setRequired(true);
  form.addParagraphTextItem().setTitle('승인 라인·소요 기간').setRequired(false);
  form.addParagraphTextItem().setTitle('배우 성향·금기 사항').setRequired(true);
  form.addParagraphTextItem().setTitle('에코·외부 역할 분담').setRequired(false);
}

function addPRShort(form) {
  form.addPageBreakItem().setTitle('PR·홍보 (축약)');
  form.addParagraphTextItem().setTitle('프로필 리셋 (시기·컨셉)').setRequired(true);
  form.addParagraphTextItem().setTitle('연간 보도·인터뷰 로드맵').setRequired(true);
  form.addParagraphTextItem().setTitle('작품별 홍보 일정').setRequired(true);
  form.addParagraphTextItem().setTitle('화보·행사·시상식 계획').setRequired(false);
  form.addParagraphTextItem().setTitle('희망 매체·프로그램').setRequired(false);
  form.addParagraphTextItem().setTitle('SNS 운영 방향').setRequired(false);
}

function addMarketingShort(form) {
  form.addPageBreakItem().setTitle('마케팅·브랜딩 (축약)');
  form.addTextItem().setTitle('2026 한 줄 전략').setRequired(true);
  form.addParagraphTextItem().setTitle('월별 마일스톤 (1~12월)').setRequired(true);
  form
    .addScaleItem()
    .setTitle('캐릭터 vs 배우 이미지 (1~10)')
    .setBounds(1, 10)
    .setRequired(true);
  form.addParagraphTextItem().setTitle('럭셔리·콜라보·바이럴 핵심').setRequired(true);
  form.addParagraphTextItem().setTitle('차별화·2027 연속성').setRequired(false);
}

function addSalesShort(form) {
  form.addPageBreakItem().setTitle('세일즈 (축약)');
  form.addTextItem().setTitle('2025 제안 건수·성사 요약').setRequired(true);
  form.addParagraphTextItem().setTitle('강점 업종·진행 중 브랜드').setRequired(true);
  form.addParagraphTextItem().setTitle('드랍 사유·비희망 업종').setRequired(false);
  form.addParagraphTextItem().setTitle('2026 브랜드 매칭 로드맵').setRequired(true);
  form.addTextItem().setTitle('포트폴리오·시트 링크').setRequired(false);
}

function addFanShort(form) {
  form.addPageBreakItem().setTitle('팬미팅 (축약)');
  form
    .addListItem()
    .setTitle('팬미팅 계획')
    .setChoiceValues(['국내', '해외', '둘 다', '검토', '없음'])
    .setRequired(true);
  form.addParagraphTextItem().setTitle('시기·도시·규모').setRequired(true);
  form.addParagraphTextItem().setTitle('콘셉트·MD 방향').setRequired(true);
  form.addParagraphTextItem().setTitle('팬덤 데이터·거점 계획').setRequired(false);
  form.addParagraphTextItem().setTitle('배우 부담·선호').setRequired(false);
}

function addContentShort(form) {
  form.addPageBreakItem().setTitle('콘텐츠·SNS (축약)');
  form.addParagraphTextItem().setTitle('채널 URL·전략').setRequired(true);
  form.addParagraphTextItem().setTitle('추천 1안 채널·근거').setRequired(true);
  form.addParagraphTextItem().setTitle('바이럴·작품 연계 일정').setRequired(true);
  form.addParagraphTextItem().setTitle('레퍼런스 URL').setRequired(false);
  form.addParagraphTextItem().setTitle('금지 콘텐츠').setRequired(true);
}

function addStylingShort(form) {
  form.addPageBreakItem().setTitle('스타일링 (축약)');
  form.addTextItem().setTitle('스타일 키워드').setRequired(true);
  form.addParagraphTextItem().setTitle('협찬·희망 브랜드').setRequired(true);
  form.addParagraphTextItem().setTitle('패션위크·행사·레드카펫').setRequired(false);
  form.addTextItem().setTitle('레퍼런스 링크').setRequired(false);
}

function addProductionShort(form) {
  form.addPageBreakItem().setTitle('작품 홍보 (축약)');
  form.addParagraphTextItem().setTitle('작품 1 — 개요·일정').setRequired(true);
  form.addParagraphTextItem().setTitle('작품 1 — 마케팅 허용 범위').setRequired(true);
  form.addParagraphTextItem().setTitle('작품 2·3 (있을 경우)').setRequired(false);
  form.addParagraphTextItem().setTitle('PPL·해외 홍보').setRequired(false);
}
