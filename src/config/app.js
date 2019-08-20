
//全局变量
export default {

  nodeDevEnv: process.env.NODE_ENV == 'development',
  apiUrl: "http://127.0.0.1:7001",
  siteName: '且听风吟-后台管理系统',
  apiPrefix: "api", //前缀
  timeout: 5000,
  cookiesExpires: 7,
  requestRetry: 4,
  requestRetryDelay: 800,
  version:"1.0"
}