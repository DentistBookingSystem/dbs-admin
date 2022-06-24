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
import React, { useEffect } from "react";
import branchApi from "api/branchApi";
import { BrowserRouter as Link } from "react-router-dom";

import PanelHeader from "components/PanelHeader/PanelHeader.js";
import "assets/css/index.css";
import CustomPagination from "views/Widgets/Pagination";

function BranchTable() {
  const [branchList, setBranchList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [branchsPerPage] = React.useState(5);

  const indexOfLastBranch = currentPage * branchsPerPage;
  const indexOfFirstBranch = indexOfLastBranch - branchsPerPage;
  const currentBranchs = branchList.slice(
    indexOfFirstBranch,
    indexOfLastBranch
  );

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const fetchBranchList = async () => {
    try {
      await branchApi.getAll().then((res) => {
        setBranchList(res);
        setLoading(true);
      });
      console.log(branchList);
    } catch (error) {
      console.log("Failed to fetch API", error);
    }
  };

  useEffect(() => {
    fetchBranchList();
  }, []);

  return loading ? (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Branch</CardTitle>
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
                    {currentBranchs.map((branch, index) => {
                      return (
                        <tr>
                          <td className="text-center">{index + 1}</td>
                          <td>
                            <Link to={`/branch/${branch.id}`}>
                              {branch.name}
                            </Link>
                          </td>
                          <td>
                            <div class="stock-status in-stock">
                              <div style={{ color: "green" }}>
                                <i className="fas fa-check-circle"> </i> Active
                              </div>
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
        <CustomPagination
          itemsPerPage={branchsPerPage}
          totalItems={branchList.length}
          paginate={paginate}
        />
      </div>
    </>
  ) : (
    <>
      <PanelHeader size="sm" />
      <center>
        <h2>Loading...</h2>
      </center>
    </>
  );
}

export default BranchTable;
