

import React, { Component } from 'react';
import AACN_FORM from '../organisms/aacn_form.jsx';
import axios from 'axios';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import myConfig from '../../data/form-config.js';
import stateData from '../../data/stateData.js';
import countryData from '../../data/countryData.js';

require('es6-promise').polyfill();
require('isomorphic-fetch');

// to be removed
const placeholder1 = "https://jsonplaceholder.typicode.com/posts";
const placeholder2 = "https://jsonplaceholder.typicode.com/users";

// querystring parameters
let qs = require('qs');
let custKey = qs.parse(window.location.search, { ignoreQueryPrefix: true }).custKey;
let env = qs.parse(window.location.search, { ignoreQueryPrefix: true }).env || "Prod";
if (env === "Prod") env = "";

// local variables
const rootUrl = 'http://services' + env + '.aacn.org/customer'; //'http://localhost:54265';
let myUrl = rootUrl + "/api/customers/" + custKey + "/addresses";
let endpoint = rootUrl + "/api/customers/" + custKey + "/addresses";
let getData;

// logging
console.log("custKey: " + custKey);
console.log("rootUrl: " + rootUrl);
console.log("myUrl: " + myUrl);

//We need to perform a get request for a json object that will populate our form 
var xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function () {
//     if (this.readyState === 4 && this.status === 200) {
//         let responseData = JSON.parse(xhttp.responseText);
//         console.log("Response-Full", responseData);
//         if (responseData.result != null) {
//             getData = responseData.result[0];
//             // Find the right address
//             let count; //not iterating??
//             for (count = 0; count < responseData.result.length; count++) {
//                 if (responseData.result[count].addressType === "Mailing") {
//                     getData = responseData.result[count];
//                     break;
//                 }
//             }
//             if (getData != null) {
//                 console.log("Response-Address", getData);
//             }
//         }
//     }
// };
//xhttp.open("GET", myUrl, false);
//xhttp.send();


getData = {name:"Amin Khan", line1:"test",line2:"test2", state:"CA", country:"UNITED STATES"}
console.log("MY DATA :",getData)

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading:true , payload: {}, myGet: { ...getData } }
    }

    componentDidMount() {

    //fetch(myUrl).then(res=>{console.log("started",res);return res.json()}).then(json=>{this.setState({myGet: {...json[0]}, isLoading:false});console.log("MY JSON",json[0])})
        this.setState({isLoading:false})

    }

    componentDidUpdate() {
        console.log("APP CDUpdate: ", this.state.myGet);
    }

    render() {
        let myVal = this.state.myGet;
        console.log("APP RENDER", this.state.myGet);
        if(this.state.isLoading){ return <div style={{textAlign:"center",fontSize:"4rem"}}>LOADING...</div>}
        return (
            <>
                <AACN_FORM unMount={this.props.unMount} endpoint={endpoint} custKey={custKey} myGetData={myVal} config={myConfig} myStates={stateData} myCountries={countryData} />
            </>
        );
    }
}

export default App