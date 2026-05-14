import { Box, Card, CardContent, Typography } from '@mui/material'
import { green } from '@mui/material/colors'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

export default function StatCard({ title, value, unit, hint, delta, icon }) {
  const deltaColor = delta?.isWarning
    ? 'warning.main'
    : delta?.dir === 'flat'
      ? 'text.secondary'
      : green[500]
  const DeltaIcon = delta?.dir === 'up' ? ArrowUpwardIcon : ArrowDownwardIcon

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box className="flex items-start justify-between">
          <Typography variant="body1">
            {title}
          </Typography>
          {icon && (
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
                '& svg': { fontSize: 20 },
              }}
            >
              {icon}
            </Box>
          )}
        </Box>

        <Box className="mt-3 flex items-baseline gap-1">
          <Typography
            sx={{
              fontSize: 32,
              fontWeight: 500,
              lineHeight: 1.2,
              color: 'text.primary',
              letterSpacing: 0,
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
          {delta && (
            <Box
              className="flex items-center gap-0.5"
              sx={{ color: deltaColor }}
            >
              <DeltaIcon sx={{ fontSize: 14 }} />
              <Typography
                variant="caption"
                sx={{ color: deltaColor, fontWeight: 500 }}
              >
                {delta.text}
              </Typography>
            </Box>
          )}
          {hint && (
            <Typography variant="caption" color="textSecondary">
              {hint}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}
