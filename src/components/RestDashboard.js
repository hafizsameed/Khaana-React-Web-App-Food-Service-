import React , {Component} from 'react'
import RestDashboardNav from './RestDashboardNav'
import RestRequests from './Restrequests'
import {BrowserRouter as Router , Route,Link} from 'react-router-dom'
import MyRestaurant from './MyRestaurant';
 export default class RestDashboard extends Component{
    state={
        restaurant:true,
        requests:false
    }
    styles={
    head:{
        color:"#D60665",
    },
    headdiv:{
        textAlign:"center",
        padding:"20px",
        // borderBottom:"2px solid black",
        BackgroundColor:"#D60665"
    }
}
    componentWillUnmount(){
        this.props.restdashboardoff();
    }
    toRestaurant(){
        this.setState({restaurant:true,requests:false});
    }
    toRequests(){
        this.setState({restaurant:false,requests:true});
    }
    componentDidMount(){
        this.props.RestDashboardon();
    }
    Show(obj){
        console.log(obj)
    }
    signOut(){
        this.props.signoutfromApp();
    }
    render(){
        console.log(this.props,'restdash props');
        const {restaurant,requests} = this.state;
    return (
        <div>
            <RestDashboardNav 
                                toRestaurant={this.toRestaurant.bind(this)}
                                toRequests={this.toRequests.bind(this)}
                              logout={this.signOut.bind(this)}/>
            <div style={this.styles.headdiv}>
            <h1 style={this.styles.head}>Dashboard</h1>
            </div>
            <div>

            {restaurant && <MyRestaurant data={this.props.location.state}/>}
            {requests && <RestRequests />}
            </div>
            
        </div>
        )
    }
}