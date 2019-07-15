import React,{Component} from 'react'
import ReqCard from './reqCard'
import firebase, { db } from '../config/firebase';
import {connect} from 'react-redux' 
import { Button } from 'react-bootstrap';
class RestPendingReqs extends Component{
    state={
        RestPendingReqs:[]
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
        db.collection('Restaurant').doc(restaurant.id).collection('pendingReqs').onSnapshot((reqs)=>{
            this.setState({RestPendingReqs:[]});
            reqs.forEach((each)=>{
                console.log(each.id);
                var obj={...each.data(),reqId:each.id};
                arr.push(obj);
                
            })
            console.log(arr,'arr');
            this.setState({RestPendingReqs:arr});
        })
    }
    sendtoProgress(obj){
        this.setState({RestPendingReqs:[]});
        console.log('moving')
        db.collection('Restaurant').doc(obj.id).collection('pendingReqs').doc(obj.reqId).delete()
        .then(()=>{
            db.collection('Restaurant').doc(obj.id).collection('progressingReqs').doc(obj.reqId).set(obj)
            .then(()=>{
                db.collection('users').doc(obj.custId).collection('pendingReqs').doc(obj.reqId).delete()
                .then(()=>{
                    db.collection('users').doc(obj.custId).collection('progressingReqs').doc(obj.reqId).set(obj)
                    .then(()=>{
                        var arr=[]
                        db.collection('Restaurant').doc(obj.id).collection('pendingReqs').onSnapshot((allreqs)=>{
                            allreqs.forEach((each)=>{
                                 arr.push(each.data());
                             })
                             this.setState({RestPendingReqs:arr});
                             console.log('moved');
                            })
                    })
                })
            })
        })
    }
    render(){
        console.log('render')
        console.log(this.state.RestPendingReqs);
        console.log('Rest pending reqs')
        const {RestPendingReqs} = this.state;
    return(
        <div>
            {RestPendingReqs.map((e)=>{
       return <ReqCard prod={e.Price} title={e.title} detail={e.detail}>
           <Button onClick={this.sendtoProgress.bind(this,e)}>Progress</Button>
       </ReqCard>
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
 export default connect(mapStateToProps)(RestPendingReqs)