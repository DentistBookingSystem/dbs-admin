import discountApi from "api/discountApi";
import serviceApi from "api/serviceApi";
import AdminNavbar from "components/Navbars/AdminNavbar";
import PanelHeader from "components/PanelHeader/PanelHeader";
import moment from "moment";
import { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Select from "react-select";
import { Button, Col, Form, Row } from "reactstrap";
import Validator from "utils/validation/validator";
import NotificationAlert from "react-notification-alert";

var options = {};
options = {
  place: "tr",
  message: (
    <div>
      <div>
        Successfully add new <b>Service Type</b>
      </div>
    </div>
  ),
  type: "success",
  icon: "now-ui-icons ui-1_bell-53",
  autoDismiss: 4,
};

class NewDiscountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: 222,
      url: "",
      address: "",
      startDate: "",
      endDate: "",
      percentage: 10.0,
      currentService: [],
      serviceList: [],
      errors: [],
    };

    const rules = [];

    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.onHandleServiceSelect = this.onHandleServiceSelect.bind(this);
    this.CustomDate = this.CustomDate.bind(this);
    this.validator = new Validator(rules);
    this.notify = this.notify.bind(this);
  }

  componentDidMount() {
    this.getServiceList();
  }

  CustomDate = () => {
    var today, dd, mm, yyyy;
    today = new Date();
    dd = today.getDate() + 1;
    mm = today.getMonth() + 1;
    yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };
  notify() {
    this.refs.notify.notificationAlert(options);
  }

  getServiceList = async () => {
    try {
      await serviceApi.getServiceList().then((res) => {
        if (res == null) return;
        this.setState({
          serviceList: res.map((service) => ({
            label: service.name,
            value: service.id,
          })),
        });
      });
    } catch (error) {
      console.log("Fetch service list failed", error);
    }
  };

  _inserDiscount = async (data) => {
    var result = false;
    try {
      await discountApi.insert(data).then((res) => {
        console.log("res discount: ", res);
        result = true;
      });
    } catch (error) {
      console.log("can not add errr", error);
    } finally {
      return result;
    }
  };

  onHandleServiceSelect(event) {
    this.setState({
      currentService: event,
    });
    console.log("SS: ", this.state.currentService);
  }

  onHandleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    console.log(">Type: ", target.value);
    this.setState({
      [name]: value,
    });
  }
  onHandleSubmit(event) {
    event.preventDefault();
    if (true) {
      const data = {
        discountDTO: {
          name: this.state.name,
          percentage: this.state.percentage,
          description: this.state.description,
          status: 1,
          startDate: this.state.startDate,
          endDate: this.state.endDate,
        },
        serviceIDList: this.state.currentService.map(
          (service) => service.value
        ),
      };
      console.log("data: ",data);
      const result = this._inserDiscount(data);
      if (result) {
        this.notify();
      }
    }
    console.log(this.state.currentService);
  }
  render() {
    const yesterday = moment().subtract(1, "day");
    const today = new Date().getDate();
    const constraintDay = moment().add(30, "day");
    const disablePastDt = (current) => {
      return current.isAfter(yesterday);
    };
    const dayMin = new Date().toISOString();
    return (
      <>
        {/* <AdminNavbar brandText="Service Detail" link="/admin/services" /> */}

        <AdminNavbar brandText="Dashboard" link="/admin/discounts" />
        <PanelHeader size="sm">
          <Col xs={0.5} md={0.5}>
            <Link to="/admin/services">
              <Button className="btn-icon" color="primary" size="sm">
                <i className="fas fa-angle-double-left"></i>
              </Button>
            </Link>
          </Col>
        </PanelHeader>

        <div className="content">
          <Form>
            <Row>
              <div className="container rounded bg-white mt-20 mb-5 ml-20">
                <div className="row">
                  <div className="col-md-8">
                    <div className="p-3 py-5">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="text-right">Discount Information</h4>
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-12">
                          <label className="labels">Discount Name*</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Branch name"
                            name="name"
                            value={this.state.name}
                            onChange={this.onHandleChange}
                          />
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-6">
                          <label className="labels">Start date*</label>
                          <input
                            type="Date"
                            className="form-control"
                            placeholder="Address"
                            name="startDate"
                            value={this.state.startDate}
                            onChange={this.onHandleChange}
                            is
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="labels">End date*</label>
                          <input
                            type="Date"
                            className="form-control"
                            placeholder="Address"
                            name="endDate"
                            value={this.state.endDate}
                            // min={new Date().getDate()}
                            min={new Date().toISOString().slice(0, -8)}
                            onChange={this.onHandleChange}
                          />
                          {/* <ReactDatePicker
                          className="form-control"
                            selected={new Date()}
                            onChange={this.onHandleChange}
                            minDate={moment().toDate()}
                            
                          /> */}
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-12">
                          <label className="labels">Service*</label>
                          <Select
                            className="react-select primary"
                            classNamePrefix="react-select"
                            placeholder="Select province"
                            name="province"
                            isMulti
                            value={this.state.currentService}
                            options={this.state.serviceList}
                            onChange={this.onHandleServiceSelect}
                          />
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-12">
                          <label className="labels">Description*</label>
                          <textarea
                            className="form-control"
                            name="description"
                            value={this.state.description}
                            onChange={this.onHandleChange}
                            rows="5"
                          ></textarea>
                        </div>
                      </div>
                      <div className="row mt-4 ml-10">
                        <button
                          className="btn btn-info profile-button"
                          type="button"
                          onClick={this.onHandleSubmit}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Row>
          </Form>
        </div>
        <div>
          <NotificationAlert
            ref="notify"
            zIndex={9999}
            onClick={() => console.log("hey")}
          />
        </div>
      </>
    );
  }
}

export default NewDiscountPage;
