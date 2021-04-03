import axios from 'axios';
import message from 'antd/es/message';
import { BASE_URL, BASE_SERVER } from '../Constants/Urls';

/**
 * @name makeURL
 * @function
 * @description Used to create URL with Base Url
 * @param {String} URL API end point URL
 */
export const makeURL = function (URL) {
    return BASE_URL + URL;
};

/**
 * @name postAPI
 * @function
 * @description Used to call API with POST method
 * @param {String} URL API URL
 * @param {Object} data Source data
 */
export var postAPI = function (URL, data = {}) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: makeURL(URL),
            data: data
        })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
                handleErrorCode(err);
            });
    });
};
/**
 * @name logoutAPI
 * @function
 * @description Used to call API with POST method
 * @param {String} URL API URL
 * @param {Object} data Source data
 */
export var logoutAPI = function (URL) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: makeURL(URL),
            headers: {
                Authorization: 'Token ' + getAuthToken()
            }
        })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
                handleErrorCode(err);
            });
    });
};
/**
 * @name patchAPI
 * @function
 * @description Used to call API with POST method
 * @param {String} URL API URL
 * @param {Object} data Source data
 */
export var patchAPI = function (URL, data = {}) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'PATCH',
            url: makeURL(URL),
            data: data,
            headers: {
                Authorization: 'Token ' + getAuthToken()
            }
        })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
                handleErrorCode(err);
            });
    });
};
/**
 * @name getAPI
 * @function
 * @description Used to call API with GET method
 * @param {String} URL API URL
 * @param {Object} data Source data
 */
export var getAPI = function (URL) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: makeURL(URL),
            headers: {
                Authorization: 'Token ' + getAuthToken()
            }
        })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
                handleErrorCode(err);
            });
    });
};
/**
 * @name loginAPI
 * @function
 * @description Used to login (Calls API without token)
 * @param {String} URL API URL
 * @param {Object} data Source data
 */
export const loginAPI = function (URL, data) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: BASE_SERVER + URL,
            params: data
        })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
                handleErrorCode(err);
            });
    });
};

/**
 * @name thirdPartyAPI
 * @function
 * @description Used to call any third party API
 * @param {String} URL API URL
 */
export const thirdPartyAPI = async function (URL) {
    const response = await axios({
        method: 'get',
        url: URL
    });
    return response.data;
};

/**
 * @name interpolate
 * @function
 * @description Replace %s from a string to given number
 * @param {String} theString String with %s
 * @param {Array} argumentArray Array of numbers
 */
export const interpolate = function (theString, argumentArray) {
    var regex = /%s/;
    var _r = function (p, c) {
        return p.replace(regex, c);
    };
    return argumentArray.reduce(_r, theString);
};

/**
 * @name getAuthToken
 * @function
 * @description Returns token from localstorage
 */
export const getAuthToken = function () {
    return localStorage.getItem('token');
};

export const handleErrorCode = function (err) {
    if (err.response.status == 401 || err.response.status == 403) {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    if (err.response.data.errors.length) {
        message.error(err.response.data.errors[0].message);
    }
};
