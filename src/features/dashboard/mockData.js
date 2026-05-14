export const reportDate = '2026年3月10日 週二'

export const kpis = [
  {
    key: 'serviceTotal',
    title: '服務總人數',
    value: '543',
    unit: '人',
    hint: '本月服務中個案',
    delta: null,
  },
  {
    key: 'staffTotal',
    title: '總員工數',
    value: '603',
    unit: '人',
    hint: '當月離職率 1.44%',
    delta: null,
  },
  {
    key: 'newHired',
    title: '本月新入職',
    value: '42',
    unit: '人',
    hint: '全集團本月新進員工',
    delta: { dir: 'up', text: '較上個月 +5', isWarning: false },
  },
  {
    key: 'resigned',
    title: '本月離職',
    value: '18',
    unit: '人',
    hint: '全集團本月離職員工',
    delta: { dir: 'down', text: '較上個月 -3', isWarning: false },
  },
]

export const serviceShare = [
  { name: '住宿長照', value: 282, color: '#0097A7' },
  { name: '居家服務', value: 163, color: '#26A69A' },
  { name: '日間照顧', value: 98, color: '#005F64' },
]

export const headcount = {
  total: 603,
  newHired: 42,
  newHiredDelta: { dir: 'up', text: '+5' },
  resigned: 18,
  resignedDelta: { dir: 'down', text: '-3' },
  resignRate: '1.44%',
  resignRateDelta: { dir: 'down', text: '-0.12%' },
  staffRatio: '1:1.7',
}

export const serviceOverviews = [
  {
    key: 'residential',
    label: '住宿長照',
    icon: 'hotel',
    badgeColor: '#0097A7',
    facilities: ['台北大安', '桃園慈愛'],
    stats: [
      { title: '今日在院總人數', value: '236', unit: '位', delta: { dir: 'up', text: '較上月 +3.2%', isWarning: false } },
      { title: '今日新入住', value: '3', unit: '人', delta: { dir: 'up', text: '較昨日 +1', isWarning: false } },
      { title: '今日退住人數', value: '1', unit: '人', delta: { dir: 'flat', text: '與昨日持平' } },
      { title: '平均空床率', value: '12.4', unit: '%', delta: { dir: 'down', text: '較上月 -1.5%', isWarning: true } },
    ],
  },
  {
    key: 'daycare',
    label: '日間照顧',
    icon: 'sun',
    badgeColor: '#005F64',
    facilities: ['高雄幸福', '台中建德'],
    stats: [
      { title: '總核定人數', value: '92', unit: '人', hint: '兩間日照合計名額' },
      { title: '今日應到人數', value: '88', unit: '人', hint: '扣除事先請假' },
      { title: '今日未到人數', value: '9', unit: '人', delta: { dir: 'up', text: '較昨日 +3', isWarning: true } },
      { title: '空位率', value: '10.9', unit: '%', delta: { dir: 'down', text: '較上月 -2.1%', isWarning: false } },
    ],
  },
  {
    key: 'homecare',
    label: '居家服務',
    icon: 'home',
    badgeColor: '#26A69A',
    facilities: ['新北板橋', '台南安康'],
    stats: [
      { title: '今日服務個案數', value: '198', unit: '案', hint: '今日排定服務個案' },
      { title: '今日已排班居服員', value: '62', unit: '人', alert: '板橋缺工 6 人' },
      { title: '今日服務總時數', value: '412', unit: '時', delta: { dir: 'up', text: '較上周 +3%', isWarning: false } },
      { title: '個案服務達成率', value: '94.4', unit: '%', delta: { dir: 'down', text: '較昨日 -1.2%', isWarning: false } },
    ],
  },
]

export const facilities = [
  {
    id: 'F-001',
    name: '台北大安',
    type: '住宿長照',
    inService: 142,
    capacity: 160,
    utilization: 88.8,
    status: 'stable',
  },
  {
    id: 'F-002',
    name: '桃園慈愛',
    type: '住宿長照',
    inService: 94,
    capacity: 120,
    utilization: 78.3,
    status: 'watch',
  },
  {
    id: 'F-003',
    name: '高雄幸福',
    type: '日間照顧',
    inService: 56,
    capacity: 60,
    utilization: 93.3,
    status: 'stable',
  },
  {
    id: 'F-004',
    name: '台中建德',
    type: '日間照顧',
    inService: 42,
    capacity: 50,
    utilization: 84.0,
    status: 'watch',
  },
  {
    id: 'F-005',
    name: '新北板橋',
    type: '居家服務',
    inService: 98,
    capacity: 110,
    utilization: 89.1,
    status: 'stable',
  },
  {
    id: 'F-006',
    name: '台南安康',
    type: '居家服務',
    inService: 65,
    capacity: 90,
    utilization: 72.2,
    status: 'shortage',
  },
]

