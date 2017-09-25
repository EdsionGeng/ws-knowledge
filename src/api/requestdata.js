import fetch from '../utils/fetch.js';

export function getDeptData(){
    return fetch({
        url:'/getDepartList',
        method:'get'
    })
}


export function getFileListData(data){
    return fetch({
        url:'/getFileList',
        method:'get',
        params:data
    })
}