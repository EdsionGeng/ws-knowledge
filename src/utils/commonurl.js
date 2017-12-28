let baseURL="";
if(process.env.NODE_ENV ==='development'){
    baseURL = 'http://192.168.3.26:8011';
}else{
    if(process.env.type ==="test"){
        baseURL='http://192.168.3.26:8011';
    }else{
        baseURL="http://report.wsloan.com:8888/knowledge/";
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
    console.log(111)
    return requestUrl;
}