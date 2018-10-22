import React, { Component } from 'react';
import AACN_FORM from '../organisms/aacn_form.jsx';


let myConfig = [ "MY TEST FORM", [{type:["input"],label:"First Name", placeholder:"enter name",validate:false, field:"name"},

{type:["select" , ["op1","op2"]],placeholder:"enter name", label:"Surname",validate:true, field:"name"},

{type:["radio" , ["op1","op2","op3","color"]], label:"option", placeholder:"enter name",validate:false, field:"name"},

{type:["input"],placeholder:"enter address",validate:false, field:"address",label:"Email"}] ]

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { payload:{  }} 
    }
 
    render(){

        return (  
               <AACN_FORM  config={myConfig} />
               );
    }
}
 
export default App;