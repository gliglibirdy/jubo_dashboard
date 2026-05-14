import { Typography, Box, Card, CardContent } from '@mui/material'

export default function Residents() {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        住民管理
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            待開發：住民列表、搜尋、篩選、新增 / 編輯。
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
