import React, { Component } from 'react';
import InputField from '../atoms/inputField.jsx';
import Regions from '../data_assets/data.js'
import Button from '../atoms/buttons.jsx'
import update from 'immutability-helper';

 



const postObj = {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, same-origin, *omit
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
    redirect: "follow", 
    referrer: "no-referrer",
}

class AddressBox extends Component {
    constructor(props) {
        super(props);
        this.state = { list: Regions.us , theme:"US", payload:{company:"",address:{line1:"",line2:"",city:"",state:"",zip:"",country:"US"}}};
    }



//event handlers
inputHandler=(ev)=>{
    ev.persist()
    console.log("INPUT FIELD:", ev.target.name  ||"No Name seen")
    if(ev.target.name==="state"){
        console.log("detected state change")
        let myState = ev.target.value
        console.log(myState)
        this.setState(prevState=>(update(prevState,{payload: {company: {$set:prevState.payload.company}, address:{state:{$set:myState} } } } )))
        return 
    }
    if(ev.target.name==="Country"){
        let myCountry = ev.target.value
        if(myCountry==="UK"){

            this.setState({list:Regions.uk,theme:"UK"});
            console.log("changed selection")
            }
            else {
            this.setState({list:Regions.us,theme:"US"});
            console.log("changed selection")
            }

            this.setState(prevState=>(update(prevState,{payload: {address:{country:{$set:ev.target.value} } } } )))
        return 
    }
    if (ev.target.name==="company"){
this.setState(prevState=>({payload:{company:ev.target.value,address:prevState.payload.address}}))
    }

    else{
        this.setState(prevState=>({...prevState,payload:{company:prevState.payload.company, address:{...prevState.payload.address, [ev.target.name]:ev.target.value}}}))
    }

}
handleCancel=(ev)=>{
    this.setState({payload: {company:"",address:{line1:"",line2:"",city:"",state:"",zip:"",country:""}}} );
    console.log("Cancelled state:" , this.state.payload.address)
}

handleSave=(ev)=>{
    console.log("INITIAL PAYLOAD",this.state.payload);
    console.log("INITIAL state",this.state);
    let unfilled = []
    let validate=(obj)=>{
        for(let key in obj){
            console.log("THIS IS THE KEY::",key)
            if(obj[key].constructor===Object){
                console.log(key, "IS AN OBJECT!!")
                validate(obj[key])
                
            }
            if (obj[key] ==="") {
                unfilled.push(key)
                
            }
         
        }
      
        return {...obj}

    }
    validate(this.state.payload)
      if(unfilled.length && (unfilled.includes)){
                             alert(`please fill ${unfilled.join(",")}`);
                             return null
                              }




    console.log(this.state.payload)
  
     let  res=validate(this.state.payload)
     res=JSON.stringify(validate(this.state.payload));
      fetch(this.props.endpoint, {...postObj,body:res}).then(res=>console.log("data sent")).catch(err=>console.log("error sending data"));
      console.log("JSON::" ,res);
        this.handleCancel()
    }


    boxStyles = {width:"400px",height:"400px",backgroundColor:"pink",boxShadow:"2px 2px 5px gray",position:"absolute",top:"10vh",left:"40vw"}
    render() { 

        return (  
            <div className="modal-dialog vertical-align-center">
            <div className="modal-content" >
            <div className="modal-header"><h4>Mailing</h4><button  type="button" className="close pull-right" data-dismiss="modal">X</button></div>
            <div className="col-sm-12">
               <InputField  changeHandler={this.inputHandler} text={this.state.payload.company} inputType="input" name="company" label="Company" placeholder="Company Name" />
               <InputField changeHandler={this.inputHandler} text={this.state.payload.address.line1} inputType="input" name="line1" label="Address"  placeholder="Address Line 1" />
               <InputField changeHandler={this.inputHandler} text={this.state.payload.address.line2} inputType="input"  name="line2" label=""placeholder="Address Line 2" />
               <InputField changeHandler={this.inputHandler} text={this.state.payload.address.city} inputType="input" name="city" label="City"  placeholder="city of residence" />
               <InputField  changeHandler={this.inputHandler} inputType="select" selection={this.state.list} name="state" label={this.state.theme==="US"?"State/Prov":"County"}placeholer="city of residence" />
               <InputField changeHandler={this.inputHandler} text={this.state.payload.address.zip} inputType="input" name="zip" label={this.state.theme==="US"?"zipcode":"postcode"} placeholder={this.state.theme==="US"?"zipcode":"postcode"} />
               <InputField  changeHandler={this.inputHandler} name="Country" inputType="select"  selection={["US","UK"]} label="Country" placeholer="city of residence" />
               </div>
               <div className="modal-footer">
                   <Button clickHandler={this.handleCancel} buttName="Cancel" />
                   <Button clickHandler={this.handleSave} buttName="Save" />
               </div>
            </div>
            </div> 




        );
    }
}

 
export default AddressBox;