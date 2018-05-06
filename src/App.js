import React, { Component } from 'react';

import { CommentForm, CommentList } from './components'
import Api from './utils/api'
import './App.css';


class App extends Component {

  constructor() {
    super()
    this.state = {
      listComments: []
    }
  }

  componentWillMount = () => {
    this.getData();
  }

  getData = async () => {
    try {
      let response = await Api.getAllComments()
      console.log(response)
      this.setState({ listComments: response })

    } catch (e) {
      console.log(e)
    }

  }
  createNewComment = async (newComment) => {
    console.log(newComment)
    try {
      await Api.addNewComment(newComment)
     
      this.getData();
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <div className='container wrapper-app'>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="row justify-content-center">
              <div className="col-md-10 comment-form">
                <CommentForm createNewComment={this.createNewComment} />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-10 comment-list">
              <CommentList listComments={this.state.listComments} />
              </div>
            </div>
          </div>
        </div>

      
      </div>
    );
  }
}

export default App;
