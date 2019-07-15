import React, { Component } from 'react'
import '../App.css'
import { Navbar, Button, NavbarBrand, Card, Carousel } from 'react-bootstrap'
import Container from "react-bootstrap/Container"
class Start extends Component {
    styles = {
        navBtnDiv: {
            justifyContent: "flex-end",
            display: "flex",
            width: "100%"
        },
        navBtn: {
            float: "left",
            backgroundColor: "white",
            color: "black",
            border: "1px solid black",
            borderRadius: "0px",
            margin: "10px"
        },
        container: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly"
        },
        card: {
            marginTop: "10px",
            padding: "20px",
            width: '100%',
            border: "1px solid black",
            boxShadow: "10px 10px 15px",
            // backgroundColor:'brown',
            // color:'white'

        },
        }



    signin() {
        console.log("signin");
        this.props.history.push('/signin')
    }
    signup() {
        this.props.history.push('/signup')
    }
    regRestaurent() {
        this.props.history.push('RestaurantSignup');
    }
    render() {
        return (
            <div>
                <br />
                <Carousel>
                    <Carousel.Item>
                        <img
                            height="50%"
                            className="d-block w-100"
                            src="https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500"
                            alt="KHAANA"
                        />
                        <Carousel.Caption>
                            <h3></h3>
                            <p></p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            height="50%"
                            className="d-block w-100"
                            src='https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?au to=compress&cs=tinysrgb&dpr=1&w=500'
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            height="50%"
                            className="d-block w-100"
                            src="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <br />
                <div style={{display:'flex'}}> 

                <Container style={this.styles.container}>
                    <div style={{display:"flex",alignItems:'center'}}>
                    <Card style={this.styles.card}>
                        <Card.Img variant="top" src="" />
                        <Card.Body>
                            <Card.Title style={{fontSize:'40px'}}>Want to Order</Card.Title>
                            <Card.Text>
                                if you want to order food. Create an account and Order from your Favourite Restaurant
                                and if already have an account just login and order your Favourite food
    </Card.Text>
                            <Button onClick={this.signup.bind(this)} style={this.styles.navBtn} variant="primary">Sign Up</Button>
                            <Button onClick={this.signin.bind(this)} style={this.styles.navBtn} variant="primary">Sign In</Button>
                        </Card.Body>
                    </Card>
                    </div>
                    <Card style={this.styles.card}>
                        <Card.Img variant="top" src="" />
                        <Card.Body>
                            <Card.Title>Want to Add Your Restaurant</Card.Title>
                            <Card.Text>
                                if you want to add your Restaurant in our service then click the button below and
                                fill important information and get registered
    </Card.Text>
                            <Button onClick={this.regRestaurent.bind(this)} style={this.styles.navBtn} variant="primary">Add your Restaurant</Button>
                        </Card.Body>
                    </Card>
                </Container>
                <div  style={{display:'flex',justifyContent:"center",height:"500px",padding:'100px',width:'500px',textAlign:'center',backgroundImage:'url("https://images.pexels.com/photos/5929/food-salad-dinner-eating.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500")'}}>
                <div style={{backgroundColor:'white',width:'100%',display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid black dotted'}}>
                <h1 style={{color:'black',}}> KHAANA </h1>
                </div>
                </div>
                </div>
            </div>

        )
    }



}
export default Start;