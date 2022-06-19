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
} from "reactstrap";
import React, { useEffect, useState } from "react";

import PanelHeader from "components/PanelHeader/PanelHeader.js";
import serviceApi from "api/serviceApi.js";
import "assets/css/index.css";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

function ServiceTable() {
  const [serviceList, setServiceList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [lgShow, setLgShow] = useState(false);

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
        console.log("Service: ", res);
      });
    } catch (error) {
      console.log("Can not load service info", error);
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
                        {serviceList.map((service, index) => {
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
                                <div className="stock-status in-stock">
                                  <button className="stock-button">
                                    <i className="fa fa-check circle-icon"></i>
                                    &nbsp; Active
                                  </button>
                                </div>
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
              >
                <div color="info" className="text-center mt-4 ml-2">
                    <h2 className="text-info" style={{paddingBottom: 0}}>
                      Service Detail
                    </h2>
                </div>
                <div>
                <Modal.Body>
                  <Col  className="mt-0 ml-4">
                    <Row>
                      <Col className="md-12 mt-0">
                        <span>
                          <b>Service: </b>Nhổ răng khôn
                        </span>
                      </Col>
                      <Col>
                        <span>
                          <b>Service type: </b> Nhổ răng
                        </span>
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col>
                        <b>Price: </b> 100000đ - 1000000đ
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col>
                        <span>
                          <b>Mô tả: </b>
                        </span>
                        <p>
                          I will be the leader of a company that ends up being
                          worth billions of dollars, because I got the answers.
                          I understand culture. I am the nucleus. I think that’s
                          a responsibility that I have, to push possibilities,
                          to show people, this is the level that things could be
                          at.
                        </p>
                      </Col>
                    </Row>
                  </Col>
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
                  </Button></Col>
                 </Row>
                </div>
              </Modal>
            </Row>
          </>
        )}
      </div>
    </>
  );
}

export default ServiceTable;
