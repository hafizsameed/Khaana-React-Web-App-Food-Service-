import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import { TextField, Typography } from '@material-ui/core'
import OutlinedButtons from '../components/button'
import ContainedButton from './priButton'
import {connect} from 'react-redux';
import {update_user} from  '../store/action';
import firebase, { db } from '../config/firebase'
import ReactLoading from 'react-loading';
import '../App.css'
import SweetAlert from 'sweetalert2-react'

class Login extends Component {


    state = {
        email: '',
        password: '',
        loaderclass:'disableloader'
    }
    styles = {
        container: {
            width: "50%",
            marginTop: "20px",
            textAlign: "center",
            // border: "1px solid black",
        },
        head: {
            color: "#D60665",
            height:'100px'
        },
        btn: {
            backgroundColor: " white",
            color: "#D60665",
            border: "2px solid #D60665",
            margin: "10px"
        },
        maindiv: {
            display: "flex",
            flexWrap: "nowrap",

        },
        fbbtn: {
            padding: "20px 100px",
            backgroundColor: "#4A6DA9"

        },
        restRegDiv: {
            height:'100%',
            textAlign: "center",
            padding: "30px "
        },
        signinDiv: {
            textAlign: "center",
            width: "40%",
            padding: "20px"
        }
    }
    
    signin() {
        this.setState({loaderclass:'activeloader'})
        const { email, password } = this.state
        console.log("signing in");
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                console.log(user, 'user');
                db.collection('users').get()
                    .then((rawdata) => {
                        rawdata.forEach((eachdata) => {
                            if (eachdata.id === user.user.uid) {
                                this.setState({show:true,sweettext:'logged in successfully',sweettitle:'SUCCESS'})
                                console.log(eachdata.data());
                                this.props.store_user({...eachdata.data(),id:eachdata.id})
                                // this.props.dashboard()
                                this.setState({loaderclass:'disableloader'})
                                this.props.history.push('/Location', {...eachdata.data(),flag:true})

                            }
                            else {
                                console.log('no user found')
                                this.setState({sweettext:'user not found',sweettitle:'ERROR',show:true,loaderclass:'disableloader'});
                            }
                        })
                    })
                    .catch((err) => {
                        this.setState({sweettext:err,sweettitle:'ERROR',show:true,loaderclass:'disableloader'});
                        console.log(err)
                    })
            })
            .catch((e) => {
                this.setState({sweettext:e,sweettitle:'ERROR',show:true,loaderclass:'disableloader'});
            })
    }
    render() {
        console.log(this.props, 'props')
        return (
            <div>
                <SweetAlert
        show={this.state.show}
        title={this.state.sweettitle}
        text={this.state.sweettext}
        onOutsideClick={()=>{this.setState({show:false})
                    console.log('outside clicked')}}
        onConfirm={()=>this.setState({show:false})}
      />
                <div style={{ display: "flex" }}>
                    <div style={this.styles.signinDiv}>
                        <h1 style={{ color: "#4C4C4C", padding: 30 }}>Want to Order Food?</h1>
                        <Typography>
                            Order lunch, fuel for meetings or late-night deliveries to the office. Your favorite restaurants coming to a desk near you.
                    </Typography>
                    </div>
                    <div style={{ display: "flex", flexWrap: 'wrap', alignItems: "center", justifyContent: "center", width: "60%" }}>
                        <ContainedButton click={() => { this.props.history.push('/signup') }} style={{ padding: "20px 40px" }} title="SignUp here" />

                    </div>
                </div>
                <div style={this.styles.maindiv}>
                    <Container style={this.styles.container}>
                        <h1 style={this.styles.head}>LOGIN </h1><br />

                        <div    style={{width:'100%',height:'20%'}}>
                        <TextField
                            label="Email"
                            value={this.state.email}
                            onChange={(e) => { this.setState({ email: e.target.value }) }}
                            margin="normal"
                            />
                          
                        <br/>
                        <TextField
                            label="Password"
                            type='password'
                            value={this.state.password}
                            onChange={(e) => { this.setState({ password: e.target.value }) }}
                            margin="normal"
                        /><br/><br/>
                        <OutlinedButtons title="Sign In" click={this.signin.bind(this)} type="submit" />
                        <div style={{display:'flex',justifyContent:'center' }}>
                        <ReactLoading className={this.state.loaderclass} type='bars' color='brown' height={'100px'} width={'20%'} />
                            </div>
                        </div>
                    </Container>
                    <div>
                    <img width="100%" style={{ marginTop: "20px" }} src="https://images.pexels.com/photos/262896/pexels-photo-262896.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500" />
                    </div>
                </div>
                <div style={this.styles.restRegDiv}>
                    <h1 style={{ color: "#4C4C4C", padding: 30 }}>Want to Register your Restaurant?</h1>
                    <Typography>
                        Our customers love good food.
                    </Typography>
                    <Typography>
                        You prepare it.

                    </Typography>
                    <Typography>
                        We bring it.
                    </Typography>
                </div>
                <div style={{ display: 'flex',width:'100%' }}>
                    <div style={{ margin: 20, padding: 20, height: "100%", width: "100%", textAlign: "center", border: '1px solid #D60665', boxShadow: '5px 5px 15px' }}>
                        <Typography style={{ padding: 10, }} variant="h4">
                            Register Your Restaurant
            </Typography><br /><br />
                        <div style={{ width: '50%', margin: "0px auto" }}>
                            <Typography variant="subtitle1">
                                Click below and submit required information to get your Restaurant Registered in Our
                                Serivce and make your Business great
            </Typography>
                        </div>
                        <br /><br />
                        <div >
                            <ContainedButton click={() => { this.props.history.push('/RestuarantSignup') }} style={{ backgroundColor: '#D60665', color: "white" }} title="Register" />
                        </div>
                    </div>
                    <div style={{ margin: 20, height: "100%", width: "100%", textAlign: 'center', border: '1px solid #D60665', boxShadow: '5px 5px 15px' }}>
                        <Typography style={{ padding: 30, }} variant="h4">Already Registered</Typography>
                        <br />
                        <br />
                        <div style={{ width: '50%', margin: "0px auto" }}>
                            <Typography variant="subtitle1">
                                if you already have an account so login and Deal with your customers with our Serivce
            </Typography>
                        </div>
                        <br /><br /><br />
                        <ContainedButton click={() => { this.props.history.push('/RestaurantLogin') }} title="Login to your restaurant" />
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{ 
    console.log("state",state);
  return {
    user:state.user,
  }
  }
  const mapDispatchToProps=(dispatch)=>{
  return {
    store_user:(user)=>dispatch(update_user(user)),
  }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Login);