import React, { Component } from 'react';
import FormElement from '../molecules/formElement.jsx';
import axios from 'axios';
import stateData from '../../data/stateData.js';
import countryData from '../../data/countryData.js';

class AACN_FORM extends Component {
    constructor(props) {
        super(props);

        //this is our state which we will have to poulate from the values in our config object
        this.payLoadFromProps = this.setInitialState();
        this.state = { payload: { ...this.payLoadFromProps } }
    }

    renderForm(info) {

        let formElements = [];
        if (this.props.config) {
            formElements =
                this.props.config[1].map(
                    el => <FormElement  key={el.field} mystate={this.state} handlers={this.handlers} config={el}/>);
        }
        return formElements;
    }

    setInitialState = () => {
        let formFields = [...this.props.config[1]];
        console.log(formFields)
        let myList = formFields.map(el => el.field);
        let payLoadFromProps = {};
        for (let i in formFields) {
            payLoadFromProps[formFields[i].field] = "";
            if (formFields[i].type[0] === "select" || formFields[i].type[0] === "radio") {
                payLoadFromProps[formFields[i].field] = formFields[i].type[1][0];
            }
        }
        return payLoadFromProps;
    }

    handleChange = (ev) => {
        ev.preventDefault();
        ev.persist();
        console.log("FIELD CHANGED",ev.target.name)
       // if(ev.target.name!=="country" || ev.target.name!=="state"){
        this.setState((prevState => ({ payload: { ...prevState.payload, ...{ [ev.target.name]: ev.target.value } } })));
        console.log("aacn_form.jsx-handleChange(): " + ev.target.name); //}
        // else  if (ev.target.name==="country" ) {
        //     this.setState((prevState => ({ payload: { ...prevState.payload, ...{ [ev.target.name]: ev.target.value } } })));
        //     console.log("THE SELECT FORM WAS CHANGED", ev.target.name)
        // }
        // else if (ev.target.name==="state" ){
        //     this.setState((prevState => ({ payload: { ...prevState.payload, ...{ [ev.target.name]: ev.target.value } } })));
        //     console.log("THE SELECT FORM WAS CHANGED", ev.target.name)
        // }
    } 

    handleSubmit = (ev) => {
        ev.preventDefault();

       

        console.log("submit fired");
        let userId = this.props.userId;
        // let countryToCheck = this.state.payload.country;
        // console.log("COUNTRY ENTERED AS:",this.state.payload.country )
        // let code = countryData.find(el=>el.name === countryToCheck);
        // console.log("THE ELEMENT TO CHECK",code)
        // this.setState(prevState=>({payload: {...prevState.payload,country:code.key}}))

        
        let formInfo = JSON.stringify(this.state.payload);
        console.log("FormInfo: " + formInfo);
        let formInfo_obj = { ...this.state.payload, id: userId }
        let endPoint = this.props.endpoint + "/" + this.state.payload["key"];
        console.log("endpoint: ", endPoint);
        const postData = {
            method: "PUT",
            accept: 'application/json',
            data: formInfo_obj,
            url: endPoint,
            mode: "no-cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                "Content-Type": "application/json; charset=utf-8"
                // "Content-Type": "application/x-www-form-urlencoded",
            }
        }
        axios(postData, formInfo_obj).then(function(response) {
            console.log("SUCESSS PAYLOAD: ", formInfo_obj)})
        .catch(err => console.log("SOMETHING WENT WRONG", err,"\n","PAYLOAD",formInfo_obj));
        ;
    }

    handleCancel = (ev) => {
        ev.preventDefault();

        this.setState(prevState => ({ payload: this.payLoadFromProps }));
    }

    keyCount = 0;

    handlers = { handleChange: this.handleChange, handleSubmit: this.handleSubmit, handleFocus: this.handleFocus }

    autofill() {
        let localData = this.props.myGetData;
        console.log("FORM  CDMount AutoFill()", localData);
        for (let i in localData) {
            console.log("FIELD",i);
            console.log("AUTO FILL:", i in this.state.payload, i);
            if (i in this.state.payload) {
                if(i!=="country") this.setState(prevState => ({ payload: { ...prevState.payload, [i]: localData[i] } }));
                else {  this.setState(prevState => ({ payload: { ...prevState.payload, country: localData.country} }))}
            }
        }
    }

    componentDidMount() {
        this.autofill();
        console.log("FORM CDMount ", this.props.myGetData);

    }

    componentWillReceiveProps(next) {
        this.forceUpdate();
        console.log("THIS IS CWRProps on FORM", this.props);
    }

    render() {
        return (
            <form className="form-group" >
                <div className="modal-dialog vertical-align-center">
                    <div className="modal-content">
                        <div className="modal-header "><h4>{this.props.config[0]}</h4><button type="button" className="close pull-right" onClick={this.props.unMount} data-dismiss="modal">X</button></div>
                        <div className="col-sm-12 h6">
                            {this.renderForm()}
                        </div>
                        <div className="modal-footer">
                            <button onClick={this.handleCancel} className="btn btn-primary">CANCEL</button>
                            <button onClick={this.handleSubmit} className="btn btn-primary" >SUBMIT</button>
                        </div>
                    </div>
                </div>

            </form>
        );
    }
}

export default AACN_FORM;