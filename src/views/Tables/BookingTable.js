import { useEffect, useState } from "react";

// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Button,
  Table,
  Input,
} from "reactstrap";
import Select from "react-select";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import appointmentApi from "api/AppointmentApi";
import CustomPagination from "views/Widgets/Pagination";
import Appointment from "views/Pages/dbs-page/edit-form/Appointment";
import branchApi from "api/branchApi";
import doctorApi from "api/doctorApi";

const verifiedStatus = (
  <div className="stock-status in-stock">
    <button className="stock-button">
      <i className="fa fa-check circle-icon"></i>&nbsp; Confirmed
    </button>
  </div>
);
const notVerifiedStatus = (
  <div className="stock-status in-stock">
    <button className="stock-button">
      <i className="fa fa- circle-icon"></i>&nbsp; In-process
    </button>
  </div>
);

const listStatus = [
  { value: [0, 1, 2, 3, 4, 5, 6], label: "Select all status" },
  { value: [0, 4], label: "Wating" },
  { value: [1, 5], label: "Done" },
  { value: [2], label: "Absent" },
  { value: [3], label: "Cancel by customer" },
  { value: [6], label: "Cancel by center" },
];
function BookingTable() {
  const [bookingList, setBookingList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(10);
  const [isEdit, setIsEdit] = useState(false);
  const [updateBooking, setUpdateBooking] = useState({});

  const [searchValue, setSearchValue] = useState("");
  const [branchSearch, SetBranchSearch] = useState({
    value: 0,
    label: "Select all branch",
  });
  const [dateSearch, setDateSearch] = useState();
  const [doctorSearch, setDoctorSearch] = useState({
    value: 0,
    label: "Select all doctor",
  });
  const [branchList, setBranchList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [statusSearch, setStatusSearch] = useState({
    value: [0, 4],
    label: "Waiting",
  });

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookingList.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const fetchAppoinmentList = async () => {
    try {
      await appointmentApi.getAppointList().then((res) => {
        console.log(res.content);
        setBookingList(res.content);
      });
    } catch (error) {
      console.log("Failed to fetch API", error);
    }
  };

  useEffect(() => {
    fetchAppoinmentList();
    getAllBranch();
    setDateSearch(getToday());
  }, []);

  const getAllBranch = async () => {
    const result = await branchApi.getAll().then((res) => {
      let x = res.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setBranchList([
        {
          value: "0",
          label: "Select all branch",
        },
        ...x,
      ]);
    });
  };

  useEffect(() => {
    getDoctorByBranchId();
  }, [branchSearch]);

  const getDoctorByBranchId = async () => {
    if (branchSearch.value === 0) {
      setDoctorList(null);
      return;
    }
    var data;
    data = {
      branchId: branchSearch.value,
      name: null,
      status: 0,
    };
    const result = doctorApi.filterDoctor(data).then((res) => {
      let x = res.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setDoctorList([
        {
          value: 0,
          label: "Select all doctor",
        },
        ...x,
      ]);
    });
  };

  const getToday = (separator = "") => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}-${month < 10 ? `0${month}` : `${month}`}-${
      date < 10 ? `0${date}` : `${date}`
    }`;
  };

  const formatDate = (dateValue) => {
    const separator = "";
    console.log(dateValue);
    let date = dateValue.valueAsDate.getDate();
    let month = dateValue.valueAsDate.getMonth() + 1;
    let year = dateValue.valueAsDate.getFullYear();

    return `${year}${separator}-${month < 10 ? `0${month}` : `${month}`}-${
      date < 10 ? `0${date}` : `${date}`
    }`;
  };

  useEffect(() => {
    filterBookingList();
  }, [searchValue, branchSearch, doctorSearch, statusSearch, dateSearch]);

  const filterBookingList = async () => {
    var data;
    data = {
      status: statusSearch.value,
      date: dateSearch ? dateSearch : null,
      phone: searchValue,
      branchId: branchSearch.value,
      doctorId: doctorSearch.value,
      serviceId: 0,
    };
    console.log("data", data);
    const result = await appointmentApi
      .getAppointListForAdmin(data)
      .then((res) => {
        console.log("appointment", res.data);
        setBookingList(res.data);
        setCurrentPage(1);
      });
  };

  return (
    <>
      {isEdit ? (
        <Appointment {...updateBooking} />
      ) : (
        <>
          <div className="content">
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Appoinment</CardTitle>
                    <div>
                      <Row className="justify-content-center mb-3">
                        <Col md={3} className="text-center">
                          <label
                            style={{
                              fontSize: `14px`,
                              fontWeight: `bold`,
                            }}
                          >
                            Search phone
                          </label>
                        </Col>
                        <Col md={5}>
                          <Input
                            style={{ fontSize: `15px` }}
                            class="form-control p-2"
                            id="inputdefault"
                            type="text"
                            value={searchValue}
                            placeholder="Enter the number phone"
                            onChange={(e) => {
                              setSearchValue(e.target.value.trim());
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="justify-content-center mb-3">
                        <Col md={3} className="text-center">
                          <label
                            style={{
                              fontSize: `14px`,
                              fontWeight: `bold`,
                            }}
                          >
                            Search date
                          </label>
                        </Col>
                        <Col md={5}>
                          <Input
                            style={{ fontSize: `15px` }}
                            class="form-control p-2"
                            id="inputdefault"
                            type="date"
                            value={dateSearch}
                            pattern="yyyy-mm-dd"
                            placeholder="Enter the date"
                            onChange={(e) => {
                              setDateSearch(e.target.value);
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="justify-content-center mb-3">
                        <Col md={3} className="text-center">
                          {" "}
                          <label
                            style={{ fontSize: `14px`, fontWeight: `bold` }}
                          >
                            Branch
                          </label>
                        </Col>
                        <Col md={5}>
                          <Select
                            className="react-select"
                            classNamePrefix="react-select"
                            placeholder="Select branch "
                            value={branchSearch}
                            options={branchList}
                            onChange={(e) => {
                              SetBranchSearch(e);
                            }}
                            defaultValue="0"
                          />
                        </Col>
                      </Row>

                      <Row className="justify-content-center mb-3">
                        <Col md={3} className="text-center">
                          <label
                            style={{ fontSize: `14px`, fontWeight: `bold` }}
                          >
                            Doctor in branch
                          </label>
                        </Col>
                        <Col md={5}>
                          <Select
                            className="react-select"
                            classNamePrefix="react-select"
                            value={doctorSearch}
                            placeholder="Enter the number phone"
                            onChange={(e) => {
                              setDoctorSearch(e);
                            }}
                            options={doctorList}
                          />
                        </Col>
                      </Row>
                      <Row className="justify-content-center">
                        <Col md={3} className="text-center">
                          {" "}
                          <label
                            for="inputdefault"
                            style={{ fontSize: `14px`, fontWeight: `bold` }}
                          >
                            Status
                          </label>
                        </Col>
                        <Col md={5}>
                          <Select
                            className="react-select"
                            classNamePrefix="react-select"
                            value={statusSearch}
                            placeholder="Select status"
                            options={listStatus}
                            onChange={(value) => {
                              setStatusSearch(value);
                            }}
                          />
                        </Col>
                      </Row>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <Table responsive>
                      <thead className="text-primary">
                        <tr>
                          <th className="text-center">#</th>
                          <th style={{ fontWeight: `bold` }}>Patient</th>
                          <th style={{ fontWeight: `bold` }}>Date</th>
                          <th style={{ fontWeight: `bold` }}>Shift</th>
                          <th style={{ fontWeight: `bold` }}>Doctor</th>
                          <th style={{ fontWeight: `bold` }}>Status</th>
                          {/* <th
                            style={{ fontWeight: `bold`, textAlign: `center` }}
                          >
                            Actions
                          </th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {currentBookings.map((booking, index) => {
                          return (
                            <tr>
                              <td className="text-center">{index + 1}</td>
                              <td>{booking.account.fullName}</td>
                              <td>{booking.appointmentDate}</td>
                              <td>{booking.appointmentTime}</td>
                              <td>{booking.doctor.name}</td>
                              <td>
                                {booking.status === 0 ||
                                booking.status === 4 ? (
                                  <div style={{ color: "green" }}>
                                    <i className="fas fa-check-circle"> </i>{" "}
                                    Watting
                                  </div>
                                ) : null}
                                {booking.status === 1 ||
                                booking.status === 5 ? (
                                  <div style={{ color: "green" }}>
                                    <i className="fas fa-check-circle"> </i>{" "}
                                    Done
                                  </div>
                                ) : null}
                                {booking.status === 2 ? (
                                  <div style={{ color: "green" }}>
                                    <i className="fas fa-check-circle"> </i>{" "}
                                    Absent
                                  </div>
                                ) : null}
                                {booking.status === 3 ? (
                                  <div style={{ color: "gray" }}>
                                    <i className="fas fa-check-circle"> </i>{" "}
                                    Cancel by customer
                                  </div>
                                ) : null}
                                {booking.status === 6 ? (
                                  <div style={{ color: "gray" }}>
                                    <i className="fas fa-check-circle"> </i>{" "}
                                    Cancel by center
                                  </div>
                                ) : null}
                              </td>
                              {/* <td className="text-center btns-mr-5">
                                <Button
                                  className="btn-icon"
                                  color="info"
                                  size="sm"
                                  type="button"
                                >
                                  <i className="now-ui-icons users_single-02" />
                                </Button>
                                <Button
                                  className="btn-icon"
                                  color="success"
                                  size="sm"
                                  type="button"
                                  onClick={() => {
                                    setIsEdit(!isEdit);
                                    setUpdateBooking(booking);
                                  }}
                                >
                                  <i className="now-ui-icons ui-2_settings-90" />
                                </Button>

                                <Button
                                  className="btn-icon"
                                  color="danger"
                                  size="sm"
                                  type="button"
                                >
                                  <i className="now-ui-icons ui-1_simple-remove" />
                                </Button>
                              </td> */}
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
                <CustomPagination
                  itemsPerPage={bookingsPerPage}
                  totalItems={bookingList.length}
                  paginate={paginate}
                />
              </Col>
            </Row>
          </div>
        </>
      )}
    </>
  );
}

export default BookingTable;
