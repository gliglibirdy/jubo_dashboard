// 集團總覽首頁 mock 資料
// 對應 docs/plan.md：當月為 2026/05、趨勢圖為 2025/05 – 2026/05 共 13 個月

export const reportDate = '2026年5月14日 週四'

// 與既有頁面（Capacity / Workforce）一致的服務別配色
export const SERVICE_COLORS = {
  residential: '#0097A7', // 住宿
  daycare: '#005F64',     // 日照
  homecare: '#26A69A',    // 居服
}

// ── KPI 摘要 ─────────────────────────────────────────────
export const kpis = [
  {
    key: 'serviceTotal',
    title: '當月總服務人數',
    value: '506',
    unit: '人',
    delta: { dir: 'up', text: 'vs 上月 +2.8% (+14 人)' },
  },
  {
    key: 'staffTotal',
    title: '當月總員工數',
    value: '171',
    unit: '人',
    delta: { dir: 'up', text: 'vs 上月 +1.2% (+2 人)' },
  },
  {
    key: 'monthlyRevenue',
    title: '本月總營收',
    value: '1,082',
    unit: '萬元',
    delta: { dir: 'up', text: 'MoM +4.3%・YoY +12.7%' },
  },
  {
    key: 'ytdRevenue',
    title: '今年累計營收',
    value: '4,876',
    unit: '萬元',
    hint: '2026 年度截至本月',
  },
]

// 13 個月份標籤（2025/05 – 2026/05）
export const trendMonths = [
  '25/05', '25/06', '25/07', '25/08', '25/09', '25/10', '25/11', '25/12',
  '26/01', '26/02', '26/03', '26/04', '26/05',
]

// ── 服務人數趨勢（堆疊長條） ──────────────────────────────
export const serviceTrend = {
  months: trendMonths,
  series: [
    { name: '住宿', color: SERVICE_COLORS.residential, data: [234, 237, 240, 238, 242, 245, 247, 249, 251, 252, 254, 256, 263] },
    { name: '日照', color: SERVICE_COLORS.daycare,     data: [128, 131, 134, 136, 138, 140, 143, 145, 147, 149, 151, 153, 157] },
    { name: '居服', color: SERVICE_COLORS.homecare,    data: [ 72,  74,  75,  76,  78,  79,  80,  81,  82,  83,  84,  83,  86] },
  ],
}

// ── 服務人數佔比（當月圓餅） ──────────────────────────────
export const serviceShareCurrent = [
  { name: '住宿', value: 263, color: SERVICE_COLORS.residential, pct: 52 },
  { name: '日照', value: 157, color: SERVICE_COLORS.daycare,     pct: 31 },
  { name: '居服', value:  86, color: SERVICE_COLORS.homecare,    pct: 17 },
]

// ── 員工人數趨勢（堆疊長條） ──────────────────────────────
export const staffTrend = {
  months: trendMonths,
  series: [
    { name: '住宿', color: SERVICE_COLORS.residential, data: [78, 79, 80, 80, 81, 82, 82, 83, 84, 84, 85, 85, 86] },
    { name: '日照', color: SERVICE_COLORS.daycare,     data: [38, 38, 39, 39, 40, 40, 41, 41, 42, 42, 43, 43, 44] },
    { name: '居服', color: SERVICE_COLORS.homecare,    data: [48, 49, 49, 50, 51, 52, 53, 53, 54, 54, 55, 41, 41] },
  ],
}

// ── 流動率趨勢（折線 + 整體虛線基準） ──────────────────────
export const turnoverTrend = {
  months: trendMonths,
  series: [
    { name: '住宿', color: SERVICE_COLORS.residential, data: [3.2, 2.8, 3.5, 3.1, 2.9, 3.3, 3.0, 2.7, 3.8, 3.4, 3.1, 2.9, 3.0] },
    { name: '日照', color: SERVICE_COLORS.daycare,     data: [5.1, 4.8, 5.6, 5.0, 4.6, 5.2, 4.9, 4.5, 6.2, 5.7, 5.3, 5.0, 5.1] },
    { name: '居服', color: SERVICE_COLORS.homecare,    data: [11.4, 10.9, 12.3, 11.8, 10.4, 11.1, 10.7, 10.2, 13.5, 12.8, 11.6, 11.2, 11.4] },
    { name: '整體', color: '#546E7A', dashed: true,    data: [6.1, 5.8, 6.5, 6.2, 5.6, 6.0, 5.7, 5.4, 7.1, 6.7, 6.1, 5.8, 5.9] },
  ],
}

// ── 營收佔比（當月圓餅，單位：萬元） ──────────────────────
export const revenueShareCurrent = [
  { name: '住宿', value: 660, color: SERVICE_COLORS.residential, pct: 61 },
  { name: '日照', value: 271, color: SERVICE_COLORS.daycare,     pct: 25 },
  { name: '居服', value: 151, color: SERVICE_COLORS.homecare,    pct: 14 },
]

