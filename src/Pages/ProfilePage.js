import React, { useEffect, useState } from "react";

import { Col, Container, Row, Button, Table, Spinner } from "react-bootstrap";
import "./ProfilePage.css";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [allData, setAllData] = useState({});

  useEffect(() => {
    fetch("https://young-cove-58328.herokuapp.com/edit")
      .then((res) => res.json())
      .then((data) => {
        setAllData(data[0]);
      });
  }, []);

  return (
    <div>
      <div>
        <div className="header-nav">
          <div className="container d-flex justify-content-between">
            <Button variant="outline-light" className="btn common-btn">
              Logout
            </Button>
            <Link to="/editProfile">
              <Button variant="outline-light" className="common-btn">
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>
        {Object.keys(allData).length === 0 ? (
          <div
            style={{
              height: "80vh",
              margin: "100px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Spinner animation="grow" />
          </div>
        ) : (
          <div className="container appointment-container">
            <Row xl={3} lg={3} md={2} sm={1} xs={1} className="gx-4">
              <Col>
                <div className="text-center mb-3 d-flex align-items-center flex-column">
                  <img
                    className="profile-img"
                    src={`data:image/*;base64,${allData.profilePic}`}
                    alt=""
                  />
                  <h2>{allData?.name}</h2>
                  <p>{allData?.designation}</p>
                  <p>Age: {allData?.age}</p>
                </div>
              </Col>
              <Col>
                <div className="mb-3 px-2">
                  <h3 className="py-3 mt-4">Work Experience</h3>
                  <Table className="table-cell">
                    <tbody>
                      <tr>
                        <td>Logo:</td>
                        <td>
                          <img
                            style={{
                              height: "60px",
                              width: "60px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                            src={`data:image/*;base64,${allData.companyLogo}`}
                            alt="company logo"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Company:</td>
                        <td>{allData?.company}</td>
                      </tr>
                      <tr>
                        <td>Position:</td>
                        <td>{allData?.position}</td>
                      </tr>
                      <tr>
                        <td>From:</td>
                        <td>{allData?.fromDate}</td>
                      </tr>
                      <tr>
                        <td>To:</td>
                        {!allData?.toDate ? (
                          <td>Continuing</td>
                        ) : (
                          <td>{allData?.toDate}</td>
                        )}
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col>
              <Col>
                <div className="mb-3  px-2">
                  <h3 className="py-3 mt-4">Contact Info</h3>
                  <Table className="table-cell">
                    <tbody>
                      <tr>
                        <td>Email:</td>
                        <td>{allData?.email}</td>
                      </tr>
                      <tr>
                        <td>Phone:</td>
                        <td>{allData?.phone}</td>
                      </tr>
                      <tr>
                        <td>Github:</td>
                        <td>{allData?.github}</td>
                      </tr>
                      <tr>
                        <td>Skype:</td>
                        <td>{allData?.skype}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </div>
        )}
        <div></div>
      </div>

      <Container className="justify-content-center my-5">
        <Row className="d-flex justify-content-center text-center">
          <Col style={{ maxWidth: "400px" }}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfilePage;
