import {
  Table,
  UncontrolledTooltip,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
  // Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { useEffect, useState } from "react";
import doctorApi from "api/doctorApi";
import CustomPagination from "views/Widgets/Pagination";
import { Modal, Image } from "react-bootstrap";

function DoctorTable() {
  const [doctorList, setDoctorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(5);
  const [modalMini, setModalMini] = useState(false);
  const [idDelete, setIdDelete] = useState(-1);
  const [doctorDetail, setDoctorDetail] = useState(null);
  const [lgShow, setLgShow] = useState(false);
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctorList.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );

  //Pop up alert delete
  const toggleModalMini = () => {
    setModalMini(!modalMini);
  };

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const deleteDoctor = async () => {
    setModalMini(!modalMini);
    if (idDelete !== -1) {
      try {
        await doctorApi.disableDoctor(idDelete).then((res) => {
          console.log("Dlt: ", res);
          window.location.reload(false);
        });
      } catch (error) {
        console.log("xóa hhk đc", error);
      }
    }
  };

  const fetchDoctorList = async () => {
    try {
      await doctorApi.getDoctorList().then((result) => {
        setDoctorList(result);
        setLoading(false);
        console.log(result);
      });
    } catch (error) {
      setLoading(true);
      console.log("Fetch doctor list failed", error);
    }
  };
  useEffect(() => {
    fetchDoctorList();
  }, []);

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Doctor</CardTitle>
              </CardHeader>
              <CardBody>
                {loading ? (
                  <h2>Loading...</h2>
                ) : (
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th
                          style={{ fontWeight: `bold` }}
                          className="text-center"
                        >
                          #
                        </th>
                        <th style={{ fontWeight: `bold` }}>Name</th>
                        <th style={{ fontWeight: `bold` }}>Branch</th>
                        <th style={{ fontWeight: `bold` }}>Status</th>
                        <th
                          style={{ fontWeight: `bold` }}
                          className="text-center"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentDoctors.map((doctor, index) => {
                        return (
                          <tr key={doctor.key}>
                            <td className="text-center">{index + 1}</td>
                            <td>{doctor.name}</td>
                            <td>{doctor.branch.name}</td>
                            <td>
                              {doctor.status !== 0 ? (
                                <div style={{ color: "green" }}>
                                  <i className="fas fa-check-circle"> </i>{" "}
                                  Active
                                </div>
                              ) : (
                                <div style={{ color: "grey" }}>
                                  <i className="fas fa-check-circle"> </i>{" "}
                                  Inactive
                                </div>
                              )}
                            </td>
                            <td className="text-center btns-mr-5">
                              <Button
                                className="btn-icon"
                                color="info"
                                id="tooltip590841497"
                                size="sm"
                                type="button"
                                onClick={() => {
                                  setLgShow(true);
                                  setDoctorDetail(doctor);
                                  console.log(doctor);
                                }}
                              >
                                <i className="now-ui-icons users_single-02" />
                              </Button>
                              <UncontrolledTooltip
                                delay={0}
                                target="tooltip590841497"
                              >
                                View
                              </UncontrolledTooltip>
                              <Button
                                className="btn-icon"
                                color="success"
                                id="tooltip26024663"
                                size="sm"
                                type="button"
                              >
                                <i className="now-ui-icons ui-2_settings-90" />
                              </Button>
                              <UncontrolledTooltip
                                delay={0}
                                target="tooltip26024663"
                              />
                              <Button
                                className="btn-icon"
                                color="danger"
                                size="sm"
                                type="button"
                                disabled={doctor.status !== 0 ? false : true}
                                // {doctor.status !== 0? disabled}
                                onClick={() => {
                                  setModalMini(!modalMini);
                                  setIdDelete(doctor.id);
                                }}
                              >
                                <i className="now-ui-icons ui-1_simple-remove" />
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <CustomPagination
          itemsPerPage={doctorsPerPage}
          totalItems={doctorList.length}
          paginate={paginate}
        />
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
          // scrollable={true}
        >
          <div color="info" className="text-center mt-4">
            <h2 className="text-info text-center" style={{ paddingBottom: 0 }}>
              Branch Detail
            </h2>
          </div>
          <div>
            <Modal.Body>
              {doctorDetail != null ? (
                <Col className="m-3">
                  <Row className="justify-content-center m-0">
                    <Col xs={20} sm={2} md={5}>
                      <Image
                        src={
                          "https://drive.google.com/uc?id=" + doctorDetail.url
                        }
                        // rounded
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={3} mg={3} xs={3}>
                      <label>
                        <b>Name: </b>
                      </label>
                    </Col>
                    <Col className="mt-0">
                      <span>{doctorDetail.name}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={3} mg={3} xs={3}>
                      <label>
                        <b>Branch: </b>
                      </label>
                    </Col>
                    <Col className="mt-0">
                      <span>
                        {doctorDetail.branch.name} -{" "}
                        {doctorDetail.branch.district.name},{" "}
                        {doctorDetail.branch.district.province.name}
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={3} mg={3} xs={3}>
                      <label>
                        <b>Description: </b>
                      </label>
                    </Col>
                    <Col className="mt-0">
                      <span>{doctorDetail.description}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={3} mg={3} xs={3}>
                      <label>
                        <b>Status: </b>
                      </label>
                    </Col>
                    <Col className="mt-0">
                      <span>
                        {doctorDetail.status !== 0 ? (
                          <div style={{ color: "green" }}>
                            <i className="fas fa-check-circle"> </i> Active
                          </div>
                        ) : (
                          <div style={{ color: "grey" }}>
                            <i className="fas fa-check-circle"> </i> Inactive
                          </div>
                        )}
                      </span>
                    </Col>
                  </Row>
                </Col>
              ) : (
                <h3>No details</h3>
              )}
            </Modal.Body>
          </div>
          <div className="text-center btns-mr-5">
            <Row>
              <Col>
                <Button color="info" onClick={() => setLgShow(false)}>
                  Close
                </Button>
              </Col>
              <Col>
                <Button color="primary" onClick={() => setLgShow(false)}>
                  Edit
                </Button>
              </Col>
            </Row>
          </div>
        </Modal>
        <Modal
          isOpen={modalMini}
          toggle={toggleModalMini}
          size="mini"
          modalClassName="modal-info"
        >
          <div className="modal-header justify-content-center">
            <div className="modal-profile">
              <i className="now-ui-icons business_badge" />
            </div>
          </div>
          <ModalBody>
            <p>{"Are sure to delete \n this doctor ?"}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="link" className="btn-neutral" onClick={deleteDoctor}>
              Delete
            </Button>{" "}
            <Button
              color="link"
              className="btn-neutral"
              onClick={toggleModalMini}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}

export default DoctorTable;
