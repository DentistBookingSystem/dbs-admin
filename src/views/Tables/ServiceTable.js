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
import React, { useEffect, useState, createContext, useContext } from "react";

import PanelHeader from "components/PanelHeader/PanelHeader.js";
import serviceApi from "api/serviceApi.js";
import "assets/css/index.css";
import { Link } from "react-router-dom";


function ServiceTable() {
  const service_type_list = 3;
  const [serviceList, setServiceList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);


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
                              <Link to={`/service/${service.id}`}>
                                {service.name}
                              </Link>
                            </td>

                            <td>{service.serviceType.name}</td>
                            <td>
                              <div class="stock-status in-stock">
                                <button class="stock-button">
                                  <i class="fa fa-check circle-icon"></i>&nbsp;
                                  Active
                                </button>
                              </div>
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
                                id="tooltip930083782"
                                size="sm"
                                type="button"
                              >
                                <i className="now-ui-icons ui-1_simple-remove" />
                              </Button>
                              <UncontrolledTooltip
                                delay={0}
                                target="tooltip930083782"
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
}

export default ServiceTable;
