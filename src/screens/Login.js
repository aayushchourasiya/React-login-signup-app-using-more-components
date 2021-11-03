import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { TopNav } from "../components/Navbar";
import SignUp from "./SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ShowData from "./ShowData";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getemail: "",
      getpass: "",
      show: false,
      close: true,
    };
  }

  emailChange = (e) => {
    this.setState({
      getemail: e.target.value,
    });
  };

  passChange = (e) => {
    this.setState({
      getpass: e.target.value,
    });
  };

  //Handling Modal:x
  handleShow = () => {
    this.setState({
      show: true,
    });
  };

  closeB = () => {
    this.setState({
      show: false,
    });
  };

  loginData = async (e) => {
    var getemail = this.state.getemail;
    var getpass = this.state.getpass;
    var localItems = await localStorage.getItem("SignUpApp");
    var arr = JSON.parse(localItems);
    var emailRight = false;
    var passwordRight = false;

    //This code works same as below but, I am not returning any value here so, it is
    //showing warning on console.
    // var email = arr.filter(function(item){
    //         if(item.email === getemail){
    //             emailRight = true;
    //             if(item.password === getpass){
    //                 passwordRight = true;
    //                 return item;
    //             }
    //             else{
    //                 e.preventDefault();
    //             }
    //         }
    //         else{
    //             e.preventDefault();
    //         }

    // });

    // email.map(function(item){
    //     return alert("Welcome " + item.fname + " " + item.lname);
    // });

    //In this we are returning only that value in which our condition passes!
    var check = arr.filter((item) => {
      if (item.email === getemail) {
        emailRight = true;
        if (item.password === getpass) {
          passwordRight = true;
          return item;
        }
      }
      return item.email === getemail && item.password === getpass;
    });

    //When we return the item with condition, it stores the value at check[0]
    //so that we will show output from that.
    if (check.length > 0) {
      alert("Welcome " + check[0].fname + " " + check[0].lname);
    }

    //This if/else will be same for both block of code.
    if (!emailRight) {
      e.preventDefault();
      alert("Please Enter Correct Email!");
    } else {
      if (!passwordRight) {
        e.preventDefault();
        alert("Wrong Password!");
      }
    }
  };

  render() {
    return (
      <>
        <Router>
          <TopNav onPress={this.handleShow} />
          <SignUp
            show={this.state.show}
            onHide={this.state.show}
            closeB={this.closeB}
          />
          <Container className="pt-5">
            <Switch>
              <Route path="/nextpage">
                <ShowData />
              </Route>

              <Route path="/">
                <Form onSubmit={this.loginData}>
                  <Form.Label>Email address</Form.Label>
                  {/* This is component instead of input tag */}
                  <Form.Control
                    type="email"
                    id="emailField"
                    placeholder="Enter Your Email Here!"
                    value={this.state.getemail}
                    onChange={this.emailChange}
                    required
                  />

                  <Form.Label className="mt-2">Password</Form.Label>
                  <Form.Control
                    type="password"
                    id="passField"
                    placeholder="Enter Your Password Here!"
                    value={this.state.getpass}
                    onChange={this.passChange}
                    required
                  />
                  <Button type="submit" variant="dark mt-3">
                    Submit
                  </Button>
                </Form>
              </Route>
            </Switch>
          </Container>
        </Router>
      </>
    );
  }
}
export default Login;
