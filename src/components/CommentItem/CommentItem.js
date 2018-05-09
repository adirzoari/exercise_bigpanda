import React, { Component } from 'react';
import Gravatar from 'react-gravatar'

import './style.css'


const CommentItem = (props) =>(
  
 
  <div className="media">
   <Gravatar email={props.email} size={100} rating="pg" default="monsterid" className="mr-3 rounded" onClick={()=>{props.getLastMessageByEmail(props.email)}}/>
  <div className="media-body">
    <h5 className="mt-0">{props.email}</h5>
    {props.message}
  </div>
</div>
)



export default CommentItem;
