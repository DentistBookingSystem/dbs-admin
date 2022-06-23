import {
  Table,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalFooter
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
  const [modalMini, setModalMini] = useState(false);
  const [idDelete, setIdDelete] = useState(-1);

  const indexOfLastDiscount = currentPage * discountsPerPage;
  const indexOfFirstDiscount = indexOfLastDiscount - discountsPerPage;
  const currentDiscounts = discountList.slice(
    indexOfFirstDiscount,
    indexOfLastDiscount
  );

  //Pop up alert delete
  const toggleModalMini = () => {
    setModalMini(!modalMini);
  };

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

  //Delete service
  const disableService = async () => {
    setModalMini(!modalMini);
    if (idDelete !== -1) {
      try {
        await discountApi.disableDiscount(idDelete).then((res) => {
          console.log("Dlt: ", res);
          window.location.reload(false);
        });
      } catch (error) {
        console.log("xóa hhk đc", error);
      }

    }
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
                          {discount.status !== 0 ? (
                                <div style={{ color: "green" }}>
                                  <i className="fas fa-check-circle"> </i>{" "}
                                  Active
                                </div>
                              ) : (
                                <div style={{ color: "grey" }}>
                                  <i className="fas fa-check-circle"> </i>{" "}
                                  Inactive
                                </div>
                              )}
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
                              onClick={() => {
                                setModalMini(!modalMini);
                                setIdDelete(discount.id);                                  
                              }}
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
        <Modal
          isOpen={modalMini}
          toggle={toggleModalMini}
          size="mini"
          modalClassName="modal-info"
        >
          <div className="modal-header justify-content-center">
            <div className="modal-profile">
              <i className="now-ui-icons business_badge" />
            </div>
          </div>
          <ModalBody>
            <p>{"Are sure to delete \n this doctor ?"}</p>
 
          </ModalBody>
          <ModalFooter>
            <Button
              color="link"
              className="btn-neutral"
              onClick={disableService}
            >
              Delete
            </Button>{" "}
            <Button
              color="link"
              className="btn-neutral"
              onClick={toggleModalMini}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}

export default DiscountTable;
