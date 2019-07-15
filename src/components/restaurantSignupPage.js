import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import { TextField, Typography } from '@material-ui/core';
import OutlinedButtons from '../components/button'
import firebase, { db } from '../config/firebase'
import MyMapComponent from './MyMapComponent'
import {Alert} from 'react-bootstrap'
import ReactLoading from 'react-loading';
import SweetAlert from 'sweetalert2-react';
import restaurants from './restaurants';
export default class RestaurantSignupPage extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        city: '',
        country: '',
        location: {},
        RestaurantName: '',
        Certificate: '',
        photo: '',
        certUrl: '',
        profileUrl: '',
        lng:'',
        lat:'',
        categories:[],
        meals:[],
        pendingReqs:[],
        processedReqs:[],
        delieverdReqs:[],
        loaderclass:'disableloader',
        RestaurantNameErr:false,
        firstNameErr:false,
        lastNameErr:false,
        EmailErr:false,
        passwordErr:false,
        confirmPasswordErr:false,
        countryErr:false,
        cityErr:false,
        profileErr:false,
        CertificateErr:false        
    }
    styles = {
        container: {
            margin: "1px auto",
            width: "50%",
            textAlign: "center"
        }
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition((location) => {
            this.setState({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            })
        });
    }

    signup() {
        this.setState({loaderclass:'activeloader'})
        const { email, password, city, country, Certificate,confirmPassword, RestaurantName, photo, firstName, lastName,meals,lat,lng,categories,location,delieverdReqs,pendingReqs,processedReqs} = this.state;
        var obj = { city, country, RestaurantName, firstName, lastName, location:{lng,lat},categories,meals,delieverdReqs,pendingReqs,processedReqs}
        console.log("signing up")
        if(firstName===''||firstName===' '||lastName===''||lastName===' '|| RestaurantName===''|| RestaurantName === ' ' ||email===''||email===' '||password===''||password===' '||
        confirmPassword===''||confirmPassword===' '||country===''||country===' '||city===''||city===' '||photo===''||photo==={}||Certificate===''||Certificate==={}||location===''||location==={}){
            this.setState({activeloader:'disableloader',show:true,sweettext:'please fill out all the fields first',sweettitle:'ERROR',loaderclass:'disableloader'});
        }
        else{
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((res) => {
                firebase.storage().ref('RestaurantProfile').child(res.user.uid).put(photo)
                    .then((snapshot) => {
                        snapshot.ref.getDownloadURL()
                            .then((picUrl) => {
                                this.setState({profileUrl:picUrl})
                                console.log(picUrl,'picURL')
                                firebase.storage().ref('RestaurantCertificates').child(res.user.uid).put(Certificate)
                                    .then((snapshot2) => {
                                        snapshot2.ref.getDownloadURL()
                                            .then((picUrl2) => {
                                               this.setState({certUrl:picUrl2})
                                                console.log(picUrl2)
                                                db.collection('Restaurant').doc(res.user.uid).set({...obj,certURL:picUrl2,profileURL:picUrl})
                                                    .then(() => {
                                                        this.setState({show:true,loaderclass:'disableloader',sweettext:'Restaurant Registered Successfully',sweettitle:'SUCCESS',loaderclass:'disableloader'});
                                                        console.log('Signed Up')
                                                        this.props.history.push('/RestaurantLogin', this.state);
                                                    })
                                            })
                                            .catch((error2) => {
                                                this.setState({show:true,sweettext:error2,sweettitle:'ERROR',loaderclass:'disableloader'});
                                                console.log(error2) })
                                    })
                                    .catch((err) => { console.log(err) 
                                        this.setState({show:true,sweettext:err,sweettitle:'ERROR',loaderclass:'disableloader'});
                                    })
                                console.log(obj, 'obj')

                            })
                    })
                    .catch((error) => { 
                        this.setState({show:true,sweettext:error,sweettitle:'ERROR',loaderclass:'disableloader'});
                        console.log(error) })
            })
        }
    }
    render() {
        console.log(this.state)
        const {lng,lat}= this.state;
        return (
            <Container style={this.styles.container}>
                <br/>
                <h1>Restaurant Registration</h1>
            <SweetAlert
show={this.state.show}
title={this.state.sweettitle}
text={this.state.sweettext}
onOutsideClick={()=>{this.setState({show:false})
          console.log('outside clicked')}}
onConfirm={()=>this.setState({show:false})}
/>
              <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
              <ReactLoading className={this.state.loaderclass} type='bars' color='brown' height={'20%'} width={'20%'} />
              </div>
              <TextField
                  label="Restaurant Name"
                  onBlur={()=>{
                      const {RestaurantName}=this.state;
                      if(RestaurantName.toLowerCase()=== '' || RestaurantName.toLowerCase()===' '){
                          this.setState({RestaurantNameErr:true});
                      }
                      else{
                          this.setState({RestaurantNameErr:false});
                      }
                  }}
                  value={this.state.RestaurantName}
                  onChange={(e) => { this.setState({ RestaurantName: e.target.value }) }}
                  margin="normal"
              />
              <Alert show={this.state.RestaurantNameErr} variant='danger'>
                  field cannot be left empty
                  </Alert>
              <br /> 
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
                          if(this.state.photo=={} || this.state.photo===''){
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
                          this.setState({ photo: e.target.files[0] })
                          console.log(e.target.files[0], 'e');
                      }}
                  />
                   <Alert show={this.state.profileErr} variant='danger'>
                  Profile pic should be uploaded
                       </Alert>
                  </div><br /><br />
                  <div>
                  <span style={{ marginTop: '30px', padding: '0px 22px' }}>Certificate:</span>
                  <TextField
                      onBlur={()=>{
                          if(this.state.Certificate=={} || this.state.Certificate===''){
                              this.setState({CertificateErr:true});
                          }
                          else{
                              this.setState({CertificateErr:false})
                          }
                      }}
                      label='Certificate'
                      type='file'
                      margin='normal'
                      onChange={(e) => {
                          this.setState({ Certificate: e.target.files[0] })
                          console.log(e.target.files[0], 'e');
                      }}
                  />
                   <Alert show={this.state.CertificateErr} variant='danger'>
                  Certificate must be uploaded
                       </Alert>
                  </div><br /><br />

              <MyMapComponent
                  setlnglat={(lng,lat)=>{this.setState({lng:lng,lat:lat})}}
                  isMarkerShown
                  location={{ lat, lng }}
                  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `400px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
              /><br/><br/>
              <OutlinedButtons click={this.signup.bind(this)} title="SignUp" />
             
                  
          </Container>
        )

    }
}
