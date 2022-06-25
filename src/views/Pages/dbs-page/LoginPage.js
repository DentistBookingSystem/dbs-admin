/*!

=========================================================
* Now UI Dashboard PRO React - v1.5.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Form,
  Container,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
} from "reactstrap";
import { Redirect, useHistory } from "react-router-dom";
// core components
import nowLogo from "assets/img/logo-rade2.png";

import bgImage from "assets/img/dentist-office.jpg";
import authApi from "api/AuthApi";

function LoginPage() {
  const [phoneFocus, setfirstnameFocus] = React.useState(false);
  const [passwordFocus, setlastnameFocus] = React.useState(false);

  const initialValue = { phone: "", password: "" };
  const [formValue, setFormValue] = React.useState(initialValue);
  const [stateLogin, setStateLogin] = React.useState(false);
  const history = useHistory();
  const notificationAlert = React.useRef();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    // console.log(formValue.phone);
  };

  const login = async () => {
    try {
      await authApi.login(formValue).then((result) => {
        const user = sessionStorage.getItem("user");
        console.log("user token: ", user);
        // console.log("session account", sessionStorage.getItem("role"));
        const role = sessionStorage.getItem("role");
        if (user !== null) {
          setStateLogin(true);
          var options = {};
          options = {
            place: "tr",
            message: "Login successfully",
            type: "info",
            icon: "now-ui-icons ui-1_bell-53",
            autoDismiss: 7,
          };
          notificationAlert.current.notificationAlert(options);
        } else {
          setStateLogin(false);
          var options = {};
          options = {
            place: "tr",
            message: "Login failed",
            type: "info",
            icon: "now-ui-icons ui-1_bell-53",
            autoDismiss: 7,
          };
        }
      });
    } catch (error) {
      setStateLogin(false);
      console.log("Can not Login>>>>>", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    //validate
  };
  React.useEffect(() => {
    document.body.classList.add("login-page");
    return function cleanup() {
      document.body.classList.remove("login-page");
    };
  }, []);
  return stateLogin ? (
    sessionStorage.getItem("role") === "ROLE_ADMIN" ? (
      <Redirect to="/admin/dashboard" />
    ) : sessionStorage.getItem("role") === "ROLE_STAFF" ? (
      <Redirect to="/staff/home" />
    ) : (
      <Redirect to="/auth/login-page" />
    )
  ) : (
    <>
      <div className="content">
        <div className="login-page">
          <Container>
            <Col xs={12} md={8} lg={4} className="ml-auto mr-auto">
              <Form onSubmit={handleSubmit}>
                <Card className="card-login card-plain">
                  <CardHeader>
                    <div className="logo-container">
                      <img src={nowLogo} alt="now-logo" />
                    </div>
                  </CardHeader>
                  <CardBody>
                    <InputGroup
                      className={
                        "no-border form-control-lg " +
                        (phoneFocus ? "input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons tech_mobile" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        name="phone"
                        placeholder="Phone number..."
                        onFocus={(e) => setfirstnameFocus(true)}
                        onBlur={(e) => setfirstnameFocus(false)}
                        value={formValue.phone}
                        onChange={handleChange}
                      />
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border form-control-lg " +
                        (passwordFocus ? "input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons objects_key-25" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Password..."
                        onFocus={(e) => setlastnameFocus(true)}
                        onBlur={(e) => setlastnameFocus(false)}
                        name="password"
                        value={formValue.password}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </CardBody>
                  <CardFooter>
                    <Button
                      type="submit"
                      block
                      color="info"
                      size="lg"
                      href="#pablo"
                      className="mb-3 btn-round"
                      onClick={handleSubmit}
                    >
                      Login
                    </Button>
                  </CardFooter>
                </Card>
              </Form>
            </Col>
          </Container>
        </div>
      </div>
      <div
        className="full-page-background"
        style={{ backgroundImage: "url(" + bgImage + ")" }}
      />
    </>
  );
}

export default LoginPage;
