import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";

export function TopNav({ onPress }) {
  return (
    <>
      {/* Using Navbar from Bootstrap */}
      <Navbar bg="dark" expand="lg" variant="dark" className="px-2">
        <Navbar.Brand><Link to="/" className="navbar-brand">MyApp</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">Home</Link>
            <Nav.Link onClick={onPress}>SignUp</Nav.Link>
            <Link to="/nextpage" className="nav-link">All Users</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">MyApp</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/" onClick={onPress}>SignUp!</a>
                </li>
            </ul>
            </div>
        </div>
        </nav> */}
    </>
  );
}
