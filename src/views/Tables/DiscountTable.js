import {
  Table,
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
import CustomPagination from "views/Widgets/Pagination";

function DiscountTable() {
  const [discountList, setDiscountList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [discountsPerPage] = useState(5);

  const indexOfLastDiscount = currentPage * discountsPerPage;
  const indexOfFirstDiscount = indexOfLastDiscount - discountsPerPage;
  const currentDiscounts = discountList.slice(
    indexOfFirstDiscount,
    indexOfLastDiscount
  );

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
    console.log("discount id: ", id);
  };

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
                    {currentDiscounts.map((discount, index) => {
                      return (
                        <tr>
                          <td className="text-center" key={discount.id}>
                            {index + 1}
                          </td>
                          <td>{discount.name}</td>
                          <td>{discount.startDate}</td>
                          <td>{discount.endDate}</td>
                          <td>
                            <div style={{ color: "green" }}>
                              <i className="fas fa-check-circle"> </i> Active
                            </div>
                          </td>
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
        <CustomPagination
          itemsPerPage={discountsPerPage}
          totalItems={discountList.length}
          paginate={paginate}
        />
      </div>
    </>
  );
}

export default DiscountTable;
