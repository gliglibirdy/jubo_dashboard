export const capacityReportDate = '數據更新 2026/03/10 00:00'

// ── 住宿長照 ──────────────────────────────────────────────
export const residentialSummary = {
  totalBeds: 280,
  occupiedBeds: 236,
  emptyBeds: 44,
  emptyRate: 15.7,
  occupiedDelta: { dir: 'up', text: '+2 本周入住', isWarning: false },
  emptyRateDelta: { dir: 'up', text: '較上月 +1.2%', isWarning: true },
}

export const residentialTrend = {
  months: ['10月', '11月', '12月', '1月', '2月', '3月'],
  series: [
    { name: '台北大安', color: '#0097A7', data: [8.5, 9.2, 7.8, 10.1, 11.3, 6.1] },
    { name: '桃園慈愛', color: '#005F64', data: [18.3, 20.0, 22.5, 25.0, 24.2, 10.4] },
  ],
}

export const residentialComparison = [
  { name: '台北大安', value: 6.1 },
  { name: '桃園慈愛', value: 10.4 },
]
export const residentialAverage = { label: '集團平均', value: 15.7 }

export const residentialFacilities = [
  {
    id: '1001',
    name: '台北大安長照中心',
    status: 'stable',
    inService: 124,
    emptyBeds: 8,
    occupancyRate: 93.9,
    capacity: 132,
  },
  {
    id: '5005',
    name: '桃園慈愛養老院',
    status: 'stable',
    inService: 112,
    emptyBeds: 36,
    occupancyRate: 75.7,
    capacity: 148,
  },
]

// ── 日間照顧 ──────────────────────────────────────────────
export const daycareSummary = {
  totalQuota: 92,
  todayAttend: 83,
  todayAbsent: 9,
  attendRate: 90.3,
  todayAttendDelta: { dir: 'up', text: '較昨日 +3', isWarning: false },
  attendRateDelta: { dir: 'up', text: '+2.5% 較上月', isWarning: false },
}

export const daycareTrend = {
  months: ['10月', '11月', '12月', '1月', '2月', '3月'],
  series: [
    { name: '高雄幸福', color: '#0097A7', data: [92.5, 88.0, 91.0, 85.5, 87.2, 90.0] },
    { name: '台中建德', color: '#005F64', data: [86.0, 89.5, 84.0, 80.0, 72.0, 76.0] },
  ],
}

export const daycareComparison = [
  { name: '高雄幸福', value: 90.0 },
  { name: '台中建德', value: 76.0 },
]
export const daycareAverage = { label: '集團平均', value: 90.3 }

export const daycareFacilities = [
  {
    id: '3003',
    name: '高雄幸福日照中心',
    status: 'ok',
    quota: 50,
    todayAttend: 45,
    todayAbsent: 5,
    attendRate: 90,
  },
  {
    id: '2002',
    name: '台中建德日照中心',
    status: 'watch',
    quota: 42,
    todayAttend: 38,
    todayAbsent: 4,
    attendRate: 76,
  },
]

// ── 居家服務 ──────────────────────────────────────────────
export const homecareSummary = {
  totalCases: 224,
  monthlyHours: 8200,
  staffCount: 68,
  hoursDelta: { dir: 'up', text: '+3.5% 較上月', isWarning: false },
  staffAlert: '板橋站短缺',
}

export const homecareTrend = {
  months: ['10月', '11月', '12月', '1月', '2月', '3月'],
  series: [
    { name: '新北板橋', color: '#0097A7', data: [140, 148, 152, 156, 150, 156] },
    { name: '台南安康', color: '#26A69A', data: [58, 62, 65, 68, 64, 68] },
  ],
}

export const homecareComparison = [
  { name: '新北板橋', value: 156 },
  { name: '台南安康', value: 68 },
]
export const homecareTotal = { label: '合計', value: 224 }

export const homecareFacilities = [
  {
    id: '4004',
    name: '新北板橋居家服務所',
    status: 'shortage',
    cases: 156,
    staffCount: 40,
    monthlyHours: 5400,
    staffRatio: '1:22',
    newCases: 12,
    closedCases: 8,
    alert: '人力比 1:22 超出法規，建議緊急調度區域支援。',
  },
  {
    id: '6006',
    name: '台南安康樂齡館',
    status: 'stable',
    cases: 68,
    staffCount: 28,
    monthlyHours: 2800,
    staffRatio: '1:2.4',
    newCases: 1,
    closedCases: 2,
    alert: null,
  },
]
