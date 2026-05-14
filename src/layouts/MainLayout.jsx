import { useState } from 'react'
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom'
import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import SpeedIcon from '@mui/icons-material/Speed'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import Logo from '@/components/Logo'

const RAIL_WIDTH = 72
const DRAWER_WIDTH = 256
const APPBAR_HEIGHT = 64

const navGroups = [
  {
    label: '集團總部',
    items: [
      { label: '首頁總覽', to: '/', icon: <DashboardIcon /> },
      { label: '產能管理', to: '/capacity', icon: <SpeedIcon /> },
      { label: '人力管理', to: '/workforce', icon: <PeopleIcon /> },
      { label: '日照中心', to: '/daycare', icon: <WbSunnyIcon /> },
    ],
  },
]

const allItems = navGroups.flatMap((g) => g.items)

function isItemSelected(pathname, to) {
  if (to === '/') return pathname === '/'
  return pathname.startsWith(to)
}

function RailItem({ item, selected, onClick }) {
  return (
    <Tooltip title={item.label} placement="right">
      <ListItemButton
        component={RouterLink}
        to={item.to}
        onClick={onClick}
        sx={{
          width: RAIL_WIDTH,
          height: 72,
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          px: 0,
          py: 1,
          borderRadius: 0,
          '&:hover': { backgroundColor: 'rgba(0,151,167,0.08)' },
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 32,
            borderRadius: '16px',
            backgroundColor: selected ? '#C5F0F7' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#005F64',
            transition: 'background-color 160ms ease',
          }}
        >
          {item.icon}
        </Box>
        <Typography
          variant="caption"
          sx={{
            color: '#005F64',
            fontWeight: selected ? 500 : 400,
            lineHeight: 1.2,
          }}
        >
          {item.label}
        </Typography>
      </ListItemButton>
    </Tooltip>
  )
}

function DrawerItem({ item, selected, onClick }) {
  return (
    <ListItemButton
      component={RouterLink}
      to={item.to}
      onClick={onClick}
      sx={{
        height: 48,
        px: 2,
        gap: 2,
        backgroundColor: selected ? '#C5F0F7' : 'transparent',
        '&:hover': {
          backgroundColor: selected ? '#C5F0F7' : 'rgba(0,151,167,0.08)',
        },
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 24,
          color: '#005F64',
        }}
      >
        {item.icon}
      </ListItemIcon>
      <ListItemText
        primary={item.label}
        slotProps={{
          primary: {
            variant: 'body1',
            sx: {
              color: '#005F64',
              fontWeight: selected ? 500 : 400,
            },
          },
        }}
      />
    </ListItemButton>
  )
}

export default function MainLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const location = useLocation()

  return (
    <Box className="flex min-h-screen" sx={{ backgroundColor: '#EAF3F5' }}>
      <AppBar
        position="fixed"
        sx={{ height: APPBAR_HEIGHT, justifyContent: 'center', zIndex: 1200 }}
      >
        <Toolbar sx={{ minHeight: APPBAR_HEIGHT }}>
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ color: '#37474F' }}
            aria-label="open navigation"
          >
            <MenuIcon />
          </IconButton>

          <Box className="flex items-center gap-3" sx={{ ml: 2 }}>
            <Logo />
            <Typography
              variant="h6"
              sx={{ color: '#37474F', fontWeight: 500 }}
              component="div"
            >
              長照集團
            </Typography>
          </Box>

          <Box sx={{ flex: 1 }} />

          <Box className="flex items-center gap-2">
            <Typography
              variant="body1"
              sx={{ color: '#546E7A', display: { xs: 'none', sm: 'block' } }}
            >
              總部管理員
            </Typography>
            <IconButton aria-label="account" sx={{ mr: -1 }}>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: '#005F64',
                  fontSize: 14,
                }}
              >
                管
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { xs: 0, sm: RAIL_WIDTH }, flexShrink: 0 }}
        aria-label="primary navigation rail"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            width: RAIL_WIDTH,
            '& .MuiDrawer-paper': {
              width: RAIL_WIDTH,
              boxSizing: 'border-box',
              top: APPBAR_HEIGHT,
              height: `calc(100% - ${APPBAR_HEIGHT}px)`,
            },
          }}
          open
        >
          <List sx={{ p: 0 }}>
            {allItems.map((item) => (
              <RailItem
                key={item.to}
                item={item}
                selected={isItemSelected(location.pathname, item.to)}
              />
            ))}
          </List>
        </Drawer>
      </Box>

      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            top: APPBAR_HEIGHT,
            height: `calc(100% - ${APPBAR_HEIGHT}px)`,
          },
        }}
      >
        <Box sx={{ pt: 1 }}>
          {navGroups.map((group) => (
            <Box key={group.label} sx={{ mb: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  color: '#546E7A',
                  px: 2,
                  pt: 2,
                  pb: 0.5,
                }}
              >
                {group.label}
              </Typography>
              <List sx={{ p: 0 }}>
                {group.items.map((item) => (
                  <DrawerItem
                    key={item.to}
                    item={item}
                    selected={isItemSelected(location.pathname, item.to)}
                    onClick={() => setDrawerOpen(false)}
                  />
                ))}
              </List>
            </Box>
          ))}
        </Box>
      </Drawer>

      <Box
        component="main"
        className="flex-1"
        sx={{
          pt: `${APPBAR_HEIGHT}px`,
          px: 2,
          pb: 2,
          minHeight: '100vh',
          width: { xs: '100%', sm: `calc(100% - ${RAIL_WIDTH}px)` },
        }}
      >
        <Box sx={{ pt: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
