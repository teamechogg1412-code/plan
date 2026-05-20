/* UTF-8 */

const AGENCY_NAME = '에코글로벌그룹';
const FAN_PLAN_NONE = '없음';

/** Git 자동 저장 — Vercel 배포 후 URL 입력 (config.js 보다 우선하지 않음) */
const INTAKE_SUBMIT = {
  url: '',
  secret: '',
};

function getIntakeConfig() {
  const c = typeof window !== 'undefined' && window.INTAKE_CONFIG ? window.INTAKE_CONFIG : {};
  return {
    submitUrl: (c.submitUrl || INTAKE_SUBMIT.url || '').trim(),
    submitSecret: c.submitSecret || INTAKE_SUBMIT.secret || '',
  };
}

const TEAMS = [
  { id: 'brand', label: 'PR·마케팅·세일즈·콘텐츠' },
  { id: 'fan', label: '팬미팅' },
  { id: 'strategy', label: '스타일·로드맵·작품' },
];

const LABELS = {
  agency: '소속사', writer: '작성자', keywords: '이미지키워드', kpi: '올해목표', schedule: '연간일정',
  restrictions: '하지말것',
  roadmap_y1: '로드맵2026', roadmap_y2: '로드맵2027', roadmap_y3: '로드맵2028',
  benchmark: '벤치마크배우',
  m_persona: '배우성향_세일즈광고용',
  p_profile: '프로필사진', p_press: '보도계획', p_works: '작품홍보', p_events: '행사화보',
  p_media: '나오고싶은프로', p_sns: 'SNS',
  k_strategy: '한줄전략', k_milestones: '월별일정',
  k_brand: '브랜드콜라보', k_diff: '내년이어가기',
  s_brands: '진행브랜드', s_roadmap: '올해브랜드',
  f_plan: '팬미팅여부', f_when: '팬미팅시기', f_md: '팬미팅내용', f_data: '팬덤정보', f_pref: '배우선호', f_overseas: '해외팬미팅',
  v_channels: 'SNS주소', v_main: '추천채널', v_viral: '바이럴', v_ref: '참고영상', v_ban: '하면안되는것',
  t_keyword: '옷스타일', t_brands: '패션브랜드', t_events: '패션행사', t_link: '참고사진',
  d_work1: '작품정보', d_allow: '홍보가능범위', d_work23: '다른작품', d_global: '해외홍보',
  final_request: '꼭반영', meeting_dates: '미팅가능일', final_comment: '기타메모',
};

