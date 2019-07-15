const reducer = (state , action)=>{
switch(action.type){
    case "SET_USER":{
        console.log("SET_USER CALLED");
        return {...state, user:action.data}
    }
    case "REMOVE_USER":{
        return {...state, user:null}
    }
    case "SET_RESTAURANT":{
        console.log('setting restaurant in store')
        return {...state,restaurant:action.data}
    }
    case "SET_LOCATION":{
        console.log('seting location')
        return {...state,location:action.location}
    }
    default:{
        return state;
    }


}
}
export default reducer;