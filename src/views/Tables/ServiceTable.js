import {
  Table,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
  Modal as DangerModal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import React, { useEffect, useState } from "react";

import PanelHeader from "components/PanelHeader/PanelHeader.js";
import serviceApi from "api/serviceApi.js";
import "assets/css/index.css";
import { Modal, Image } from "react-bootstrap";
import CustomPagination from "views/Widgets/Pagination";

function ServiceTable() {
  const [serviceList, setServiceList] = React.useState([]);
  const [service, setService] = React.useState({});
  const [serviceType, setServiceType] = React.useState("");
  const [image, setImage] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [lgShow, setLgShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(5);
  const [modalMini, setModalMini] = useState(false);
  const [idDelete, setIdDelete] = useState(-1);

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = serviceList.slice(
    indexOfFirstService,
    indexOfLastService
  );

  //Pop up alert delete
  const toggleModalMini = () => {
    setModalMini(!modalMini);
  };

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const fetchServiceList = async () => {
    try {
      const response = await serviceApi.getServiceList();
      setServiceList(response);
      setLoading(false);
      console.log(loading);
    } catch (error) {
      setLoading(true);
      console.log("Fetch service list failed", error);
    }
  };

  const loadInforService = async (id) => {
    console.log(id);
    try {
      await serviceApi.getService(id).then((res) => {
        console.log(res.serviceType.name);
        setServiceType(res.serviceType.name);
        setService(res);
      });
    } catch (error) {
      console.log("Can not load service info", error);
    }
    return null;
  };

  const disableService = async () => {
    setModalMini(!modalMini);
    if (idDelete !== -1) {
      try {
        await serviceApi.disableService(idDelete).then((res) => {
          console.log("đã xóa");
          window.location.reload(false);
        });
      } catch (error) {
        console.log("Can not delete service: ", error);
      }
    }
  };

  useEffect(() => {
    fetchServiceList();
  }, []);

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        {loading ? (
          <div>"Loading..." </div>
        ) : (
          <>
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Service</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Table responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Service type</th>
                          <th>Status</th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentServices.map((service, index) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>
                                {/* <Link to={`/service/${service.id}`}> */}
                                {service.name}
                                {/* </Link> */}
                              </td>

                              <td>{service.serviceType.name}</td>
                              <td>
                              {service.status !== 0 ? (
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
                                  size="sm"
                                  type="button"
                                  onClick={() => {
                                    setLgShow(true);
                                    loadInforService(service.id);
                                  }}
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
                                  onClick={() => {
                                    setModalMini(!modalMini);
                                    setIdDelete(service.id);                                  
                                  }}
                                  disabled = {service.status !== 0 ? false : true}
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
              </Col>
              <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
                // scrollable={true}
              >
                <div color="info" className="text-center mt-4 ml-2">
                  <h2 className="text-info" style={{ paddingBottom: 0 }}>
                    Service Detail
                  </h2>
                </div>
                <div>
                  <Modal.Body>
                    {service != null ? (
                      <Col className="mt-0 ml-4">
                        <Row className="justify-content-md-center">
                          <Col xs={20} sm={2} md={4}>
                            <Image
                              src={
                                "https://drive.google.com/uc?id=" + service.url
                              }
                              rounded
                            />
                          </Col>
                        </Row>

                        <Row>
                          <Col className="md-12 mt-0">
                            <span>
                              <b>Service: </b> {service.name}
                            </span>
                          </Col>
                          <Col>
                            <span>
                              <b>Service type: </b> {serviceType}
                            </span>
                          </Col>
                        </Row>
                        <Row className="mt-2">
                          <Col>
                            <b>Price: </b> {service.min_price}đ -{" "}
                            {service.max_price}đ
                          </Col>
                          <Col>
                            <b>Duration: </b> {service.estimated_time} hour(s)
                          </Col>
                        </Row>
                        <Row className="mt-2">
                          <Col>
                            <span>
                              <b>Mô tả: </b>
                            </span>
                            <p>{service.description}</p>
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
            </Row>
          </>
        )}
        <CustomPagination
          itemsPerPage={servicesPerPage}
          totalItems={serviceList.length}
          paginate={paginate}
        />
        <DangerModal
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
            <p>{"Are sure to delete \n this Service ?"}</p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="link"
              className="btn-neutral"
              onClick={disableService}
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
        </DangerModal>
      </div>
    </>
  );
}

export default ServiceTable;
