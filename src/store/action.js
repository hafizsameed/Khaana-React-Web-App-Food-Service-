
const update_user=(user)=>{
    return {
        type : 'SET_USER',
        data:user
    }
}
const remove_user=()=>{
    return {
        type:"REMOVE_USER",
        data:null
    }
}
const add_restaurant=(user)=>{
    return{
        type:"SET_RESTAURANT",
        data:user
    }
}
const store_location=(location)=>{
    return{
        type:"SET_LOCATION",
        location
    }
}
export {
    update_user,
    remove_user,
    add_restaurant,
    store_location
}