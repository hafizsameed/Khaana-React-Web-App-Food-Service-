import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import { TextField } from '@material-ui/core';
import OutlinedButtons from '../components/button'
import {Alert} from 'react-bootstrap'
import db from '../config/firebase'
import firebase from '../config/firebase'
import MyMapComponent from './MyMapComponent'
import ReactLoading from 'react-loading';
import SweetAlert from 'sweetalert2-react';
import '../App.css'
export default class Signup extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        city: '',
        profilePic: '',
        country: '',
        gender: '',
        WrongPass: false,
        loaderclass: 'disableloader',
        firstNameErr:false,
        lastNameErr:false,
        EmailErr:false,
        EmailErrMsg:'',
        passwordErr:false,
        passwordErrMsg:'',
        confirmPasswordErr:false,
        genderErr:false,
        countryErr:false,
        cityErr:false,
        profileErr:false,
        show:false
    }
    styles = {
        container: {
            margin: "1px auto",
            width: "50%",
            textAlign: "center"
        }
    }
    signup() {
        this.setState({ loaderclass: 'activeloader' })
        const { email, password,confirmPassword, firstName, lastName, city, country, gender,profilePic } = this.state
        console.log("signing up")
        const obj = { firstName, profilePic, lastName, city, country, gender }
        console.log(obj, 'obj')
        if(firstName===''||firstName===' '||lastName===''||lastName===' '||email===''||email===' '||password===''||password===' '||
        confirmPassword===''||confirmPassword===' '||country===''||country===' '||city===''||city===' '||profilePic===''||firstName==={}){
            this.setState({show:true,sweettext:'please fill out all the fields first',sweettitle:'ERROR',loaderclass:'disableloader'});
        }
        else
        {
            console.log('signing up')
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((data) => {
                firebase.storage().ref('userprofile').child(data.user.uid).put(profilePic)
                    .then((snapshot) => {
                        snapshot.ref.getDownloadURL()
                            .then((url) => {
                                obj.profilePic = url;
                                firebase.firestore().collection('users').doc(data.user.uid).set(obj)
                                    .then(() => {
                                        this.setState({show:true,sweettext:'sucessfully logged In',sweettitle:'SUCCESS'})
                                        this.setState({ loaderclass: 'disableloader' })
                                        console.log('data added');
                                        this.props.history.push('/signin', this.state)
                                    })
                                    .catch((err) => {
                                        this.setState({show:true,sweettext:err,sweettitle:'ERROR'})
                                        this.setState({ loaderclass: 'disableloader' })
                                        console.log(err);
                                    })
                            })
                    })
                    .catch((e) => {
                        this.setState({show:true,sweettext:e,sweettitle:'ERROR'})
                        this.setState({ loaderclass: 'disableloader' })
                    })
                console.log(data, 'data');
            })
            .catch((error) => {
                this.setState({show:true,sweettext:error,sweettitle:'ERROR'})
                this.setState({ loaderclass: 'disableloader' })
                console.log(error)
            });
        }
    }

    render() {
        {
                console.log(this.props);
                console.log(this.state)
                return (
                    <Container style={this.styles.container}>
                      <SweetAlert
        show={this.state.show}
        title={this.state.sweettitle}
        text={this.state.sweettext}
        onOutsideClick={()=>{this.setState({show:false})
                    console.log('outside clicked')}}
        onConfirm={()=>this.setState({show:false})}
      />
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <h1>SignUp</h1>
                        <ReactLoading className={this.state.loaderclass} type='bars' color='brown' height={'20%'} width={'20%'} />
                        </div>
                        <TextField
                            onBlur={() => {
                                if (this.state.firstName === '') {
                                    this.setState({firstNameErr:true});
                                }
                                else{
                                    this.setState({firstNameErr:false})
                                }
                            }}
                            label="First Name"
                            value={this.state.firstName}
                            onChange={(e) => { this.setState({ firstName: e.target.value }) }}
                            margin="normal"
                        /><br />
                        <Alert show={this.state.firstNameErr} variant='danger'>
                            field cannot be left empty
                            </Alert>
                        <TextField
                            onBlur={() => {
                                if (this.state.lastName === '') {
                                    this.setState({lastNameErr:true});
                                }
                                else{
                                    this.setState({lastNameErr:false})
                                }
                            }}
                            label="Last Name"
                            value={this.state.lastName}
                            onChange={(e) => { this.setState({ lastName: e.target.value }) }}
                            margin="normal"
                        />
                         <Alert show={this.state.lastNameErr} variant='danger'>
                            field cannot be left empty
                            </Alert>
                        <br />
                        <TextField
                        onBlur={()=>{
                            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            console.log(re.test(String(this.state.email).toLowerCase()));
                            if(this.state.email==='' || this.state.email=== ' '){
                                this.setState({EmailErr:true,EmailErrMsg:'field cannot be left empty'})
                            }
                            else if(!re.test(this.state.email)){
                                console.log('badly formated')
                                this.setState({EmailErr:true,EmailErrMsg:'email is badly formated'})
                            } 
                            
                            else{
                                this.setState({EmailErr:false,EmailErrMsg:''})
                                console.log('all clear')
                            }
                        }}
                            label="Email"
                            value={this.state.email}
                            onChange={(e) => { this.setState({ email: e.target.value }) }}
                            margin="normal"
                        />
                        <Alert show={this.state.EmailErr} variant='danger'>
                            {this.state.EmailErrMsg}
                            </Alert>
        
                        <br />
                        <TextField
                        onBlur={()=>{
                            console.log(this.state.password.length)
                            if(this.state.password==='' || this.state.password===' '){
                                this.setState({passwordErr:true,passwordErrMsg:'field cannot be left empty'})
                            }
                            else if(this.state.password.length<6){
                                console.log(this.state.password.length)
                                this.setState({passwordErr:true,passwordErrMsg:'password length should be greater than 6'})
                            }
                            else{
                                this.setState({passwordErr:false})
                            }
                        }}
                            label="Password"
                            type='password'
                            value={this.state.password}
                            onChange={(e) => { this.setState({ password: e.target.value }) }}
                            margin="normal"
                        />
                        <Alert show={this.state.passwordErr} variant='danger'>
                            {this.state.passwordErrMsg}
                            </Alert>
                        <br />
                        <TextField
                            label="Confirm Password"
                            type='password'
                            value={this.state.confirmPassword}
                            onChange={(e) => {
                                this.setState({ confirmPassword: e.target.value })
                            }}
                            onBlur={()=>{
                                if(this.state.password!==this.state.confirmPassword){
                                    this.setState({confirmPasswordErr:true})
                                }
                                else{
                                    this.setState({confirmPasswordErr:false})
                                }
                            }}
                            margin="normal" />
                            <Alert show={this.state.confirmPasswordErr} variant='danger'>
                            your password doesnot match
                            </Alert>
                        <br />
                        <TextField
                            label="gender"
                            onBlur={()=>{
                                const {gender}=this.state;
                                if(gender.toLowerCase()=== 'male' || gender.toLowerCase()==='female'){
                                    this.setState({genderErr:false});
                                }
                                else{
                                    this.setState({genderErr:true});
                                }
                            }}
                            value={this.state.gender}
                            onChange={(e) => { this.setState({ gender: e.target.value }) }}
                            margin="normal"
                        />
                        <Alert show={this.state.genderErr} variant='danger'>
                            gender can be only male or female
                            </Alert>
                        <br /> 
                        <TextField
                            onBlur={()=>{
                                const {country}= this.state;
                                if(country===' ' || country===''){
                                    this.setState({countryErr:true})
                                }
                                else{
                                    this.setState({countryErr:false})
                                }
                            }}
                            label="country"
                            value={this.state.country}
                            onChange={(e) => { this.setState({ country: e.target.value }) }}
                            margin="normal"
                        />
                        <Alert show={this.state.countryErr} variant='danger'>
                            field should not be left empty
                                 </Alert>
                        <br />
                        <TextField
                        onBlur={()=>{
                            if(this.state.city==='' || this.state.city===' '){
                                this.setState({cityErr:true});
                            }
                            else{
                                this.setState({cityErr:false})
                            }
                        }}
                            label="City"
                            value={this.state.city}
                            onChange={(e) => { this.setState({ city: e.target.value }) }}
                            margin="normal"
                        />
                        <Alert show={this.state.cityErr} variant='danger'>
                            field should not be left empty
                                 </Alert>
                        <br /><br />
                        <div>
                            <span style={{ marginTop: '30px', padding: '0px 22px' }}>Profile:</span>
                            <TextField
                                onBlur={()=>{
                                    if(this.state.profilePic=={} || this.state.profilePic===''){
                                        this.setState({profileErr:true});
                                    }
                                    else{
                                        this.setState({profileErr:false})
                                    }
                                }}
                                label='Profile Photo'
                                type='file'
                                margin='normal'
                                onChange={(e) => {
                                    this.setState({ profilePic: e.target.files[0] })
                                    console.log(e.target.files[0], 'e');
                                }}
                            />
                             <Alert show={this.state.profileErr} variant='danger'>
                            Profile pic should be uploaded
                                 </Alert>
                            </div><br /><br />
        
                        <OutlinedButtons click={this.signup.bind(this)} title="SignUp" />
                       
                            
                    </Container>
            
            )
            
        }
       
    }

}
