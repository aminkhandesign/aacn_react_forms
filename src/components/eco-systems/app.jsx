import React, { Component } from 'react';
import AACN_FORM from '../organisms/aacn_form.jsx';
import axios from 'axios';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import myConfig from '../../data/form-config.js'
const  endpoint = "https://jsonplaceholder.typicode.com/photos"
const getData = "https://jsonplaceholder.typicode.com/posts"

//We need to perform a get request for a json object that will populate our form 







class App extends Component {
    constructor(props) {
        super(props);

        this.state = { payload:{  },myGet:{name:"harold"}}
        console.log("APP CONSTRUCTOR",this.state.myGet)
    }

    componentDidMount(){
    
        axios.get(getData).
        then(res=>res.data[0]).
        then(data=>{this.setState({myGet:data});console.log("APP CDMount:", this.state.myGet)})
    }
  componentDidUpdate(){
      console.log("APP CDUpdate:",this.state.myGet)
  }
    render(){
        let myVal = this.state.myGet
        console.log("APP RENDER",this.state.myGet)   
        return (  
            <>
            < AACN_FORM  endpoint={endpoint}   myGetData={myVal} config={myConfig} />
            </>
               );
    }
}
 
export default App;