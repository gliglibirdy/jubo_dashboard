import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popover,
  Select,
  Snackbar,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from 'recharts'
import DownloadIcon from '@mui/icons-material/Download'
import IosShareIcon from '@mui/icons-material/IosShare'
import LinkIcon from '@mui/icons-material/Link'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import StackedBarChart from '@/components/charts/StackedBarChart'
import TrendLineChart from '@/components/charts/TrendLineChart'
import StatCard from '@/components/StatCard'
import {
  daycareFacilities,
  daycareReportDate,
  facilityData,
  overviewKpis,
  overviewRevenueByFacility,
  overviewSelfPayTrend,
} from '@/features/daycare/mockData'

// ── Color tokens ──────────────────────────────────────────
const PRIMARY = '#0097A7'
const PRIMARY_DARK = '#005F64'
const WARNING_COLOR = '#ED6C02'

// ── AlertBanner ───────────────────────────────────────────
const ALERT_CONFIG = {
  error:   { bg: '#FFEBEE', color: '#C62828', dot: '#D32F2F' },
  warning: { bg: '#FFF8E1', color: '#E65100', dot: '#ED6C02' },
  info:    { bg: '#E3F2FD', color: '#1565C0', dot: '#1976D2' },
}

function AlertBanner({ level, text }) {
  const cfg = ALERT_CONFIG[level] ?? ALERT_CONFIG.info
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 2,
        py: 1.25,
        borderRadius: 1.5,
        bgcolor: cfg.bg,
      }}
    >
      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: cfg.dot, flexShrink: 0 }} />
      <Typography variant="body2" sx={{ color: cfg.color }}>
        {text}
      </Typography>
    </Box>
  )
}

// ── MetricCard ────────────────────────────────────────────
function MetricCard({ label, value, sub, isWarning }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 1.5,
        borderRadius: 2,
        height: '100%',
        borderColor: isWarning ? 'warning.light' : 'divider',
        bgcolor: isWarning ? '#FFF8E1' : 'background.paper',
      }}
    >
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography
        variant="h6"
        fontWeight={600}
        sx={{ mt: 0.5, color: isWarning ? 'warning.dark' : 'text.primary' }}
      >
        {value}
      </Typography>
      {sub && (
        <Typography variant="caption" sx={{ color: isWarning ? 'warning.main' : 'text.secondary' }}>
          {sub}
        </Typography>
      )}
    </Paper>
  )
}

