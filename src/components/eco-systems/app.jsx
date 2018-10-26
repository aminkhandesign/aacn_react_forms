import React, { Component } from 'react';
import AACN_FORM from '../organisms/aacn_form.jsx';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import myConfig from '../../data/form-config.js'
const  endpoint = "https://jsonplaceholder.typicode.com/photos"


//  let myConfig = [ "MY REACT FORM", [{type:["input"],label:"First Name", placeholder:"enter name",validate:false, field:"fname"},

// {type:["input"],placeholder:"enter name", label:"Surname",validate:true, field:"sname"},
// {type:["select" , ["London","Manchester"]],placeholder:"enter city", label:"City",validate:true, field:"city"},


// {type:["select" , ["op1","op2","op3","color"]], label:"option", placeholder:"enter name",validate:false, field:"radio"},

// {type:["input"],placeholder:"enter address",validate:false, field:"address",label:"Email"}] ]

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { payload:{  }} 
    }
 
    render(){

        return (  
            <>
            < AACN_FORM  endpoint={endpoint} config={myConfig} />
  
            </>
               );
    }
}
 
export default App;