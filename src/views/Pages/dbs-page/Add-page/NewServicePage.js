import ImageUpload from "components/CustomUpload/ImageUpload";
import AdminNavbar from "components/Navbars/AdminNavbar";
import PanelHeader from "components/PanelHeader/PanelHeader";
import { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Button, CardBody, Col, Form, FormGroup, Row } from "reactstrap";
import Select from "react-select";
import serviceTypeApi from "api/serviceTypeApi";

class NewServicePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      service_type_id: -1,
      name: "",
      description: "",
      min_price: 100000,
      max_price: 100000,
      url: "",
      status: 1,
      service_type: {label: "Choose a service type", value: -1},
      service_type_list: []
    };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.onHandleSelect = this.onHandleSelect.bind(this);
  }

  componentDidMount(){
    this.getServiceTypeList();
  }
 
  getServiceTypeList =  async () => {
    try{
      await serviceTypeApi.getAll().then((res) => {
        this.setState({
          service_type_list: res.map((service_type) => ({
            label: service_type.name,
            value: service_type.id 
          }))
        })
      })
    }catch (err){
      console.log("Cant get service type list", err);
    }
  }

  onHandleSelect(event) {
    console.log(event);
    this.setState({
      service_type: event,
    });
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
    console.log(this.state);
  }
  render() {
    return (
      <>
        {/* <AdminNavbar brandText="Service Detail" link="/admin/services" /> */}

        <AdminNavbar brandText="Dashboard" link="/admin/services" />
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
                  <div className="col-md-4">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                      <ImageUpload />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="p-3 py-5">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="text-right">Service Information</h4>
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-12">
                          <label className="labels">Service Name*</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Service name"
                            name="name"
                            value={this.state.name}
                            onChange={this.onHandleChange}
                          />
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-12">
                          <div class="form-group">
                            <div className="row mt-2">
                              <div className="col-md-6">
                                <label className="labels">Service Type*</label>
                                <Select
                                  className="react-select primary"
                                  classNamePrefix="react-select"
                                  placeholder="Select province"
                                  name="province"
                                  value={this.state.service_type}
                                  options={this.state.service_type_list}
                                  onChange={this.onHandleSelect}
                                />
                                {/* {errors.province && (
                            <div
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {errors.province}
                            </div>
                          )} */}
                              </div>
                            </div>
                          </div>
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
      </>
    );
  }
}

export default NewServicePage;
