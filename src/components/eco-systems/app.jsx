import React, { Component } from 'react';
import AACN_FORM from '../organisms/aacn_form.jsx';
import axios from 'axios';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import myConfig from '../../data/form-config.js';
import stateData from '../../data/stateData.js';
import countryData from '../../data/countryData.js';

// to be removed
const placeholder1 = "https://jsonplaceholder.typicode.com/posts";
const placeholder2 = "https://jsonplaceholder.typicode.com/users";

// querystring parameters
let qs = require('qs');
let custKey = qs.parse(window.location.search, { ignoreQueryPrefix: true }).custKey;

// local variables
const rootUrl = 'http://servicesdev.aacn.org/customer'; //'http://servicesdev.aacn.org/customer'; //'http://localhost:54265';
let myUrl = rootUrl + "/api/customers/" + custKey + "/addresses";
let endpoint = rootUrl + "/api/customers/" + custKey + "/addresses";
let getData;
let mailAddId;

// logging
console.log("custKey: " + custKey);
console.log(myUrl);

//We need to perform a get request for a json object that will populate our form 
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        let responseData = JSON.parse(xhttp.responseText);
        console.log("Response-Full", responseData);
        if (responseData.result != null) {
            getData = responseData.result[0];
            // Find the right address
            let count; //not iterating??
            for (count = 0; count < responseData.result.length; count++) {
                if (responseData.result[count].addressType === "Mailing") {
                    getData = responseData.result[count];
                    break;
                }
            }
            if (getData != null) {
                console.log("Response-Address", getData);
            }
        }
    }
};
xhttp.open("GET", myUrl, false);
xhttp.send();


getData = {line1:"test",line2:"test2",state:"CO", country:"UGANDA"}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { payload: {}, myGet: { ...getData } }
    }

    componentDidMount() {
        // axios.get(myUrl+"/"+custKey).
        //             then(res=>{getData=res})
        if (!(typeof getData === "object")) {
            axios.get(getData).then(res => {
                console.log("AXIOS:", res.data);
                return res.data[0];
            }).then(data => {
                this.setState({ myGet: { data } });
                console.log("APP CDMount:", this.state.myGet);
            });
        }
    }

    componentDidUpdate() {
        console.log("APP CDUpdate: ", this.state.myGet);
    }

    render() {
        let myVal = this.state.myGet;
        console.log("APP RENDER", this.state.myGet);
        return (
            <>
                <AACN_FORM unMount={this.props.unMount} endpoint={endpoint} custKey={custKey} myGetData={myVal} config={myConfig} myStates={stateData} myCountries={countryData} />
            </>
        );
    }
}

export default App