/**
 * [배우명] 2026 마케팅 플랜 — 구글 폼 3탭 버전
 *
 * 생성: 폼 3개 (PR·마케팅·세일즈·콘텐츠 / 팬미팅 / 스타일·로드맵·작품)
 *
 * 사용:
 * 1. script.google.com → 새 프로젝트 → 이 코드 붙여넣기
 * 2. ACTOR_NAME, DEADLINE, CONTACT 수정
 * 3. createAllThreeForms 실행 → 로그에서 URL 3개
 */

/** 폼 제목에 들어갈 배우명 — 생성 전에 수정 */
var ACTOR_NAME = '[배우명]';
var AGENCY_NAME = '에코글로벌그룹';
var DEADLINE = '2026년 6월 30일';
var CONTACT = '에코 담당자 / email@example.com';

var FORM_INTRO =
  '소속: ' + AGENCY_NAME + ' · 2026 마케팅 로드맵 PT용 기초 자료입니다.\n' +
  '• 회신: ' + DEADLINE + '\n' +
  '• 짧게만 적어도 됩니다. 모르면 "미정"\n' +
  '• 에코 내부 검토용 (연락처·첨부 링크 없음)\n' +
  '• 문의: ' + CONTACT;

/** 드롭다운에 myFunction 만 보일 때: 이것 실행해도 됨 */
function myFunction() {
  createAllThreeForms();
}

function createAllThreeForms() {
  var urls = [
    ['① PR·마케팅·세일즈·콘텐츠', createBrandForm()],
    ['② 팬미팅', createFanForm()],
    ['③ 스타일·로드맵·작품', createStrategyForm()],
  ];
  Logger.log('=== 구글 폼 3개 생성 완료 ===');
  for (var i = 0; i < urls.length; i++) {
    Logger.log(urls[i][0] + '\n' + urls[i][1] + '\n');
  }
  return urls;
}

function setupForm(form, sectionNote) {
  form.setDescription(FORM_INTRO + '\n\n' + sectionNote);
  form.setConfirmationMessage('제출해 주셔서 감사합니다.');
  form.setCollectEmail(false);
  form.setAllowResponseEdits(true);
  form.setLimitOneResponsePerUser(false);
}

function addRespondent(form) {
  form.addPageBreakItem().setTitle('기본 정보');
  form.addTextItem().setTitle('배우명').setRequired(true);
  form.addTextItem().setTitle('작성자 이름').setRequired(true);
}

function addCommon(form) {
  form.addPageBreakItem().setTitle('공통 (4문항)');
  form
    .addTextItem()
    .setTitle('이 배우 이미지 키워드 3~5개')
    .setHelpText('예: 고급스러움, 차분함, 신뢰감')
    .setRequired(true);
  form
    .addParagraphTextItem()
    .setTitle('2026년 가장 이루고 싶은 것 (한 문장)')
    .setRequired(true);
  form
    .addParagraphTextItem()
    .setTitle('올해 일정 요약')
    .setHelpText('월별로 짧게만. 파일·링크 없이 글로만 적어도 됩니다')
    .setRequired(true);
  form
    .addParagraphTextItem()
    .setTitle('하면 안 되는 것')
    .setHelpText('없으면 "특이사항 없음"')
    .setRequired(true);
}

function addClosing(form) {
  form.addPageBreakItem().setTitle('마무리');
  form.addParagraphTextItem().setTitle('PT에 꼭 반영할 요청 (선택)').setRequired(false);
  form
    .addParagraphTextItem()
    .setTitle('미팅 가능한 날 (선택)')
    .setHelpText('예: 2026-05-27, 2026-05-28 (여러 날은 쉼표로. HTML 폼은 달력 제공)')
    .setRequired(false);
  form.addParagraphTextItem().setTitle('기타 메모 (선택)').setRequired(false);
}

/** ① PR·마케팅·세일즈·콘텐츠 */
function createBrandForm() {
  var form = FormApp.create('[' + ACTOR_NAME + '] ① PR·마케팅·세일즈·콘텐츠');
  setupForm(form, '※ PR·홍보 / 마케팅 / 세일즈 / SNS·바이럴 담당용');
  addRespondent(form);
  addCommon(form);

  form.addPageBreakItem().setTitle('PR · 홍보');
  form.addParagraphTextItem().setTitle('새 프로필·보도 계획').setRequired(true);
  form.addParagraphTextItem().setTitle('올해 보도·인터뷰').setRequired(true);
  form.addParagraphTextItem().setTitle('작품별 홍보 일정').setRequired(true);
  form.addParagraphTextItem().setTitle('화보·시상식·행사 (선택)').setRequired(false);
  form.addParagraphTextItem().setTitle('희망 프로그램·매체 (선택)').setRequired(false);

  form.addPageBreakItem().setTitle('마케팅 · 브랜딩');
  form.addTextItem().setTitle('올해 마케팅 방향 (한 문장)').setRequired(true);
  form.addParagraphTextItem().setTitle('월별 핵심 일정').setRequired(true);
  form.addParagraphTextItem().setTitle('하고 싶은 브랜드·콜라보').setRequired(true);
  form.addParagraphTextItem().setTitle('내년까지 계획 (선택)').setRequired(false);

  form.addPageBreakItem().setTitle('세일즈 · 비즈');
  form.addParagraphTextItem().setTitle('강점 업종·진행 중 브랜드').setRequired(true);
  form.addParagraphTextItem().setTitle('올해 브랜드 매칭').setRequired(true);

  form.addPageBreakItem().setTitle('콘텐츠 · SNS');
  form.addParagraphTextItem().setTitle('SNS 주소·운영').setRequired(true);
  form.addParagraphTextItem().setTitle('추천 채널 1개 + 이유').setRequired(true);
  form.addParagraphTextItem().setTitle('바이럴·숏폼 일정').setRequired(true);
  form.addParagraphTextItem().setTitle('금지 콘텐츠').setRequired(true);
  form.addParagraphTextItem().setTitle('SNS 방향 (선택)').setRequired(false);

  addClosing(form);
  return form.getPublishedUrl();
}

