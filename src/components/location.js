import React, { Component } from 'react'
import MyMapComponent from './MyMapComponent'
import {store_location} from '../store/action'
import {connect} from 'react-redux'
import { Button } from 'react-bootstrap';
import { Collapse } from '@material-ui/core';
class Location extends Component {
    state={
        lat:0,
        lng:0,
        show:false
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition((location) => {
            this.setState({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            })
        });
    }
    render() {
        const {lat,lng} = this.state;
        return (
            <div>
                <MyMapComponent
                    setlnglat={(lng, lat) => { this.setState({ lng: lng, lat: lat }) }}
                    isMarkerShown
                    location={{ lat, lng }}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    />
                    <div style={{display:'flex',margin:20,justifyContent:'center'}}>
                    <Button onClick={()=>{
                        const {lat,lng}=this.state;
                        this.props.store_location({lat,lng});
                        this.setState({show:true});
                    }}

                    >
                        Set Location
                        </Button>
                        &nbsp;&nbsp;
                        <Collapse in={this.state.show}>
                        <Button onClick={()=>{this.props.history.push('/Dashboard',{lat,lng})}}>Go to Dashboard</Button>
                        </Collapse>
                    </div>
            </div>
            )
            
        }      
            
        }
        const mapDispatchToProps=(dispatch)=>{
            return {
              store_location:(location)=>dispatch(store_location(location)),
            }
            }
        const mapStateToProps=()=>{
            return({
            })
        }
 export default connect(mapStateToProps,mapDispatchToProps)(Location);