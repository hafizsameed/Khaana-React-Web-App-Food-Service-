import React, {Component} from 'react'
import Container from 'react-bootstrap/Container'
import TextField from '@material-ui/core/TextField'
import OutlinedButtons from './priButton'
import firebase , {db} from '../config/firebase'
import { connect } from 'react-redux';
import { add_restaurant } from '../store/action';

class RestaurantLoginPage extends Component{
    state={
        email:'',
        password:''
    }

    styles = {
        container: {
            width: "50%",
            marginTop: "20px",
            textAlign: "center",
            padding:10,
            border: "1px solid black",
        },
        head: {
            color: "#D60665"
        },
        btn: {
            backgroundColor: " white",
            color: "#D60665",
            border: "2px solid #D60665",
            margin: "10px"
        },
        maindiv: {
            display: "flex",
            flexWrap: "nowrap",

        }
    }
    signin(){
        const { email,password} = this.state;
        console.log('signing in');
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then((res)=>{
            db.collection('Restaurant').doc(res.user.uid).get()
            .then((succ)=>{
                console.log(succ.data(),'succ');
                var obj={...succ.data()};
                obj.id=res.user.uid;
                console.log(obj,'obj')
                this.props.store_restaurant(obj);
                this.props.history.push('/RestaurantDashboard',obj);
            })
        })
    }
    render(){

    return(
        <div>
            <Container style={this.styles.container}>
                        <h1 style={this.styles.head}>Restaurant Login </h1><br />

                        <TextField
                            label="Email"
                            value={this.state.email}
                            onChange={(e) => { this.setState({ email: e.target.value }) }}
                            margin="normal"
                        />
                        <br />
                        <TextField
                            label="Password"
                            value={this.state.password}
                            onChange={(e) => { this.setState({ password: e.target.value }) }}
                            margin="normal"
                        />
                        <br /><br />
                        <OutlinedButtons title="Sign In" click={this.signin.bind(this)} type="submit" />
                    </Container>
        </div>
    )

}



}
const mapStateToProps=(state)=>{ 
    console.log("state",state);
  return {
    user:state.user,
  }
  }
  const mapDispatchToProps=(dispatch)=>{
  return {
    store_restaurant:(user)=>dispatch(add_restaurant(user)),
  }
  }
export default connect(mapStateToProps,mapDispatchToProps)(RestaurantLoginPage)