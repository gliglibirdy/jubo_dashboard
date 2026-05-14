import { Box, Typography, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export default function NotFound() {
  return (
    <Box className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <Typography variant="h3" sx={{ fontWeight: 700 }}>
        404
      </Typography>
      <Typography color="textSecondary">找不到此頁面</Typography>
      <Button component={RouterLink} to="/" variant="contained">
        回到總覽
      </Button>
    </Box>
  )
}