/** 항목별 안내 + placeholder + (선택) 예시 자동입력 */
const FIELD_META = {
  writer: { ph: '예) 홍길동 팀장' },
  keywords: {
    hint: '배우님 이미지를 떠올리며 단어만 3~5개 (쉼표로 구분)',
    ph: '예) 고급스러움, 차분함, 신뢰감, 패션',
    ex: '프리미엄, 지적임, 온화함, 남성美',
  },
  kpi: {
    hint: '한 문장이면 충분합니다',
    ph: '예) 2026년 드라마 화제성 + 럭셔리 광고 2건 이상',
    ex: '작품 연기 호평 유지 + 30대 남성 럭셔리 시장 인지도 확대',
  },
  schedule: {
    hint: '월별로 짧게만 적어 주세요',
    ph: '예)\n1월: 프로필 촬영\n4~10월: 드라마 ○○ 촬영\n11월: 드라마 방영\n12월: 시상식',
    ex: '1월: 신규 프로필\n4~10월: 드라마 ○○ 촬영\n9월: 방영\n6월: 팬미팅 검토',
  },
  restrictions: {
    hint: '광고·SNS·해외·팬미팅 등 하면 안 되는 것. 없으면 "특이사항 없음"',
    ph: '예) 주류 광고 불가 / 과도한 리액션 유튜브 비선호',
    ex: '주류·담배 광고 불가, 라이브 방송 월 1회 이하 선호',
  },
  roadmap_y1: {
    hint: '2026년 우선순위·작품·브랜딩·팬덤 등',
    ph: '예)\n1. 드라마 ○○ 촬영·방영\n2. 럭셔리 광고 2건\n3. 팬덤 거점 강화',
    ex: '1. 드라마 주연 고정\n2. 워치·패션 앰버서더\n3. 아시아 팬덤 확대',
  },
  roadmap_y2: {
    hint: '2027년에 이어갈 방향',
    ph: '예) 글로벌 OTT 주연 고정, 시상식·패션위크 정례화',
    ex: '해외 시장 본격 진출, 프리미엄 브랜드 라인 유지',
  },
  roadmap_y3: {
    hint: '선택', ph: '예) 종합 엔터테인먼트 IP화, 감독·제작 투자 검토',
  },
  benchmark: {
    hint: '배우명 + 참고하는 점 (이미지·커리어·브랜딩 등)',
    ph: '예)\n· 박서준 — 국민남친 이미지·브랜드 신뢰\n· 공유 — 글로벌 럭셔리·해외 인지도',
    ex: '· 이병헌 — 연기 스펙트럼·시상식\n· 박보검 — 국민 배우·다작 호흡',
  },
  m_persona: {
    hint: '인터뷰·SNS에 맞는 성향, 피해야 할 표현 (광고·행사 제안에도 동일 적용)',
    ph: '예) 차분한 톤 선호 / 과장 유머 비선호',
    ex: '진지한 대화형 인터뷰 선호, 밈·챌린지 콘텐츠는 부담',
  },
  p_profile: {
    hint: '새 프로필 촬영 계획이 있으면 시기·컨셉',
    ph: '예) 2월 스튜디오 촬영, 톤다운된 정장 컨셉',
    ex: '1~2월 리셋 촬영, 모노톤·정장, 3월 보도 배포',
  },
  p_press: {
    hint: '보도·인터뷰를 언제쯤·어떤 주제로 할지',
    ph: '예) 작품 방영 전 인터뷰 2회, 화보 1회',
    ex: '3월 작품 론칭 보도, 5월 매거진 커버',
  },
  p_works: {
    hint: '작품마다 방송·인터뷰·유튜브 등 일정',
    ph: '예) <○○> 3월 제작발표, 4월 유튜브 출연',
    ex: '드라마 ○○ 2월 촬영, 4월 방송 / 인터뷰 2회',
  },
  p_events: { hint: '선택', ph: '예) 12월 시상식, 9월 브랜드 행사' },
  p_media: { hint: '선택', ph: '예) 유퀴즈, 화보 지, 더쿠 인터뷰 희망' },
  p_sns: { hint: '선택', ph: '예) 인스타 월 2회, 공식 유튜브 분기 1회' },
  k_strategy: {
    ph: '예) 작품 화제성과 럭셔리 이미지를 동시에 키운다',
    ex: '프리미엄 남성 배우로 포지션 고도화',
  },
  k_milestones: {
    hint: '월마다 "이때 이것"만 짧게',
    ph: '예)\n3월: 프로필 공개\n9월: 드라마 방영\n11월: 광고 발표',
    ex: '1월 프로필 / 6월 팬미팅 / 9월 드라마 / 12월 시상식',
  },
  k_brand: {
    hint: '하고 싶은 브랜드·이벤트·SNS 콘텐츠',
    ph: '예) 럭셔리 워치, 패션위크, 드라마 연계 숏폼',
    ex: '워치 앰버서더, 포토이즘 콜라보, 비하인드 바이럴',
  },
  k_diff: { hint: '선택', ph: '예) 2027까지 럭셔리 라인 유지' },
  s_brands: {
    ph: '예) 패션·뷰티 강점 / ○○브랜드 협의 중',
    ex: '패션·워치 강점, ○○ 럭셔리 협의 중',
  },
  s_roadmap: {
    hint: '올해 맞추고 싶은 브랜드·시기',
    ph: '예) 드라마 방영 전 뷰티, 방영 후 패션',
    ex: '상반기 뷰티, 하반기 워치·패션, 연말 라이프',
  },
  t_link: {
    hint: '없으면 비워 두세요',
    ph: '참고 사진·URL이 있을 때만',
  },
  f_when: {
    hint: '시기·도시·규모',
    ph: '예) 6월 서울 2천석 / 7~8월 도쿄·타이베이',
    ex: '6월 잠실 단독, 7월 도쿄·8월 대만 각 1회',
  },
  f_md: {
    hint: '팬미팅 분위기·굿즈 아이디어',
    ph: '예) 토크 중심, 포토카드·티셔츠 한정판',
    ex: '감성 토크 + 라이브 포토, MD 3종 한정',
  },
  f_data: { hint: '선택', ph: '예) 인스타 팔로워 ○만, 팬카페 ○만' },
  f_pref: { hint: '선택', ph: '예) 3시간 이상 행사 부담, 사인회는 OK' },
  f_overseas: { hint: '선택', ph: '예) 일본·대만 7~8월 / 동남아 검토 중' },
  v_channels: {
    ph: '예) 인스타 @○○ / 유튜브 @○○ (구독자 ○만)',
    ex: '인스타 @actor_official (120만)\n유튜브 @actor_zip (30만)',
  },
  v_main: {
    hint: '가장 잘 맞는 채널 1개와 이유',
    ph: '예) 유튜브 롱폼 — 깊은 인터뷰에 강점',
    ex: '유튜브 1안: 차분한 토크형, 틱톡은 부담',
  },
  v_viral: {
    ph: '예) 9월 드라마 방영 전 비하인드 3편',
    ex: '8월 티저, 9월 비하인드, 10월 캐릭터 숏폼',
  },
  v_ref: { hint: '없어도 됨', ph: '참고 영상 URL이 있을 때만' },
  v_ban: {
    hint: '하지 않았으면 하는 콘텐츠. 없으면 "없음"',
    ph: '예) 과한 챌린지, 허위 루머성 콘텐츠',
    ex: '먹방·챌린지 비선호, 캐릭터 스포일러 금지',
  },
  t_keyword: { ph: '예) 미니멀, 수트, 클래식' },
  t_brands: {
    ph: '예) 현재 ○○ 협찬 / 희망 △△',
    ex: '현재 국내 수트 브랜드 / 희망 럭셔리 워치',
  },
  t_events: { hint: '선택', ph: '예) 3월 패션위크, 12월 시상식' },
  d_work1: {
    ph: '예) 드라마 ○○ / 주연 역 / 4~10월 촬영, 11월 방영',
    ex: '드라마 ○○ 주연 / 4월~10월 촬영 / 11월 방송',
  },
  d_allow: {
    hint: '포토이즘·캐릭터 굿즈·스포일러 등 가능 범위',
    ph: '예) 캐릭터명 사용 OK, 결말 스포는 불가',
    ex: '캐릭터 콜라보 OK, 스포일러·미공개 스틸 불가',
  },
  d_work23: { hint: '선택', ph: '다른 작품이 있으면 같은 형식으로' },
  d_global: { hint: '선택', ph: '예) Netflix 글로벌, 해외 인터뷰 가능' },
  final_request: { hint: '선택', ph: 'PT에 꼭 넣어 달라는 내용' },
  final_comment: { hint: '선택', ph: '미팅 외에 전달할 내용' },
};

