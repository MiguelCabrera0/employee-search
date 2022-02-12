import {
    AppBar, Box, Button, CssBaseline, Drawer, List, ListItem, ListItemText, Menu, Toolbar, Typography,
    MenuItem, ListItemIcon, IconButton, Tooltip
} from "@mui/material";
import Logout from '@mui/icons-material/Logout';
import SvgIcon from '@mui/material/SvgIcon';
import { Route, Routes, useNavigate } from "react-router-dom";
import React from "react";
import { Searchpage } from "./Pages/Searchpage";
import { Home } from "./Pages/Home";

function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

const drawerWidth = 240;
export const Navigation = ({ auth, user }) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logout = () => {
        auth("", false);
        navigate("/");
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton aria-label="Home" onClick={() => navigate("/Home")}>
                        <HomeIcon  color="action" fontSize="large"/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <Tooltip title="Account settings">
                            <Button color="inherit" onClick={handleClick}>{user}</Button>
                        </Tooltip>
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}>
                        <MenuItem onClick={logout}><ListItemIcon><Logout /></ListItemIcon>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItem button key="Employees" onClick={() => navigate("Employees")}>
                            <ListItemText primary="Employees" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Routes>
                    <Route path="/Employees" element={<Searchpage />} />
                    <Route path="/*" element={<Home />} />
                </Routes>
            </Box>
        </Box>
    );
}