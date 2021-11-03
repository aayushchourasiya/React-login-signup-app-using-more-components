import React from "react";
import { emailValidation } from "../Helper/validation";
import { Modal, CloseButton, Button, Form } from "react-bootstrap";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      fname: "",
      lname: "",
      password: "",
      //   show: false
    };
    //creating ref here, so we dont have to use getElementById
    this.emailRef = React.createRef();
    this.emailTagRef = React.createRef();
  }
  onEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  onFname = (e) => {
    this.setState({
      fname: e.target.value,
    });
  };
  onLname = (e) => {
    this.setState({
      lname: e.target.value,
    });
  };
  onPassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  saveData = (e) => {
    var localItems = "";
    var arr = [];
    var email = this.state.email;
    var fname = this.state.fname;
    var lname = this.state.lname;
    var password = this.state.password;

    //calling emailValidation from validation.js for validating Regular Expression format.
    if (emailValidation(email)) {
      if (
        localStorage.getItem("SignUpApp") !== null &&
        localStorage.getItem("SignUpApp") !== "[]"
      ) {
        localItems = localStorage.getItem("SignUpApp");
        arr = JSON.parse(localItems);

        //short code to check email exists or not
        var check = arr.find(checkEmailFunction);
        function checkEmailFunction(item) {
          if (item.email === email) {
            return true;
          } else {
            return false;
          }
        }

        //Long code to do this
        // var checkEmail = false;
        // arr.filter(function(item){
        //     if(item.email === email){
        //         checkEmail = true;
        //     }
        //     else{
        //         checkEmail = false;
        //     }
        //     return checkEmail;
        // });

        if (check) {
          e.preventDefault(); //Using it here, because we want it not to close only when emails exists, not everytime.

          //Using ref instead of getElementById
          this.emailTagRef.current.innerHTML =
            "Email address <h6 style='color:red;'>Email already exists!</h6>";

          // document.getElementById("emailTag").innerHTML =
          //   "Email address <h6 style='color:red;'>Email already exists!</h6>";
        } else {
          localItems = localStorage.getItem("SignUpApp");
          arr = JSON.parse(localItems);
          localStorage.removeItem("SignUpApp");
          var newUsers = {
            email: email.toLowerCase(),
            fname: fname,
            lname: lname,
            password: password,
          };
          arr.push(newUsers);
          localStorage.setItem("SignUpApp", JSON.stringify(arr));
          alert("Details Saved!");
        }
      } else {
        var users = {
          email: email.toLowerCase(),
          fname: fname,
          lname: lname,
          password: password,
        };
        arr.push(users);
        localStorage.setItem("SignUpApp", JSON.stringify(arr));
        alert("Details Saved!");
      }
    } else {
      e.preventDefault();
      //Using ref instead of getElementById
      this.emailRef.current.focus();
      // document.getElementById("getemailField").focus();
      this.emailTagRef.current.innerHTML =
        "Email address<br/><h6 style='color:red;'>Please enter email in correct form!</h6>";
      // document.getElementById("emailTag").innerHTML =
      //   "Email address<br/><h6 style='color:red;'>Please enter email in correct form!</h6>";
    }
  };
  render() {
    return (
      <>
        <Modal
          show={this.props.show}
          onHide={this.props.show}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>Enter Your Details!</Modal.Title>
            <CloseButton onClick={this.props.closeB}></CloseButton>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.saveData}>
              <Form.Label id="emailTag" ref={this.emailTagRef}>
                Email address
              </Form.Label>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  id="getemailField"
                  placeholder="Enter Your Email Here!"
                  value={this.state.email}
                  onChange={this.onEmail}
                  ref={this.emailRef}
                  required
                />

                <Form.Label className="form-label pt-2">First Name</Form.Label>
                <Form.Control
                  id="getfnameField"
                  placeholder="Enter Your First Name Here!"
                  value={this.state.fname}
                  onChange={this.onFname}
                  required
                />

                <Form.Label className="form-label pt-2">Last Name</Form.Label>
                <Form.Control
                  id="getlnameField"
                  placeholder="Enter Your Last Name Here!"
                  value={this.state.lname}
                  onChange={this.onLname}
                  required
                />

                <Form.Label className="form-label pt-2">Password</Form.Label>
                <Form.Control
                  type="password"
                  id="getpassField"
                  placeholder="Enter Your Password Here!"
                  value={this.state.password}
                  onChange={this.onPassword}
                  required
                />
                <Button
                  type="submit"
                  variant="dark"
                  id="submit"
                  className="mt-3"
                >
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
export default SignUp;
