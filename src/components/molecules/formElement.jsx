import React, { Component } from 'react';



function FormElement(props){

    let config=props.config;
    let render=""
  switch (config.type[0]) {
      case "input":
     render=[(
      
    <div className="form-group">
        <label htmlFor={config.field} >{config.label}</label>
        <input className="form-control" name={config.field} type={config.input} placeholder={config.placeholder} required={config.validate}  value="" onChange={props.handlers.handleChange}/>
    </div>
      ) ]
      break;

      case "select":
      render = [ (
      
    <div className="form-group">
        <label htmlFor={config.field} >{config.label}</label>
        <select className="custom-select" name={config.field} type={config.input} placeholder={config.placeholder} required={config.validate}>
            {config.type[1].map(el=><option value={el}>{el}</option> )}
        </select>
    </div>
      )]
      break;


      case "radio":
      render = [ (
      
    <div className="form-group">
        <label htmlFor={config.field}>{config.label}</label>
        {config.type[1].map( (el,i) =><div> <span>{config.type[1][i]}</span><input  type="radio" name={config.field} value={el} /></div>)}
    </div>
      )]


  }
  return render
}


export default FormElement




