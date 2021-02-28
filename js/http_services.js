function makeServiceCall(methodType, url, async=true, data=null) {
    console.log(url);
    return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(methodType+ " State Changed called. Ready state: " +
                    xhr.readyState+"status: "+xhr.status);
                    console.log(xhr.response);
        if(xhr.status.toString().match('^[2]{0-9]{2}$')) {
            console.log(xhr.responseText);
                resolve(xhr.responseText);
        } else if (xhr.status.toString().match('^[4,5]{0-9]{2}$')) {
            reject ({
            status: xhr.status,
            statusText: xhr.statusText
            });
            console.log("XHR Failed");
             }
        } 
           
        xhr.onerror = function () {
            reject ({
                status: this.status,
                statusText: XMLHttpRequest.statusText
            });
        };

        xhr.open(methodType,url,async);
        if (data) {
            
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type:application/json");
            xhr.send(JSON.stringify(data));
        }else xhr.send();
    });
}