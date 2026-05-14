export const daycareReportDate = '數據更新 2026/05/14 00:00'

// 機構色彩優先順序（與全產品一致：住宿=#0097A7、日照=#005F64、居服=#26A69A）
const FACILITY_COLORS = ['#0097A7', '#005F64', '#26A69A', '#546E7A', '#78909C', '#90A4AE']

// 服務碼別固定配色（跨機構一致，用色順序同全產品）
const CODE_COLORS = { bc: '#0097A7', g: '#005F64', self: '#26A69A' }

export const daycareFacilities = [
  { id: 'boai', name: '博愛日照中心', shortName: '博愛' },
  { id: 'lehuo', name: '樂活日照中心', shortName: '樂活' },
]

const MONTHS_6 = ['12月', '1月', '2月', '3月', '4月', '5月']
const MONTHS_12 = ['6月', '7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月', '4月', '5月']

// ── 總覽 ──────────────────────────────────────────────────

export const overviewKpis = [
  { title: '核定收案總數', value: 142, unit: '人' },
  {
    title: '今日實際出席',
    value: 129,
    unit: '人',
    delta: { dir: 'up', text: '+3 較昨日', isWarning: false },
  },
  {
    title: '集團平均出席率',
    value: '82.5',
    unit: '%',
    delta: { dir: 'down', text: '-1.2% 較上月', isWarning: true },
  },
]

export const overviewRevenueByFacility = {
  months: MONTHS_6,
  series: [
    { name: '博愛日照中心', color: FACILITY_COLORS[0], data: [65, 68, 70, 71, 72, 72] },
    { name: '樂活日照中心', color: FACILITY_COLORS[1], data: [85, 88, 90, 91, 92, 92] },
  ],
}

export const overviewSelfPayTrend = {
  months: MONTHS_6,
  series: [
    { name: '博愛日照中心', color: FACILITY_COLORS[0], data: [8, 9, 10, 10, 9, 9] },
    { name: '樂活日照中心', color: FACILITY_COLORS[1], data: [12, 14, 15, 16, 17, 17] },
  ],
}

// ── 各機構資料 ────────────────────────────────────────────

