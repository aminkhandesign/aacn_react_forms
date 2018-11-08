import React from 'react';


function InputField(props){

let styles = props.styling || {border:"1px solid gray",borderRadius:"5px",margin:"5px"}
let handler = props.changeHandler

if(props.inputType==="input"){


    return (
            <div className="form-group row">
            <label className="col-md-3 control-label">{props.label}</label>
            <div className="col-md-9">
            <input  name={props.name} onChange={props.changeHandler} value={props.text} className="form-control" placeholder={props.placeholder} />
            </div>
            </div>
    )
}
else if(props.inputType==="select") {

    return (
        <div className="form-group row">
            <label className="col-md-3 control-label">{props.label}</label>
            <div className="col-md-9">
            <select className=" form-control" onChange={props.changeHandler}   name={props.name} >
                {props.selection.map(el=><option key={el} value={el}>{el}</option>)}
            </select>
            </div>

        </div>
    )
    
}
return <div>Please specify inputType</div>
}

export default InputField