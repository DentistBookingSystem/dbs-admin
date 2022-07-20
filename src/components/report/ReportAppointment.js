import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import Select from "react-select";
import axios from "axios";
import appointmentApi from "api/AppointmentApi";
const listMonth = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];
export default function ReportAppointment() {
  const [listMonthShow, setListMonthShow] = useState([]);
  const [listYear, setListYear] = useState([]);
  const [month, setMonth] = useState({ value: 0, label: "Select month" });
  const [year, setYear] = useState({
    value: new Date().getFullYear(),
    label: new Date().getFullYear(),
  });
  const [report, setReport] = useState([]);

  const initialMonthAndYear = () => {
    var newDate = new Date();
    var date = newDate.getUTCDate();
    var month = newDate.getMonth() + 1;
    var year = newDate.getFullYear();
    date = date + 7;
    if ("135781012".includes(month)) {
      if (date > 31) {
        month = month + 1;
      }
    } else if ("46911".includes(month)) {
      if (date > 30) {
        month = month + 1;
      }
    } else {
      if (year % 4 === 0) {
        if (date > 29) {
          month = month + 1;
        } else if (date > 28) {
          month = month + 1;
        }
      }
    }
    let tmp = [{ value: 0, label: "Select all month" }];
    for (let index = 1; index <= month; index++) {
      tmp = [...tmp, listMonth.at(index - 1)];
      setMonth(listMonth.at(index - 1));
    }
    setListMonthShow(tmp);
    tmp = [];
    for (let index = 2021; index <= year; index++) {
      tmp = [...tmp, { value: index, label: index }];
    }
    setListYear(tmp);
  };

  useEffect(() => {
    initialMonthAndYear();
  }, []);

  useEffect(() => {
    let now = new Date();
    if (Number(year.value) === now.getFullYear()) {
      initialMonthAndYear();
    } else {
      let tmp = [{ value: 0, label: "Select all month" }];
      tmp = [...tmp, ...listMonth];
      console.log(tmp);
      setListMonthShow(tmp);
    }
  }, [year]);

  const getReport = async () => {
    let x = month.value;
    let result;
    if (Number(x) === 0) {
      result = await appointmentApi.getReportForAdminByYear(year.value);
    } else {
      result = await appointmentApi.getReportForAdminByMonth(
        month.value,
        year.value
      );
    }
    setReport(result.data);
    console.log(result);
  };
  useEffect(() => {
    getReport();
  }, [month, year]);
  return (
    <>
      <Row>
        <Col xs={12} md={12}>
          <Card className="card-stats card-raised">
            <CardHeader>
              <h5 className="card-category">Report</h5>
              <Row>
                <Col lg={2} md={3}>
                  <Select
                    className="react-select"
                    classNamePrefix="react-select"
                    placeholder="Select month"
                    options={listMonthShow}
                    value={month}
                    onChange={(e) => setMonth(e)}
                  />
                </Col>
                <Col lg={2} md={3}>
                  <Select
                    className="react-select"
                    classNamePrefix="react-select"
                    placeholder="Select month"
                    options={listYear}
                    value={year}
                    onChange={(e) => setYear(e)}
                  />
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Row>
                <Col style={{ width: `20%` }}>
                  <div className="statistics">
                    <div className="info">
                      <div className="icon icon-primary">
                        <i className="newDate-ui-icons ui-2_chat-round" />
                      </div>
                      <h3 className="info-title">{report.total}</h3>
                      <h6 className="stats-title">Total</h6>
                    </div>
                  </div>
                </Col>
                <Col style={{ width: `20%` }}>
                  <div className="statistics">
                    <div className="info">
                      <div className="icon icon-success">
                        <i className="newDate-ui-icons business_money-coins" />
                      </div>
                      <h3 className="info-title">
                        {/* <small>$</small> */}
                        {report.done}
                      </h3>
                      <h6 className="stats-title">Done</h6>
                    </div>
                  </div>
                </Col>
                <Col style={{ width: `20%` }}>
                  <div className="statistics">
                    <div className="info">
                      <div className="icon icon-info">
                        <i className="newDate-ui-icons users_single-02" />
                      </div>
                      <h3 className="info-title">{report.cancelByCustomer}</h3>
                      <h6 className="stats-title">Cancel by customer</h6>
                    </div>
                  </div>
                </Col>
                <Col style={{ width: `20%` }}>
                  <div className="statistics">
                    <div className="info">
                      <div className="icon icon-danger">
                        <i className="newDate-ui-icons objects_support-17" />
                      </div>
                      <h3 className="info-title">{report.cancelByStaff}</h3>
                      <h6 className="stats-title">Cancel by Staff</h6>
                    </div>
                  </div>
                </Col>
                <Col style={{ width: `20%` }}>
                  <div className="statistics">
                    <div className="info">
                      <div className="icon icon-danger">
                        <i className="newDate-ui-icons objects_support-17" />
                      </div>
                      <h3 className="info-title">{report.absent}</h3>
                      <h6 className="stats-title">Absent</h6>
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}
