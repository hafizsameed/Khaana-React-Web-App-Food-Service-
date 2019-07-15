import React,{Component} from 'react'
import ReqCard from './reqCard'
import firebase, { db } from '../config/firebase';
import {connect} from 'react-redux' 
import EditableRatings from './editablerating'
class DelieveredReqs extends Component{
    state={
        DelieveredReqs:[]
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
        db.collection('users').doc(user.id).collection('delieveredReqs').onSnapshot((reqs)=>{
            this.setState({DelieveredReqs:[]});
            reqs.forEach((each)=>{
                arr.push(each.data());
            })
            console.log(arr);
            this.setState({DelieveredReqs:arr});
        })
    }
    render(){
        const {DelieveredReqs} = this.state;
    return(
        <div>
            {DelieveredReqs.map((e)=>{
       return <ReqCard prod={e.title} title={e.title} detail={e.detail}>
                <EditableRatings/>
                </ReqCard>
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
 export default connect(mapStateToProps)(DelieveredReqs)