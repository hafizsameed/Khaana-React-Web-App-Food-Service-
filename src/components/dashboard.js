import React , {Component} from 'react'
import DashboardNav from './dashboardNav'
import Restaurants from './restaurants'
import Requests from './requests'
import {BrowserRouter as Router , Route,Link} from 'react-router-dom'
import firebase from '../config/firebase'
import DetailedScreen from './DetailedScreen'
 export default class Dashboard extends Component{
    
    state={
        myData:this.props.location.state,
        isLoggedIn:true
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
    componentDidMount(){
        // {this.props.history.push('dashboard/restaurants')}
        {this.props.dashboardon()}
        console.log(this.props)
    }
    Show(obj){
        console.log(obj)
    }
    componentWillUnmount(){
        this.props.dashboardoff();
    }
    signOut(){
        firebase.auth().signOut()
        .then(()=>{
            this.setState({isLoggedIn:false})
            this.props.history.push('/signin')
        })
    }
    componentWillUnmount(){
        this.setState({isLoggedIn:false})
    }
    render(){
        console.log(this.state,'dashboard state')
        const {isLoggedIn} = this.state;
        // console.log(this.state.myData, 'mydata')
        console.log(this.props.location.state,'dashoard props')
    return (
        <div>
           
                <Router>
            <DashboardNav logout={this.signOut.bind(this)}/>
            <div style={this.styles.headdiv}>
            <h1 style={this.styles.head}>Dashboard</h1>
            </div>
            {isLoggedIn ?
            <div>
                    <Route  exact path='/dashboard' component={Restaurants}/>
                    <Route  exact path='/dashboard/restaurants' mydata={this.state.myData}  component={Restaurants}/>
                    <Route  path='/dashboard/MyRequests' mydata={this.props.location.state} component={Requests}/>
                    <Route path='/dashboard/restaurants/:id'  component={DetailedScreen}/>

            </div>
            : 
            <h1 style={{width:'100%',textAlign:'center',padding:20,border:'1px solid black',boxShadow:'5px 5px 10px black'}}>NOT LOGGED IN</h1>
            }
                </Router>
        </div>
        )
    }
}