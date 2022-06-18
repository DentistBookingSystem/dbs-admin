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

import PanelHeader from "components/PanelHeader/PanelHeader.js";
import "assets/css/index.css";
import React, { useEffect} from "react";
import serviceTypeApi from "api/serviceTypeApi";




function ServiceTypeTable() {
  const list = [];
  const [serviceTypeList, setServiceTypeList] = React.useState(list);
  
  const fetchServiceTypeList = async () => {
    try {
      const response = await serviceTypeApi.getAll();
      console.log(response);
      setServiceTypeList(response);
    } catch (error) {
      console.log("Fetch service list failed", error);
    }
  };

  useEffect(() => {  
    fetchServiceTypeList(); 
  }, []);
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Service Type</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th className="text-center">#</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                    {serviceTypeList.map((serviceType) => {
                      return <tr>
                        <td className="text-center">{serviceType.id}</td>
                        <td>{serviceType.name}</td>
                        <td>
                          <div className="stock-status in-stock">
                            <button className="stock-button">
                              <i className="fa fa-check circle-icon"></i>&nbsp;
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
                      </tr>;
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ServiceTypeTable;
