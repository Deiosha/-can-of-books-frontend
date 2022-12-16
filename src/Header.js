import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import AuthButtons from './auth/AuthButton';
import { Link } from "react-router-dom";
import {withAuth0} from '@auth0/auth0-react';
import axios from 'axios';

class Header extends React.Component {

  request = async() => {
    let res =  await this.props.auth0.getIdTokenClaims();
    let token = res._raw;
    console.log(token);

    let request = {
      method: 'GET',
      url: 'http://localhost3001/test',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    let response = await axios(request);
    console.log(response.data);
  }

  render() {
    let auth0 = this.props.auth0
    return (
      <>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="primary">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <NavItem><Link to="/" className="nav-link">Home</Link>
        </NavItem>
        <NavItem><Link to="/about" className="nav-link">About</Link>
        </NavItem>
      </Navbar><AuthButtons />
      {auth0.isAuthenticated
      ? <button onClick={this.request} > Make request</button>
      : null
      }
      </>
      
    )
  }
}

export default withAuth0(Header);
