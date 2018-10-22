import React, {Component} from 'react';
import FormElement from '../molecules/formElement.jsx'


class AACN_FORM extends Component {
    constructor(props) {
        super(props);

        this.state = {payload:{...props.config[1]} }//this is our state which we will have to poulate from the values in our config object
    }

    renderForm(){

        let formElements=[];
        if(this.props.config){
           formElements =  this.props.config[1].map(el=><FormElement handlers={this.props.handlers} config={el} />)
        }
        return formElements
    }


    //here we define our event handlers, Our inputs are controlled components 
    handleChange = (ev)=>{
        ev.preventDefault();
        console.log("key pressed!!")
        this.setState( prevState => ({payload: {} })
        ev.target.value = this.state.payload[ev.target.name]
    
    }
    handleSubmit=(ev)=>{
        ev.preventDefault();
        console.log("submitted")

    }
    handleFocus=(ev)=>{}

    handlers = {handleChange:this.handleChange,handleSubmit:this.handleSubmit,handleFocus:this.handleFocus}
    render() { 
        console.log(this.props.handlers)
        return ( 
            
            <form >
                <div clasName="modal-dialog vertical-align-center">
                <div className="modal-header">
                <div ><h1>{this.props.config[0]}</h1></div>
                </div>
                {this.renderForm()}
                <div >
                 <button className="btn btn-primary">CANCEL</button>
                 <button  onSubmit={this.props.handlers.onSubmit} className="btn btn-primary" type="submit">SUBMIT</button>
                </div>

                </div>
            </form>      
         );
    }
}
 
export default AACN_FORM;