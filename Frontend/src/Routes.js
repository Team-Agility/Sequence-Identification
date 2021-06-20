import React, { useEffect, useState } from "react";
import {
  Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import DashBoard from "./Components/Dashboard/Dashboard";
import SiteLayout from "./Components/Layout/Layout";
import { logout } from "./Services/UserLoginService";

import { notification } from "antd";
import Login from "./modules/auth/Login"
import history from "./_helpers/history";
import Inputs from "./modules/projects/Inputs";
import List from "./modules/projects/List";
import Process from "./modules/projects/Process";

function CheckLogOnStatus() {
  let token = localStorage.getItem("token");
  if (token) {
    return true;
  } else {
    return false;
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      logout();
      history.push("/login", { directLogin: false });
      notification.info({
        message: "Token expired!",
        description: "Login to continue",
      });
    }, 1000 * 60 * 59);
    return () => clearTimeout(timer);
  }, []);

  // const [auth,setAuth] = useState(null);
  // useEffect(()=>{
  //     const isLoggedIn = CheckLogOnStatus();
  //     setAuth(isLoggedIn);
  // },[auth]);

  return (
    <Route
      {...rest}
      render={(props) =>
        CheckLogOnStatus ? (
          <SiteLayout>
            <Component {...props} />
          </SiteLayout>
        ) : (
          <Redirect
            to={{
              pathname: "/dashboard",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const Routes = () => {
  let basePath = "/Admin";

  return (
    <Router history={history}>
      <Switch>
        {/* <Route path="/login" component={Login} /> */}
        <Route path="/login" component={Login} />

        <PrivateRoute path="/dashboard" component={DashBoard} />
        <PrivateRoute path="/inputs" component={Inputs} />
        <PrivateRoute path="/output/:id" component={Process} />
        <PrivateRoute path="/output" component={List} />

        <PrivateRoute exact path="/" component={DashBoard} />
        <Route exact path="/" component={DashBoard} />
      </Switch>
    </Router>
  );
};

export default Routes;
