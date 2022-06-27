import React, { Component } from "react";
import authApi from "api/AuthApi";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

import BranchDetail from "views/branch/BranchDetail";
import ServiceDetail from "views/service/ServiceDetail";
import DoctorDetail from "views/Pages/dbs-page/detail-page/DoctorDetail";
import ServiceDetailPage from "views/Pages/dbs-page/ServiceDetailPage";
import NewBranchPage from "views/Pages/dbs-page/Add-page/NewBranchPage";
import NewServiceTypePage from "views/Pages/dbs-page/Add-page/NewServiceTypePage";
import NewServicePage from "views/Pages/dbs-page/Add-page/NewServicePage";
import NewDiscountPage from "views/Pages/dbs-page/Add-page/NewDiscountPage";
import NewDoctorPage from "views/Pages/dbs-page/Add-page/NewDoctorPage";
import StaffHome from "views/Pages/staff-page/StaffHome";
import Staff from "layouts/Staff";
import { ToastContainer } from "react-bootstrap";
import "./App.css";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: undefined,
      showAdminBoard: false,
      showLoginPage: true,
    };
  }

  componentDidMount() {
    const user = authApi.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: true,
        showLoginPage: false,
      });
    }
  }

  logOut() {
    authApi.logout();
  }

  render() {
    const { currentUser, showAdminBoard, showLoginPage } = this.state;
    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <BrowserRouter>
          <Switch>
            <Route
              path="/admin"
              render={(props) => {
                return <AdminLayout {...props} />;
              }}
            />
            <Route
              path="/auth"
              render={(props) => {
                // return <AuthLayout {...props, user= currentUser} />;
                return <AuthLayout {...props} />;
              }}
            />

            <Route
              path="/staff"
              render={(props) => {
                // return <AuthLayout {...props, user= currentUser} />;
                return <Staff {...props} />;
              }}
            />

            <Route path="/branch/:id" children={<BranchDetail />} />
            <Route path="/service/:id" children={<ServiceDetail />} />
            {/* <Route path="/service/:id" children={<ServiceDetail />} /> */}
            {/* <Route path="/service/:id" children={<ServiceDetailPage />} /> */}
            <Route path="/doctor/:id" children={<DoctorDetail />} />

            <Route path="/branchs/add" children={<NewBranchPage />} />
            <Route path="/service-type/add" children={<NewServiceTypePage />} />
            <Route path="/services/add" children={<NewServicePage />} />
            <Route path="/discounts/add" children={<NewDiscountPage />} />
            <Route path="/doctors/add" children={<NewDoctorPage />} />
            {/* <Redirect to="/auth/login-page" /> */}
            {/* {showAdminBoard && <Redirect to="/admin/dashboard" />} */}
            {showLoginPage && <Redirect to="/auth/login-page" />}
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