const MEETING_WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];
const meetingSelectedDates = new Set();
let meetingViewYear = 2026;
let meetingViewMonth = new Date().getMonth();

function pad2(n) {
  return String(n).padStart(2, '0');
}

function toIsoDate(y, m, d) {
  return y + '-' + pad2(m) + '-' + pad2(d);
}

function formatMeetingDateKo(iso) {
  const p = iso.split('-').map(Number);
  const dt = new Date(p[0], p[1] - 1, p[2]);
  return p[1] + '월 ' + p[2] + '일 (' + MEETING_WEEKDAYS[dt.getDay()] + ')';
}

function syncMeetingDatesOutput() {
  const hidden = document.getElementById('meetingDatesValue');
  const chips = document.getElementById('meetingSelectedChips');
  const sorted = Array.from(meetingSelectedDates).sort();
  if (hidden) hidden.value = sorted.join(', ');
  if (!chips) return;
  if (!sorted.length) {
    chips.innerHTML = '<span class="meeting-chips-empty">선택한 날짜가 없습니다</span>';
    return;
  }
  chips.innerHTML = sorted
    .map(iso => '<span class="meeting-chip">' + formatMeetingDateKo(iso) + '</span>')
    .join('');
}

function renderMeetingCalendar() {
  const root = document.getElementById('meetingCalendar');
  if (!root) return;

  const first = new Date(meetingViewYear, meetingViewMonth, 1);
  const lastDay = new Date(meetingViewYear, meetingViewMonth + 1, 0).getDate();
  const startPad = first.getDay();
  const monthLabel = meetingViewYear + '년 ' + (meetingViewMonth + 1) + '월';

  let html =
    '<div class="cal-head">' +
    '<button type="button" class="cal-nav" data-cal-nav="-1" aria-label="이전 달">‹</button>' +
    '<span class="cal-title">' + monthLabel + '</span>' +
    '<button type="button" class="cal-nav" data-cal-nav="1" aria-label="다음 달">›</button>' +
    '</div>' +
    '<div class="cal-weekdays">' +
    MEETING_WEEKDAYS.map(w => '<span>' + w + '</span>').join('') +
    '</div><div class="cal-grid">';

  for (let i = 0; i < startPad; i++) html += '<span class="cal-day cal-empty"></span>';

  const today = new Date();
  const todayIso = toIsoDate(today.getFullYear(), today.getMonth() + 1, today.getDate());

  for (let d = 1; d <= lastDay; d++) {
    const iso = toIsoDate(meetingViewYear, meetingViewMonth + 1, d);
    const cls = ['cal-day', 'cal-btn'];
    if (meetingSelectedDates.has(iso)) cls.push('selected');
    if (iso === todayIso) cls.push('today');
    html +=
      '<button type="button" class="' +
      cls.join(' ') +
      '" data-date="' +
      iso +
      '">' +
      d +
      '</button>';
  }

  html += '</' + 'div>';
  root.innerHTML = html;

  root.querySelectorAll('[data-cal-nav]').forEach(btn => {
    btn.addEventListener('click', () => {
      meetingViewMonth += Number(btn.dataset.calNav);
      if (meetingViewMonth < 0) {
        meetingViewMonth = 11;
        meetingViewYear -= 1;
      } else if (meetingViewMonth > 11) {
        meetingViewMonth = 0;
        meetingViewYear += 1;
      }
      renderMeetingCalendar();
    });
  });

  root.querySelectorAll('[data-date]').forEach(btn => {
    btn.addEventListener('click', () => {
      const iso = btn.dataset.date;
      if (meetingSelectedDates.has(iso)) meetingSelectedDates.delete(iso);
      else meetingSelectedDates.add(iso);
      syncMeetingDatesOutput();
      renderMeetingCalendar();
    });
  });
}

