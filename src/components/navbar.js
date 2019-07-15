import React, { Component } from 'react'
import { Navbar, NavbarBrand } from 'react-bootstrap'
import OutlinedButtons from '../components/button'
import { withRouter } from 'react-router-dom'
class NaviBar extends Component {
    styles = {
        navBtnDiv: {
            justifyContent: "flex-end",
            display: "flex",
            width: "100%"
        },
        navBtn: {
            float: "left",
            backgroundColor: " white",
            color: "#D60665",
            border: "2px solid   #D60665",
            // margin: "20px"
        },



    }
    render() {
        console.log(this.props.history, 'props of navibar')
        return (
            <div>
                <Navbar style={{ borderBottom: "4px solid black", backgroundColor:'white' , padding:30 }} expand="lg">
                    <NavbarBrand 
                        onClick={() => { this.props.history.push('/') }}
                        style={{ color: "#D60665", padding: "15px", margin: "0px", fontSize: "40px", textDecoration:"underline", fontWeight:'bolder' }}>
                        K H A A N A 
                    </NavbarBrand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <div style={this.styles.navBtnDiv}>
                            <OutlinedButtons style={this.styles.navBtn} title="SignUp" click={() => { this.props.history.push('/signup') }} />
                            &nbsp;&nbsp;<OutlinedButtons style={this.styles.navBtn} title="SignIn" click={() => { this.props.history.push('/signin') }} />
                        </div>
                    </Navbar.Collapse>

                </Navbar>

            </div>

        )
    }



}
export default withRouter(NaviBar);