import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Divider, IconButton, List } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";

import React from "react";
import {
  AdbSharp,
  Category,
  CategoryTwoTone,
  Group,
  Home,
  Loop,
  MarkEmailReadOutlined,
  NotificationAdd,
  RequestPage,
  VerifiedUser,
} from "@mui/icons-material";
import Link from "../src/Link";
import { blue, green, pink, red, yellow } from "@mui/material/colors";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

type props = {
  open: boolean;
  handleDrawerClose: () => void;
};

const menu = [
  {
    name: "Dashboard",
    icon: <Home sx={{ color: "crimson" }} />,
    to: "/",
  },
  {
    name: "Home Category",
    icon: <Category sx={{ color: blue[700] }} />,
    to: "/home/categories",
  },
  {
    name: "Recycle Category",
    icon: <Category sx={{ color: red[700] }} />,
    to: "/recycle/category",
  },
  {
    name: "Recyclers",
    icon: <Loop sx={{ color: yellow[700] }} />,
    to: "/recyclers",
  },

  {
    name: "Users",
    icon: <VerifiedUser sx={{ color: green[700] }} />,
    to: "/users",
  },
  {
    name: "Adverts",
    icon: <MarkEmailReadOutlined sx={{ color: pink[700] }} />,
    to: "/adverts",
  },

  {
    name: "Notification",
    icon: <NotificationAdd sx={{ color: "black" }} />,
    to: "/notifications",
  },
];

const SideNav = ({ open, handleDrawerClose }: props) => {
  const theme = useTheme();
  return (
    <>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <p>Menu</p>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menu.map((item, index) => (
            <Link key={index} href={item.to} color="MenuText" underline="none">
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default SideNav;