function initMeetingCalendar() {
  const root = document.getElementById('meetingCalendar');
  if (!root || root.dataset.bound === '1') return;
  root.dataset.bound = '1';

  const now = new Date();
  if (now.getFullYear() >= 2026 && now.getFullYear() <= 2027) {
    meetingViewYear = now.getFullYear();
    meetingViewMonth = now.getMonth();
  }

  syncMeetingDatesOutput();
  renderMeetingCalendar();
}

let currentTeam = 'brand';

function applyFieldMeta() {
  Object.entries(FIELD_META).forEach(([name, meta]) => {
    const el = document.querySelector('[name="' + name + '"]');
    if (!el) return;
    if (meta.ph) el.placeholder = meta.ph;
    if (meta.hint) {
      const prev = el.closest('.field') || el.parentElement;
      if (prev && !prev.querySelector('.hint[data-for="' + name + '"]')) {
        const h = document.createElement('p');
        h.className = 'hint';
        h.dataset.for = name;
        h.textContent = '💡 ' + meta.hint;
        el.parentNode.insertBefore(h, el);
      }
    }
    if (meta.ex) el.dataset.example = meta.ex;
  });
}

function fillExamplesInSection(root) {
  const scope = root || document;
  scope.querySelectorAll('[data-example]').forEach(el => {
    if (el.type === 'range') return;
    if (!el.value || String(el.value).trim() === '') {
      el.value = el.dataset.example;
    }
  });
}

