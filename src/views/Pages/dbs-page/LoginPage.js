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
  Toast,
} from "reactstrap";
import { Redirect, useHistory } from "react-router-dom";
// core components
import nowLogo from "assets/img/logo-rade2.png";

import bgImage from "assets/img/dentist-office.jpg";
import authApi from "api/AuthApi";
import NotificationAlert from "react-notification-alert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        // toast.notify("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        window.location.reload();
        if (user !== null) {
          setStateLogin(true);
        } else {
          setStateLogin(false);
        }
      });
    } catch (error) {
      setStateLogin(false);
      toast.warn("login failed trong login page");
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
  return sessionStorage.getItem("user") !== null ? (
    sessionStorage.getItem("role") === "ROLE_ADMIN" ? (
      <Redirect to="/admin/dashboard" />
    ) : sessionStorage.getItem("role") === "ROLE_STAFF" ? (
      <Redirect to="/staff/home" />
    ) : (
      <Redirect to="/admin/login-page" />
    )
  ) : (
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
      <NotificationAlert ref={notificationAlert} />
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