// ── 營收月趨勢（堆疊長條 + YoY 折線） ─────────────────────
export const revenueTrend = {
  months: trendMonths,
  series: [
    { name: '住宿', color: SERVICE_COLORS.residential, data: [558, 615, 580, 625, 595, 645, 605, 668, 595, 645, 615, 678, 660] },
    { name: '日照', color: SERVICE_COLORS.daycare,     data: [215, 258, 230, 265, 240, 275, 248, 285, 252, 280, 258, 290, 271] },
    { name: '居服', color: SERVICE_COLORS.homecare,    data: [105, 132, 115, 138, 120, 142, 125, 148, 128, 145, 132, 152, 151] },
  ],
  yoy: [6.2, 6.8, 7.5, 7.1, 7.9, 8.4, 8.7, 9.0, 9.4, 10.1, 11.3, 11.8, 12.7],
  yoyCurrent: 12.7,
}

// ── 機構健康度排名（Top 3 + Bottom 2，使用者選擇全部同一視覺） ─
export const facilityRankings = [
  {
    rank: 1,
    name: '台北信義長照分院',
    type: '長照',
    grade: '優秀',
    metrics: [
      { label: '月營收 YoY', value: '+9.2%', status: 'ok' },
      { label: '佔床率',     value: '96.2%', status: 'ok' },
      { label: '照護比',     value: '1:3.1', status: 'ok' },
      { label: '新住民率',   value: '+4.2%', status: 'ok' },
    ],
  },
  {
    rank: 2,
    name: '桃園龜山日照中心',
    type: '日照',
    grade: '優秀',
    metrics: [
      { label: '月營收 YoY', value: '+22.7%', status: 'ok' },
      { label: '出席率',     value: '91.4%',  status: 'ok' },
      { label: '新個案率',   value: '+6.8%',  status: 'ok' },
      { label: '照護比',     value: '1:3.2',  status: 'ok' },
    ],
  },
  {
    rank: 3,
    name: '高雄左營長照分院',
    type: '長照',
    grade: '良好',
    metrics: [
      { label: '月營收 YoY', value: '+7.8%', status: 'ok' },
      { label: '佔床率',     value: '82.3%', status: 'ok' },
      { label: '照護比',     value: '1:3.3', status: 'ok' },
      { label: '新住民率',   value: '+1.5%', status: 'watch' },
    ],
  },
  {
    rank: 4,
    name: '新北板橋居家服務部',
    type: '居服',
    grade: '觀察',
    metrics: [
      { label: '月營收 YoY',     value: '+18.3%', status: 'ok' },
      { label: '服務時數達成率', value: '78.2%',  status: 'watch' },
      { label: '個案留任率',     value: '71.4%',  status: 'watch' },
      { label: '新個案率',       value: '+3.1%',  status: 'ok' },
    ],
  },
  {
    rank: 5,
    name: '台中大里日照中心',
    type: '日照',
    grade: '觀察',
    metrics: [
      { label: '月營收 YoY', value: '+5.6%', status: 'ok' },
      { label: '出席率',     value: '68.9%', status: 'watch' },
      { label: '新個案率',   value: '-2.3%', status: 'watch' },
      { label: '照護比',     value: '1:4.1', status: 'watch' },
    ],
  },
]

// ── 各機構概況列表（當月） ────────────────────────────────
export const facilityList = [
  { name: '台北信義長照分院',   type: '住宿長照',   service: 163, serviceNew: 3, staff: 52, staffNew: 3, turnover: 3.8,  careRatio: '1:3.1', incidents: 24, revenue: 438, yoy: 9.2,  grade: '優秀' },
  { name: '台中大里日照中心',   type: '日照中心',   service:  58, serviceNew: 1, staff: 14, staffNew: 1, turnover: 11.4, careRatio: '1:4.1', incidents: 12, revenue:  91, yoy: 5.6,  grade: '觀察' },
  { name: '新北板橋居家服務部', type: '居家服務部', service: 174, serviceNew: 2, staff: 71, staffNew: 2, turnover: 14.3, careRatio: '1:2.4', incidents: 14, revenue: 168, yoy: 18.3, grade: '觀察' },
  { name: '高雄左營長照分院',   type: '住宿長照',   service:  79, serviceNew: 1, staff: 24, staffNew: 1, turnover: 5.1,  careRatio: '1:3.3', incidents:  8, revenue: 294, yoy: 7.8,  grade: '良好' },
  { name: '桃園龜山日照中心',   type: '日照中心',   service:  32, serviceNew: 0, staff: 10, staffNew: 0, turnover: 0,    careRatio: '1:3.2', incidents:  4, revenue:  91, yoy: 22.7, grade: '優秀' },
]

// 流動率異常閾值（> 10% 用警示色）
export const TURNOVER_WARNING_THRESHOLD = 10

// 健康度標籤色（沿用 brand：success / primary / warning）
export const GRADE_CONFIG = {
  優秀: { bg: 'rgba(46,125,50,0.12)',  color: '#2E7D32' },
  良好: { bg: 'rgba(0,151,167,0.12)',  color: '#0097A7' },
  觀察: { bg: 'rgba(237,108,2,0.12)',  color: '#ED6C02' },
}
