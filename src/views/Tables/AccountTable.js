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
import { useState } from "react";

function AccountTable() {
  const [accountList, setAccountList] = useState([]);
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={9} md={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Account</CardTitle>
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
                    <tr>
                      <td className="text-center">1</td>
                      <td>Andrew Mike</td>
                      <td>Develop</td>
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

export default AccountTable;
