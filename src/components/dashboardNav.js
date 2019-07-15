import React, { Component } from 'react'
import { Navbar, NavbarBrand } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import OutlinedButtons from '../components/button'
import {withRouter} from 'react-router-dom'
import firebase from '../config/firebase'
class DashbpardNav extends Component {
    styles = {
        navBtnDiv: {
            justifyContent: "flex-end",
            display: "flex",
            width: "100%",
        },
        navlink:{
            width:"100%",
            borderRight:"1px solid black",
            textAlign:"center",
            padding : "10px 50px"
        },
        nav:{
            display:"flex",

        }



    }
    render() {
        return (
            <div>
                <Navbar style={{ borderBottom: "2px solid black", backgroundColor: "white" }} expand="lg">
                    <NavbarBrand style={{ color: "#D60665", padding: "15px", margin: "0px", fontSize: "30px" }}>kHAANA</NavbarBrand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav style={this.styles.nav} className="mr-auto">
                            <Nav.Link onClick={()=>{ this.props.history.push('/dashboard/restaurants')}} style={this.styles.navlink} href="#">Restaurants</Nav.Link>
                            <Nav.Link onClick={()=>{ this.props.history.push('/dashboard/MyRequests',{id:firebase.auth().currentUser.uid})}}  style={this.styles.navlink}  href="#"> Requests</Nav.Link>
                        </Nav>
                            <div style={this.styles.navBtnDiv}>
                                <OutlinedButtons click={()=>{this.props.logout()}} title="LogOut" />
                            </div>
                    </Navbar.Collapse>

                </Navbar>

            </div>

        )
    }



}
export default withRouter(DashbpardNav);