import _ from 'lodash'

class Rest {

    constructor() {

      this.API_URL = 'http://localhost:3013'
    }
  
    withQuery(url, params) {
      let query = Object.keys(params)
        .filter(k => params[k] !== (undefined)).filter(k => params[k] !== null).filter(k => params[k] !== '')
        .map((k) => _.isString(params[k]) && params[k].includes(',') ? encodeURIComponent(k) + '=' + params[k] : encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
      url += (url.indexOf('?') === -1 ? '?' : '&') + query;
      return url;
    };
  
    async send(auth, path, method, body, params) {
      const headers = {};
      headers['Accept'] = 'application/json';
      headers['Content-Type'] = 'application/json';
  
      if (auth && this.token) {
        headers['Authorization'] = this.token;
  
      }
      let url = `${this.API_URL}${path? path : ""}`;
      if (params) {
        url = this.withQuery(url, params);
      }
      try {
        let response = await fetch(url, {
          method: method,
          headers: headers,
          body: body != null ? JSON.stringify(body) : null,
        })
        if (response.status == 401) {
          return Promise.reject(response);
        }
        if (response.status == 400) {
          return Promise.reject(response);
        }
        if (response.status == 404) {
          return Promise.reject(response);
        }
        let responseJson = await response.json();
        return responseJson;
      } catch (error) {
        console.error(error);
      }
    }
  
  }
  
  const rest = new Rest();
  
  export default rest;