import React , {Component} from 'react'
import FullWidthTabs from './tabs'
class Requests extends Component{
styles={
    tabdiv:{
        display:"flex",
        justifyContent:"center"
    }
}
render(){
    return (
        <div style={this.styles.tabdiv}>
        <FullWidthTabs/>
        </div>
    )
}


}
export default Requests