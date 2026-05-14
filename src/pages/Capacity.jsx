import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import AssignmentIcon from '@mui/icons-material/Assignment'
import BedIcon from '@mui/icons-material/Bed'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import GroupsIcon from '@mui/icons-material/Groups'
import HomeIcon from '@mui/icons-material/Home'
import HotelIcon from '@mui/icons-material/Hotel'
import PersonIcon from '@mui/icons-material/Person'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import ScheduleIcon from '@mui/icons-material/Schedule'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import TrendLineChart from '@/components/charts/TrendLineChart'
import {
  capacityReportDate,
  daycareAverage,
  daycareComparison,
  daycareFacilities,
  daycareSummary,
  daycareTrend,
  homecareComparison,
  homecareFacilities,
  homecareSummary,
  homecareTrend,
  homecareTotal,
  residentialAverage,
  residentialComparison,
  residentialFacilities,
  residentialSummary,
  residentialTrend,
} from '@/features/capacity/mockData'

// ── Color tokens ──────────────────────────────────────────
const GREEN_500 = '#4CAF50'
const WARNING = '#ED6C02'

// ── Utilities ─────────────────────────────────────────────
const STATUS_CONFIG = {
  stable:   { label: '穩定',     bg: 'rgba(76,175,80,0.12)',  color: GREEN_500 },
  ok:       { label: '正常',     bg: 'rgba(76,175,80,0.12)',  color: GREEN_500 },
  watch:    { label: '留意',     bg: 'rgba(237,108,2,0.12)',  color: WARNING },
  shortage: { label: '人員緊缺', bg: 'rgba(237,108,2,0.12)', color: WARNING },
}

function getOccupancyColor(rate) {
  return rate >= 85 ? GREEN_500 : WARNING
}

function getEmptyRateColor(rate) {
  return rate <= 10 ? GREEN_500 : WARNING
}

// ── Shared components ─────────────────────────────────────

function StatusChip({ status }) {
  const cfg = STATUS_CONFIG[status] ?? { label: status, bg: 'rgba(0,0,0,0.08)', color: 'rgba(0,0,0,0.6)' }
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-block',
        px: 1,
        py: 0.25,
        borderRadius: '16px',
        bgcolor: cfg.bg,
        color: cfg.color,
        fontSize: 12,
        lineHeight: '18px',
        fontWeight: 500,
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      {cfg.label}
    </Box>
  )
}

function DeltaRow({ delta }) {
  if (!delta) return null
  const color = delta.isWarning ? WARNING : GREEN_500
  const Icon = delta.dir === 'up' ? ArrowUpwardIcon : ArrowDownwardIcon
  return (
    <Box className="flex items-center gap-0.5" sx={{ mt: 0.5 }}>
      <Icon sx={{ fontSize: 12, color }} />
      <Typography variant="caption" sx={{ color, fontWeight: 500 }}>
        {delta.text}
      </Typography>
    </Box>
  )
}

