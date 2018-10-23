import React, { Component } from 'react';



function FormElement(props){

    let config=props.config;
    let render=""
  switch (config.type[0]) {
      case "input":
     render=[(
      
    <div className="form-group row">
        <label htmlFor={config.field} className="col-md-3 control-label" >{config.label}</label>
        <div className="col-md-9">
        <input className="form-control" name={config.field} type={config.input} placeholder={config.placeholder} required={config.validate}  value={props.mystate.payload[config]} onChange={props.handlers.handleChange}/>
        </div>
    </div>
      ) ]
      break;

      case "select":
      render = [ (
      
    <div className="form-group row">
        <label htmlFor={config.field} className="col-md-3 control-label">{config.label}</label>
    <div className="col-md-9">
        <select className="form-control" name={config.field} type={config.input} placeholder={config.placeholder} required={config.validate} onChange={props.handlers.handleChange}>
             
            {config.type[1].map((el,i)=><option key={i} value={el}>{el}</option> )}
        </select>
        </div>
    </div>
      )]
      break;


      case "radio":
      render = [ (
      
    <div className="form-group row">
        <label className="col-md-3 control-label" htmlFor={config.field}>{config.label}</label>
        <div className="col-md-9">
        {config.type[1].map( (el,i) =><div key={i}> <span>{config.type[1][i]}</span><input  type="radio" name={config.field} value={el} /> </div>)}
    </div>
    </div>
      )]


  }
  return render
}


export default FormElement




