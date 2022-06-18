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
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";

import PanelHeader from "components/PanelHeader/PanelHeader.js";
import "assets/css/index.css";

function BranchTable() {
  const [branchList, setBranchList] = React.useState([]);
  useEffect(() => {
    const fetchBranchList = async () => {
      try {
        const response = await branchApi.getAll();
        setBranchList(response);
        // branchList.map((branch) =>{
        //   console.log(branch.name)
        // })
        console.log(branchList);
      } catch (error) {
        console.log("Failed to fetch API", error);
      }
    };
    fetchBranchList();
  }, []);

  return (
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
                    {branchList.map((branch, index) => {
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
                              <button class="stock-button">
                                <i class="fa fa-check circle-icon"></i>&nbsp;
                                Active
                              </button>
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
      </div>
    </>
  );
}

export default BranchTable;
