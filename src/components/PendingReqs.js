import React,{Component} from 'react'
import ReqCard from './reqCard'
import firebase, { db } from '../config/firebase';
import {connect} from 'react-redux' 
class PendingReqs extends Component{
    state={
        pendingReqs:[]
    }
    componentDidMount(){
        this.getdata()
    }
    getdata(){
        const {user} = this.props;
        console.log(this.props.mydata);
        console.log(this.props.user);
        // var me=firebase.auth().currentUser.uid;
        var arr=[]
        db.collection('users').doc(user.id).collection('pendingReqs').onSnapshot((reqs)=>{
            this.setState({pendingReqs:[]});
            reqs.forEach((each)=>{
                arr.push(each.data());
            })
            console.log(arr);
            this.setState({pendingReqs:arr});
        })
    }
    render(){
        const {pendingReqs} = this.state;
    return(
        <div>
            {pendingReqs.map((e)=>{
       return <ReqCard prod={e.title} title={e.title} detail={e.detail}/>
            })}
        </div>
    )
}




 }
 const mapStateToProps=(state)=>{
     return {
         user:state.user
     }
 }
 export default connect(mapStateToProps)(PendingReqs)