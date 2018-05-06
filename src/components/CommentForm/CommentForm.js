import React, { Component } from 'react';
import Gravatar from 'react-gravatar'

import './style.css'



class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      message: '',
      onSubmit:false,
      invalids: {
        email: false,
        message: false
      }
    }

    console.log(props)
  }

  validateEmail = (event) => {
    const email = event.target.value
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = re.test(String(email).toLowerCase())
    const invalids = this.state.invalids
    console.log('email',email)
    if (!isValid || email.length == 0) 
      invalids.email = true;
    else
      invalids.email = false;

    this.setState({ invalids })

  }
  validateMessage = (event) => {
    const message = event.target.value;
    const invalids = this.state.invalids

    if (!message)
      invalids.message = true;
    else
      invalids.message = false;
  }
  emailChanged = (event) => {
    const email = event.target.value
    this.setState({ email })
  }

  messageChanged = (event) => {
    const message = event.target.value;
    this.setState({ message })
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { email,message,invalids } = this.state;
    if(email.length == 0){
      invalids.email = true
    }
    if(message.length == 0){
      invalids.message = true;
    }
    const invalid = Object.values(invalids).reduce((acc, curr) => acc || curr, false)

    this.setState({onSubmit:true,invalids})
    if (invalid) {
      return;
    } else {

      this.props.createNewComment({ email: this.state.email, message: this.state.message })
      this.setState({email:'',message:'',invalids})

    }

  }

  render() {
    return (

      <form className={this.state.onSubmit? 'form-group was-validated':''}>
        <div className='form-group'>
          <input type='email' className={this.state.invalids.email ? 'form-control is-valid' : 'form-control'} value={this.state.email} onChange={this.emailChanged} onBlur={this.validateEmail} placeholder='Email' required />
          {this.state.invalids.email? <div className="invalid-feedback">Please enter a valid email address</div> :null}
        </div>

        <div className="form-group">
          <textarea type='text' rows='2'  className={this.state.invalids.message ? 'form-control is-valid' : 'form-control'} value = {this.state.message} onChange={this.messageChanged} onBlur={this.validateMessage} placeholder='Message' required/>
          {this.state.invalids.message? <div className='invalid-feedback'>This field is required.</div> :null}
        </div>

        <button type='submit'  className='btn float-right btn-submit' onClick={this.handleSubmit}>Submit</button>
      </form>



    );
  }
}



export default CommentForm;