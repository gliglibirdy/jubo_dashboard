export const workforceReportDate = '2025年5月資料'

export const kpis = [
  {
    key: 'totalStaff',
    title: '集團員工總數',
    value: 603,
    unit: '人',
    delta: { dir: 'up', text: '較上月 +1.3%（591人）', isWarning: false },
  },
  {
    key: 'newHired',
    title: '本月新入職',
    value: 42,
    unit: '人',
    delta: { dir: 'up', text: '較上月 +5%', isWarning: false },
  },
  {
    key: 'resigned',
    title: '本月離職',
    value: 18,
    unit: '人',
    hint: '離職率 1.44%',
  },
  {
    key: 'licensed',
    title: '專業執照持有',
    value: 410,
    unit: '人',
    hint: '佔比 68%',
  },
]

export const staffDistribution = [
  { name: '照服員',         value: 328, pct: 54.5 },
  { name: '護理師',         value: 116, pct: 19.2 },
  { name: '行政/會計',      value: 72,  pct: 12.0 },
  { name: '督導/主任',      value: 24,  pct: 4.0  },
  { name: '藥師',           value: 18,  pct: 3.0  },
  { name: '復健/職能治療師', value: 22, pct: 3.6  },
  { name: '營養師',         value: 12,  pct: 2.0  },
  { name: '司機/其他',      value: 11,  pct: 1.7  },
]

export const riskAlerts = [
  {
    key: 'staffShortage',
    severity: 'error',
    title: '新北板橋照服員嚴重短缺',
    description: '病假 2 名，白班人力比 1:22，已超出法規標準',
    action: '立即聯繫機構負責人',
  },
  {
    key: 'resignRisk',
    severity: 'warning',
    title: '員工離職高風險預測（82%）',
    description: '林靜如（板橋居服員）近期連續加班，溝通頻率下降 40%',
    action: '建議主管主動關心',
  },
]

// ── 住宿長照 ─────────────────────────────────────────────────

export const residentialSummary = {
  totalStaff: 236,
  newHired: 9,
  resigned: 5,
  resignRate: 2.1,
}

export const residentialFacilities = [
  {
    id: '1001',
    name: '台北大安長照中心',
    status: 'stable',
    totalStaff: 124,
    newHired: 5,
    resigned: 2,
    roleDistribution: [
      { name: '護理師',   value: 25, pct: 20.2 },
      { name: '照服員',   value: 70, pct: 56.5 },
      { name: '行政/會計', value: 20, pct: 16.1 },
      { name: '督導/主任', value: 9,  pct: 7.2  },
    ],
  },
  {
    id: '5005',
    name: '桃園慈愛養老院',
    status: 'stable',
    totalStaff: 112,
    newHired: 4,
    resigned: 3,
    roleDistribution: [
      { name: '護理師',   value: 20, pct: 17.9 },
      { name: '照服員',   value: 65, pct: 58.0 },
      { name: '行政/會計', value: 18, pct: 16.1 },
      { name: '督導/主任', value: 9,  pct: 8.0  },
    ],
  },
]

// ── 日間照顧 ─────────────────────────────────────────────────

export const daycareSummary = {
  totalStaff: 143,
  newHired: 5,
  resigned: 7,
  resignRate: 4.9,
  status: 'watch',
}

export const daycareFacilities = [
  {
    id: '3003',
    name: '高雄幸福日照中心',
    status: 'stable',
    totalStaff: 45,
    newHired: 2,
    resigned: 0,
    roleDistribution: [
      { name: '照服員',    value: 25, pct: 55.6 },
      { name: '主任/督導', value: 4,  pct: 8.9  },
      { name: '職能治療師', value: 3, pct: 6.7  },
      { name: '司機',      value: 2,  pct: 4.4  },
    ],
  },
  {
    id: '2002',
    name: '台中建德日照中心',
    status: 'watch',
    totalStaff: 98,
    newHired: 3,
    resigned: 4,
    roleDistribution: [
      { name: '照服員',    value: 60, pct: 61.2 },
      { name: '主任/督導', value: 6,  pct: 6.1  },
      { name: '職能治療師', value: 5, pct: 5.1  },
      { name: '司機',      value: 4,  pct: 4.1  },
    ],
  },
]

// ── 居家服務 ─────────────────────────────────────────────────

export const homecareSummary = {
  totalStaff: 224,
  newHired: 13,
  newHiredDelta: { dir: 'up', text: '較上月 +5%', isWarning: false },
  resigned: 10,
}

export const homecareFacilities = [
  {
    id: '4004',
    name: '新北板橋居家服務所',
    status: 'shortage',
    totalStaff: 156,
    newHired: 12,
    resigned: 8,
    roleDistribution: [
      { name: '照服員', value: 100, pct: 64.1 },
      { name: '行政',   value: 28,  pct: 17.9 },
      { name: '督導',   value: 16,  pct: 10.3 },
      { name: '主任',   value: 12,  pct: 7.7  },
    ],
  },
  {
    id: '6006',
    name: '台南安康樂齡館',
    status: 'stable',
    totalStaff: 68,
    newHired: 1,
    resigned: 2,
    roleDistribution: [
      { name: '照服員', value: 40, pct: 58.8 },
      { name: '行政',   value: 13, pct: 19.1 },
      { name: '督導',   value: 9,  pct: 13.2 },
      { name: '主任',   value: 6,  pct: 8.8  },
    ],
  },
]
