import AdminNavbar from "components/Navbars/AdminNavbar";
import PanelHeader from "components/PanelHeader/PanelHeader";
import { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Col, Form, FormGroup, Row } from "reactstrap";
import Validator from "utils/validation/validator";
import defaultImage from "assets/img/image_placeholder.jpg";
import branchApi from "api/branchApi";
import provinceApi from "api/provinceApi";
import Select from "react-select";
import districtApi from "api/districtApi";

class NewBranchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      url: "",
      address: "",
      open_time: "",
      close_time: "",
      image: null,
      province: { label: "Choose a province", value: -1 },
      initialDistrict: { label: "Choose a district", value: -1 },
      district: { label: "Choose a district", value: -1 },
      provinces: [],
      districts: [],
      errors: {},
      selectProvince: false,
      changeProvince: true,
      imagePreviewUrl: defaultImage,
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
        field: "address",
        method: "isLength",
        args: [{ min: 5 }],
        validWhen: true,
        message: "The address field is required",
      },
      {
        field: "open_time",
        method: "isLength",
        args: [{ min: 1 }],
        validWhen: true,
        message: "The start time field is required",
      },
      {
        field: "close_time",
        method: "isLength",
        args: [{ min: 1 }],
        validWhen: true,
        message: "The end time field is required",
      },
      {
        field: "province",
        method: this.validDropdownProvince,
        validWhen: true,
        fieldValue: this.state.province,
        message: "Please choose a province",
      },
      {
        field: "district",
        method: this.validDropdownDistrict,
        validWhen: true,
        fieldValue: this.state.district,
        message: "Please choose a district",
      },
    ];

    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.validator = new Validator(rules);
    this.selectedHandler = this.selectedHandler.bind(this);
    this.getProvinceList = this.getProvinceList.bind(this);
    this.onHandleSelect = this.onHandleSelect.bind(this);
    this.onHandleSelectDistrict = this.onHandleSelectDistrict.bind(this);
  }

  componentDidMount() {
    this.getProvinceList();
  }

  getProvinceList = async () => {
    console.log("Choose province: ", this.state.selectProvince);
    try {
      await provinceApi.getProvinceList().then((res) => {
        this.setState({
          provinces: res.map((province) => ({
            label: province.name,
            value: province.id,
          })),
        });
      });
    } catch (error) {
      console.log("Can not get province list", error);
    }
  };

  getDistrictList = async (id) => {
    console.log("Here: ", id);
    try {
      await districtApi.getDistrictList(id).then((res) => {
        console.log("res: ", res);
        if (res !== null) {
          this.setState({
            district: { label: "Choose a district", value: -1 },
            districts: res.map((district) => ({
              label: district.name,
              value: district.id,
            })),
          });
        }
        if (this.state.districts !== []) {
          this.setState({
            selectProvince: true,
          });
        } else {
          this.setState({
            selectProvince: false,
          });
        }
        console.log(this.state.district);
      });
    } catch (error) {
      console.log("Can not load district", error);
    }
  };

  //handle selected province
  onHandleSelect(event) {
    this.setState({
      province: event,
      changProvince: true,
      // selectProvince: false,
    });
    this.getDistrictList(event.value);
  }

  //handle selected district
  onHandleSelectDistrict(event) {
    this.setState({
      district: event,
      changeProvince: false,
    });
    console.log("district: ", event);
  }

  //handle change of input fields
  onHandleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  }

  //handle selected image
  selectedHandler(event) {
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

  validDropdownProvince(province) {
    if (province.value === -1) {
      return false;
    }
    return true;
  }

  validDropdownDistrict(district) {
    if (district.value === -1) {
      return false;
    }
    return true;
  }

  // handle data sent back to server
  _insertNewData = async (formData) => {
    try {
      await branchApi.insert(formData).then((res) => {
        console.log("Insert ok", res);
      });
    } catch (error) {
      console.log("Insert data failed", error);
    }
  };

  onHandleSubmit(event) {
    event.preventDefault();
    this.setState({
      errors: this.validator.validate(this.state, event),
    });
    if (this.validator.isValid) {
      //Đưa data xuống ở đây
      const data = {
        name: this.state.name,
        url: "",
        address: this.state.address,
        open_time: this.state.open_time,
        close_time: this.state.close_time,
        district_id: this.state.district.value,
        status: 1,
      };

      console.log(data);

      // const blobBranchData = new Blob(JSON.stringify(data), {
      //   type: "application/json",
      // });
      // const blobImageData = new Blob(this.state.image, {
      //   type: "multipart/form-data"
      // })
      const formData = new FormData();
      // const tempt = JSON.stringify(data)

      formData.append("img", this.state.image);
      formData.append("branchDTO", JSON.stringify(data));

      this._insertNewData(formData);
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <>
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
          <Form enctype="multipart/form-data">
            <Row>
              <div className="container rounded bg-white mt-30 mb-15 ml-15">
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
                        onChange={this.selectedHandler}
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
                        <h4 className="text-right">Branch Information</h4>
                      </div>
                      <FormGroup>
                        <div className="row mt-2">
                          <div className="col-md-12">
                            <label className="labels">Branch Name*</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Branch name"
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
                      </FormGroup>
                      <FormGroup>
                        <div className="row mt-4">
                          <div className="col-md-12">
                            <label className="labels">Branch Address*</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Address"
                              name="address"
                              value={this.state.address}
                              onChange={this.onHandleChange}
                            />
                            {errors.address && (
                              <div
                                className="invalid-feedback"
                                style={{ display: "block" }}
                              >
                                {errors.address}
                              </div>
                            )}
                          </div>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <div className="row mt-2">
                          <div className="col-md-6">
                            <label className="labels">Open time*</label>
                            <input
                              type="time"
                              className="form-control"
                              placeholder="Open time"
                              name="open_time"
                              value={this.state.open_time}
                              onChange={this.onHandleChange}
                            />
                            {errors.open_time && (
                              <div
                                className="invalid-feedback"
                                style={{ display: "block" }}
                              >
                                {errors.open_time}
                              </div>
                            )}
                          </div>
                          <div className="col-md-6">
                            <label className="labels">Close time*</label>
                            <input
                              type="time"
                              className="form-control"
                              placeholder="Close time"
                              name="close_time"
                              value={this.state.close_time}
                              onChange={this.onHandleChange}
                            />
                            {errors.close_time && (
                              <div
                                className="invalid-feedback"
                                style={{ display: "block" }}
                              >
                                {errors.close_time}
                              </div>
                            )}
                          </div>
                        </div>
                      </FormGroup>
                      <div className="row mt-2">
                        <div className="col-md-6">
                          <label className="labels">Province*</label>
                          <Select
                            className="react-select primary"
                            classNamePrefix="react-select"
                            placeholder="Select province"
                            name="province"
                            value={this.state.province}
                            options={this.state.provinces}
                            onChange={this.onHandleSelect}
                          />
                          {errors.province && (
                            <div
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {errors.province}
                            </div>
                          )}
                        </div>
                        <div className="col-md-6">
                          <label className="labels">District*</label>
                          <Select
                            className="react-select primary"
                            classNamePrefix="react-select"
                            placeholder="Select district"
                            name="district"
                            value={this.state.district}
                            options={
                              this.state.selectProvince
                                ? this.state.districts
                                : []
                            }
                            onChange={this.onHandleSelectDistrict}
                          />
                          {errors.district && (
                            <div
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {errors.district}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row mt-4 ">
                        <div className="col-md-2 ml-10">
                          <button
                            className="btn btn-info profile-button"
                            type="button"
                            onClick={this.onHandleSubmit}
                          >
                            Add
                          </button>
                        </div>
                        <div className="col-md-2">
                          <button
                            className="btn btn-primary profile-button"
                            type="reset"
                          >
                            Reset
                          </button>
                          {/* chưa reset được */}
                        </div>
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

export default NewBranchPage;
