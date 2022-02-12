import axios from 'axios'
import Element from 'element-ui'
import router from './router'
import store from './store'

// 默认访问路径
axios.defaults.baseURL = "http://localhost:8081"

// 前置拦截
axios.interceptors.request.use(config => {
    return config
})

// 后置拦截
axios.interceptors.response.use(response => {
    let res = response.data;

    console.log("================================")
    console.log(res)
    console.log("================================")

    if (res.code === 200) { // 状态码为200 直接返回访问数据
        return response
    } else {    // 否则提示信息

        Element.Message.error(res.msg, { duration: 3 * 1000 })
        return Promise.reject(response.data.msg)

    }
},
    error => {  // 判断异常的处理
        if (error.response.data) {
            error.message = error.response.data.msg
        }

        if (error.response.status === 401) {    // 401 为未进行身份认证  清空localStorage 和 sessionStorage 的数据并返回登录页面
            store.commit('REMOVE_INFO')
            router.push("/login")
        }
         else {     // 其它异常则返回异常信息
            Element.Message.error(error.message, { duration: 3 * 1000 })
            return Promise.reject(error)
        }
    }
)