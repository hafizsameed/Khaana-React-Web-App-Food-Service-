import React,{Component} from 'react'
import ReqCard from './reqCard'
import firebase, { db } from '../config/firebase';
import {connect} from 'react-redux' 
class ProgressingReqs extends Component{
    state={
        ProgressingReqs:[]
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
        db.collection('users').doc(user.id).collection('ProgressingReqs').onSnapshot((reqs)=>{
            this.setState({ProgressingReqs:[]});
            reqs.forEach((each)=>{
                arr.push(each.data());
            })
            console.log(arr);
            this.setState({ProgressingReqs:arr});
        })
    }
    render(){
        const {ProgressingReqs} = this.state;
    return(
        <div>
            {ProgressingReqs.map((e)=>{
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
 export default connect(mapStateToProps)(ProgressingReqs)