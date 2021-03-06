import AdminNavbar from "components/Navbars/AdminNavbar";
import PanelHeader from "components/PanelHeader/PanelHeader";
import { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Col, Form, Row } from "reactstrap";
import Select from "react-select";
import serviceTypeApi from "api/serviceTypeApi";
import serviceApi from "api/serviceApi";
import Validator from "utils/validation/validator";
import defaultImage from "assets/img/image_placeholder.jpg";

class NewServicePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      service_type_id: -1,
      name: "",
      description: "",
      min_price: { label: "Choose min price", value: -1 },
      max_price: { label: "Choose max price", value: -1 },
      url: "",
      status: 1,
      selectMinPrice: false,
      service_type: { label: "Choose a service type", value: -1 },
      service_type_list: [],
      listMinPrice: [{ label: "Choose min price" }],
      listMaxPrice: [{ label: "Choose max price" }],
      image: null,
      imagePreviewUrl: defaultImage,
      errors: {},
    };

    const rules = [
      {
        field: "name",
        method: "isLength",
        args: [{ min: 1 }],
        validWhen: true,
        message: "The name field is required.",
      },
      {
        field: "service_type",
        method: this.validDropdownServiceType,
        validWhen: true,
        fieldValue: this.state.service_type,
        message: "Please choose a province",
      },
      {
        field: "min_price",
        method: this.validDropdownMinPrice,
        validWhen: true,
        fieldValue: this.state.min_price,
        message: "Please choose a province",
      },
      {
        field: "max_price",
        method: this.validDropdownMaxPrice,
        validWhen: true,
        fieldValue: this.state.listMaxPrice,
        message: "Please choose a district",
      },
      {
        field: "description",
        method: "isLength",
        args: [{ min: 1 }],
        validWhen: true,
        message: "The description field is required.",
      },
    ];

    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.onHandleMinPriceSelect = this.onHandleMinPriceSelect.bind(this);
    this.onHandleMaxPriceSelect = this.onHandleMaxPriceSelect.bind(this);
    this.onHandleServiceTypeSelect = this.onHandleServiceTypeSelect.bind(this);
    this.selectedImageHandler = this.selectedImageHandler.bind(this);
    this.validator = new Validator(rules);
  }

  //Validation
  validDropdownServiceType(service_type) {
    if (service_type.value === -1) {
      return false;
    }
    return true;
  }
  validDropdownMinPrice(min_price) {
    if (min_price.value === -1) {
      return false;
    }
    return true;
  }
  validDropdownMaxPrice(max_price) {
    if (max_price.value === -1) {
      return false;
    }
    return true;
  }

  //load price list
  rangeMinPrice = () => {
    var first = 100000;
    for (var i = 0; i < 20; i++) {
      this.state.listMinPrice.push({
        label: Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(first),
        value: first,
      });
      first += 50000;
    }
  };
  rangeMaxPrice = (minPrice) => {
    var first = minPrice + 50000;
    var temptList = [{ label: "Choose max price", value: -1 }];
    for (var i = 0; i < 20; i++) {
      temptList.push({
        label: Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(first),
        value: first,
      });
      first += 50000;
    }
    console.log("...", temptList);
    this.setState({
      listMaxPrice: temptList,
    });
  };

  componentDidMount() {
    this.getServiceTypeList();
    this.rangeMinPrice();
  }
  getServiceTypeList = async () => {
    try {
      await serviceTypeApi.getAll().then((res) => {
        this.setState({
          service_type_list: res.map((service_type) => ({
            label: service_type.name,
            value: service_type.id,
          })),
        });
      });
    } catch (err) {
      console.log("Cant get service type list", err);
    }
  };

  //handle selected image
  selectedImageHandler(event) {
    let reader = new FileReader();
    let file = event.target.files[0];
    console.log(file);
    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result,
        image: file,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  //handle select
  onHandleServiceTypeSelect(event) {
    console.log(event);
    this.setState({
      service_type: event,
    });
  }
  onHandleMinPriceSelect(event) {
    this.setState({
      min_price: event,
      selectMinPrice: true,
      max_price: { label: "Choose max price", value: -1 },
    });
    this.rangeMaxPrice(event.value);
  }
  onHandleMaxPriceSelect(event) {
    this.setState({
      max_price: event,
    });
  }
  onHandleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  }

  _inserNewService = async (data) => {
    try {
      await serviceApi.insertService(data).then((res) => {
        console.log("HERE");
      });
    } catch (error) {
      console.log("Can not insert new service", error);
    }
  };

  onHandleSubmit(event) {
    event.preventDefault();
    this.setState({
      errors: this.validator.validate(this.state, event),
    });
    if (this.validator.isValid) {
      const serviceDTO = {
        name: this.state.name,
        service_type_id: this.state.service_type.value,
        url: "",
        description: this.state.description,
        min_price: this.state.min_price.value,
        max_price: this.state.max_price.value,
        status: 1,
      };

      const formData = new FormData();

      formData.append("image", this.state.image);

      console.log("data: ", FormData);
      this._inserNewService(serviceDTO, formData);
    }
  }
  render() {
    const { errors } = this.state;
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
                  <div className="col-md-4 mt-20">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                      {/* <ImageUpload /> */}
                      <div className="d-flex justify-content-between align-items-center mt-20">
                        <h4 className="text-left">Image</h4>
                      </div>
                      <input
                        style={{ display: "none" }}
                        type="file"
                        onChange={this.selectedImageHandler}
                        ref={(fileInput) => (this.fileInput = fileInput)}
                      />
                      <div className="thumbnail">
                        <img src={this.state.imagePreviewUrl} alt="..." />
                      </div>
                      <Button
                        className="btn-round"
                        onClick={() => this.fileInput.click()}
                      >
                        Select Image
                      </Button>
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
                          {errors.name && (
                            <div
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {errors.name}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-12">
                          <div className="row mt-2">
                            <div className="col-md-12">
                              <label className="labels">Service Type*</label>
                              <Select
                                className="react-select primary"
                                classNamePrefix="react-select"
                                placeholder="Select province"
                                name="province"
                                value={this.state.service_type}
                                options={this.state.service_type_list}
                                onChange={this.onHandleServiceTypeSelect}
                              />
                              {errors.service_type && (
                                <div
                                  className="invalid-feedback"
                                  style={{ display: "block" }}
                                >
                                  {errors.service_type}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div className="col-md-6">
                              <label className="labels">Min price*</label>
                              <Select
                                className="react-select primary"
                                classNamePrefix="react-select"
                                placeholder="Select min price"
                                name="province"
                                value={this.state.min_price}
                                options={this.state.listMinPrice}
                                onChange={this.onHandleMinPriceSelect}
                              />
                              {errors.min_price && (
                                <div
                                  className="invalid-feedback"
                                  style={{ display: "block" }}
                                >
                                  {errors.min_price}
                                </div>
                              )}
                            </div>
                            <div className="col-md-6">
                              <label className="labels">Max price*</label>
                              <Select
                                className="react-select primary"
                                classNamePrefix="react-select"
                                placeholder="Select max price"
                                name="province"
                                value={this.state.max_price}
                                options={
                                  this.state.selectMinPrice
                                    ? this.state.listMaxPrice
                                    : []
                                }
                                onChange={this.onHandleMaxPriceSelect}
                              />
                              {errors.max_price && (
                                <div
                                  className="invalid-feedback"
                                  style={{ display: "block" }}
                                >
                                  {errors.max_price}
                                </div>
                              )}
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
                          {errors.description && (
                            <div
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {errors.description}
                            </div>
                          )}
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
