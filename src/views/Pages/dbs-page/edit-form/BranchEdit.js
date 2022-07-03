import AdminNavbar from "components/Navbars/AdminNavbar";
import PanelHeader from "components/PanelHeader/PanelHeader";
import { Component, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Col, Form, FormGroup, Row } from "reactstrap";
import Validator from "utils/validation/validator";
import defaultImage from "assets/img/image_placeholder.jpg";
import branchApi from "api/branchApi";
import provinceApi from "api/provinceApi";
import Select from "react-select";
import districtApi from "api/districtApi";
import NotificationAlert from "react-notification-alert";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Switch from "react-bootstrap-switch";

const hours = [
  { value: "06", label: "06" },
  { value: "07", label: "07" },
  { value: "08", label: "08" },
  { value: "09", label: "09" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
  { value: "13", label: "13" },
  { value: "14", label: "14" },
  { value: "15", label: "15" },
  { value: "16", label: "16" },
  { value: "17", label: "17" },
  { value: "18", label: "18" },
  { value: "19", label: "19" },
  { value: "20", label: "20" },
];
const minute = [
  { value: "00", label: "00" },
  { value: "30", label: "30" },
];

export default function BranchEdit() {
  let history = useHistory();
  const [branchInfo, setBranchInfo] = useState(null);
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setdistrictList] = useState([]);
  const fileInput = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [openTime, setOpenTime] = useState({
    hour: "00",
    minute: "00",
  });
  const [closeTime, setCloseTime] = useState({
    hour: "00",
    minute: "00",
  });
  const [image, setImage] = useState(null);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [url, setUrl] = useState("");
  const [branchName, setBranchName] = useState("");
  const [status, setStatus] = useState("");
  const id = useParams().id;
  useEffect(() => {
    getBranchUpdate();
  }, [id]);
  const getBranchUpdate = async () => {
    const result = await branchApi.getBranchById(id).then((res) => {
      console.log("res", res.data.name);
      setBranchInfo(res.data);
      setBranchName(res.data.name);
      setOpenTime({
        hour: {
          value: res.data.openTime.split(":")[0],
          label: res.data.openTime.split(":")[0],
        },
        minute: {
          value: res.data.openTime.split(":")[1],
          label: res.data.openTime.split(":")[1],
        },
      });
      setCloseTime({
        hour: {
          value: res.data.closeTime.split(":")[0],
          label: res.data.closeTime.split(":")[0],
        },
        minute: {
          value: res.data.closeTime.split(":")[1],
          label: res.data.closeTime.split(":")[1],
        },
      });
      setStatus(res.data.status);
      setUrl("https://drive.google.com/uc?id=" + res.data.url);
      setDistrict({
        value: res.data.district.id,
        label: res.data.district.name,
      });
      setProvince({
        value: res.data.district.province.id,
        label: res.data.district.province.name,
      });
    });
  };

  useEffect(() => {
    getProvinceList();
  }, []);

  useEffect(() => {
    getDistrictList(province.value);
  }, [province]);

  const getProvinceList = async () => {
    try {
      await provinceApi
        .getProvinceList()
        .then((res) => {
          console.log(res);
          setProvinceList(
            res.map((item) => ({
              label: item.name,
              value: item.id,
            }))
          );
        })
        .then(() => {
          console.log("province list", provinceList);
        });
    } catch (error) {
      console.log("Can not get province list", error);
    }
  };

  const getDistrictList = async (id) => {
    try {
      await districtApi
        .getDistrictList(id)
        .then((res) => {
          console.log("res: ", res);
          if (res.data !== null) {
            setdistrictList(
              res.data.map((district) => ({
                label: district.name,
                value: district.id,
              }))
            );
          }
        })
        .then(() => {
          console.log(districtList);
        });
    } catch (error) {
      console.log("Can not load district", error);
    }
  };

  const onFileChange = (event) => {
    // Update the state
    setSelectedFile(event.target.files[0]);
    let reader = new FileReader();
    let file = event.target.files[0];
    console.log(file);
    reader.onloadend = () => {
      setUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const onHandleSubmit = async (event) => {
    if (true) {
      const formData = new FormData();
      console.log(selectedFile);
      formData.append("url", selectedFile);
      // formData.append("branchDTO", data);
      if (selectedFile) {
        _insertNewData(formData);
      } else {
        const data = {
          id: id,
          name: branchName,
          url: branchInfo.url,
          openTime: `${openTime.hour.value}:${openTime.minute.value}`,
          closeTime: `${closeTime.hour.value}:${closeTime.minute.value}`,
          districtId: district.value,
          status: status,
        };
        console.log(data);
        await branchApi.updateBranch(data).then((res) => {
          toast.success("Update branch successfully!!!");
          history.push("/admin/branchs");
        });
      }
    }
  };

  // handle data sent back to server
  const _insertNewData = async (formData) => {
    var data;
    console.log("click update");
    try {
      await branchApi
        .insert(formData)
        .then((res) => {
          console.log("Insert ok", res);
          data = {
            id: id,
            name: branchName,
            url: res.data,
            openTime: `${openTime.hour.value}:${openTime.minute.value}`,
            closeTime: `${closeTime.hour.value}:${closeTime.minute.value}`,
            districtId: district.value,
            status: status,
          };
        })
        .then(async () => {
          console.log(data);
          await branchApi.updateBranch(data).then((res) => {
            // this.notify();
            toast.success("Update branch successfully!!!");
            // window.location.replace("/admin/branchs");
            history.push("/admin/branchs");
          });
        });
    } catch (error) {
      console.log("Insert data failed", error);
      this.notify(error.response.data.message);
    }
  };

  return (
    <div>
      <PanelHeader size="sm" />
      {branchInfo ? (
        <div className="content">
          <Form>
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
                        onChange={(e) => onFileChange(e)}
                        ref={fileInput}
                      />
                      <div className="thumbnail">
                        <img src={url} alt="..." />
                      </div>
                      <Button
                        className="btn-round"
                        onClick={() => fileInput.current.click()}
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
                              value={branchName}
                              onChange={(e) => {
                                setBranchName(e.currentTarget.value);
                              }}
                            />
                            {/* {errors.name && (
                            <div
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {errors.name}
                            </div>
                          )} */}
                          </div>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <div className="row mt-2">
                          <div className="col-md-6">
                            <label className="labels">Open time*</label>

                            <Row>
                              <Col>
                                <Select
                                  className="react-select text-center"
                                  classNamePrefix="react-select"
                                  placeholder="Hour"
                                  options={hours}
                                  value={openTime.hour}
                                  onChange={(value) => {
                                    let tmp = openTime;
                                    tmp.hour = value;
                                    tmp.minute = openTime.minute;
                                    setOpenTime({
                                      hour: value,
                                      minute: tmp.minute,
                                    });
                                  }}
                                />
                              </Col>
                              <p className="m-0 pt-2">:</p>
                              <Col>
                                <Select
                                  className="react-select text-center"
                                  classNamePrefix="react-select"
                                  placeholder="Minute"
                                  options={minute}
                                  value={openTime.minute}
                                  onChange={(value) => {
                                    let tmp = openTime;
                                    tmp.minute = value;
                                    tmp.hour = openTime.hour;
                                    console.log(tmp);
                                    setOpenTime({
                                      hour: tmp.hour,
                                      minute: value,
                                    });
                                  }}
                                />
                              </Col>
                            </Row>

                            {/* {errors.openTime && (
                            <div
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {errors.openTime}
                            </div>
                          )} */}
                          </div>
                          <div className="col-md-6">
                            <label className="labels">Close time*</label>
                            <Row>
                              <Col>
                                <Select
                                  className="react-select text-center"
                                  classNamePrefix="react-select"
                                  placeholder="Hour"
                                  options={hours}
                                  value={closeTime.hour}
                                  onChange={(value) => {
                                    let tmp = closeTime;
                                    tmp.hour = value;
                                    tmp.minute = closeTime.minute;
                                    setCloseTime({
                                      hour: value,
                                      minute: tmp.minute,
                                    });
                                  }}
                                />
                              </Col>
                              <p className="m-0 pt-2">:</p>
                              <Col>
                                <Select
                                  className="react-select text-center"
                                  classNamePrefix="react-select"
                                  placeholder="Minute"
                                  options={minute}
                                  value={closeTime.minute}
                                  onChange={(value) => {
                                    let tmp = closeTime;
                                    tmp.hour = value;
                                    tmp.minute = closeTime.minute;
                                    setCloseTime({
                                      hour: tmp.minute,
                                      minute: value,
                                    });
                                  }}
                                />
                              </Col>
                            </Row>

                            {/* {errors.closeTime && (
                            <div
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {errors.closeTime}
                            </div>
                          )} */}
                          </div>
                        </div>
                      </FormGroup>
                      <div className="row mt-2">
                        <div className="col-md-6">
                          <label className="labels">Province*</label>
                          <Select
                            className="react-select"
                            classNamePrefix="react-select"
                            placeholder="Select province"
                            name="province"
                            value={province}
                            options={provinceList}
                            onChange={(value) => {
                              console.log(value);
                              setProvince(value);
                            }}
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
                        <div className="col-md-6">
                          <label className="labels">District*</label>
                          <Select
                            className="react-select"
                            classNamePrefix="react-select"
                            placeholder="Select district"
                            name="district"
                            value={district}
                            options={districtList}
                            onChange={(e) => setDistrict(e)}
                          />
                          {/* {errors.district && (
                          <div
                            className="invalid-feedback"
                            style={{ display: "block" }}
                          >
                            {/* {errors.district} *
                          </div>
                        )} */}
                        </div>
                      </div>
                      <div>
                        <p className="category">With Icons</p>
                        <Switch
                          onText={<i className="now-ui-icons ui-1_check" />}
                          offText={
                            <i className="now-ui-icons ui-1_simple-remove" />
                          }
                          onChange={(e) => {
                            console.log("dsfifdbviabi", e.state.value);
                            if (e.state.value) {
                              setStatus(1);
                            } else {
                              setStatus(2);
                            }
                          }}
                          defaultValue={status == 1 ? true : false}
                        />
                      </div>
                      <div className="row mt-4 ">
                        <div className="col-md-2 ml-10">
                          <button
                            className="btn btn-info profile-button"
                            type="button"
                            onClick={() => onHandleSubmit()}
                          >
                            Add
                          </button>
                        </div>
                        <div className="col-md-2">
                          <button
                            className="btn btn profile-button"
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
      ) : null}
    </div>
  );
}
