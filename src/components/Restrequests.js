import React , {Component} from 'react'
import RestTabs from './RestTabs'
class RestRequests extends Component{
styles={
    tabdiv:{
        display:"flex",
        justifyContent:"center"
    }
}
render(){
    return (
        <div style={this.styles.tabdiv}>
        <RestTabs/>
        </div>
    )
}


}
export default RestRequests