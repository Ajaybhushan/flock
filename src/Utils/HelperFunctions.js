/**
 * @name exportReport
 * @function
 * @description  This will download a table into CSV. Give table id's array as input
 * @param {Array} idArray Array of ID's of table
 * @param {string} property Property name
 */
export const exportReport = idArray => {
    let csv = [];

    for (let id in idArray) {
        let selector = '#' + idArray[id] + ' tr';
        let rows = document.querySelectorAll(selector);
        for (let i = 0; i < rows.length; i++) {
            let cells = rows[i].querySelectorAll('td, th');
            let csv_row = [];
            for (let j = 0; j < cells.length; j++) {
                csv_row.push(cells[j].innerText);
            }
            csv.push(csv_row.join(','));
        }
    }

    let output = csv.join('\n');
    let blob = new Blob([output], { type: 'text/csv' });
    let csvUrl = window.URL.createObjectURL(blob);

    let filename = 'Road_Network.csv';
    let link = document.createElement('a');
    link.id = 'download_csv';
    link.download = filename;
    link.href = csvUrl;
    document.body.appendChild(link);
    document.getElementById('download_csv').click();
    document.body.removeChild(link);
};

/**
 * @name imageToBase64
 * @function
 * @description Use this method to convert an image to a base64 compressed string
 * @param {String} imgurl URL of the image to be converted
 * @param {Function} callback Callback to be called after image is loaded
 */
export const imageToBase64 = (imgurl, callback) => {
    var img = new Image();
    var dataURL;
    img.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        (dataURL = canvas.toDataURL('image/png')), (dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, ''));
        callback(dataURL);
    };

    // set attributes and src
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = imgurl;
};

/**
 * @name reverseObj
 * @function
 * @description Use to reverse a Object
 * @param {Object} object Source Object
 */
export const reverseObj = function (object) {
    let new_obj = {};
    let keys = Object.keys(object || {});
    for (let i = keys.length - 1; i >= 0; i--) {
        new_obj[keys[i]] = object[keys[i]];
    }
    return new_obj;
};

/**
 * @name downloadFileWithUrl
 * @function
 * @description Download a file from URL
 * @param {String} url URL of file
 * @param {String} name Name of file while download (Optional)
 */
export const downloadFileWithUrl = function (url, name) {
    let link = document.createElement('a');
    link.download = name;
    link.href = url;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

/**
 * @name objectToArray
 * @function
 * @description Converst a object to array in following format
 * obj = {1: 'test', 2: 'test 2'}
 * return [{id: 1, value: 'test'}, {id: 2, value: 'test 2'}]
 * @param {Object} object Source Object
 */
export const objectToArray = function (obj) {
    let array = [];
    if (Object.keys(obj).length) {
        for (let i in obj) {
            let temp_obj = {
                id: i,
                value: obj[i]
            };
            array.push(temp_obj);
        }
    }
    return array;
};

/**
 * @name removeDuplicates
 * @function
 * @description Removes duplicate value from an array of object on the basis of property name
 * @param {array} arr Targeted Array of Objects
 * @param {string} property Property name
 */
export const removeDuplicates = (arr, property) => {
    return arr.filter((obj, pos, arr) => {
        return arr.map(map_obj => map_obj[property]).indexOf(obj[property]) === pos;
    });
};

/**
 * @name getParameterFromUrl
 * @function
 * @description Get parameter from URL
 * @param {String} url URL
 * @param {String} name Parameter name to be get
 */
export const getParameterFromUrl = name => {
    let url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&#]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

/**
 * @name downloadZip
 * @function
 * @description Download a zip file from multiple url
 * @param {Array} urls Url array
 */
export const downloadZip = urls => {
    // let zip = new JSZip();

    function makeRequest(url) {
        return new Promise(function (resolve) {
            var httpRequest = new XMLHttpRequest();
            httpRequest.open('GET', url);
            httpRequest.onload = function () {
                let url_array = url.split('/');
                zip.file(url_array[url_array.length - 1], this.responseText);
                resolve();
            };
            httpRequest.send();
        });
    }
    Promise.all(
        urls.map(function (url) {
            return makeRequest(url);
        })
    ).then(function () {
        zip.generateAsync({
            type: 'blob'
        }).then(function (content) {
            let file_href = URL.createObjectURL(content);
            downloadFileWithUrl(file_href, 'Outputs-' + new Date().getTime());
        });
    });
};
