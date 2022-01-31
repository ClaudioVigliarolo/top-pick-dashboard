import React from "react";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import { Link, useLocation } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { COLORS } from "../../constants/Colors";
import { routes } from "../routes";
import {
  createStyles,
  LinearProgress,
  makeStyles,
  MenuItem,
  Theme,
  withStyles,
} from "@material-ui/core";
import LanguageSelect from "../../components/select/LanguageSelect";
import HeaderSection from "../../components/layout/HeaderSection";
import { getCondition } from "..";
import { logoutUser } from "../../services/api";
import { Lang } from "src/interfaces/Interfaces";
import { refreshPage } from "src/utils/utils";
import { CONSTANTS } from "src/constants/constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    exitToApp: {
      color: COLORS.menuIcon,
    },
    menu: {
      display: "flex",
    },
    languageSelectContainer: {
      position: "absolute",
      right: 20,
      top: 0,
    },
    appBar: {
      width: `calc(100% - ${CONSTANTS.DRAWER_WIDTH}px)`,
      marginLeft: CONSTANTS.DRAWER_WIDTH,
      backgroundColor: "#fff",
      color: COLORS.primaryOrange,
    },
    drawer: {
      width: CONSTANTS.DRAWER_WIDTH,
      flexShrink: 0,
    },
    drawerItem: {
      color: COLORS.menuText,
      textTransform: "uppercase",
      fontWeight: "bolder",
      float: "left",
    },
    childrenContainer: {
      paddingTop: 100,
      backgroundColor: COLORS.primaryBackground,
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      minHeight: "100vh",
      width: "100%",

      "@media (max-width: 500px)": {
        padding: 100,
        width: "200%",
      },
    },

    drawerPaper: {
      width: CONSTANTS.DRAWER_WIDTH,
      background: COLORS.menuContainer,
      color: "#fff",
    },

    toolbar: theme.mixins.toolbar,
  })
);

const StyledLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: COLORS.lighterOrange,
  },
  barColorPrimary: {
    backgroundColor: COLORS.darkerOrange,
  },
})(LinearProgress);

export default function PersistentDrawerLeft({
  children,
  userType,
  isAuthenticated,
  token,
  username,
  languages,
  setCurrentLanguage,
  currentLanguage,
  loading,
}: {
  children: React.ReactNode;
  userType: string;
  isAuthenticated: boolean;
  token: string;
  username: string;
  languages: Lang[];
  setCurrentLanguage: (newLang: Lang) => void;
  currentLanguage: Lang;
  loading: boolean;
}) {
  const [path, setPath] = React.useState("");
  const classes = useStyles();
  const location = useLocation();

  React.useEffect(() => {
    setPath(location.pathname);
  }, [location, setPath]);

  const activetRoute = (route: string) => {
    return route === path;
  };

  const getRouteName = (path: string) => {
    if (loading) {
      return "Please wait...";
    }
    if (getCondition(userType, path, isAuthenticated)) {
      const route = routes.find((route) => route.path == path);
      if (route) {
        return route.navbarName;
      }
    }
    return "Error: 404";
  };

  return (
    <div className={classes.menu}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            TOP Pick
          </Typography>
          {isAuthenticated && (
            <div className={classes.languageSelectContainer}>
              <LanguageSelect
                languages={languages}
                currentLanguage={currentLanguage}
                onLanguageChange={setCurrentLanguage}
              />
            </div>
          )}
        </Toolbar>
        {loading && <StyledLinearProgress />}
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {routes.map(
            (prop: any, key: number) =>
              getCondition(userType, prop.path, isAuthenticated) && (
                <Link
                  to={prop.path}
                  style={{ textDecoration: "none" }}
                  key={key}
                >
                  <MenuItem selected={activetRoute(prop.path)}>
                    <ListItemText
                      className={classes.drawerItem}
                      primary={prop.sidebarName}
                    />
                  </MenuItem>
                </Link>
              )
          )}
        </List>
        <Divider />
        <Divider />
        <List>
          {isAuthenticated && (
            <ListItem
              button
              onClick={() => {
                logoutUser(token);
                localStorage.removeItem("token");
                localStorage.removeItem("language");
                refreshPage();
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon className={classes.exitToApp} />
              </ListItemIcon>
              (
              <ListItemText primary="logout" className={classes.drawerItem} />)
            </ListItem>
          )}
        </List>
      </Drawer>
      <div className={classes.childrenContainer}>
        <HeaderSection title={getRouteName(path)} />
        {children}
      </div>
    </div>
  );
}
