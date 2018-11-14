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
let userId = "1F5A81E7-2B73-4D5F-B087-3267F9E14BC8";

// local variables
const rootUrl = 'http://servicesdev.aacn.org/customer';
let myUrl = rootUrl + "/api/customers/" + userId + "/addresses";
let endpoint = rootUrl + "/api/customers/" + userId + "/addresses";
let getData = { fname: "peter", line1: "this is address" }
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
                if (responseData.result[0].addressType === "Mailing") {
                    getData = responseData.result[0];
                    break;
                }
            }
            if (getData != null)
                console.log("Response-Address", getData);
        }
    }
};
xhttp.open("GET", myUrl, false);
xhttp.send();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { payload: {}, myGet: { ...getData } }
    }

    componentDidMount() {
        // axios.get(myUrl+"/"+userId).
        //             then(res=>{getData=res})
        if (!(typeof getData === "object")) {
            axios.get(getData).then(res => {
                console.log("AXIOS:", res.data);
                return res.data[0];
            }).then(data => {
                this.setState({ myGet: { data } });
                console.log("APP CDMount:", this.state.myGet)
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
                <AACN_FORM endpoint={endpoint} userId={userId} myGetData={myVal} config={myConfig} myStates={stateData} myCountries={countryData} />
            </>
        );
    }
}

export default App