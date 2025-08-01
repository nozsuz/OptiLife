import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Box, CssBaseline, Drawer, AppBar, Toolbar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, ThemeProvider, useTheme, useMediaQuery, IconButton, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import SettingsIcon from '@mui/icons-material/Settings';

import theme from './theme';
import DisclaimerModal from './components/DisclaimerModal';
import Dashboard from './components/Dashboard';
import ReportPage from './components/ReportPage';
import PlanPage from './components/PlanPage';
import BookingPage from './components/BookingPage';
import SettingsPage from './components/SettingsPage';
import './App.css';

const drawerWidth = 240;

const menuItems = [
  { text: 'ダッシュボード', icon: <DashboardIcon />, path: '/' },
  { text: '診断レポート', icon: <AssessmentIcon />, path: '/report' },
  { text: 'パーソナルプラン', icon: <EventNoteIcon />, path: '/plan' },
];

const secondaryMenuItems = [
  { text: 'オンライン予約', icon: <BookOnlineIcon />, path: '/booking' },
  { text: '設定', icon: <SettingsIcon />, path: '/settings' },
];

const DrawerContent = ({ handleDrawerToggle }) => {
    const location = useLocation();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleLinkClick = () => {
        if (isMobile) {
            handleDrawerToggle();
        }
    };

    return (
        <div>
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton component={Link} to={item.path} selected={location.pathname === item.path} onClick={handleLinkClick}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {secondaryMenuItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton component={Link} to={item.path} selected={location.pathname === item.path} onClick={handleLinkClick}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </div>
    );
};


function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const disclaimerShown = localStorage.getItem('disclaimerShown');
    if (!disclaimerShown) {
      setShowDisclaimer(true);
    }
  }, []);

  const handleDisclaimerClose = () => {
    localStorage.setItem('disclaimerShown', 'true');
    setShowDisclaimer(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <DisclaimerModal open={showDisclaimer} handleClose={handleDisclaimerClose} />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { md: 'none' } }}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">OptiLife 2.0</Typography>
            </Toolbar>
          </AppBar>
          <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
            <Drawer
              variant={isMobile ? "temporary" : "permanent"}
              open={isMobile ? mobileOpen : true}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }}
              sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
            >
              <DrawerContent handleDrawerToggle={handleDrawerToggle} />
            </Drawer>
          </Box>
          <Box component="main" sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}>
            <Toolbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/plan" element={<PlanPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;