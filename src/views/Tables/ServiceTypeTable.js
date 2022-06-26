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
import React, { useEffect } from "react";
import serviceTypeApi from "api/serviceTypeApi";
import CustomPagination from "views/Widgets/Pagination";

function ServiceTypeTable() {
  const list = [];
  const [serviceTypeList, setServiceTypeList] = React.useState(list);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [serviceTypesPerPage] = React.useState(5);

  const indexOfLastServiceType = currentPage * serviceTypesPerPage;
  const indexOfFirstServiceType = indexOfLastServiceType - serviceTypesPerPage;
  const currentServiceTypes = serviceTypeList.slice(
    indexOfFirstServiceType,
    indexOfLastServiceType
  );

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

                      <th>Description</th>

                      <th>Status</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentServiceTypes.map((serviceType) => {
                      return (
                        <tr>
                          <td className="text-center">{serviceType.id}</td>
                          <td>{serviceType.name}</td>
                          <td>{serviceType.description}</td>
                          <td>
                            <div style={{ color: "green" }}>
                              <i className="fas fa-check-circle"> </i> Active
                            </div>
                          </td>
                          <td className="text-center btns-mr-5">
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
                            >
                              Edit
                            </UncontrolledTooltip>
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
                            >
                              Delete
                            </UncontrolledTooltip>
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
        <CustomPagination
          itemsPerPage={serviceTypesPerPage}
          totalItems={serviceTypeList.length}
          paginate={paginate}
        />
      </div>
    </>
  );
}

export default ServiceTypeTable;
