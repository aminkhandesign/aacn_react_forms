import React, { Component } from 'react';
import countryData from '../../data/countryData.js';
import stateData from '../../data/stateData.js';


function FormElement(props) {

    console.log("THESE ARE THE FINAL PROPS",props.mystate)
    let config = props.config;
    let countries = [];
    let selectField = ()=>{
        console.log("SelectField fired",props.mystate.payload.country)
        let val = 'defaultValue'
        switch (config.field) {
            case "country":
            val =  props.mystate.payload.country;
            break;
            case "state":
            val = props.mystate.payload.state
            break;

        }
        //console.log("THIS IS THE SCALAR PROBLEM",props.mystate.payload.country,"STATE",props.mystate.payload.state)
        return val
    }
    console.log("CONFIG IS ",config)
    // creating a list of country codes  -- problem: not seeing config as aan iterable array

   // countries = [...listFromConfig];
    let listFromData = countryData.map(el=>[el.name, el.code]);
    let fillOptions =(data)=>data.map(el=>[el.name, el.code])
   // console.log("THE FINAL LIST:"+"\n"+listFromData)
    countries = [...countries,...listFromData]
    let render = "";
    switch (config.type[0]) {

        case "input":
            render = [
                (
                    <div className="form-group row">
                        <label htmlFor={config.field} className="col-md-3 control-label">{config.label}</label>
                        <div className="col-md-9">
                            <input className="form-control" name={config.field} type={config.input} placeholder={config.placeholder?config.placeholder:""
                            } required={config.validate} value={props.mystate.payload[config.field] || ""} onChange={props.handlers.handleChange} />
                        </div>
                    </div>
                )
            ];
            break;

        case "select":
            render = [
                (
                    <div className="form-group row">
                        <label htmlFor={config.field} className="col-md-3 control-label">{config.label}</label>
                        <div className="col-md-9">
                            <select  value={selectField()} size={0} className="form-control" name={config.field} type={config.select} 
                             required={config.validate} onChange={props.handlers.handleChange}>
                                {config.field==="country"?fillOptions(countryData).map((el, i) =>
                                <option key={i}  value={el[1]} >{el[0]} 
                                </option>):
                                fillOptions(stateData).map((el, i) =>
                                <option key={i} value={el[1]} >{el[0]} 
                                </option>)}
                            </select>
                        </div>
                    </div>
                )
            ];
            break;


        case "radio":
            render = [
                (
                    <div className="form-group row">
                        <label className="col-md-3 control-label" htmlFor={config.field}>{config.label}</label>
                        <div className="col-md-9">
                            {config.type[1].map(
                                (el, i) => <div key={i}> <span>{config.type[1][i]}</span><input type="radio"
                                    name={config.field} value={el} checked={props.mystate.payload[config.field] === config.field} />
                                </div>)}
                        </div>
                    </div>
                )
            ];


    }
    return render;
}

export default FormElement




