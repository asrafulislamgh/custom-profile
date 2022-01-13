import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./EditProfile.css";
import {
  Col,
  Container,
  Form,
  FormControl,
  Row,
  Button,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const EditProfile = () => {
  const [toggleValue, setToggleValue] = useState(false);
  const [allData, setAllData] = useState({});

  useEffect(() => {
    fetch("https://young-cove-58328.herokuapp.com/edit")
      .then((res) => res.json())
      .then((data) => {
        setAllData(data[0]);
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formData = new FormData();

  const onSubmit = (data) => {
    const oldDate = new Date(data.fromDate);
    if (toggleValue) {
      data.toDate = "";
    }
    if (!toggleValue) {
      const toDate = new Date(data.toDate);
      if (oldDate.getTime() >= toDate.getTime()) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Starting date should be smaller than the ending date!",
        });
      }
    }
    const today = new Date();
    if (oldDate.getTime() >= today.getTime()) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Starting date can't be bigger than today!",
      });
    }

    data.profilePic = data.profilePic[0];
    data.companyLogo = data.companyLogo[0];

    formData.append("name", data.name);
    formData.append("age", data.age);
    formData.append("designation", data.designation);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("profilePic", data.profilePic);
    formData.append("skype", data.skype);
    formData.append("company", data.company);
    formData.append("position", data.position);
    formData.append("companyLogo", data.companyLogo);
    formData.append("fromDate", data.fromDate);
    formData.append("toDate", data.toDate);
    formData.append("github", data.github);

    fetch(`https://young-cove-58328.herokuapp.com/edit/${allData._id}`, {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire(
          "Good job!",
          "Your Profile is updated successfully!",
          "success"
        );
      });
    console.log(data);
  };
  const disableToggle = (value) => {
    document.getElementById("endingDate").disabled = value;
    setToggleValue(value);
  };

  return (
    <div>
      <div className="header-nav">
        <div className="container d-flex justify-content-between">
          <Button variant="outline-light" className="btn common-btn">
            Logout
          </Button>
          <Link to="/">
            <Button variant="outline-light" className="common-btn me-auto">
              View Profile
            </Button>
          </Link>
        </div>
      </div>
      <Container className="justify-content-center my-5">
        <Row className="d-flex justify-content-center text-center">
          <Col style={{ maxWidth: "400px" }}>
            <h3 className="py-3">Edit Your Profile</h3>

            {Object.keys(allData).length === 0 ? (
              <div
                style={{
                  height: "80vh",
                  margin: "100px",
                }}
              >
                <Spinner animation="grow" />
              </div>
            ) : (
              <Form onSubmit={handleSubmit(onSubmit)}>
                <p className="mt-3">Personal Information</p>
                <FormControl
                  required
                  {...register("name")}
                  className="input-field mb-3"
                  placeholder="Name"
                  aria-label="name"
                  defaultValue={allData?.name}
                  aria-describedby="basic-addon2"
                />
                <FormControl
                  required
                  {...register("designation")}
                  className="input-field mb-3"
                  placeholder="Designation"
                  aria-label="designation"
                  defaultValue={allData?.designation}
                  aria-describedby="basic-addon2"
                />
                <FormControl
                  required
                  {...register("age")}
                  className="input-field mb-3"
                  placeholder="Age"
                  aria-label="age"
                  type="number"
                  min="0"
                  max="120"
                  defaultValue={allData?.age}
                  aria-describedby="basic-addon2"
                />
                <FormControl
                  required
                  {...register("profilePic")}
                  className="input-field mb-3"
                  placeholder="Upload your profile pic"
                  aria-label="profilePic"
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  aria-describedby="basic-addon2"
                />
                <p className="mt-5">Last Working Experience</p>
                <FormControl
                  required
                  {...register("companyLogo")}
                  className="input-field mb-3"
                  placeholder="Upload the company logo"
                  aria-label="companyLogo"
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  aria-describedby="basic-addon2"
                />
                <FormControl
                  required
                  {...register("company")}
                  className="input-field mb-3"
                  placeholder="Company"
                  aria-label="company"
                  defaultValue={allData?.company}
                  aria-describedby="basic-addon2"
                />
                <FormControl
                  required
                  {...register("position")}
                  className="input-field mb-3"
                  placeholder="Position"
                  aria-label="position"
                  defaultValue={allData?.position}
                  aria-describedby="basic-addon2"
                />
                <FormControl
                  required
                  {...register("fromDate")}
                  className="input-field mb-3"
                  placeholder="From"
                  aria-label="fromDate"
                  defaultValue={allData?.fromDate}
                  type="date"
                  max={new Date(Date.now()).toLocaleString()}
                  // max="2021-12-02"
                  aria-describedby="basic-addon2"
                />
                <FormControl
                  required
                  {...register("toDate")}
                  id="endingDate"
                  className="input-field mb-3"
                  placeholder="to"
                  aria-label="toDate"
                  defaultValue={allData?.toDate}
                  type="date"
                  aria-describedby="basic-addon2"
                />
                <div className="d-flex align-items-center">
                  <label htmlFor="toggle" className="pe-2">
                    Continuing
                  </label>
                  <input
                    id="toggle"
                    type="checkbox"
                    value=""
                    onClick={() => {
                      disableToggle(!toggleValue);
                    }}
                  />
                </div>

                <p className="mt-5">Contact Information</p>

                <FormControl
                  required
                  {...register("email")}
                  className="input-field mb-3"
                  placeholder="Email"
                  defaultValue={allData?.email}
                  aria-label="email"
                  aria-describedby="basic-addon2"
                />
                <FormControl
                  required
                  {...register("phone")}
                  className="input-field mb-3"
                  placeholder="Phone"
                  defaultValue={allData?.phone}
                  aria-label="phone"
                  aria-describedby="basic-addon2"
                />
                <FormControl
                  required
                  {...register("github")}
                  className="input-field mb-3"
                  placeholder="Github link"
                  defaultValue={allData?.github}
                  aria-label="text"
                  aria-describedby="basic-addon2"
                />
                <FormControl
                  required
                  {...register("skype")}
                  className="input-field mb-3"
                  placeholder="Skype link"
                  defaultValue={allData?.skype}
                  aria-label="text"
                  aria-describedby="basic-addon2"
                />

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Text className="text-danger"></Form.Text>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                ></Form.Group>
                {errors.exampleRequired && <span>This field is required</span>}
                <div className="d-grid">
                  <Button type="submit" className="btn btn-danger py-3">
                    Update
                  </Button>
                </div>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EditProfile;