/** ② 팬미팅 */
function createFanForm() {
  var form = FormApp.create('[' + ACTOR_NAME + '] ② 팬미팅');
  setupForm(form, '※ 팬덤·팬미팅 담당용\n「없음」만 선택 시 아래 상세 문항은 비워도 됩니다.');
  addRespondent(form);
  addCommon(form);

  form.addPageBreakItem().setTitle('팬미팅');
  form
    .addCheckboxItem()
    .setTitle('팬미팅 계획 (해당 항목 모두 선택)')
    .setChoiceValues(['국내 단독', '해외', '국내+해외', '검토 중', '없음 (올해 계획 없음)'])
    .setRequired(true);
  form
    .addParagraphTextItem()
    .setTitle('시기·장소·규모')
    .setHelpText('「없음」만 선택한 경우 비워도 됩니다')
    .setRequired(false);
  form
    .addParagraphTextItem()
    .setTitle('콘셉트·굿즈')
    .setHelpText('「없음」만 선택한 경우 비워도 됩니다')
    .setRequired(false);
  form.addParagraphTextItem().setTitle('팬덤 데이터 (선택)').setRequired(false);
  form.addParagraphTextItem().setTitle('배우 부담·선호 (선택)').setRequired(false);
  form.addParagraphTextItem().setTitle('해외 meet 지역 (선택)').setRequired(false);

  addClosing(form);
  return form.getPublishedUrl();
}

/** ③ 스타일·로드맵·작품 */
function createStrategyForm() {
  var form = FormApp.create('[' + ACTOR_NAME + '] ③ 스타일·로드맵·작품');
  setupForm(form, '※ 매니지먼트·스타일·작품 홍보 담당용');
  addRespondent(form);
  addCommon(form);

  form.addPageBreakItem().setTitle('매니지먼트 로드맵 (1~3년)');
  form.addParagraphTextItem().setTitle('1년차 (2026) 목표·우선순위').setRequired(true);
  form.addParagraphTextItem().setTitle('2년차 (2027) 방향').setRequired(true);
  form.addParagraphTextItem().setTitle('3년차 (2028) 방향 (선택)').setRequired(false);
  form
    .addParagraphTextItem()
    .setTitle('배우 성향·피해야 할 것 (세일즈·광고용)')
    .setHelpText('세일즈·광고 제안·계약 시 필수 참고. 인터뷰·SNS 톤, 피해야 할 표현')
    .setRequired(true);

  form.addPageBreakItem().setTitle('벤치마킹 배우');
  form
    .addParagraphTextItem()
    .setTitle('참고 배우 + 이유')
    .setHelpText('이름과 참고 포인트 (이미지·커리어·브랜딩 등)')
    .setRequired(true);

  form.addPageBreakItem().setTitle('스타일링 · 패션');
  form.addTextItem().setTitle('스타일 키워드').setRequired(true);
  form.addParagraphTextItem().setTitle('협찬·희망 브랜드').setRequired(true);
  form.addParagraphTextItem().setTitle('패션위크·레드카펫 (선택)').setRequired(false);
  form
    .addTextItem()
    .setTitle('스타일 참고 링크 (없어도 됨)')
    .setHelpText('참고 URL이 있을 때만. 없으면 비워 두세요.')
    .setRequired(false);

  form.addPageBreakItem().setTitle('작품 홍보');
  form.addParagraphTextItem().setTitle('작품1 — 제목/역할/일정').setRequired(true);
  form.addParagraphTextItem().setTitle('작품1 — 홍보 허용 범위').setRequired(true);
  form.addParagraphTextItem().setTitle('작품2·3 (선택)').setRequired(false);
  form.addParagraphTextItem().setTitle('해외·PPL (선택)').setRequired(false);

  addClosing(form);
  return form.getPublishedUrl();
}

/** 하나만 만들 때 */
function createBrandFormOnly() {
  Logger.log(createBrandForm());
}
function createFanFormOnly() {
  Logger.log(createFanForm());
}
function createStrategyFormOnly() {
  Logger.log(createStrategyForm());
}