function fillAllVisibleExamples() {
  if (!confirm('비어 있는 칸에 예시 문구를 넣습니다.\n실제 내용으로 꼭 수정해 주세요. 계속할까요?')) return;
  fillExamplesInSection(document);
  alert('예시를 채웠습니다. 내용을 확인·수정한 뒤 제출해 주세요.');
}

function init() {
  const tabs = document.getElementById('teamTabs');
  TEAMS.forEach((t, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = t.label;
    b.dataset.team = t.id;
    if (i === 0) b.classList.add('active');
    b.onclick = () => selectTeam(t.id);
    tabs.appendChild(b);
  });
  selectTeam('brand');
  const q = new URLSearchParams(location.search).get('team');
  const teamAlias = {
    pr: 'brand', marketing: 'brand', sales: 'brand', content: 'brand',
    management: 'strategy', styling: 'strategy', production: 'strategy',
  };
  const teamId = teamAlias[q] || q;
  if (teamId && TEAMS.some(t => t.id === teamId)) selectTeam(teamId);

  initFanPlanControls();
  initMeetingCalendar();
  applyFieldMeta();
}

function syncFanDetailFields() {
  const noneBox = document.getElementById('fanPlanNone');
  const detailWrap = document.getElementById('fanDetailFields');
  const planRoot = document.getElementById('fanPlanChecks');
  if (!noneBox || !detailWrap) return;

  const noneChecked = noneBox.checked;

  if (planRoot) {
    planRoot.querySelectorAll('input[name="f_plan"]').forEach(cb => {
      if (cb === noneBox) return;
      cb.disabled = noneChecked;
    });
  }

  detailWrap.classList.toggle('is-disabled', noneChecked);
  detailWrap.querySelectorAll('textarea, input, select').forEach(el => {
    el.disabled = noneChecked;
    if (noneChecked) {
      el.value = '';
      el.required = false;
    } else if (el.dataset.teamRequired === 'fan' && currentTeam === 'fan') {
      el.required = true;
    } else {
      el.required = false;
    }
  });
}

function onFanPlanInput(changed) {
  const noneBox = document.getElementById('fanPlanNone');
  if (!noneBox || !changed || changed.name !== 'f_plan') return;

  if (changed === noneBox && noneBox.checked) {
    document.querySelectorAll('#fanPlanChecks input[name="f_plan"]').forEach(cb => {
      if (cb !== noneBox) cb.checked = false;
    });
  } else if (changed.checked && changed !== noneBox) {
    noneBox.checked = false;
  }

  syncFanDetailFields();
}

function initFanPlanControls() {
  const planRoot = document.getElementById('fanPlanChecks');
  if (!planRoot || planRoot.dataset.bound === '1') return;
  planRoot.dataset.bound = '1';

  planRoot.addEventListener('change', e => onFanPlanInput(e.target));

  syncFanDetailFields();
}

function validateFanPlan() {
  if (currentTeam !== 'fan') return true;
  const checked = document.querySelectorAll('[data-team="fan"] input[name="f_plan"]:checked');
  if (checked.length === 0) {
    alert('팬미팅 계획을 하나 이상 선택해 주세요.');
    document.getElementById('fanPlanChecks')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return false;
  }
  return true;
}

function selectTeam(id) {
  currentTeam = id;
  document.querySelectorAll('.team-tabs button').forEach(b => {
    b.classList.toggle('active', b.dataset.team === id);
  });
  document.querySelectorAll('.section-team').forEach(el => {
    el.classList.toggle('visible', el.dataset.team === id);
  });
  document.querySelectorAll('[data-team-required]').forEach(el => {
    el.required = el.dataset.teamRequired === id;
  });
  syncFanDetailFields();
}

