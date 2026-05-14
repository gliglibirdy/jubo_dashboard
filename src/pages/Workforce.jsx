import { useState } from 'react'
import {
  Alert,
  AlertTitle,
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import BadgeIcon from '@mui/icons-material/Badge'
import GroupsIcon from '@mui/icons-material/Groups'
import HomeIcon from '@mui/icons-material/Home'
import HotelIcon from '@mui/icons-material/Hotel'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { green } from '@mui/material/colors'
import {
  workforceReportDate,
  kpis,
  staffDistribution,
  riskAlerts,
  residentialSummary,
  residentialFacilities,
  daycareSummary,
  daycareFacilities,
  homecareSummary,
  homecareFacilities,
} from '@/features/workforce/mockData'

// ── Color tokens ──────────────────────────────────────────────
const WARNING = '#ED6C02'

const ROLE_COLORS = [
  '#0097A7',
  '#005F64',
  '#26A69A',
  '#80CBC4',
  '#4DB6AC',
  '#006064',
  '#80DEEA',
  '#B2EBF2',
]

// ── Status chip ───────────────────────────────────────────────
const STATUS_CONFIG = {
  stable:   { label: '穩定',     bg: 'rgba(76,175,80,0.12)',  color: green[600] },
  ok:       { label: '正常',     bg: 'rgba(76,175,80,0.12)',  color: green[600] },
  watch:    { label: '留意',     bg: 'rgba(237,108,2,0.12)',  color: WARNING },
  shortage: { label: '人員緊缺', bg: 'rgba(237,108,2,0.12)', color: WARNING },
}

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

// ── Delta row ─────────────────────────────────────────────────
function DeltaRow({ delta }) {
  if (!delta) return null
  const color = delta.isWarning ? WARNING : green[500]
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

// ── KPI Card (top row) ────────────────────────────────────────
function KpiCard({ title, value, unit, delta, hint, icon: Icon }) {
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
              bgcolor: '#C5F0F7',
              color: '#005F64',
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
          <Typography sx={{ fontSize: 32, fontWeight: 500, lineHeight: 1.2, letterSpacing: 0 }}>
            {value}
          </Typography>
          {unit && (
            <Typography variant="body2" color="textSecondary" sx={{ pb: '4px' }}>
              {unit}
            </Typography>
          )}
        </Box>
        <Box className="mt-2">
          <DeltaRow delta={delta} />
          {hint && !delta && (
            <Typography variant="caption" color="textSecondary">{hint}</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

// ── Section stat card (gray, same as Dashboard) ───────────────
function SectionStatCard({ title, value, unit, hint, delta, alert }) {
  let DeltaIcon = null
  if (delta?.dir === 'up') DeltaIcon = ArrowUpwardIcon
  else if (delta?.dir === 'down') DeltaIcon = ArrowDownwardIcon

  const deltaColor = delta?.isWarning ? 'warning.main' : green[500]

  return (
    <Box
      sx={{
        bgcolor: 'rgba(120,144,156,0.08)',
        borderRadius: '8px',
        pl: '15px',
        pr: '12px',
        py: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 1,
        boxSizing: 'border-box',
      }}
    >
      <Typography variant="body1">{title}</Typography>
      <Box className="flex items-baseline gap-1">
        <Typography sx={{ fontSize: 24, fontWeight: 500, lineHeight: 1.2, color: 'text.primary', letterSpacing: 0 }}>
          {value}
        </Typography>
        {unit && <Typography variant="caption" color="textSecondary">{unit}</Typography>}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {delta && DeltaIcon && (
          <>
            <DeltaIcon sx={{ fontSize: 12, color: deltaColor }} />
            <Typography variant="caption" sx={{ color: deltaColor, fontWeight: 500 }}>{delta.text}</Typography>
          </>
        )}
        {alert && (
          <>
            <WarningAmberIcon sx={{ fontSize: 12, color: 'warning.main' }} />
            <Typography variant="caption" sx={{ color: 'warning.main', fontWeight: 500 }}>{alert}</Typography>
          </>
        )}
        {hint && !delta && !alert && (
          <Typography variant="caption" color="textSecondary">{hint}</Typography>
        )}
      </Box>
    </Box>
  )
}

// ── Section card wrapper ──────────────────────────────────────
function SectionCard({ title, children }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        {title && <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>{title}</Typography>}
        {children}
      </CardContent>
    </Card>
  )
}

// ── Staff pie chart ───────────────────────────────────────────
function StaffPieChart({ data }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', pr: '24px' }}>
      <Box sx={{ flexShrink: 0, width: 220, height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={95}
              paddingAngle={1}
              dataKey="value"
              nameKey="name"
            >
              {data.map((_, idx) => (
                <Cell key={idx} fill={ROLE_COLORS[idx % ROLE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value} 人`, name]}
              contentStyle={{ fontSize: 13, borderRadius: 4 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', gap: '24px', ml: '24px' }}>
        {[data.slice(0, 4), data.slice(4)].map((col, colIdx) => (
          <Box key={colIdx} sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {col.map((item) => {
              const idx = data.indexOf(item)
              return (
                <Box key={item.name} className="flex items-center gap-1.5">
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: ROLE_COLORS[idx % ROLE_COLORS.length],
                      flexShrink: 0,
                    }}
                  />
                  <Typography variant="body1">{item.name}</Typography>
                  <Typography variant="body1" color="textSecondary">{item.pct}%</Typography>
                </Box>
              )
            })}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

// ── Role stacked bar (facility cards) ─────────────────────────
function RoleStackedBar({ distribution }) {
  return (
    <Box>
      <Box sx={{ display: 'flex', height: 10, borderRadius: 4, overflow: 'hidden', mb: 1.5 }}>
        {distribution.map((role, idx) => (
          <Box
            key={role.name}
            sx={{ width: `${role.pct}%`, bgcolor: ROLE_COLORS[idx % ROLE_COLORS.length], height: '100%' }}
          />
        ))}
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
        {distribution.map((role, idx) => (
          <Box key={role.name} className="flex items-center gap-1">
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: ROLE_COLORS[idx % ROLE_COLORS.length],
                flexShrink: 0,
              }}
            />
            <Typography variant="caption" color="textSecondary">
              {role.name} {role.pct}%
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

// ── Facility card ─────────────────────────────────────────────
function FacilityCard({ facility }) {
  const { id, name, status, totalStaff, newHired, resigned, roleDistribution } = facility
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
            <Typography variant="caption" color="textSecondary">總員工</Typography>
            <Typography sx={{ fontSize: 22, fontWeight: 500, color: 'rgba(0,0,0,0.87)', lineHeight: 1.3 }}>
              {totalStaff}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="textSecondary">本月入職</Typography>
            <Typography sx={{ fontSize: 22, fontWeight: 500, color: 'rgba(0,0,0,0.87)', lineHeight: 1.3 }}>
              {newHired}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="textSecondary">本月離職</Typography>
            <Typography sx={{ fontSize: 22, fontWeight: 500, color: 'rgba(0,0,0,0.87)', lineHeight: 1.3 }}>
              {resigned}
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 1 }}>
            職類分佈
          </Typography>
          <RoleStackedBar distribution={roleDistribution} />
        </Box>
      </CardContent>
    </Card>
  )
}

// ── Risk alerts ───────────────────────────────────────────────
function RiskAlertsCard() {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>人力風險提示</Typography>
          <Typography variant="caption" color="textSecondary">AI 預測高風險與即時警示</Typography>
        </Box>
        <Box className="flex flex-col gap-2">
          {riskAlerts.map((alert) => (
            <Alert key={alert.key} severity={alert.severity}>
              <AlertTitle sx={{ fontWeight: 500, mb: 0.5 }}>{alert.title}</AlertTitle>
              <Typography variant="body2">{alert.description}</Typography>
            </Alert>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

// ── Residential tab ───────────────────────────────────────────
function ResidentialContent() {
  const { totalStaff, newHired, resigned, resignRate } = residentialSummary
  return (
    <Box className="flex flex-col gap-3">
      <Box sx={{ display: 'flex', gap: 2 }}>
        {[
          { title: '員工總數',   value: totalStaff, unit: '人', hint: '兩間機構合計' },
          { title: '本月新入職', value: newHired,   unit: '人' },
          { title: '本月離職',  value: resigned,   unit: '人', hint: `離職率 ${resignRate}%` },
        ].map((s) => (
          <Box key={s.title} sx={{ flex: 1 }}>
            <SectionStatCard {...s} />
          </Box>
        ))}
      </Box>
      <SectionCard>
        <Grid container spacing={2}>
          {residentialFacilities.map((f) => (
            <Grid key={f.id} size={{ xs: 12, md: 6 }}>
              <FacilityCard facility={f} />
            </Grid>
          ))}
        </Grid>
      </SectionCard>
    </Box>
  )
}

// ── Daycare tab ───────────────────────────────────────────────
function DaycareContent() {
  const { totalStaff, newHired, resigned, resignRate, status } = daycareSummary
  return (
    <Box className="flex flex-col gap-3">
      <Box sx={{ display: 'flex', gap: 2 }}>
        {[
          { title: '員工總數',   value: totalStaff, unit: '人', hint: '兩間機構合計' },
          { title: '本月新入職', value: newHired,   unit: '人' },
          { title: '本月離職',  value: resigned,   unit: '人', hint: `離職率 ${resignRate}%`, alert: status === 'watch' ? '留意異動' : undefined },
        ].map((s) => (
          <Box key={s.title} sx={{ flex: 1 }}>
            <SectionStatCard {...s} />
          </Box>
        ))}
      </Box>
      <SectionCard>
        <Grid container spacing={2}>
          {daycareFacilities.map((f) => (
            <Grid key={f.id} size={{ xs: 12, md: 6 }}>
              <FacilityCard facility={f} />
            </Grid>
          ))}
        </Grid>
      </SectionCard>
    </Box>
  )
}

// ── Homecare tab ──────────────────────────────────────────────
function HomecareContent() {
  const { totalStaff, newHired, newHiredDelta, resigned } = homecareSummary
  return (
    <Box className="flex flex-col gap-3">
      <Box sx={{ display: 'flex', gap: 2 }}>
        {[
          { title: '員工總數',   value: totalStaff, unit: '人', hint: '兩間機構合計' },
          { title: '本月新入職', value: newHired,   unit: '人', delta: newHiredDelta },
          { title: '本月離職',  value: resigned,   unit: '人' },
        ].map((s) => (
          <Box key={s.title} sx={{ flex: 1 }}>
            <SectionStatCard {...s} />
          </Box>
        ))}
      </Box>
      <SectionCard>
        <Grid container spacing={2}>
          {homecareFacilities.map((f) => (
            <Grid key={f.id} size={{ xs: 12, md: 6 }}>
              <FacilityCard facility={f} />
            </Grid>
          ))}
        </Grid>
      </SectionCard>
    </Box>
  )
}

// ── Page ──────────────────────────────────────────────────────
const TABS = [
  { label: '住宿長照', icon: <HotelIcon sx={{ fontSize: 18 }} /> },
  { label: '日間照顧', icon: <WbSunnyIcon sx={{ fontSize: 18 }} /> },
  { label: '居家服務', icon: <HomeIcon sx={{ fontSize: 18 }} /> },
]

const KPI_ICONS = {
  totalStaff: BadgeIcon,
  newHired:   PersonAddIcon,
  resigned:   PersonRemoveIcon,
  licensed:   WorkspacePremiumIcon,
}

export default function Workforce() {
  const [tab, setTab] = useState(0)

  return (
    <Box className="flex flex-col gap-3">
      <Paper sx={{ borderRadius: '8px' }}>
        <Box
          sx={{
            px: 2,
            pt: 2,
            pb: 2,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ lineHeight: 1.2 }}>人力管理</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
              集團人力分佈、人員異動與風險監控
            </Typography>
          </Box>
          <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5, flexShrink: 0 }}>
            {workforceReportDate}
          </Typography>
        </Box>
      </Paper>

      <Grid container spacing={2}>
        {kpis.map((kpi) => (
          <Grid key={kpi.key} size={{ xs: 6, sm: 3 }}>
            <KpiCard
              title={kpi.title}
              value={kpi.value}
              unit={kpi.unit}
              delta={kpi.delta}
              hint={kpi.hint}
              icon={KPI_ICONS[kpi.key]}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <SectionCard title="集團各專業人力佔比">
            <StaffPieChart data={staffDistribution} />
          </SectionCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <RiskAlertsCard />
        </Grid>
      </Grid>

      <Paper sx={{ borderRadius: '8px' }}>
        <Box sx={{ px: 2, pt: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>依機構類型人力分析</Typography>
        </Box>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{
            px: 1,
            mt: 1,
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
        <Box sx={{ p: 2 }}>
          {tab === 0 && <ResidentialContent />}
          {tab === 1 && <DaycareContent />}
          {tab === 2 && <HomecareContent />}
        </Box>
      </Paper>
    </Box>
  )
}
