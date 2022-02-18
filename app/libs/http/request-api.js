const request = require('request');
const url = require('url');

/**
 * Generates an HTTP callback function for requests
 * @param {resolve} - Promise resolve function
 * @param {reject} - Promise reject function
 * @param {responseCode} - Response code indicating successful response
 * @returns {callbackFunction} - The generated callback function.
 */
function getRequestCallback (resolve, reject, responseCode) {

    let start = Date.now();
  
  
  
    return (error, response, body) => {
  
      let responseTime = Date.now() - start;
  
  
      if (!error) {
  
        //logDebug('Request to "' + response.request.uri.path + '" completed in:', responseTime, 'ms');
  
        let responseCodeInt = parseInt(responseCode);
        let responseStatusCodeInt = parseInt(response.statusCode);
  
        let responseCodeMatch = responseCodeInt === responseStatusCodeInt;
  
        if (responseCodeMatch) {
          //logDebug('HTTP ' + response.request.method + ' request succeded with expected response code: ' + response.statusCode);
          resolve(response);
        } else {
          //logDebug('HTTP ' + response.request.method + ' request failed. Got response code:', response.statusCode, ' Expected response code:', responseCodeInt, 'Response body:', JSON.stringify(response.body));
          //logDebug('Request Body', response.request.body);
          reject({
            code: response.statusCode,
            message: 'Got response code: ' + response.statusCode + ' Expected: ' + responseCodeInt,
            body: JSON.stringify(response.body)
          });
        }
  
      } else {
        //logError('Failed request completed in:', responseTime, 'ms. Message:', error.message, '\nStack:', error.stack);
        reject({
          code: 500,
          message: error.message
        });
      }
    };
  
  
  
  
  
  }
  
  /**
   * A generic function to make HTTP requests
   * @param {url} - http url
   * @param {method} - Request method
   * @param {body} - Request body
   * @param {responseCode} - Response code indicating successful response
   * @returns {responseObject} - The promised full response object from a successful request.
   */
  module.exports.makeHttpRequest = (url, method, headers, body, responseCode) => {
  
    let options = {
      url: url,
      method: method,
      headers: headers,
      body: body
    };
  
    return new Promise((resolve, reject) => {
      request(options, getRequestCallback(resolve, reject, responseCode));
    });
  
  };