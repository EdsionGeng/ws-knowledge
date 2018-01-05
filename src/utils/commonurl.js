let baseURL="";
if(process.env.NODE_ENV ==='development'){
    baseURL = 'http://192.168.22.45:8011';
}else{
    if(process.env.type ==="test"){
        baseURL='http://192.168.22.45:8011';
    }else{
        baseURL="http://report.wsloan.com:8888/knowledge/";  
        console.log = function() {};            
        // console.log(baseURL);
    }
}
export function getUploadUrl(){
    let uploadUrl = baseURL+'/file/upload.htmls';
    // let uploadUrl = baseurl+'/projectManage/uploadFile';
    return uploadUrl;
}

export function getRequestUrl(){
    let requestUrl = baseURL+'/';
    // let requestUrl = baseurl+'/projectManage';
    return requestUrl;
}
