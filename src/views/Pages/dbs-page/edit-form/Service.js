import React, { useEffect, useRef, useState } from "react";

// reactstrap components
import { Button, Card, CardHeader, CardBody, Row, Col, Form } from "reactstrap";

import Select from "react-select";
import serviceTypeApi from "api/serviceTypeApi";
import Switch from "react-bootstrap-switch";
import serviceApi from "api/serviceApi";
import NotificationAlert from "react-notification-alert";
import Validator from "utils/validation/validator";

const time = [
  { value: "0.5", label: "0.5" },
  { value: "1", label: "1" },
  { value: "1.5", label: "1.5" },
  { value: "2", label: "2" },
  { value: "2.5", label: "2.5" },
  { value: "3", label: "3" },
];

function Service(service) {
  var options = {};
  options = {
    place: "tr",
    message: (
      <div>
        <div>
          Successfully edit <b>Service</b>
        </div>
      </div>
    ),
    type: "success",
    icon: "now-ui-icons ui-1_bell-53",
    autoDismiss: 4,
  };

  var formatMinPrice = Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(service.minPrice);
  var formatMaxPrice = Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(service.maxPrice);
  const currentServiceType = {
    label: service.serviceType.name,
    value: service.serviceType.id,
  };
  const currentImage = "https://drive.google.com/uc?id=" + service.url;
  const currentMinPrice = { label: formatMinPrice, value: formatMinPrice };
  const currentMaxPrice = { label: formatMaxPrice, value: formatMaxPrice };
  const [name, setName] = useState(service.name);
  const [serviceType, setServiceType] = useState(currentServiceType);
  const [minPrice, setMinPrice] = useState(currentMinPrice);
  const [maxPrice, setMaxPrice] = useState(currentMaxPrice);
  const [description, setDescription] = useState(service.description);
  const [listMinPrice, setListMinPrice] = useState([
    { label: "Choose min price", value: -1 },
  ]);
  const [listMaxPrice, setListMaxPrice] = useState([
    { label: "Choose max price", value: -1 },
  ]);
  const [estimateTime, setEstimateTime] = useState([
    { label: service.estimatedTime, value: -1 },
  ]);
  const [serviceTypeList, setServiceTypeList] = useState([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(currentImage);
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState(service.status);
  const fileInput = useRef(null);
  const notifyAlert = useRef();
  const [errors, setErrors] = useState({});

  //Validation
  const validDropdownServiceType = (service_type) => {
    if (service_type.value === -1) {
      return false;
    }
    return true;
  };
  const validDropdownMinPrice = (minPrice) => {
    if (minPrice === -1) {
      return false;
    }
    return true;
  };
  const validDropdownMaxPrice = (maxPrice) => {
    if (maxPrice === -1) {
      return false;
    }
    return true;
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
      field: "serviceType",
      method: validDropdownServiceType,
      validWhen: true,
      fieldValue: serviceType.value,
      message: "Please choose a service type",
    },
    {
      field: "minPrice",
      method: validDropdownMinPrice,
      validWhen: true,
      fieldValue: minPrice.value,
      message: "Please choose min price",
    },
    {
      field: "maxPrice",
      method: validDropdownMaxPrice,
      validWhen: true,
      fieldValue: maxPrice.value,
      message: "Please choose max price",
    },
    {
      field: "description",
      method: "isLength",
      args: [{ min: 1 }],
      validWhen: true,
      message: "The description field is required.",
    },
  ];
  const validator = new Validator(rules);

  //Load combobox
  const rangeMinPrice = () => {
    var first = 100000;
    var tempList = [];
    for (var i = 0; i < 20; i++) {
      tempList.push({
        label: Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(first),
        value: first,
      });
      first += 50000;
    }
    setListMinPrice(tempList);
  };
  const rangeMaxPrice = (minPrice) => {
    var first = minPrice + 50000;
    var temptList = [];
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
    setListMaxPrice(temptList);
  };
  const getServiceTypeList = async () => {
    try {
      await serviceTypeApi.getAll().then((res) => {
        setServiceTypeList(
          res.map((service_type) => ({
            label: service_type.name,
            value: service_type.id,
          }))
        );
      });
    } catch (err) {
      console.log("Cant get service type list", err);
    }
  };

  //Handle select
  const onHandleMinPriceSelect = (event) => {
    setMaxPrice({ label: "Choose max price", value: -1 });
    setMinPrice(event);
    rangeMaxPrice(event.value);
  };
  const onHandleMaxPriceSelect = (event) => {
    console.log(event);
    setMaxPrice(event);
  };
  const onHandleServiceTypeSelect = (event) => {
    console.log(event);
    setServiceType(event);
  };

  //Notification
  const notify = () => {
    notifyAlert.current.notificationAlert(options);
  };

  // On file select (from the pop up)
  const onFileChange = (event) => {
    // Update the state
    setSelectedFile(event.target.files[0]);
    let reader = new FileReader();
    let file = event.target.files[0];
    console.log(file);
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  //edit service
  const editService = async (data) => {
    try {
      console.log("fsdfsa", data);
      await serviceApi.editService(data).then((res) => {
        console.log("edit done");
        console.log(res);
        window.location.href = "/admin/services";
      });
    } catch (error) {
      console.log("Cannot edit service", error);
    }
  };

  //Handle submit form, no edit image
  const onHandleSubmit = async (event) => {
    var data = {
      id: service.id,
      name: name,
      serviceTypeId: serviceType.value,
      minPrice: parseFloat(minPrice.value),
      maxPrice: parseFloat(maxPrice.value),
      description: description,
      url: service.url,
      estimatedTime: parseFloat(estimateTime.value),
      status: status ? 1 : 0,
    };
    const formData = new FormData();

    formData.append("url", selectedFile);
    setErrors(validator.validate(data, event));

    if (selectedFile) {
      try {
        await serviceApi.addImageService(formData).then(async (res) => {
          var dataUpdate = {
            id: service.id,
            name: name,
            serviceTypeId: serviceType.value,
            minPrice: parseFloat(minPrice.value),
            maxPrice: parseFloat(maxPrice.value),
            description: description,
            url: res.data,
            estimatedTime: parseFloat(estimateTime.value),
            status: status ? 1 : 0,
          };
          console.log("data", dataUpdate);
          console.log("url ", res.data);
          await serviceApi.editService(dataUpdate).then((res) => {
            console.log("trả về", res);
            notify();
            window.location.href = "/admin/services";
          });
        });
      } catch (error) {
        console.log("Can not insert new service", error);
      }
    } else {
      if (validator.isValid) {
        editService(data);
        notify();
        setTimeout(() => {
          window.location.href = "/admin/services";
        }, 3000);
      }
    }
  };

  useEffect(() => {
    rangeMinPrice();
    getServiceTypeList();
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="4">
            <Card className="card-user">
              <div className="thumbnail">
                <img src={imagePreviewUrl} />
              </div>

              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <input
                  style={{ display: "none" }}
                  type="file"
                  onChange={onFileChange}
                  ref={fileInput}
                />

                <Button
                  className="btn-round"
                  onClick={() => fileInput.current.click()}
                >
                  Select Image
                </Button>
              </div>

              <hr />
            </Card>
          </Col>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Edit Service</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <div className="row mt-2">
                    <div className="col-md-12">
                      <label className="labels">Service Name*</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Service name"
                        name="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
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
                    <div className="col-md-6">
                      <label className="labels">Service Type*</label>
                      <Select
                        className="react-select primary"
                        classNamePrefix="react-select"
                        placeholder="Select Service Type"
                        name="serviceType"
                        value={serviceType}
                        options={serviceTypeList}
                        onChange={onHandleServiceTypeSelect}
                      />
                      {errors.serviceType && (
                        <div
                          className="invalid-feedback"
                          style={{ display: "block" }}
                        >
                          {errors.serviceType}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="labels">Estimated time (hour)*</label>
                      <Select
                        className="react-select primary"
                        classNamePrefix="react-select"
                        placeholder="Choose estimated time"
                        name="estimatedTime"
                        value={estimateTime}
                        options={time}
                        onChange={(value) => setEstimateTime(value)}
                      />
                      {errors.serviceType && (
                        <div
                          className="invalid-feedback"
                          style={{ display: "block" }}
                        >
                          {errors.serviceType}
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
                        name="minPrice"
                        value={minPrice}
                        options={listMinPrice}
                        onChange={onHandleMinPriceSelect}
                      />
                      {errors.minPrice && (
                        <div
                          className="invalid-feedback"
                          style={{ display: "block" }}
                        >
                          {errors.minPrice}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="labels">Max price*</label>
                      <Select
                        className="react-select primary"
                        classNamePrefix="react-select"
                        placeholder="Select max price"
                        name="maxPrice"
                        value={maxPrice}
                        options={listMaxPrice}
                        onChange={onHandleMaxPriceSelect}
                      />
                      {errors.maxPrice && (
                        <div
                          className="invalid-feedback"
                          style={{ display: "block" }}
                        >
                          {errors.maxPrice}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-12">
                      <label className="labels">Description*</label>
                      <textarea
                        className="form-control"
                        name="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        rows="10"
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
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <label className="labels">
                        Status* &nbsp;&nbsp;&nbsp;&nbsp;
                      </label>
                      <Switch
                        className="form-control"
                        onText={<i className="now-ui-icons ui-1_check" />}
                        offText={
                          <i className="now-ui-icons ui-1_simple-remove" />
                        }
                        value={status}
                        onChange={() => setStatus(!status)}
                      />
                    </div>
                    {/* <div className="col-md-6"> */}

                    {/* </div> */}
                  </div>
                  <div className="row mt-4">
                    <div className=" text-center col-md-12">
                      <button
                        className="btn btn-info btns-mr-10"
                        type="button"
                        onClick={onHandleSubmit}
                      >
                        Save
                      </button>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => {
                          window.location.href = "/admin/services";
                        }}
                      >
                        Back
                      </button>
                    </div>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

      <NotificationAlert
        ref={notifyAlert}
        zIndex={9999}
        onClick={() => console.log("hey")}
      />
    </>
  );
}

export default Service;
