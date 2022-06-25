import appointmentApi from "api/AppointmentApi";
import branchApi from "api/branchApi";
import doctorApi from "api/doctorApi";
import PanelHeader from "components/PanelHeader/PanelHeader";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import AppointmentTable from "views/Tables/AppointmentTable";
import AppointmentTableCheckCancel from "views/Tables/AppointmentTableCheckCancel";
import "./style.css";

export default function StaffCancelAppointment(props) {
  const [searchValue, setSearchValue] = useState("");
  const [bookingList, setBookingList] = useState([]);
  const [branchSearch, SetBranchSearch] = useState(0);
  const [dateSearch, SetDateSearch] = useState("");
  const [doctorSearch, setDoctorSearch] = useState(0);
  const [branchList, setBranchList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const getToday = (separator = "") => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}-${
      month < 10 ? `0${month}` : `${month}`
    }-${separator}${date}`;
  };
  const getAllBranch = async () => {
    const result = await branchApi.getAllBranchForStaff().catch((err) => {
      console.log(err);
    });
    if (result.data) {
      console.log("branch ", result.data.branchList);
      setBranchList(result.data?.branchList);
      SetBranchSearch(result.data.branchList.at(0).id);
      const res = await doctorApi.getDoctorByBranchId(
        result.data.branchList.at(0).id
      );
      if (res) {
        console.log("doctor list", res);
        setDoctorList(res);
      } else {
        console.log("không thành công");
      }
    }
  };

  const getAppointListForStaff = async () => {
    var data;

    if (dateSearch.length === 0) {
      data = {
        status: [0, 4],
        date: getToday(),
        phone: searchValue,
        branchId: branchSearch,
        doctorId: doctorSearch,
        serviceId: 0,
      };
    } else {
      // var datetmp = dateSearch.valueAsDate;
      // console.log(datetmp);

      data = {
        status: [0, 4],
        date: dateSearch,
        phone: searchValue,
        branchId: branchSearch,
        doctorId: doctorSearch,
        serviceId: 0,
      };
    }

    const result = await appointmentApi.getAppointListForStaff(data);
    if (result?.data) {
      console.log("data appointment", result?.data);
      setBookingList(result.data);
    }
  };

  const getAllAppointment = async () => {
    var data = (data = {
      status: [0, 4],
      date: getToday(),
      phone: searchValue,
      branchId: branchSearch,
      doctorId: doctorSearch,
      serviceId: 0,
    });

    const result = await appointmentApi.getAppointListForStaff(data);
    if (result?.data) {
      console.log("data appointment", result?.data);
      setBookingList(result.data);
    }
  };

  useEffect(() => {
    getAllBranch();
    getAllAppointment();
  }, []);

  useEffect(async () => {
    const res = await doctorApi.getDoctorByBranchId(branchSearch);
    if (res) {
      console.log("doctor list", res);
      setDoctorList(res);
    } else {
      console.log("không thành công");
    }
  }, [branchSearch]);

  return (
    <div>
      <div className="content" style={{ margin: `0 20px` }}>
        <Container fluid>
          <form className="mt-3">
            <div class="form-group d-flex flex-column text-center">
              <Row className="justify-content-center">
                <label
                  for="inputdefault"
                  style={{ fontSize: `16px`, width: `10vw` }}
                  className="m-3"
                >
                  Search phone
                </label>
                <div
                  class="form-group d-flex flex-row"
                  style={{ width: `30vw` }}
                >
                  <input
                    class="form-control"
                    id="inputdefault"
                    style={{
                      width: `100%`,
                      padding: `0px 15px`,
                      fontSize: `16px`,
                      backgroundColor: `white`,
                      borderColor: `black`,
                    }}
                    type="text"
                    value={searchValue}
                    placeholder="Enter the number phone"
                    onChange={(e) => {
                      setSearchValue(e.target.value.trim());
                    }}
                  ></input>
                </div>
              </Row>
              <Row className="justify-content-center">
                <label
                  for="inputdefault"
                  style={{ fontSize: `16px`, width: `10vw` }}
                  className="m-3"
                >
                  Branch
                </label>
                <div
                  class="form-group d-flex flex-row"
                  style={{ width: `30vw` }}
                >
                  <select
                    class="form-control"
                    id="inputdefault"
                    style={{
                      width: `100%`,
                      padding: `0px 15px`,
                      fontSize: `16px`,
                      backgroundColor: `white`,
                      borderColor: `black`,
                    }}
                    type="text"
                    value={branchSearch}
                    placeholder="Enter the number phone"
                    onChange={(e) => {
                      SetBranchSearch(e.target.value);
                      setDoctorSearch(0);
                    }}
                  >
                    {branchList.map((item, key) => {
                      if (key === 0) {
                        return (
                          <option
                            className="text-center"
                            value={item.id}
                            selected
                          >
                            {item.name}
                          </option>
                        );
                      }
                      return (
                        <option className="text-center" value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </Row>
              <Row className="justify-content-center">
                <label
                  for="inputdefault"
                  style={{ fontSize: `16px`, width: `10vw` }}
                  className="m-3"
                >
                  Doctor
                </label>
                <div
                  class="form-group d-flex flex-row"
                  style={{ width: `30vw` }}
                >
                  <select
                    class="form-control"
                    id="inputdefault"
                    style={{
                      width: `100%`,
                      padding: `0px 15px`,
                      fontSize: `16px`,
                      backgroundColor: `white`,
                      borderColor: `black`,
                    }}
                    type="text"
                    value={doctorSearch}
                    placeholder="Enter the number phone"
                    onChange={(e) => {
                      setDoctorSearch(e.target.value);
                    }}
                    // defaultValue="0"
                  >
                    <option className="text-center" value="0">
                      ----- Select doctor ----
                    </option>
                    {doctorList.map((item) => {
                      return (
                        <option className="text-center" value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </Row>
              <Row className="justify-content-center">
                <label
                  for="inputdefault"
                  style={{ fontSize: `16px`, width: `10vw` }}
                  className="m-3"
                >
                  Date
                </label>
                <div
                  class="form-group d-flex flex-row"
                  style={{ width: `30vw` }}
                >
                  <input
                    class="form-control"
                    id="inputdefault"
                    style={{
                      width: `100%`,
                      padding: `0px 15px`,
                      fontSize: `16px`,
                      backgroundColor: `white`,
                      borderColor: `black`,
                    }}
                    min={getToday()}
                    type="date"
                    value={dateSearch?.length !== 0 ? dateSearch : getToday()}
                    onChange={(e) => {
                      let separator = "";
                      let date = e.target.valueAsDate.getDate();
                      let month = e.target.valueAsDate.getMonth() + 1;
                      let year = e.target.valueAsDate.getFullYear();
                      let tmp = `${year}${separator}-${
                        month < 10 ? `0${month}` : `${month}`
                      }-${separator}${date}`;
                      SetDateSearch(tmp);
                    }}
                  ></input>
                </div>
              </Row>
            </div>
            <button
              className="button-search mb-4"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                getAppointListForStaff();
              }}
            >
              <div className="d-flex ">
                <p className="m-0"> Search </p>
                <i className="now-ui-icons ui-1_zoom-bold m-1" />
              </div>
            </button>
          </form>
        </Container>
        <AppointmentTableCheckCancel bookingList={bookingList} />
      </div>
    </div>
  );
}
