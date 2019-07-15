import React,{Component} from 'react'
import ReqCard from './reqCard'
import firebase, { db } from '../config/firebase';
import {connect} from 'react-redux' 
import { Button } from 'react-bootstrap';
class RestProgressingReqs extends Component{
    state={
        RestProgressingReqs:[]
    }
    componentDidMount(){
        this.getdata()
    }
    getdata(){
        console.log('getting data');
        const {restaurant} = this.props;
        console.log(this.props.restaurant,'restaurant');
        const {user} = this.props;
        console.log(this.props.mydata);
        console.log(this.props.user);
       
        // var me=firebase.auth().currentUser.uid;
        var arr=[]
        db.collection('Restaurant').doc(restaurant.id).collection('delieveredReqs').onSnapshot((reqs)=>{
            this.setState({RestProgressingReqs:[]})
            reqs.forEach((each)=>{
                console.log(each.id);
                var obj={...each.data(),reqId:each.id};
                arr.push(obj);
                
            })
            console.log(arr,'arr');
            this.setState({RestProgressingReqs:arr});
        })
    }
    render(){
        console.log(this.state.RestProgressingReqs);
        console.log('Rest pending reqs')
        const {RestProgressingReqs} = this.state;
    return(
        <div>
            {RestProgressingReqs.map((e)=>{
       return <ReqCard prod={e.Price} title={e.title} detail={e.detail}/>
            })}
        </div>
    )
}




 }
 const mapStateToProps=(state)=>{
     return {
         user:state.user,
         restaurant:state.restaurant
     }
 }
 export default connect(mapStateToProps)(RestProgressingReqs)