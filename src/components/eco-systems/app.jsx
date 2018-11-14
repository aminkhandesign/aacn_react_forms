import React, { Component } from 'react';
import AACN_FORM from '../organisms/aacn_form.jsx';
import axios from 'axios';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import myConfig from '../../data/form-config.js'


let getData = {fname:"peter",line1:"this is address"} 
let myUrl = "https://jsonplaceholder.typicode.com/users";
let user = 0;
let userId = user>0? "/?user="+user:"";
const  endpoint = "https://jsonplaceholder.typicode.com/users";
// axios.get(myUrl+"/"+userId).
//             then(res=>{getData=res})

//We need to perform a get request for a json object that will populate our form 
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       getData = JSON.parse(xhttp.responseText)[0];
       console.log("RESPONSE",getData)
    }
};
xhttp.open("GET", myUrl+userId, false);
xhttp.send();






class App extends Component {
    constructor(props) {
        super(props);

        this.state = { payload:{  },myGet:{...getData}}

    }

    componentDidMount(){
        if(!(typeof getData ==="object")){
        axios.get(getData).
        then(res=>{console.log("AXIOS:",res.data);return res.data[0]}).
        then(data=>{this.setState({myGet:{data}});console.log("APP CDMount:", this.state.myGet)})
        }
    }
  componentDidUpdate(){
      console.log("APP CDUpdate: ",this.state.myGet)
  }
    render(){
        
        let myVal = this.state.myGet
        console.log("APP RENDER",this.state.myGet)   
        return (  
            <>
            < AACN_FORM  endpoint={endpoint}  userId={user} myGetData={myVal} config={myConfig} />
            </>
               );
    }
}
 
export default App;