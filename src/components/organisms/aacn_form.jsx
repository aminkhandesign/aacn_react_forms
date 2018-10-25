import React, {Component} from 'react';
import FormElement from '../molecules/formElement.jsx'


class AACN_FORM extends Component {
    constructor(props) {
        super(props);
     
        //this is our state which we will have to poulate from the values in our config object
     this.payLoadFromProps = this.setInitialState()
        this.state = {payload:{...this.payLoadFromProps}}
        
    }

    renderForm(){

        let formElements=[];
        if(this.props.config){
           formElements =  this.props.config[1].map(el=><FormElement key={el.field} mystate={this.state} handlers={this.handlers} config={el} />)
        }
        return formElements
    }

    setInitialState =()=>{

        let formFields = this.props.config[1];
        let myList =formFields.map(el=>el.field);
        let payLoadFromProps = {};
        for(let i of formFields){
            payLoadFromProps[i.field]="";
            if (i.type[0]==="select" || i.type[0]==="radio" ){
                payLoadFromProps[i.field]=i.type[1][0]
            }
    
        }

        return payLoadFromProps

    }
    

    handleChange = (ev)=>{
        ev.preventDefault();
        ev.persist()
        console.log("key pressed!!");
        this.setState( (prevState=>( {payload: {...prevState.payload,...{[ev.target.name]: ev.target.value }}})))
        console.log(this.state.payload)
    
    }
    handleSubmit=(ev)=>{
        //ev.preventDefault();
        if(ev.target.value="")
        console.log("submit fired")
        
        let formInfo = JSON.stringify(this.state.payload);
        let endPoint = this.props.endPoint || "#";
        const fetchData = {
            method: "POST",
            mode: "same-origin", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, same-origin, *omit
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                // "Content-Type": "application/x-www-form-urlencoded",
            }
        }
        fetch(endPoint,fetchData)
        .then(res=>console.log("succes"))
        .catch(err=>this.setState(console.log(`Did not send: ${err}`)))

        console.log("PAYLOAD: ",this.state.payload)



       
    }
 

    handleCancel=(ev)=>{
        ev.preventDefault()

                this.setState(prevState=>({payload:this.payLoadFromProps } ))
    }
    keyCount= 0;
    handlers = {handleChange:this.handleChange,handleSubmit:this.handleSubmit,handleFocus:this.handleFocus}
    render() { 

        return ( 
            
            <form  className="form-group" >
                <div className="modal-dialog vertical-align-center">
                <div className="modal-content">
                <div className="modal-header "><h4>{this.props.config[0]}</h4><button  type="button" className="close pull-right" data-dismiss="modal">X</button></div>
                <div className="col-sm-12 h6">
                {this.renderForm()}
                 </div>
                <div className="modal-footer">
                 <button onClick = {this.handleCancel} className="btn btn-primary">CANCEL</button>
                 <button  onClick={this.handleSubmit} className="btn btn-primary" >SUBMIT</button>
                 </div>
                </div>
                </div>
              
            </form>      
         );
    }
}
 
export default AACN_FORM;