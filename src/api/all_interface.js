import fetch from '../utils/fetch.js'

//接口封装方法

/**
 *  得到用户菜单
 * @param data
 * @returns {*}
 */
export function getUserMenus(data) {
  return fetch({
    url: '/getMenus.htmls',
    method: 'get',
    params: data
  })
}

/**
 * 删除公告
 * @param data
 * @returns {*}
 */
export function deleteAd(data) {
  return fetch({
    url: '/deleteAd.htmls',
    method: 'post',
    data: data
  })
}

/**
 * 添加公告
 * @param data
 * @returns {*}
 */
export function insertAd(data) {
  return fetch({
    url: '/insertAd.htmls',
    method: 'post',
    data: data
  })
}

/**
 * 某个公告被读取执行此方法
 * @param data
 * @returns {*}
 */
export function readAd(data) {
  return fetch({
    url: '/readCommon.htmls',
    method: 'post',
    data: data
  })
}

/**
 * 发送公告给相应的人
 * @param data
 * @returns {*}
 */
export function sendAdToUser(data) {
  return fetch({
    url: '/send/adtouser.htmls',
    method: 'post',
    data: data
  })
}

/**
 * 某公告具体信息
 * @param data
 * @returns {*}
 */
export function showAdPcs(data) {
  return fetch({
    url: '/show/adpcs.htmls',
    method: 'get',
    params: data
  })
}

/**
 * 展示所有的公告
 * @param data
 * @returns {*}
 */
export function showAllAd(data) {
  return fetch({
    url: '/show/allad.htmls',
    method: 'post',
   data: data
  })
}

/**
 * 展示个人收到的所有消息
 * @param data
 * @returns {*}
 */
export function showUserAd(data){
return fetch({
  url:'/show/userrecad.htmls',
  method:'post',
  data:data
})
}

/**
 * 展示个人历史上传文件接口
 * @param data
 * @returns {*}
 */
export function showUserUpload(data){
  return fetch ({
    url:'/show/allupload.htmls',
    method:'get',
    params:data
  })
}

/**
 * 展示当天的数据
 * @returns {*}
 */
export function showDayData(data){
  return fetch({
    url:'/show/daydata.htmls',
    method:'get',
    params:data
  })
}

/**
 * 展示本周信息数据
 * @param data
 * @returns {*}
 */
export function showWeekData(data){
  return fetch({
    url:'/show/weekdata.htmls',
    method:'get',
    params:data
  })
}

/**
 * 展示本月信息数据
 * @param data
 * @returns {*}
 */
export function showMonthData(data){
  return fetch({
    url:'/show/monthdata.htmls',
    method:'get',
    params:data
    }
  )
}

/**
 * 得到目录树形结构
 * @param data
 * @returns {*}
 */
export  function  getDocTree(data){
  return fetch({
    url:'/gteKindByTree',
    method:'get',
    params:data
  })
}

/**
 *  得到部门树形结构
 * @param data
 * @returns {*}
 */
export function getDepTree(data){
  return fetch({
    url:'/getListByTree',
    method:'get',
    params:data
  })
}

/**
 *  文档目录添加
 * @param data
 * @returns {*}
 */
export function insertDocKind(data){
  return fetch({
    url:'/insert/rule.htmls',
    method:'post',
    data:data
  })
}


/**
 * 删除文件
 * @param data
 * @returns {*}
 */
export function deleteFile(data) {
  return fetch({
    url:'/deletefile.htmls',
    method:'post',
    data:data
  })
}

/**
 * 添加文件接口
 * @param data
 * @returns {*}
 */
export function  insertFile(data) {
  return fetch({
    url:'insertFile.htmls',
    method:'post',
    data:data
  })
}

/**
 * 阅读文件执行的操作
 * @param data
 * @returns {*}
 */
export function readFile(data){
  return fetch({
    url:'/readfile.htmls',
    method:'post',
    data:data
  })
}

/**
 * 展示所有的文件
 * @param data
 * @returns {*}
 */
export function showAllFile(data){
  return fetch({
    url:'/show/allFile',
    method:'post',
    data:data
  })
}

/**
 * 展示个人能看的文件
 * @param data
 * @returns {*}
 */
export function showUserLookFile(data){
  return fetch({
    url:'/show/userlookfile',
    method:'get',
    params:data
  })
}

/**
 * 更改文件
 * @param data
 * @returns {*}
 */
export function updateFile(data){
  return fetch({
    url:'/updateFile.htmls',
    method:'post',
    data:data
  })
}

/**
 * 添加删除文件权限的人
 * @param data
 * @returns {*}
 */
export function deleteFilePermission(data){
  return fetch({
    url:'/delete/permission.htmls',
    method:'post',
    data:data

  })
}

/**
 * 添加查看文件权限的人
 * @param data
 * @returns {*}
 */
export function lookFileUser(data){
  return fetch({
    url:'/insert/filepermission.htmls',
    method:'post',
    data:data
  })
}

/**
 * 添加更改文件权限的人
 * @param data
 * @returns {*}
 */
export function updateFilePermission(data){
  return fetch({
    url:'/update/permission.htmls',
    method:'post',
    data:data
  })
}

/**
 * 查看用户对某一文件具体的操作权限
 * @param data
 * @returns {*}
 */
export function showFilePermission(data){
  return fetch({
    url:'/show/usermission.htmls',
    method:'get',
    params:data
  })
}
