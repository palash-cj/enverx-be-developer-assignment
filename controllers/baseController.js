/**
 * sendResponse : It sends the success response on triggering the api
 * @param {response message} message 
 * @param {response data} data 
 * @returns success response
 */
const sendResponse = (message, data) => {
    const response = {
        success: true,
        message: message,
        data: data
    };
    return response;
};

/**
 * sendError : It sends the failure response on triggering the api
 * @param {response message} message 
 * @param {response data} data 
 * @returns failure response
 */
const sendError = (message, data) => {
    const response = {
        success: false,
        message: message,
        data: data
    };
    return response;
};

module.exports={sendResponse, sendError};




