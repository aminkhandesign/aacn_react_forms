import React, {Component} from 'react';
import FormElement from '../molecules/formElement.jsx'


class AACN_FORM extends Component {
    constructor(props) {
        super(props);
        let myList = props.config[1].map(el=>el.field);
        let payLoadFromProps = {};
        for(let i of myList){
            payLoadFromProps[i]="";
        }




        this.state = {payload:{...payLoadFromProps} }
        //this is our state which we will have to poulate from the values in our config object
        
        this.setOptionValue()
    }

    renderForm(){

        let formElements=[];
        if(this.props.config){
           formElements =  this.props.config[1].map(el=><FormElement  mystate={this.state} handlers={this.handlers} config={el} />)
        }
        return formElements
    }

    setOptionValue(){
       for(let i of this.props.config){
         
       }
    }

    
    //here we define our event handlers, Our inputs are controlled components 
    handleChange = (ev)=>{
        ev.preventDefault();
        ev.persist()
        console.log("key pressed!!");
        this.setState( (prevState=>( {payload: {...prevState.payload,...{[ev.target.field]: ev.target.value }}})))
        console.log(this.state.payload)
    
    }
    handleSubmit=(ev)=>{
        ev.preventDefault();
        console.log("submit fired")
        this.setOptionValue();
        
        let formInfo = JSON.stringify(this.state.payload);
        let endPoint = this.props.endPoint || "#";
        let fetchData = { 
            method: 'POST', 
            body: formInfo,
            headers: new Headers()
        }
        fetch(endPoint,fetchData)
        .then(res=>console.log("succes"))
        .catch(err=>this.setState(console.log(`Did not send: ${err}`)))

        console.log("PAYLOAD: ",this.state.payload)



       
    }
 
   
   
    handleCancel=(ev)=>{
        this.renderForm()

    }
    keyCount= 0;
    handlers = {handleChange:this.handleChange,handleSubmit:this.handleSubmit,handleFocus:this.handleFocus}
    render() { 

        return ( 
            
            <form >
                <div className="modal-dialog vertical-align-center">
                <div className="modal-content">
                <div className="modal-header"><h4>{this.props.config[0]}</h4><button  type="button" className="close pull-right" data-dismiss="modal">X</button></div>
                <div className="col-sm-12">
                {this.renderForm()}
                 </div>
                <div className="modal-footer">
                 <button onClick = {this.handleCancel} className="btn btn-primary">CANCEL</button>
                 <button  onClick={this.handleSubmit} className="btn btn-primary" type="submit">SUBMIT</button>
                 </div>
                </div>
                </div>
              
            </form>      
         );
    }
}
 
export default AACN_FORM;