export const facilityData = {
  boai: {
    alerts: [
      { level: 'error', text: '出席率 78.5% - 低於 85% 目標，需分析原因' },
      { level: 'error', text: '人事成本率 68.2% - 過高，需檢視人力配置' },
      { level: 'warning', text: '未收款 $9萬 - 需加強收款管理' },
    ],
    todayStats: [
      { title: '核定收案數', value: 50, unit: '人' },
      { title: '實際收案數', value: 46, unit: '人' },
      { title: '應到人數', value: 42, unit: '人', hint: '今日' },
      { title: '未到人數', value: 4, unit: '人', hint: '今日' },
      { title: '請假', value: 4, unit: '人' },
      {
        title: '出席率',
        value: '78.5',
        unit: '%',
        delta: { dir: 'down', text: '↓-1 vs 昨天', isWarning: true },
      },
    ],
    attendanceTrend: {
      target: 85,
      months: MONTHS_6,
      data: [82.0, 80.5, 79.3, 78.8, 78.0, 78.5],
    },
    financialSnapshot: [
      { label: '本月營收', value: '$72萬', sub: '↑+5.2% YoY', isWarning: false },
      { label: '已收款', value: '$63萬', sub: '(87.5%)', isWarning: false },
      { label: '未收款', value: '$9萬', sub: '⚠ 追蹤中', isWarning: true },
      { label: '平均出席率', value: '78.5%', sub: '⚠ 持續低', isWarning: true },
      { label: '平均日出席', value: '33人', sub: '核定', isWarning: false },
      { label: '人事成本', value: '$49萬', sub: '↑+4.2%', isWarning: false },
      { label: '成本率', value: '68.2%', sub: '⚠ 過高', isWarning: true },
      { label: '人均貢獻', value: '1.47倍', sub: '↓-3.2%', isWarning: false },
    ],
    revenueTrend: {
      months: MONTHS_6,
      series: [{ name: '營收（萬元）', color: FACILITY_COLORS[0], data: [68.5, 69.2, 70.8, 70.1, 71.3, 72.0] }],
    },
    annualBilling: {
      months: MONTHS_12,
      series: [
        { name: 'BC 碼', color: CODE_COLORS.bc,   data: [30, 31, 32, 31, 33, 34, 33, 34, 35, 36, 35, 36] },
        { name: 'G 碼',  color: CODE_COLORS.g,    data: [15, 16, 15, 16, 16, 17, 16, 15, 16, 15, 16, 16] },
        { name: '自費',  color: CODE_COLORS.self,  data: [8, 9, 9, 10, 10, 10, 9, 10, 9, 9, 9, 9] },
      ],
    },
    revenueByCode: {
      months: MONTHS_6,
      series: [
        { name: 'BC 碼', color: CODE_COLORS.bc,   data: [34, 34, 35, 36, 35, 36] },
        { name: 'G 碼',  color: CODE_COLORS.g,    data: [16, 17, 16, 15, 16, 16] },
        { name: '自費',  color: CODE_COLORS.self,  data: [10, 10, 9, 10, 9, 9] },
      ],
    },
  },

  lehuo: {
    alerts: [
      { level: 'info', text: '下月核定人數增加 5 人，請提前準備人力調度' },
    ],
    todayStats: [
      { title: '核定收案數', value: 92, unit: '人' },
      { title: '實際收案數', value: 87, unit: '人' },
      { title: '應到人數', value: 83, unit: '人', hint: '今日' },
      { title: '未到人數', value: 4, unit: '人', hint: '今日' },
      { title: '請假', value: 4, unit: '人' },
      {
        title: '出席率',
        value: '91.3',
        unit: '%',
        delta: { dir: 'up', text: '↑+2.8% 較昨天', isWarning: false },
      },
    ],
    attendanceTrend: {
      target: 85,
      months: MONTHS_6,
      data: [86.0, 87.5, 88.0, 89.2, 90.1, 91.3],
    },
    financialSnapshot: [
      { label: '本月營收', value: '$92萬', sub: '↑+8.2% YoY', isWarning: false },
      { label: '已收款', value: '$85萬', sub: '(92.4%)', isWarning: false },
      { label: '未收款', value: '$7萬', sub: '追蹤中', isWarning: false },
      { label: '平均出席率', value: '91.3%', sub: '表現良好', isWarning: false },
      { label: '平均日出席', value: '84人', sub: '核定', isWarning: false },
      { label: '人事成本', value: '$52萬', sub: '↑+3.0%', isWarning: false },
      { label: '成本率', value: '56.5%', sub: '正常範圍', isWarning: false },
      { label: '人均貢獻', value: '1.77倍', sub: '↑+5.1%', isWarning: false },
    ],
    revenueTrend: {
      months: MONTHS_6,
      series: [{ name: '營收（萬元）', color: FACILITY_COLORS[1], data: [85.0, 87.2, 88.5, 90.1, 91.5, 92.0] }],
    },
    annualBilling: {
      months: MONTHS_12,
      series: [
        { name: 'BC 碼', color: CODE_COLORS.bc,   data: [48, 50, 51, 50, 52, 54, 53, 54, 55, 57, 56, 57] },
        { name: 'G 碼',  color: CODE_COLORS.g,    data: [20, 21, 22, 21, 22, 23, 22, 21, 22, 21, 22, 22] },
        { name: '自費',  color: CODE_COLORS.self,  data: [12, 14, 15, 16, 17, 17, 16, 17, 17, 17, 17, 17] },
      ],
    },
    revenueByCode: {
      months: MONTHS_6,
      series: [
        { name: 'BC 碼', color: CODE_COLORS.bc,   data: [53, 54, 55, 57, 56, 57] },
        { name: 'G 碼',  color: CODE_COLORS.g,    data: [22, 21, 22, 21, 22, 22] },
        { name: '自費',  color: CODE_COLORS.self,  data: [16, 17, 17, 17, 17, 17] },
      ],
    },
  },
}
