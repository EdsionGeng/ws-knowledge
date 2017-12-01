import Mock from 'mockjs'
import Login from './login/login.js'

Mock.mock('/Login','post',Login.login);

export default Mock;