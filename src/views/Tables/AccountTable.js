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
import { useEffect, useState } from "react";
import AccountApi from "api/AccountApi";
import CustomPagination from "views/Widgets/Pagination";

function AccountTable() {
  const [accountList, setAccountList] = useState([]);
  const [roleId, setRoleId] = useState(1);
  const [status, setStatus] = useState(1);
  const [phoneSearch, setPhoneSearch] = useState("");
  const [accountPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastAccount = currentPage * accountPerPage;
  const indexOfFirstAccount = indexOfLastAccount - accountPerPage;
  const currentAccount = accountList.slice(
    indexOfFirstAccount,
    indexOfLastAccount
  );

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const getAccountListByRoleIdAndStatus = async () => {
    try {
      const result = await AccountApi.GetAccountByRoleIdAndStatus(
        roleId,
        status,
        phoneSearch
      );
      if (result) {
        console.log(result);
        setAccountList(result);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAccountListByRoleIdAndStatus(roleId, status, phoneSearch);
  }, []);

  useEffect(() => {
    getAccountListByRoleIdAndStatus(roleId, status, "");
    setPhoneSearch("");
    checkActive();
    addActive();
  }, [roleId, status]);

  useEffect(() => {
    getAccountListByRoleIdAndStatus(roleId, status, phoneSearch);
  }, [phoneSearch]);

  const checkActive = () => {
    for (let i = 1; i <= 3; i++) {
      document.getElementById(`role${i}`).classList.remove("active-link-role");
    }
    document.getElementById(`role${roleId}`).classList += " active-link-role";
  };

  const addActive = () => {
    for (let i = 1; i <= 2; i++) {
      document
        .getElementById(`button${i}`)
        .classList.remove("active-button-status");
    }
    console.log(status);
    document.getElementById(`button${status}`).classList +=
      " active-button-status";
  };

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={9} md={12}>
            <Card>
              <CardHeader className="d-flex">
                <CardTitle
                  id="role3"
                  tag="h4"
                  className="pl-2 pr-2"
                  onClick={() => {
                    // checkActive(3);
                    setRoleId(3);
                  }}
                >
                  <span>Staff</span> /
                </CardTitle>
                <CardTitle
                  id="role1"
                  tag="h4"
                  className="pl-2 pr-2"
                  onClick={() => {
                    // checkActive(1);
                    setRoleId(1);
                  }}
                >
                  <span>Admin</span> /
                </CardTitle>
                <CardTitle
                  id="role2"
                  tag="h4"
                  className="pl-2 pr-2"
                  onClick={() => {
                    setRoleId(2);
                    // checkActive(2);
                  }}
                >
                  <span>Patient</span> /
                </CardTitle>
              </CardHeader>
              <CardHeader className="d-flex p-0 pl-4  ">
                <CardTitle className="mt-0 ">
                  <button
                    id="button1"
                    className="m-0 mr-5"
                    onClick={() => {
                      setStatus(1);
                    }}
                  >
                    Active
                  </button>
                </CardTitle>
                <CardTitle className="mt-0 ">
                  <button
                    className="m-0 mr-5"
                    id="button2"
                    onClick={() => {
                      setStatus(2);
                    }}
                  >
                    Inactive
                  </button>
                </CardTitle>
              </CardHeader>
              <CardHeader className="d-flex p-0">
                <Row
                  style={{
                    width: `100vw`,
                    marginLeft: `10px`,
                    fontSize: `20px`,
                  }}
                >
                  <Col lg={3}>
                    <input
                      type="number"
                      className="m-0"
                      style={{
                        width: `100%`,
                        margin: `0px 10px`,
                        padding: `5px`,
                      }}
                      placeholder="Phone number"
                      onChange={(e) => {
                        setPhoneSearch(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                {currentAccount.length !== 0 ? (
                  <Table responsive>
                    <thead className="text-primary text-center">
                      <tr style={{ fontWeight: `bold` }}>
                        <th
                          className="text-center"
                          style={{ fontWeight: `bold` }}
                        >
                          #
                        </th>
                        <th style={{ fontWeight: `bold` }}>Name</th>
                        <th style={{ fontWeight: `bold` }}>Phone</th>
                        <th style={{ fontWeight: `bold` }}>Gender</th>
                        <th style={{ fontWeight: `bold` }}>Email</th>
                        <th style={{ fontWeight: `bold` }}>Birth</th>
                        <th style={{ fontWeight: `bold` }}>Address</th>
                        {roleId === 3 ? (
                          <th
                            style={{ fontWeight: `bold` }}
                            className="text-center"
                          >
                            Actions
                          </th>
                        ) : (
                          ""
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {accountList.map((account, key) => {
                        return (
                          <tr key={account.id} className="text-center">
                            <td>{key + 1}</td>
                            <td>
                              <Row>
                                <Col>{account.fullName}</Col>
                              </Row>
                            </td>
                            <td>
                              <Row>
                                <Col>{account.phone}</Col>
                              </Row>
                            </td>
                            <td>
                              <Row className="text-center">
                                <Col>{account.gender ? "Nam" : "Nữ"}</Col>
                              </Row>
                            </td>
                            <td>
                              <Row>
                                <Col>
                                  {!account.email ? "N/A" : account.email}
                                </Col>
                              </Row>
                            </td>
                            <td>
                              <Row>
                                <Col>{account.dateOfBirth}</Col>
                              </Row>
                            </td>
                            <td>
                              <Row>
                                <Col>
                                  {account.district.name},{" "}
                                  {account.district.province.name}
                                </Col>
                              </Row>
                            </td>
                            {roleId === 3 ? (
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
                            ) : (
                              ""
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                ) : (
                  "No account"
                )}
              </CardBody>
            </Card>
            <CustomPagination
              itemsPerPage={accountPerPage}
              totalItems={accountList.length}
              paginate={paginate}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AccountTable;
