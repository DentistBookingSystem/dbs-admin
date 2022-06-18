import ImageUpload from "components/CustomUpload/ImageUpload";
import AdminNavbar from "components/Navbars/AdminNavbar";
import PanelHeader from "components/PanelHeader/PanelHeader";
import { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Button, CardBody, Col, Form, FormGroup, Row } from "reactstrap";

class NewDiscountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: 222,
      url: "",
      address:""
    };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }
  onHandleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === "select-one" ? JSON.parse(target.value) : target.value;
    console.log(">Type: ", target.value)
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

        <AdminNavbar brandText="Dashboard" link="/admin/branchs" />
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
                        <h4 className="text-right">Branch Information</h4>
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
                            name="address"
                            value={this.state.address}
                            onChange={this.onHandleChange}
                          />                        
                        </div>
                        <div className="col-md-6">
                          <label className="labels">End date*</label>
                          <input
                            type="Date"
                            className="form-control"
                            placeholder="Address"
                            name="address"
                            value={this.state.address}
                            onChange={this.onHandleChange}
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
      </>
    );
  }
}

export default NewDiscountPage;
