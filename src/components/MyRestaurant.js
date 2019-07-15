import React, { Component } from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import Ratings from './rating'
import ContainedButton from './priButton'
import { db } from '../config/firebase';
import { TextField } from '@material-ui/core'
import Collapse from '@material-ui/core/Collapse';
import { add_restaurant } from '../store/action';
import { Button, Alert } from 'react-bootstrap'
import OutlinedButtons from './button';
import { connect } from 'react-redux'
import ReactLoading from 'react-loading';
import MyMapComponent from './MyMapComponent'
import '../App.css'
class MyRestaurant extends Component {
    state = {
        data: this.props.data,
        mealshow: false,
        flag: false,
        flag2: false,
        title: '',
        detail: '',
        Price: '',
        Category: '',
        show: false,
        allCat: [...this.props.data.categories],
        allMeals: [...this.props.data.meals],
        mealCat:'',
        loaderclass:'disableloader'
    }
    signOut() {
        console.log('signing out');
    }
    componentDidMount() {
        this.setState({ data: this.props.restaurant })
        this.getCat()
        this.getfoods()
    }
    addMoreCat() {
        if (this.state.flag == false)
            this.setState({ flag: true })
        else
            this.setState({ flag: false })

    }
    getfoods() {
        db.collection('Restaurant').doc(this.props.data.id).get()
            .then((res) => {
                console.log(res.data().meals, 'meals')
                this.setState({ allMeals: res.data().meals });
            })
    }
    addFoods() {
        if (this.state.flag2 == false)
            this.setState({ flag2: true })
        else
            this.setState({ flag2: false })

    }
    addMealToDB() {
        const { title, detail, Price, mealCat } = this.state;
        var obj = { title, detail, Price, mealCat, id: this.props.data.id };
        console.log(obj, 'meal obj')
        console.log(this.props.data.id, 'id')
        db.collection("Restaurant").doc(this.props.data.id).get()
            .then((res) => {
                console.log(res.data().meals)
                var data = res.data();
                var arr = [...data.meals, obj]
                console.log(arr, 'arr');
                console.log(data);
                data.meals.push(obj);
                this.setState({ allMeals: data.meals })
                db.collection("Restaurant").doc(this.props.data.id).update(data)
                    .then(() => {
                        console.log("meal added")
                        this.setState({ mealshow: true })
                        setTimeout(() => {
                            this.setState({ mealshow: false })
                        }, 2000)
                    })
            })
    }
    getFoodOfCat(cat) {
        console.log(cat)
    }
    getCat() {
        var arr = []
        db.collection('Restaurant').doc(this.props.data.id).get()
            .then((res) => {
                res.data().categories.map((e) => {
                    arr.push(e);
                })
                this.setState({ allCat: arr });
            })
    }
    sendCatToDB() {
        const { data, Category } = this.state;
        var arr = []
        db.collection('Restaurant').doc(data.id).get()
            .then((res) => {
                arr = [...res.data().categories]
                arr.push(Category);
                var obj = { ...res.data(), categories: arr };
                this.props.add_restaurant(obj);
                this.setState({ allCat: arr });
                db.collection('Restaurant').doc(data.id).set(obj)
                    .then(() => {
                        this.setState({ show: true });
                        setTimeout(() => {
                            this.setState({ show: false })
                        }, 2000)
                    })

            })
    }
    async componentDidUpdate(newstate, prestate) {
        // console.log(prestate,'prestate');
        // console.log(newstate,'newstate');


    }
    render() {
        console.log(this.state, 'state');
        // console.log(this.props.data.categories,'props categories');
        // console.log(this.state.data.categories,'categories');
        // var arr=[];
        // console.log(this.props.restaurant,'restaurant');
        // console.log(arr,'arr');
        // console.log(this.state.data.id,' prooppid')
        // console.log(this.props.data,'id')
        const data = this.state.data;
        // console.log(this.props.data)
        const { allCat, allMeals } = this.state;
        console.log(this.props.data.categories)
        return (
            <div>
                
                <Card style={{ width: '100%', textAlign: 'center' }}>
                    <Card.Img variant="top" src={data.profileURL} />
                    <ContainedButton title="change cover Pic" />
                    <Card.Body>
                        <Card.Title>{data.RestaurantName}</Card.Title>
                        <Card.Text>
                            <Ratings ratingVal={data.rating} />
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>{data.city}/{data.country}</ListGroupItem>
                        <ListGroupItem>Owner Name : {data.firstName} {data.lastName}</ListGroupItem>
                        <ListGroupItem>
                            Location
                        <MyMapComponent
                    setlnglat={(lng,lat)=>{this.setState({lng:lng,lat:lat})}}
                    location={{ lat:data.location.lat, lng:data.location.lng }}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
                        </ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        <div>
                            <div>
                            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <ReactLoading className={this.state.loaderclass} type='bars' color='brown' height={'20%'} width={'20%'} />
                        </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    {allCat.map((e, i) => {
                                        return <OutlinedButtons key={i} click={this.getFoodOfCat.bind(this, e)} title={e} />
                                    })}
                                </div>
                                <ContainedButton click={this.addMoreCat.bind(this)} title="Add More Categories" />
                                <Collapse in={this.state.flag}>
                                    <div style={{ borderTop: ' 1px solid gray', borderBottom: ' 1px solid gray', padding: 30, margin: 10 }}>

                                        <TextField
                                            variant="outlined"
                                            label="Category"
                                            value={this.state.Category}
                                            onChange={(e) => { this.setState({ Category: e.target.value }) }}
                                            margin="normal"
                                        /><br /><br />

                                        <Button onClick={this.sendCatToDB.bind(this)}>Add Category</Button><br /><br />
                                        <Alert show={this.state.show} variant="success">
                                            Category Added
                                          </Alert>

                                    </div>
                                </Collapse>
                            </div>
                            <div>
                                <div>
                                    {allMeals.map((e) => {
                                        return (<Card style={{border:'1px solid black',boxShadow:'5px 5px 15px black',margin:10}}>
                                            <Card.Header style={{fontSize:30}}>{e.title}</Card.Header>
                                            <Card.Body>
                                              <Card.Title>Price: {e.Price} Rs</Card.Title>
                                              <Card.Text>
                                              {e.detail}
                                              </Card.Text>
                                              <Button variant="primary">Edit</Button>
                                            </Card.Body>
                                          </Card>
                                        )

                                    })}

                                </div>
                                <ContainedButton click={this.addFoods.bind(this)} title="Add More Meals" />
                                <Collapse in={this.state.flag2}>
                                    <div style={{ borderTop: ' 1px solid gray', borderBottom: ' 1px solid gray', padding: 30, margin: 10 }}>

                                        <TextField
                                            variant="outlined"
                                            label="Title"
                                            value={this.state.title}
                                            onChange={(e) => { this.setState({ title: e.target.value }) }}
                                            margin="normal"
                                        /><br />
                                        <TextField
                                            variant="outlined"
                                            type='number'
                                            label="Price in Rs"
                                            value={this.state.Price}
                                            onChange={(e) => { this.setState({ Price: e.target.value }) }}
                                            margin="normal"
                                        />
                                        <br />
                                        <TextField
                                            id="outlined-select-currency-native"
                                            select
                                            // label="Categories"
                                            value={this.state.mealCat}
                                            onChange={(e) => { this.setState({ mealCat: e.target.value }) }}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            helperText="Select Category"
                                            margin="normal"
                                            variant="outlined"
                                        >
                                            {allCat.map(option => (
                                                <option onClick={() => { this.setState({ mealCat:option }) }} key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </TextField><br />
                                        <TextField
                                            multiline
                                            variant="outlined"
                                            rows="4"
                                            label="detail"
                                            value={this.state.detail}
                                            onChange={(e) => { this.setState({ detail: e.target.value }) }}
                                            margin="normal"
                                        /><br />
                                        <Button onClick={this.addMealToDB.bind(this)}>Add Meal</Button>
                                        <br /><br />
                                        <Alert show={this.state.mealshow} variant="success">
                                            Meal Added
                                          </Alert>

                                    </div>
                                </Collapse>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>

        )
    }


}
const mapStateToProps = (state) => {
    return {
        restaurant: state.restaurant
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        add_restaurant: (user) => dispatch(add_restaurant(user)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyRestaurant);