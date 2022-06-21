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
/*eslint-disable*/
import {useEffect, useState } from "react";

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
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import appointmentApi from "api/AppointmentApi";
import CustomPagination from "views/Widgets/Pagination";

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
function BookingTable() {
  const [bookingList, setBookingList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(10);

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
  }, []);

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Appoinment</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th className="text-center">#</th>
                      <th>Patient</th>
                      <th>Date</th>
                      <th>Shift</th>
                      <th>Doctor</th>
                      <th>Status</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentBookings.map((booking, index) => {
                      return (
                        <tr>
                          <td className="text-center">{index + 1}</td>
                          <td>{booking.account.phone}</td>
                          <td>{booking.date}</td>
                          <td>{booking.shift}</td>
                          <td>{booking.doctor.name}</td>
                          <td>
                            {booking.status === 0 ? (
                              <div style={{ color: "green" }}>
                                <i className="fas fa-check-circle"> </i>{" "}
                                Accepted
                              </div>
                            ) : (
                              <div style={{ color: "grey" }}>
                                <i className="fas fa-check-circle"> </i> Done
                              </div>
                            )}
                          </td>
                          <td className="text-center btns-mr-5">
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
                          </td>
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
  );
}

export default BookingTable;
