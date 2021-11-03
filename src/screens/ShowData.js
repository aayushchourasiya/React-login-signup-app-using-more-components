import React from "react";
import { Table, Form } from "react-bootstrap";

class ShowData extends React.Component {
  constructor() {
    super();
    this.state = {
      search: "",
    };
    this.mainRef = React.createRef();
  }

  componentDidMount() {
    this.filterMyPage();
    // var localData = localStorage.getItem("SignUpApp");
    // var localDataJson = JSON.parse(localData);

    // if (localData === null || localData === "[]" || localData === true) {
    //   this.mainRef.current.innerHTML = "No Users Found! Please Sign Up First!";
    // } else {
    //   var mapArr = localDataJson.map((item, index) => {
    //     var variable = `<tr><td>${index + 1}</td><td>${item.fname}</td><td>${
    //       item.lname
    //     }</td></tr>`;
    //     return variable;
    //   });
    //   mapArr.map((item) => {
    //     return (this.mainRef.current.innerHTML += item);
    //   });
    // }
  }

  onSearchChange = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  //function for filtering and/or displaying:
  filterMyPage = () => {
    this.mainRef.current.innerHTML = "";
    var localData = localStorage.getItem("SignUpApp");
    var localDataJson = JSON.parse(localData);

    if (localData === null || localData === "[]" || localData === true) {
      this.mainRef.current.innerHTML = "No Users Found! Please Sign Up First!";
    } else {
      localDataJson
        .filter((item) => {
          if (this.state.search === "") {
            console.log("if");
            return item;
          } else {
            console.log("else");
            return (
              item.fname
                .toLowerCase()
                .includes(this.state.search.toLowerCase()) ||
              item.lname.toLowerCase().includes(this.state.search.toLowerCase())
            );
          }
        })
        .map((item, index) => {
          var variable = `<tr><td>${index + 1}</td><td>${item.fname}</td><td>${
            item.lname
          }</td></tr>`;
          return (this.mainRef.current.innerHTML += variable);
        });

        //Not required, using this the whole time.

      // mapArr.map((item)=>{
      //   return (this.mainRef.current.innerHTML += item);
      // });
    }
  };

  componentDidUpdate() {
    this.filterMyPage();
    // this.mainRef.current.innerHTML = "";
    // var localData = localStorage.getItem("SignUpApp");
    // var localDataJson = JSON.parse(localData);

    // if (localData === null || localData === "[]" || localData === true) {
    //   this.mainRef.current.innerHTML = "No Users Found! Please Sign Up First!";
    // } else {
    //   var mapArr = localDataJson
    //     .filter((item) => {
    //       //Filtering the array so that only search bar value items are shown
    //       if (this.state.search === "") {
    //         //When there are no values in saerch bar, full array will be returned
    //         return item;
    //       } else if (
    //         item.fname
    //           .toLowerCase()
    //           .includes(this.state.search.toLowerCase()) ||
    //         item.lname.toLowerCase().includes(this.state.search.toLowerCase())
    //       ) {
    //         //Only the item which matches this condition will be stored in map and then displayed using the mapArr.map(...) function.
    //         return item;
    //       }
    //       return null; // Just returning null to remove warning. This is not important!
    //     })
    //     .map((item, index) => {
    //       var variable = `<tr><td>${index + 1}</td><td>${item.fname}</td><td>${
    //         item.lname
    //       }</td></tr>`;
    //       return variable;
    //     });
    //   mapArr.map((item) => {
    //     return (this.mainRef.current.innerHTML += item);
    //   });
    // }
  }

  render() {
    return (
      <>
        <Form.Control
          type="search"
          className="mb-2"
          placeholder="Search"
          style={{ textAlign: "center" }}
          value={this.state.search}
          onChange={this.onSearchChange}
        ></Form.Control>
        <Table variant="dark" bordered={true} style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th>S. No.</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody ref={this.mainRef}></tbody>
        </Table>
      </>
    );
  }
}
export default ShowData;
