import React, { Component } from 'react';
import countryData from '../../data/countryData.js';


function FormElement(props) {

    let config = props.config;
    let countries = [];
    console.log("CONFIG IS ",config)
    let listFromConfig = config.forEach(obj=>obj.field==="country").type[1];
    countries = [...listFromConfig];
    let listFromData = countryData.map(el=>[el.name, el.code]);
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
                            <select className="form-control" name={config.field} type={config.select} value={null}
                             required={config.validate} onChange={props.handlers.handleChange}>
                                {countries.map((el, i) => <option key={i} value={el[1]}>{el[0]}</option>)}
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




