import React , {Component} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import MediaCard from './restaurantCard'
import ContainedButton from './priButton'
import distance from './distance'
import firebase,{db} from '../config/firebase'
import ReactLoading from 'react-loading';
import '../App.css'
import {connect} from 'react-redux';
import SweetAlert from 'sweetalert2-react';
import CardExample from './mdbcard'

// var temp=[];
class Restaurants extends Component{
    state={
        Ads:[],
        limit:15,
        search:'',
        filteredAds:[],
        loaderclass:'activeloader',
        searchedtitle:''
    }
    styles={
    mediacard:{
        marginTop:'20px',
        width:'400px'
    },
    cardDiv:{
        marginTop:20,
        
    }

}
sendobj(id,dis){
    console.log(id);
    this.props.history.push('/dashboard/restaurants/'+id,{dis});

}
renderAds(){
    const {user,location} = this.props
    var arr=[];
    db.collection('Restaurant').onSnapshot((res)=>{
        res.forEach((each)=>{
            var eachdata=each.data();
            console.log(eachdata.location,'loca')
            var dis=distance(location.lat,location.lng,eachdata.location.lat,eachdata.location.lng,'K')
            console.log(dis,'distance');
            if(dis<10){
                var obj2=each.data();
                obj2.dis=dis;
                obj2.id=each.id;
                arr.push(obj2);
            }
        })
        this.setState({Ads:arr})
        this.setState({filteredAds:arr,loaderclass:'disableloader'})
    })
    
}
catSearch(cat,e) {
    this.setState({searchedtitle:cat})
    console.log(e.target.style,'catsearch ka e');
    // e.target.className='clickedbtn'
    const {Ads}=this.state
    var arr=[]
console.log(this.state.Ads);
     Ads.map((eachobj)=>{
    eachobj.categories.map((e)=>{
        if(e.toLowerCase()===cat.toLowerCase()){
            arr.push(eachobj);
        }
    })
})
console.log(arr);
this.setState({filteredAds:arr});
} 
search(e){
    this.setState({searchedtitle:`search result for "${e.target.value}"`})
    this.setState({search:e.target.value})
    const {Ads}=this.state
var text=e.target.value;
const result= Ads.filter((elem)=>{
    console.log(elem,'elem')
    return elem.RestaurantName.slice(0,text.length).toLowerCase().indexOf(text.toLowerCase()) !== -1
} 
)
this.setState({filteredAds:result, text});
}
componentDidMount(){
    this.renderAds();
}
onScroll(e) { 
    if(e.target.scrollHeight === Math.ceil(e.target.clientHeight + e.target.scrollTop)) {
        this.loadMore();
    }
}
loadMore() {
    console.log('loadmore ==>')
    this.setState({
        limit: this.state.limit + 15
    })
}
render(){
    console.log(this.props.user,'user')
    const { limit,filteredAds } = this.state;
    var temp = [...filteredAds];
    console.log(temp,'temp')
    temp.length = limit;
    
    return (
      <div style={{textAlign:"center"}}>
    <TextField 
    onChange={(e)=>{this.search(e)}}
        label="Search"
        value={this.state.search}
        style={{ width:"90%" }}
        placeholder="Type Here"
        helperText="Search Restaurants and food you Like!"
        fullWidth
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />    
      <div style={{display:"flex",justifyContent:"center"}}>  
          <ContainedButton click={(e)=>{this.renderAds()}} title="All"/> 
          <ContainedButton click={(e)=>{this.catSearch('chinese',e)}} title="chinese"/> 
          <ContainedButton click={(e)=>{this.catSearch('fast food',e)}} title="FastFood"/> 
          <ContainedButton click={(e)=>{this.catSearch('Bar B Q',e)}} title="Bar B. Q"/> 
          <ContainedButton click={(e)=>{this.catSearch('seafood',e)}} title="Sea food"/> 
      </div>
     <Paper >
                        <br/>
                  {!this.state.searchedtitle.length   ||  <h3 style={{color:'white',backgroundColor:'darkblue',padding:'20px'}}>{this.state.searchedtitle}</h3>}
     <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <ReactLoading className={this.state.loaderclass} type='bars' color='brown' height={'20%'} width={'20%'} />
                        </div>
     <div  onScroll={this.onScroll.bind(this)} >

                    { !filteredAds.length ? <h3>
                                currently no items available
                            </h3>
                            :
                         temp.map((data,index)=> {
                        return (
                        // <div key={index} style={this.styles.cardDiv}>
                        // <MediaCard  style={this.styles.mediacard} rating={data.rating} image={data.profileURL} head={data.RestaurantName} city={data.city} country={data.country}>
                        // <Button onClick={()=>{this.sendobj(data.id,data.dis)} } size="small" color="primary">
                        //      Click to get details
                        //     </Button>
                        // </MediaCard>
                        //     </div>
                        <CardExample title={data.RestaurantName} img={data.profileURL} city={data.city} country={data.country} click={()=>{this.sendobj(data,data.dis)}}/> 
                            ) 
                            
                            
                    })}
    </div>
     </Paper>
     </div>

    )
}
}
const mapStateToProps=(state)=>{
    return {
        user:state.user,
        location:state.location
    }
}

export default connect(mapStateToProps)(Restaurants)