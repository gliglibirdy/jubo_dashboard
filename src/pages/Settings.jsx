import { Typography, Box, Card, CardContent } from '@mui/material'

export default function Settings() {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        系統設定
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            待開發：使用者、角色、機構設定。
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
