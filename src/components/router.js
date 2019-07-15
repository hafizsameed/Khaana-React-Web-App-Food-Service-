import React , {Component} from 'react'
import Start from './start'
import Signin from './login'
import Signup from './signup'
import Dashboard from './dashboard'
import NaviBar from './navbar'
import { BrowserRouter as Router , Route, Link} from 'react-router-dom'
import RestaurantSignupPage from './restaurantSignupPage'
import RestaurantLoginPage from './restuarantLoginPage'
import RestaurantDashboard from './RestDashboard' 
import Location from './location'

export default class Navigation extends Component{
state={
    dashboard:false,
    RestDashboard:false
}
    render(){
    console.log(this.state,'navigation prosp')
    return(
        <Router>
            {!this.state.dashboard && !this.state.RestDashboard && <NaviBar/>}
            <div>
                <Route exact path='/' component={Start}/>
                <Route path='/signup' component={Signup}/>
                <Route path='/signin' component={Signin} />
                <Route path='/location' component={Location}/>
                <Route path='/dashboard' render={(props)=><Dashboard {...props} dashboardon={()=>{this.setState({dashboard:true,RestDashboard:true})}} dashboardoff={()=>{
                    console.log('dashboard on');
                    this.setState({dashboard:false})}}/>} />
                <Route path='/RestaurantSignup' component={RestaurantSignupPage} />
                <Route path='/RestaurantLogin' component={RestaurantLoginPage} />
                <Route exact path='/RestaurantDashboard' render={(props)=><RestaurantDashboard {...props} RestDashboardon={()=>{this.setState({RestDashboard:true,dashboard:true})}} restdashboardoff={()=>{this.setState({RestDashboard:false})}}/>}/>
                </div> 
        </Router>
    )
}

}
