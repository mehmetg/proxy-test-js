# proxy-test-js

Tests proxy configuration using node.js. 
Makes a simple REST API call to a status endpoint.

##Setup:

* Execute ```npm install``` in the project root.

* Edit the line below in the proxt-test.js to have your proxy information:
  
    ```var PROXY_URL_WITH_PORT = "http://localhost:56193";```

##Run:

* Execute ```npm test``` in the project root.

##Expected results:

* During the tests you should always get a valid response.
* The first two test requests do not use the proxy and responses should be consistent with and without the proxy. 
