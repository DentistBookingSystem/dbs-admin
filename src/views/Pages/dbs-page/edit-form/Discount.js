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
import React, { useState } from "react";
// react plugin used to create a form with multiple steps

// reactstrap components
import { Col } from "reactstrap";

import Validator from "utils/validation/validator";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

function Discount(discount) {
  const [name, setName] = useState(discount.name);
  const [percentage, setPercentage] = useState(discount.percentage);
  const [startDate, setStartDate] = useState(discount.startDate);
  const [endDate, setEndDate] = useState(discount.endDate);
  const [description, setDescription] = useState(discount.description);
  const [errors, setErrors] = useState({});

  const formData = {
    name: name,
    percentage: percentage,
    startDate: startDate,
    endDate: endDate,
    description: description,
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
      field: "percentage",
      method: "isLength",
      args: [{ min: 1 }],
      validWhen: true,
      message: "The percentage field is required.",
    },
    {
      field: "startDate",
      method: "isLength",
      args: [{ min: 1 }],
      validWhen: true,
      message: "The Start Date field is required.",
    },
    {
      field: "endDate",
      method: "isLength",
      args: [{ min: 1 }],
      validWhen: true,
      message: "The End Date field is required.",
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
  const onHandleSubmit = (event) => {
    setErrors(validator.validate(formData, event));
    if (!validator.isValid) {
      console.log("error");
    }
  };

  return (
    <>
      {/* <PanelHeader size="sm" /> */}
      <div className="content">
        <Col xs={12} md={10} className="mr-auto ml-auto">
          <div className="container rounded bg-white">
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
                    placeholder="name"
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
                <div className="col-md-12">
                  <label className="labels">Discount Percentage(%)*</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Branch name"
                    name="percentage"
                    value={percentage}
                    onChange={(event) => setPercentage(event.target.value)}
                  />
                  {errors.percentage && (
                    <div
                      className="invalid-feedback"
                      style={{ display: "block" }}
                    >
                      {errors.percentage}
                    </div>
                  )}
                </div>
              </div>

              <div className="row mt-2">
                {/* <div className="col-md-12">
                  <label className="labels">Service*</label>
                  <Select
                            className="react-select primary"
                            classNamePrefix="react-select"
                            placeholder="Select province"
                            name="province"
                            isMulti
                            value=""
                            options={this.state.serviceList}
                            onChange={this.onHandleServiceSelect}
                          />
                </div> */}
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Start date*</label>
                  <input
                    type="Date"
                    className="form-control"
                    placeholder="Address"
                    name="startDate"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                    is
                  />
                  {errors.startDate && (
                    <div
                      className="invalid-feedback"
                      style={{ display: "block" }}
                    >
                      {errors.startDate}
                    </div>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="labels">End date*</label>
                  <input
                    type="Date"
                    className="form-control"
                    placeholder="Address"
                    name="endDate"
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                  />
                   {errors.endDate && (
                    <div
                      className="invalid-feedback"
                      style={{ display: "block" }}
                    >
                      {errors.endDate}
                    </div>
                  )}
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-12">
                  <label className="labels">Description*</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
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
                  onClick={onHandleSubmit}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </Col>
      </div>
    </>
  );
}

export default Discount;
