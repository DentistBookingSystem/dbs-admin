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
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { useEffect, useState } from "react";
import doctorApi from "api/doctorApi";
import CustomPagination from "views/Widgets/Pagination";

function DoctorTable() {
  const [doctorList, setDoctorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(5);
  const [modalMini, setModalMini] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [idDelete, setIdDelete] =  useState(-1);

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
                        <th className="text-center">#</th>
                        <th>Name</th>
                        <th>Branch</th>
                        <th>Status</th>
                        <th className="text-center">Actions</th>
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
                              >
                                <i className="now-ui-icons users_single-02" />
                              </Button>
                              <UncontrolledTooltip
                                delay={0}
                                target="tooltip590841497"
                              />
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
                                disabled = {doctor.status !== 0 ? false : true}
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
            <Button
              color="link"
              className="btn-neutral"
              onClick={deleteDoctor}
            >
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
