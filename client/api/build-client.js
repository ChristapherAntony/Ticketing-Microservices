import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // We are on the server

    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers,
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseUrl: '/',
    });
  }
};


//for handling client to access the other services, while server side rendering we need to 
// contact other service via ingress-nginx--so here we setting up two type of api call base url 
// one for browser side call and other for server side call
