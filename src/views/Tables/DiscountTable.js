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
import discountApi from "api/discountApi";
import { useEffect, useState } from "react";

function DiscountTable() {
  const [discountList, setDiscountList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDiscountList = async () => {
    try {
      await discountApi.getDiscountList().then((result) => {
        console.log(result);
        setDiscountList(result);
        setLoading(false);
      });
    } catch (error) {
      console.log("Fetch discount list failed", error);
    }
  };
  const editDiscount = (id) => {
     console.log("discount id: ", id)
  }

  useEffect(() => {
    fetchDiscountList();
  }, []);
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Discount</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th className="text-center">#</th>
                      <th>Name</th>
                      <th>Start date</th>
                      <th>End date</th>
                      <th>Status</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {discountList.map((discount, index) => {
                      return (
                        <tr>
                          <td className="text-center" key={discount.id}>{index + 1}</td>
                          <td>{discount.name}</td>
                          <td>{discount.start_date}</td>
                          <td>{discount.end_date}</td>
                          <td>{discount.status}</td>
                          <td className="text-center btns-mr-5">
                            <Button
                              className="btn-icon"
                              color="success"
                              onClick={() => editDiscount(discount.id)}
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
        </Row>
      </div>
    </>
  );
}

export default DiscountTable;