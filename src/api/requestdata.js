import fetch from '../utils/fetch.js';

export function getDeptData(){
    return fetch({
        url:'/getDepartList',
        method:'get'
    })
}