import * as firebase from 'firebase'
import 'firebase/firestore'



// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA-NbbCr5PtwAIN2ryX-yTnUa-EhMOG-V4",
    authDomain: "foodpanda-9d49c.firebaseapp.com",
    databaseURL: "https://foodpanda-9d49c.firebaseio.com",
    projectId: "foodpanda-9d49c",
    storageBucket: "foodpanda-9d49c.appspot.com",
    messagingSenderId: "824730126943",
    appId: "1:824730126943:web:e674da4218fa5885"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db=firebase.firestore();
const temp=[]
  
function getdatafromdb(){
    db.collection("todo").onSnapshot((data)=>{
    data.forEach((e)=>{
        const obj= {id:e.id,...e.data()}
        temp.push(obj);
    })
    console.log(temp);
    })
    
    }
    export default firebase;
    export {
        db,
        getdatafromdb
    
    }