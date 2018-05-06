import React, { Component } from 'react';
import _ from 'lodash'
import moment from 'moment'

import { CommentItem } from '..'
import styles from './style.css'

import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2'

const SweetAlert = withSwalInstance(swal);

class CommentList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listComments: [],
      initialComments: []

    }
  }
  componentWillMount = () => {
    this.getData()
  }
  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps)
    this.setState({ listComments: nextProps.listComments, initialComments: nextProps.listComments })
  }

  getData = () => {
    this.setState({ listComments: this.props.listComments, initialComments: this.props.listComments })
  }

  filterList = (e) => {
    var updatedList = this.state.initialComments;
    if(updatedList){
      const searchInput = (e.target.value).toLowerCase();
      var filteredList = updatedList.filter((comment) => comment.email.toLowerCase().search(searchInput) !== -1)
      this.setState({ listComments: filteredList })
    }
    return
   
  }

  getLastMessageByEmail = (email) => {
    var commentsList = this.state.initialComments;
    var filteredList = commentsList.filter((comment) => comment.email.search(email) !== -1)
    const lastComment = _.maxBy(filteredList, function (o) { return o.createdAt; });
    console.log('last comment', lastComment)
    const lastActiveTime = moment(new Date(lastComment.createdAt)).format('HH:mm:ss')
    this.showLastActiveModal(email, lastActiveTime);
    console.log(lastActiveTime)
  }

  showLastActiveModal = (email, lastActiveTime) => {
    const SweetAlert = withSwalInstance(swal({
      title: email,
      text: `last active message: ${lastActiveTime}`,
      timer: 3000,
      showCancelButton: false,
      showConfirmButton: false
    }))
  }

  render() {
    return (
      <div>
        <form >
          <div className='form-grpup has-feedback'>
            <i class="fas fa-search"></i>
            <input type="search" className="form-control form-control-lg form-control-filter" placeholder="Filter" onChange={this.filterList} />
          </div>



        </form>
        {this.state.listComments && this.state.listComments.map((comment, i) => (
          <div key={i} className='comment-item'>
            <CommentItem getLastMessageByEmail={this.getLastMessageByEmail} {...comment} />
          </div>
        ))}
      </div>



    );
  }
}



export default CommentList;