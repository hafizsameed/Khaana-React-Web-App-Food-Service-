import React ,{Component} from 'react'
import  firebase,{db} from '../config/firebase'
import {Card,ListGroup,ListGroupItem} from 'react-bootstrap'
import Ratings from './rating'
import { connect } from 'react-redux';
import MyMapComponent from './MyMapComponent'
import OutlinedButtons from './priButton'
import {Button} from 'react-bootstrap'
import { flexbox } from '@material-ui/system';
import { Typography } from '@material-ui/core';
import SweetAlert from 'sweetalert2-react';

class DetailedScreen extends Component{
    state={
      allCat:[],
        data:{},
        allMeals:[],
        items:[],
        totalamount:0,
        filteredmeals:[]
    }
    getFoodOfCat(cat){
      const {allMeals} = this.state;
      var arr=[];
      console.log(cat);
      allMeals.map((each)=>{
        if(each.mealCat===cat){
          console.log(each,'each');
          arr.push(each);
        }
        
        })
        this.setState({filteredmeals:arr});
    }
    getData(){
        var id=this.props.match.params.id;
        db.collection('Restaurant').doc(id).get()
            .then((data)=>{
              console.log(data.data().meals,'data');
                this.setState({data:data.data(),allCat:data.data().categories,allMeals:data.data().meals,filteredmeals:data.data().meals})
            })
    }
    componentDidMount(){
        this.getData();
    }
    addToItems(i){
      const {allMeals,items} = this.state;
      console.log(allMeals,items,'all meals amd items')
      var arr=[...items];
      console.log(allMeals[i])
      arr.push(allMeals[i]);
      console.log(arr,'arr')
      this.setState({items:arr,totalamount:parseInt(this.state.totalamount)+parseInt(allMeals[i].Price)})
      console.log(this.state.items,'items');
      this.setState({show:true,sweettext:'Item Added Successfully',sweettitle:'Success'});

    }
    // checkout(){
    //   const {data} = this.state;
    //   console.log(data,'rest data');
    //  console.log(firebase.auth().currentUser.uid);
    //  var myId=firebase.auth().currentUser.uid
    //   const {items}= this.state;
    //   console.log(items);
    //   data.pendingReqs=[...this.state.data.pendingReqs];
    //   db.collection('users').doc(myId).get()
    //   .then((res)=>{
    //     for(var key in items){
    //       items[key].from = `${res.data().firstName} ${res.data().lastName}`;
    //       data.pendingReqs=[...this.state.data.pendingReqs,...items]
    //         console.log(data.pendingReqs);
    //       db.collection("Restaurant").doc(items[key].id).update({
    //         "PendingReqs":data.pendingReqs
    //       })
    //       .then(()=>{
    //         console.log('sucessfully added')
    //       })
    //       }
    //     })
    //     // db.collection('Restaurant').doc(items[key].id).update()
    

    // }
    deleteitem(e){
      const {items,totalamount} = this.state;
      var arr=[...items];
      console.log(e);
      arr.pop(e);
      var amount=parseInt(totalamount) - parseInt(e.Price);
      console.log(parseInt(e.Price),parseInt(totalamount));
      console.log(arr,amount);
      this.setState({items:arr,totalamount:amount});

    }
    checkout(){
      var myId=firebase.auth().currentUser.uid;
      const {items,data}= this.state;
      console.log(data)
      console.log( this.props.match.params.id)
      for(var key in items){
  
        items[key].custId=myId;
        console.log(items[key])
        db.collection(`Restaurant/`).doc(this.props.match.params.id).collection('pendingReqs').add(items[key])
        .then((res)=>{
          console.log(res.id);
          db.collection("users/").doc(myId).collection('pendingReqs').doc(res.id).set(items[key])
          .then((post)=>{
            this.setState({show:true,sweettext:'Item Added Successfully',sweettitle:'Success'});
            console.log(post);
            console.log("added")
          })
        })
      }
      
      // db.collection(`pendingReqs${this.props.match.params.id}`).onSnapshot((load)=>{
      //   console.log(load.metadata)
      //   load.forEach((each)=>{
      //    console.log(each.data(),'each')
      //   })
      // })
    }
    render(){

        const {data,allCat,allMeals,items,filteredmeals} = this.state
    return (
      <div style={{display:'flex'}}>
         <SweetAlert
        show={this.state.show}
        title={this.state.sweettitle}
        text={this.state.sweettext}
        onOutsideClick={()=>{this.setState({show:false})
                    console.log('outside clicked')}}
        onConfirm={()=>this.setState({show:false})}
      />
       <Card style={{ width: '100%' ,textAlign:'center'}}>
  <Card.Img variant="top" src={data.profileURL} />
  <Card.Body>
    <Card.Title>{data.RestaurantName}</Card.Title>
    <Card.Text>
      <Ratings ratingVal={data.rating}/>
    </Card.Text>
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroupItem>{data.city}/{data.country}</ListGroupItem>
    <ListGroupItem>{Math.round(this.props.location.state.dis)} KM away from your home</ListGroupItem>
    <ListGroupItem>Owner Name : {data.firstName} {data.lastName}</ListGroupItem>
    <ListGroupItem>
    </ListGroupItem>
  </ListGroup>
  <Card.Body>
                        <div > 
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                  <OutlinedButtons click={()=>{this.setState({filteredmeals:allMeals})}} title="All"/>
                                    {allCat.map((e, i) => {
                                        return <OutlinedButtons key={i} click={this.getFoodOfCat.bind(this, e)} title={e} />
                                    })}
                                </div>
                            </div>
                            <br/>
                            <div>
                                <div >
                                    {!!filteredmeals.length ? filteredmeals.map((e,index) => {
                                        return (<Card style={{margin:10}}>
                                            <Card.Header style={{fontSize:30}}>{e.title}</Card.Header>
                                            <Card.Body>
                                              <Card.Title>Price: {e.Price} Rs</Card.Title>
                                              <Card.Text>
                                              {e.detail}
                                              </Card.Text>
                                              <Button onClick={this.addToItems.bind(this,index)} variant="primary">Add to Items</Button>
                                            </Card.Body>
                                          </Card>
                                        )

                                    }) : 
                                    <div>
                                    <h3>No Meals Right Now</h3>
                                    </div>
                                  }

                                </div>
                            </div>
                        </div>
                    </Card.Body>
</Card>
<div style={{width:"35%",margin:10,border:'1px solid black',height:'100%',padding:20}}>
          <div>
            <Typography variant='h4' style={{width:'100%' , textAlign:'center',padding:'20px'} }>CART</Typography>
            { items.map((e)=>{
              return <Card style={{ width: '100%' }}>
              <Card.Body>
                <Card.Title>{e.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{e.Price} Rs.</Card.Subtitle>
                <Card.Text>
                  {e.detail}
                </Card.Text>
                <Card.Link onClick={this.deleteitem.bind(this,e)}>Delete</Card.Link>
              </Card.Body>
            </Card>
            })}
          </div>
          <div>
            <Typography>Total Amount : {this.state.totalamount} Rs</Typography>
            { <Button onClick={this.checkout.bind(this)} variant='secondary'>CheckOut</Button>}
          </div>
  </div>
  </div>
    )
}

}
const mapStateToProps=(state)=>{
  return {
    user:state.user
  }
}
export default connect(mapStateToProps)(DetailedScreen)