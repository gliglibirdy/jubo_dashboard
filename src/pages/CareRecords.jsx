import { Typography, Box, Card, CardContent } from '@mui/material'

export default function CareRecords() {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        照護紀錄
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            待開發：照護紀錄列表、表單、時間軸。
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