function KpiCard({ title, value, unit, delta, hint, icon: Icon, warning }) {
  const iconBg = warning ? 'rgba(237,108,2,0.12)' : '#C5F0F7'
  const iconColor = warning ? WARNING : '#005F64'
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box className="flex items-start justify-between">
          <Typography variant="body1">{title}</Typography>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              bgcolor: iconBg,
              color: iconColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              '& svg': { fontSize: 20 },
            }}
          >
            <Icon />
          </Box>
        </Box>
        <Box className="mt-3 flex items-baseline gap-1">
          <Typography
            sx={{
              fontSize: 32,
              fontWeight: 500,
              lineHeight: 1.2,
              letterSpacing: 0,
              color: warning ? WARNING : 'text.primary',
            }}
          >
            {value}
          </Typography>
          {unit && (
            <Typography variant="body2" color="textSecondary" sx={{ pb: '4px' }}>
              {unit}
            </Typography>
          )}
        </Box>
        <Box className="mt-2 flex items-center gap-2">
          <DeltaRow delta={delta} />
          {hint && !delta && (
            <Typography variant="caption" color="textSecondary">{hint}</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}


function SectionCard({ title, children, noPadBottom, fillContent }) {
  return (
    <Card sx={{ height: '100%', ...(fillContent && { display: 'flex', flexDirection: 'column' }) }}>
      <CardContent
        sx={{
          p: 2,
          '&:last-child': { pb: noPadBottom ? 0 : 2 },
          ...(fillContent && { flex: 1, display: 'flex', flexDirection: 'column' }),
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>{title}</Typography>
        {fillContent ? <Box sx={{ flex: 1 }}>{children}</Box> : children}
      </CardContent>
    </Card>
  )
}

function UtilizationBar({ value, colorFn, color: colorProp }) {
  const color = colorProp ?? (colorFn ? colorFn(value) : getOccupancyColor(value))
  return (
    <Box sx={{ height: 8, borderRadius: 4, bgcolor: 'rgba(120,144,156,0.16)', overflow: 'hidden' }}>
      <Box sx={{ width: `${Math.min(value, 100)}%`, height: '100%', bgcolor: color, borderRadius: 4 }} />
    </Box>
  )
}

function ComparisonBars({ items, unit, colorFn, colors, footerItem, fillHeight }) {
  const maxVal = Math.max(...items.map((i) => i.value))
  return (
    <Box
      sx={
        fillHeight
          ? { display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }
          : { display: 'flex', flexDirection: 'column', gap: 2 }
      }
    >
      {items.map((item, idx) => {
        const pct = (item.value / maxVal) * 100
        const color = colors
          ? (colors[idx] ?? '#0097A7')
          : colorFn
            ? colorFn(item.value)
            : '#0097A7'
        return (
          <Box key={item.name}>
            <Box className="flex items-center justify-between" sx={{ mb: 0.75 }}>
              <Typography variant="body2">{item.name}</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, color }}>
                {item.value}{unit}
              </Typography>
            </Box>
            <Box sx={{ height: 8, borderRadius: 4, bgcolor: 'rgba(120,144,156,0.16)', overflow: 'hidden' }}>
              <Box sx={{ width: `${pct}%`, height: '100%', bgcolor: color, borderRadius: 4 }} />
            </Box>
          </Box>
        )
      })}
      {footerItem && (
        <>
          <Divider />
          <Box className="flex items-center justify-between">
            <Typography variant="body2" color="textSecondary">{footerItem.label}</Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }} color="textSecondary">
              {footerItem.value}{unit}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  )
}

const detailBtnSx = {
  color: '#546E7A',
  fontWeight: 400,
  fontSize: 14,
  textTransform: 'none',
  p: 0,
  minWidth: 0,
  '&:hover': { bgcolor: 'transparent', color: '#0097A7' },
}

// ── 住宿長照 ──────────────────────────────────────────────

function ResidentialFacilityCard({ facility }) {
  const { id, name, status, inService, emptyBeds, occupancyRate, capacity } = facility
  return (
    <Card sx={{ height: '100%', border: '1px solid rgba(0,0,0,0.08)' }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
          <Box className="flex items-center justify-between gap-2" sx={{ mb: 0.5 }}>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>{name}</Typography>
            <StatusChip status={status} />
          </Box>
          <Typography variant="caption" color="textSecondary">ID: {id}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="caption" color="textSecondary">在院人數</Typography>
            <Typography sx={{ fontSize: 22, fontWeight: 500, color: 'rgba(0,0,0,0.87)', lineHeight: 1.3 }}>
              {inService}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="textSecondary">空床數</Typography>
            <Typography sx={{ fontSize: 22, fontWeight: 500, color: 'rgba(0,0,0,0.87)', lineHeight: 1.3 }}>
              {emptyBeds}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="textSecondary">佔床率</Typography>
            <Typography sx={{ fontSize: 22, fontWeight: 500, color: 'rgba(0,0,0,0.87)', lineHeight: 1.3 }}>
              {occupancyRate}%
            </Typography>
          </Box>
        </Box>

        <Box>
          <Box className="flex justify-between" sx={{ mb: 0.75 }}>
            <Typography variant="caption" color="textSecondary">床位使用率</Typography>
            <Typography variant="caption" sx={{ color: 'rgba(0,0,0,0.87)', fontWeight: 500 }}>{occupancyRate}%</Typography>
          </Box>
          <UtilizationBar value={occupancyRate} color="#0097A7" />
        </Box>

        <Box className="flex items-center justify-between">
          <Typography variant="body2" color="textSecondary">核定床位：{capacity} 床</Typography>
          <Button variant="text" size="small" endIcon={<ChevronRightIcon sx={{ fontSize: 16 }} />} sx={detailBtnSx}>
            查看詳情
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

function ResidentialContent() {
  const { totalBeds, occupiedBeds, emptyBeds, emptyRate, occupiedDelta, emptyRateDelta } = residentialSummary
  return (
    <Box className="flex flex-col gap-3">
      <Grid container spacing={2}>
        {[
          { title: '總床數',    value: totalBeds,    unit: '床', hint: '兩間機構合計',  icon: BedIcon },
          { title: '佔床數',    value: occupiedBeds, unit: '床', delta: occupiedDelta,  icon: PersonIcon },
          { title: '空床數',    value: emptyBeds,    unit: '床', hint: '可安置床位',    icon: HotelIcon },
          { title: '平均空床率', value: emptyRate,    unit: '%',  delta: emptyRateDelta, icon: QueryStatsIcon },
        ].map((s) => (
          <Grid key={s.title} size={{ xs: 6, sm: 3 }}>
            <KpiCard {...s} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <SectionCard title="各月份空床率趨勢（%）">
            <TrendLineChart
              months={residentialTrend.months}
              series={residentialTrend.series}
              yAxisSuffix="%"
              height={200}
            />
          </SectionCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SectionCard title="各機構空床率比較" fillContent>
            <ComparisonBars
              items={residentialComparison}
              unit="%"
              colors={residentialTrend.series.map((s) => s.color)}
              footerItem={residentialAverage}
              fillHeight
            />
          </SectionCard>
        </Grid>
      </Grid>

      <SectionCard title="各機構詳細資料">
        <Grid container spacing={2}>
          {residentialFacilities.map((f) => (
            <Grid key={f.id} size={{ xs: 12, md: 6 }}>
              <ResidentialFacilityCard facility={f} />
            </Grid>
          ))}
        </Grid>
      </SectionCard>
    </Box>
  )
}

// ── 日間照顧 ──────────────────────────────────────────────

function DaycareFacilityCard({ facility }) {
  const { id, name, status, quota, todayAttend, todayAbsent, attendRate } = facility
  return (
    <Card sx={{ height: '100%', border: '1px solid rgba(0,0,0,0.08)' }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
          <Box className="flex items-center justify-between gap-2" sx={{ mb: 0.5 }}>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>{name}</Typography>
            <StatusChip status={status} />
          </Box>
          <Typography variant="caption" color="textSecondary">ID: {id}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="caption" color="textSecondary">核定人數</Typography>
            <Typography sx={{ fontSize: 22, fontWeight: 500, color: 'rgba(0,0,0,0.87)', lineHeight: 1.3 }}>
              {quota}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="textSecondary">今日出席</Typography>
            <Typography sx={{ fontSize: 22, fontWeight: 500, color: 'rgba(0,0,0,0.87)', lineHeight: 1.3 }}>
              {todayAttend}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="textSecondary">出席率</Typography>
            <Typography sx={{ fontSize: 22, fontWeight: 500, color: 'rgba(0,0,0,0.87)', lineHeight: 1.3 }}>
              {attendRate}%
            </Typography>
          </Box>
        </Box>

        <Box>
          <Box className="flex justify-between" sx={{ mb: 0.75 }}>
            <Typography variant="caption" color="textSecondary">出席率</Typography>
            <Typography variant="caption" sx={{ color: 'rgba(0,0,0,0.87)', fontWeight: 500 }}>{attendRate}%</Typography>
          </Box>
          <UtilizationBar value={attendRate} color="#0097A7" />
        </Box>

        <Box className="flex items-center justify-between">
          <Typography variant="body2" color="textSecondary">今日未到人數：{todayAbsent} 人</Typography>
          <Button variant="text" size="small" endIcon={<ChevronRightIcon sx={{ fontSize: 16 }} />} sx={detailBtnSx}>
            查看詳情
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

function DaycareContent() {
  const { totalQuota, todayAttend, todayAbsent, attendRate, todayAttendDelta, attendRateDelta } = daycareSummary
  return (
    <Box className="flex flex-col gap-3">
      <Grid container spacing={2}>
        {[
          { title: '核定總人數', value: totalQuota,  unit: '人', hint: '兩間日照合計名額', icon: GroupsIcon },
          { title: '今日出席',   value: todayAttend, unit: '人', delta: todayAttendDelta,  icon: PersonIcon },
          { title: '今日缺席',   value: todayAbsent, unit: '人', hint: '含請假與臨時缺席', icon: PersonIcon },
          { title: '出席率',     value: attendRate,  unit: '%',  delta: attendRateDelta,   icon: QueryStatsIcon },
        ].map((s) => (
          <Grid key={s.title} size={{ xs: 6, sm: 3 }}>
            <KpiCard {...s} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <SectionCard title="各機構出席率月趨勢（%）">
            <TrendLineChart
              months={daycareTrend.months}
              series={daycareTrend.series}
              yAxisSuffix="%"
              height={200}
            />
          </SectionCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SectionCard title="本月各機構出席率" fillContent>
            <ComparisonBars
              items={daycareComparison}
              unit="%"
              colors={daycareTrend.series.map((s) => s.color)}
              footerItem={daycareAverage}
              fillHeight
            />
          </SectionCard>
        </Grid>
      </Grid>

      <SectionCard title="各機構詳細資料">
        <Grid container spacing={2}>
          {daycareFacilities.map((f) => (
            <Grid key={f.id} size={{ xs: 12, md: 6 }}>
              <DaycareFacilityCard facility={f} />
            </Grid>
          ))}
        </Grid>
      </SectionCard>
    </Box>
  )
}

// ── 居家服務 ──────────────────────────────────────────────

function HomecareFacilityCard({ facility }) {
  const { id, name, status, cases, staffCount, monthlyHours, newCases, closedCases, alert } = facility
  return (
    <Card sx={{ height: '100%', border: '1px solid rgba(0,0,0,0.08)' }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
          <Box className="flex items-center justify-between gap-2" sx={{ mb: 0.5 }}>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>{name}</Typography>
            <StatusChip status={status} />
          </Box>
          <Typography variant="caption" color="textSecondary">ID: {id}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="caption" color="textSecondary">服務案件</Typography>
            <Typography sx={{ fontSize: 22, fontWeight: 500, color: 'rgba(0,0,0,0.87)', lineHeight: 1.3 }}>
              {cases}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="textSecondary">居服員</Typography>
            <Typography sx={{ fontSize: 22, fontWeight: 500, color: 'rgba(0,0,0,0.87)', lineHeight: 1.3 }}>
              {staffCount}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="textSecondary">月服時數</Typography>
            <Typography sx={{ fontSize: 22, fontWeight: 500, color: 'rgba(0,0,0,0.87)', lineHeight: 1.3 }}>
              {monthlyHours.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        {alert && (
          <Alert severity="warning" sx={{ py: 0.5 }}>{alert}</Alert>
        )}

        <Box className="flex items-center justify-between">
          <Typography variant="body2" color="textSecondary">
            本月：新入案 {newCases} 案・離案 {closedCases} 案
          </Typography>
          <Button variant="text" size="small" endIcon={<ChevronRightIcon sx={{ fontSize: 16 }} />} sx={detailBtnSx}>
            查看詳情
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

function HomecareContent() {
  const { totalCases, monthlyHours, staffCount, hoursDelta } = homecareSummary
  return (
    <Box className="flex flex-col gap-3">
      <Grid container spacing={2}>
        <Grid size={{ xs: 6, sm: 4 }}>
          <KpiCard title="服務案件數" value={totalCases.toLocaleString()} unit="案" hint="兩間居服合計" icon={AssignmentIcon} />
        </Grid>
        <Grid size={{ xs: 6, sm: 4 }}>
          <KpiCard title="月服務時數" value={monthlyHours.toLocaleString()} unit="時" delta={hoursDelta} icon={ScheduleIcon} />
        </Grid>
        <Grid size={{ xs: 6, sm: 4 }}>
          <KpiCard title="居服人數" value={staffCount} unit="人" hint="兩間居服合計" icon={GroupsIcon} />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <SectionCard title="各機構服務案件數月趨勢">
            <TrendLineChart
              months={homecareTrend.months}
              series={homecareTrend.series}
              yAxisSuffix="案"
              height={200}
            />
          </SectionCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SectionCard title="本月各機構服務案件數" fillContent>
            <ComparisonBars
              items={homecareComparison}
              unit="案"
              colors={homecareTrend.series.map((s) => s.color)}
              footerItem={homecareTotal}
              fillHeight
            />
          </SectionCard>
        </Grid>
      </Grid>

      <SectionCard title="各機構詳細資料">
        <Grid container spacing={2}>
          {homecareFacilities.map((f) => (
            <Grid key={f.id} size={{ xs: 12, md: 6 }}>
              <HomecareFacilityCard facility={f} />
            </Grid>
          ))}
        </Grid>
      </SectionCard>
    </Box>
  )
}

// ── Page ──────────────────────────────────────────────────

const TABS = [
  { label: '住宿長照', icon: <HotelIcon sx={{ fontSize: 18 }} /> },
  { label: '日間照顧', icon: <WbSunnyIcon sx={{ fontSize: 18 }} /> },
  { label: '居家服務', icon: <HomeIcon sx={{ fontSize: 18 }} /> },
]

export default function Capacity() {
  const [searchParams] = useSearchParams()
  const initialTab = Math.min(Math.max(parseInt(searchParams.get('tab') ?? '0', 10), 0), TABS.length - 1)
  const [tab, setTab] = useState(initialTab)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <Box className="flex flex-col gap-3">
      <Paper sx={{ borderRadius: '8px' }}>
        <Box
          sx={{
            px: 2,
            pt: 2,
            pb: 1.5,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ lineHeight: 1.2 }}>產能管理</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
              監控全集團長照・日照・居服即時資源利用率與服務量
            </Typography>
          </Box>
          <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5, flexShrink: 0 }}>
            {capacityReportDate}
          </Typography>
        </Box>

        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{
            px: 1,
            borderBottom: '1px solid rgba(0,0,0,0.12)',
            '& .MuiTab-root': {
              color: '#546E7A',
              fontWeight: 400,
              fontSize: 14,
              textTransform: 'none',
              letterSpacing: '0.17px',
              minHeight: 48,
            },
            '& .Mui-selected': { color: '#0097A7', fontWeight: 500 },
            '& .MuiTabs-indicator': { backgroundColor: '#0097A7' },
          }}
        >
          {TABS.map((t) => (
            <Tab key={t.label} icon={t.icon} iconPosition="start" label={t.label} />
          ))}
        </Tabs>
      </Paper>

      {tab === 0 && <ResidentialContent />}
      {tab === 1 && <DaycareContent />}
      {tab === 2 && <HomecareContent />}
    </Box>
  )
}
