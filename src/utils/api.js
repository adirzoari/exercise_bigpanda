import Rest from './rest'

class Api {

  constructor() { 
    
  }

  getAllComments() {
    return Rest.send(false, '/comments', 'GET');
  }

  addNewComment(data){
    return Rest.send(false,'/comments/createNewComment','POST',data);

  }


}

export default new Api();