function collectData() {
  const actor = document.getElementById('actorName').value.trim() || '(배우명 미입력)';
  const teamLabel = TEAMS.find(t => t.id === currentTeam)?.label || currentTeam;
  const fd = new FormData(document.getElementById('mainForm'));
  const lines = [
    '======================================',
    '2026 마케팅 플랜 기초 자료',
    '======================================',
    '배우: ' + actor,
    '소속사: ' + AGENCY_NAME,
    '팀: ' + teamLabel,
    '제출: ' + new Date().toLocaleString('ko-KR'),
    '--------------------------------------',
  ];
  const fanPlans = fd.getAll('f_plan').filter(v => v);
  if (fanPlans.length) {
    lines.push('\n[팬미팅계획]');
    lines.push(fanPlans.join(', '));
  }
  for (const [key, val] of fd.entries()) {
    if (key === 'agency' || key === 'f_plan') continue;
    if (!val || String(val).trim() === '') continue;
    lines.push('\n[' + (LABELS[key] || key) + ']');
    lines.push(String(val).trim());
  }
  lines.push('\n======================================');
  const form = document.getElementById('mainForm');
  return {
    text: lines.join('\n'),
    content: lines.join('\n'),
    actor,
    team: teamLabel,
    teamId: currentTeam,
    writer: (form.elements.writer && form.elements.writer.value) || '',
    agency: AGENCY_NAME,
  };
}

async function submitToGit(data) {
  const cfg = getIntakeConfig();
  if (!cfg.submitUrl) return { skipped: true };

  const headers = { 'Content-Type': 'application/json' };
  if (cfg.submitSecret) headers['X-Submit-Secret'] = cfg.submitSecret;

  const res = await fetch(cfg.submitUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.error || res.statusText || '저장 실패');
  }
  return json;
}

async function submitForm() {
  const actor = document.getElementById('actorName').value.trim();
  if (!actor) {
    alert('맨 위에 배우명을 입력해 주세요.');
    document.getElementById('actorName').focus();
    return;
  }
  if (!validateFanPlan()) return;
  if (!document.getElementById('mainForm').reportValidity()) return;

  const data = collectData();
  const btn = document.querySelector('.sticky-bar .btn-primary');
  const prevLabel = btn ? btn.textContent : '';

  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Git 저장 중…';
  }

  let gitMsg = '';
  try {
    const result = await submitToGit(data);
    if (result.skipped) {
      gitMsg = '\n\n(Git 자동 저장 미설정 — TXT만 저장됨)';
    } else {
      gitMsg = '\n\n✅ Git 저장 완료\n' + (result.path || '');
    }
  } catch (err) {
    gitMsg = '\n\n⚠ Git 저장 실패: ' + err.message + '\nTXT 파일은 저장됩니다.';
  }

  if (btn) {
    btn.disabled = false;
    btn.textContent = prevLabel;
  }

  document.getElementById('outputPre').textContent = data.text + gitMsg;
  document.getElementById('modal').classList.add('show');
  downloadTxtSilent(data);
}

function previewText() {
  const data = collectData();
  document.getElementById('outputPre').textContent = data.text;
  document.getElementById('modal').classList.add('show');
}

function copyOutput() {
  const t = document.getElementById('outputPre').textContent;
  navigator.clipboard.writeText(t).then(() => alert('복사되었습니다.'))
    .catch(() => prompt('아래를 복사하세요:', t));
}

function downloadTxt() {
  downloadTxtSilent(collectData());
  alert('다운로드되었습니다.');
}

function downloadTxtSilent(data) {
  const safe = (data.actor + '_' + data.team).replace(/[\\/:*?"<>|]/g, '_');
  const blob = new Blob([data.text], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = '마케팅플랜_' + safe + '_' + Date.now() + '.txt';
  a.click();
  URL.revokeObjectURL(a.href);
}

function closeModal() {
  document.getElementById('modal').classList.remove('show');
}

init();
