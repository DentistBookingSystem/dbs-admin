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
import { Link } from "react-router-dom";
import doctorApi from "api/doctorApi";

function DoctorTable() {
  const [doctorList, setDoctorList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctorList = async () => {
    try {
      const res = await doctorApi.getDoctorList().then((result) => {
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
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {doctorList.map((doctor, index) => {
                        return (
                          <tr key={doctor.key}>
                            <td className="text-center">{index+1}</td>
                            <td>
                              <Link to={`/doctor/${doctor.id}`}>
                                {doctor.name}
                              </Link>
                            </td>
                            <td>{doctor.branch.name}</td>
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
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default DoctorTable;