// ── AttendanceTrendChart ──────────────────────────────────
function AttendanceTrendChart({ months, data, target }) {
  const chartData = months.map((month, i) => ({ month, 出席率: data[i] }))
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={chartData} margin={{ top: 8, right: 48, bottom: 0, left: -8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: 'rgba(0,0,0,0.6)' }}
          tickLine={false}
          axisLine={{ stroke: 'rgba(0,0,0,0.12)' }}
        />
        <YAxis
          tick={{ fontSize: 12, fill: 'rgba(0,0,0,0.6)' }}
          tickLine={false}
          axisLine={false}
          domain={[60, 100]}
          tickFormatter={(v) => `${v}%`}
        />
        <RechartsTooltip
          formatter={(v) => [`${v}%`, '出席率']}
          contentStyle={{
            borderRadius: 8,
            border: '1px solid rgba(0,0,0,0.12)',
            boxShadow: 'none',
            fontSize: 12,
          }}
        />
        <ReferenceLine
          y={target}
          stroke={WARNING_COLOR}
          strokeDasharray="5 4"
          label={{
            value: `目標 ${target}%`,
            position: 'right',
            fontSize: 11,
            fill: WARNING_COLOR,
            fontWeight: 500,
          }}
        />
        <Line
          type="monotone"
          dataKey="出席率"
          stroke={PRIMARY}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

// ── ShareButton ───────────────────────────────────────────
function ShareButton({ cardRef, sectionId, currentTab }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [snackOpen, setSnackOpen] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const handleOpen = (e) => {
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => setAnchorEl(null)

  const handleCopyLink = async () => {
    const base = window.location.href.split('#')[0]
    const url = `${base}#/daycare?tab=${currentTab}&section=${sectionId}`
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const el = document.createElement('textarea')
      el.value = url
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setSnackOpen(true)
    handleClose()
  }

  const handleDownload = async () => {
    handleClose()
    if (!cardRef.current) return
    setDownloading(true)
    try {
      const { default: html2canvas } = await import('html2canvas')
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
      })
      const link = document.createElement('a')
      link.download = `${sectionId}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } finally {
      setDownloading(false)
    }
  }

  return (
    <>
      <Tooltip title="分享">
        <IconButton
          size="small"
          onClick={handleOpen}
          sx={{ color: 'text.disabled', '&:hover': { color: 'text.secondary' } }}
        >
          <IosShareIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx: { borderRadius: 2, boxShadow: 3 } } }}
      >
        <MenuList dense sx={{ py: 0.5, minWidth: 148 }}>
          <MenuItem onClick={handleCopyLink} sx={{ gap: 1.5, py: 1 }}>
            <LinkIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            <Typography variant="body2">複製連結</Typography>
          </MenuItem>
          <MenuItem onClick={handleDownload} disabled={downloading} sx={{ gap: 1.5, py: 1 }}>
            <DownloadIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            <Typography variant="body2">{downloading ? '處理中…' : '下載圖片'}</Typography>
          </MenuItem>
        </MenuList>
      </Popover>

      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={() => setSnackOpen(false)}
        message="連結已複製"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  )
}

// ── ShareableCard ─────────────────────────────────────────
function ShareableCard({ id, title, currentTab, children, sx }) {
  const cardRef = useRef(null)
  return (
    <Paper ref={cardRef} id={id} variant="outlined" sx={{ p: 2.5, borderRadius: 2, ...sx }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          {title}
        </Typography>
        <ShareButton cardRef={cardRef} sectionId={id} currentTab={currentTab} />
      </Box>
      {children}
    </Paper>
  )
}

// ── OverviewContent ───────────────────────────────────────
function OverviewContent() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <Grid container spacing={2}>
        {overviewKpis.map((kpi) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={kpi.title}>
            <StatCard {...kpi} />
          </Grid>
        ))}
      </Grid>

      <ShareableCard id="overview-revenue" title="各機構營收總覽" currentTab="overview">
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
          不同顏色為不同機構（單位：萬元）
        </Typography>
        <StackedBarChart
          months={overviewRevenueByFacility.months}
          series={overviewRevenueByFacility.series}
          height={260}
          yAxisSuffix="萬"
        />
      </ShareableCard>

      <ShareableCard id="overview-selfpay" title="各機構自費服務趨勢" currentTab="overview">
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
          自費營收（近 6 個月，單位：萬元）
        </Typography>
        <TrendLineChart
          months={overviewSelfPayTrend.months}
          series={overviewSelfPayTrend.series}
          yAxisSuffix="萬"
          height={240}
        />
      </ShareableCard>
    </Box>
  )
}

// ── FacilityContent ───────────────────────────────────────
function FacilityContent({ facilityId, currentTab }) {
  const data = facilityData[facilityId]

  if (!data) {
    return (
      <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
        找不到機構資料
      </Typography>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {data.alerts.length > 0 && (
        <ShareableCard id="alerts" title="需關注事項" currentTab={currentTab}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {data.alerts.map((alert, i) => (
              <AlertBanner key={i} {...alert} />
            ))}
          </Box>
        </ShareableCard>
      )}

      <ShareableCard id="today-stats" title="今日出席總覽" currentTab={currentTab}>
        <Grid container spacing={1.5}>
          {data.todayStats.map((stat) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={stat.title}>
              <StatCard {...stat} />
            </Grid>
          ))}
        </Grid>
      </ShareableCard>

      <ShareableCard id="attendance-trend" title="出席率趨勢（近 6 個月）" currentTab={currentTab}>
        <AttendanceTrendChart {...data.attendanceTrend} />
      </ShareableCard>

      <ShareableCard id="financial-snapshot" title="本月財務快照" currentTab={currentTab}>
        <Grid container spacing={1.5}>
          {data.financialSnapshot.map((item) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={item.label}>
              <MetricCard {...item} />
            </Grid>
          ))}
        </Grid>
      </ShareableCard>

      <ShareableCard id="revenue-trend" title="營收趨勢（近 6 個月）" currentTab={currentTab}>
        <TrendLineChart
          months={data.revenueTrend.months}
          series={data.revenueTrend.series}
          yAxisSuffix="萬"
          height={220}
        />
      </ShareableCard>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ShareableCard
            id="annual-billing"
            title="近一年收費統計"
            currentTab={currentTab}
            sx={{ height: '100%' }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
              BC 碼 / G 碼 / 自費（單位：萬元）
            </Typography>
            <StackedBarChart
              months={data.annualBilling.months}
              series={data.annualBilling.series}
              yAxisSuffix="萬"
              height={240}
            />
          </ShareableCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ShareableCard
            id="revenue-by-code"
            title="不同服務碼別營收趨勢"
            currentTab={currentTab}
            sx={{ height: '100%' }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
              BC 碼（長照補助）、G 碼（喘息服務）、自費
            </Typography>
            <TrendLineChart
              months={data.revenueByCode.months}
              series={data.revenueByCode.series}
              yAxisSuffix="萬"
              height={220}
            />
          </ShareableCard>
        </Grid>
      </Grid>
    </Box>
  )
}

// ── Daycare page ──────────────────────────────────────────
export default function Daycare() {
  const [searchParams, setSearchParams] = useSearchParams()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const currentTab = searchParams.get('tab') || 'overview'
  const setTab = (v) => setSearchParams({ tab: v }, { replace: true })

  // Scroll to section when URL contains &section=<id>
  useEffect(() => {
    const sectionId = searchParams.get('section')
    if (!sectionId) return
    const el = document.getElementById(sectionId)
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200)
  }, [currentTab, searchParams])

  const tabOptions = [
    { value: 'overview', label: '總覽', shortLabel: '總覽' },
    ...daycareFacilities.map((f) => ({ value: f.id, label: f.name, shortLabel: f.shortName })),
  ]

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: '10px',
            bgcolor: '#C5F0F7',
            color: PRIMARY_DARK,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <WbSunnyIcon />
        </Box>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            日照中心
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {daycareReportDate}
          </Typography>
        </Box>
      </Box>

      {/* Tab / Select navigation */}
      <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
        {isMobile ? (
          <FormControl fullWidth size="small">
            <Select
              value={currentTab}
              onChange={(e) => setTab(e.target.value)}
              sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
            >
              {tabOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <Tabs
            value={currentTab}
            onChange={(_, v) => setTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': { minWidth: 120, fontWeight: 500 },
              '& .MuiTabs-indicator': { backgroundColor: PRIMARY_DARK },
              '& .Mui-selected': { color: `${PRIMARY_DARK} !important` },
            }}
          >
            {tabOptions.map((opt) => (
              <Tab key={opt.value} value={opt.value} label={opt.label} />
            ))}
          </Tabs>
        )}
      </Paper>

      {/* Content */}
      {currentTab === 'overview' ? (
        <OverviewContent />
      ) : (
        <FacilityContent facilityId={currentTab} currentTab={currentTab} />
      )}
    </Box>
  )
}
