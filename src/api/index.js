import axios from "axios";
import store from '../store'
import router from './../router'
axios.defaults.baseURL = 'http://113.10.171.136:8082';

//表示跨域请求时是否需要使用凭证
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Access-Token'] = localStorage.getItem('token');

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) {
            config.headers['Access-Token'] = localStorage.getItem('token');
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response.data)
    });


const exportArray = [
	{ name: 'login', url: '/login', type: 'post'},//登陆
    { name: 'logout', url: '/logout', type: 'post'},//登出
    { name: 'amount', url: 'http://localhost:8080/static/vuetable.json', type: 'get'},//入金记录
    { name: 'project', url: 'http://localhost:8080/static/projecttable.json', type: 'get' },//项目列表
    { name: 'register', url: '/register', type: 'post'},//注册
    { name: 'sendSms', url: '/sendSms', type: 'post'},//获取短信验证码
    { name: 'getCaptcha', url: '/getCaptcha', type: 'post'},//注册获取图形验证码
    { name: 'PubLoginSMS', url: '/pubLoginSMS', type: 'post'},//短信验证码登录
    { name: 'pubLoginCaptcha', url: '/pubLoginCaptcha', type: 'post'},//登录获取图形验证码
    { name: 'pubLoginBySMS', url: '/pubLoginBySMS', type: 'post'},//短信登录接口

     /*用户认证时的协议签署 */
    {name: 'userSignedUserAgreement', url: '/userSignedUserAgreement ', type: 'post'},//获取签署后的协议链接
    {name: 'userUserAgreement', url: '/userUserAgreement', type: 'post'},//用户协议下载链接（未签署）
    {name: 'userUserSignature', url: '/userUserSignature', type: 'post'},//存储签署协议的用户签名
    {name: 'userSignProjectAgreement', url: '/userSignProjectAgreement', type: 'post'},//存储项目的用户签名
     
     /*忘记登陆密码*/
    {name: 'pubCaptcha', url: '/pubCaptcha', type: 'post'},//用于获取图形验证码。
    {name: 'pubForgetPasswordSMS', url: '/pubForgetPasswordSMS', type: 'post'},//用于在忘记密码是获取短信验证码。
    {name: 'pubForgetPassword', url: '/pubForgetPassword', type: 'post'},//用于在忘记密码是重置密码。

    /*用户登录信息资料 */
	{name: 'sysProfile', url: '/sysProfile', type: 'post'},//获取用户登录信息
	{name: 'userProfile', url: '/userProfile', type: 'post'},//获取用户资料
	{name: 'userUpdatePassword', url: '/userUpdatePassword', type: 'post'},//更新登录密码
	{name: 'userUpdatePaymentPassword', url: '/userUpdatePaymentPassword', type: 'post'},//更新支付密码
	{name: 'userUpdateProfile', url: '/userUpdateProfile', type: 'post'},//更新个人资料

	/*用户实名认证、银行卡、更新手机号码 */
	{name: 'userUpdateHeaderImg', url: '/userUpdateHeaderImg', type: 'post'},//头像上传
	{name: 'userUpdateIderntityCard', url: '/userUpdateIderntityCard', type: 'post'},//提交实名认证资料
	{name: 'userIderntityCard', url: '/userIderntityCard', type: 'post'},//获取实名认证资料
	{name: 'userUpdateBankAccount', url: '/userUpdateBankAccount', type: 'post'},//提交银行卡信息
	{name: 'userBankAccount', url: '/userBankAccount', type: 'post'},//获取银行卡信息
	{name: 'userUpdateMobileSMS', url: '/userUpdateMobileSMS', type: 'post'},//更新用户手机号码发送短信验证码
	{name: 'userUpdateMobile', url: '/userUpdateMobile', type: 'post'},//更新用户手机号码

	/*用户余额和投资金额 */
	{name: 'userAccount', url: '/userAccount', type: 'post'},//获取用户余额和投资金额
	{name: 'userAccountFlowRecord', url: '/userAccountFlowRecord', type: 'post'},//用户资金流水
	{name: 'userAccountFlowRecordCount', url: '/userAccountFlowRecordCount', type: 'post'},//获取用户账户资金流水记录总条数
	{ name: 'login', url: '/login', type: 'post'},//登陆
    { name: 'logout', url: '/logout', type: 'post'},//登出
    { name: 'userProfile', url: '/userProfile', type: 'post' },
    { name: 'amount', url: 'http://localhost:8080/static/vuetable.json', type: 'get'},//入金记录
    { name: 'project', url: 'http://localhost:8080/static/projecttable.json', type: 'get' },//项目列表
    { name: 'register', url: '/pubRegister', type: 'post'},//注册
    { name: 'registerSMS', url: '/pubRegisterSMS', type: 'post'},//获取短信验证码
    { name: 'registerCaptcha', url: '/pubRegisterCaptcha', type: 'post'},//获取图形验证码

    // 用户投资记录部分
    {name: 'userUserProject', url: '/userUserProject', type: 'post'},//列表显示用户预约的项目
    {name: 'userProjectInvest', url: '/userProjectInvest', type: 'post'},//列表显示用户投资明细和签署协议
    {name: 'userProjectInvestCount', url: '/userProjectInvestCount', type: 'post'},//获取用户投资明细和签署协议列表记录总数。
    
    {name: 'userUserProjectCount', url: '/userUserProjectCount', type: 'post'},//用于获取用户投资的项目记录总数。
    {name: 'userProjectList', url: '/userProjectList', type: 'post'},//用于列表显示所有项目。
    {name: 'userProjectListCount', url: '/userProjectListCount', type: 'post'},//用于获取所有项目记录总数。
    {name: 'userPaymentSubscribeProject', url: '/userPaymentSubscribeProject', type: 'post'},//用于用户支付投资。
    
    /*用户登录信息资料 */
	{name: 'sysProfile', url: '/sysProfile', type: 'post'},//获取用户登录信息
	{name: 'userProfile', url: '/userProfile', type: 'post'},//获取用户资料
	{name: 'userUpdatePassword', url: '/userUpdatePassword', type: 'post'},//更新登录密码
	{name: 'userUpdatePaymentPassword', url: '/userUpdatePaymentPassword', type: 'post'},//更新支付密码
	{name: 'userUpdateProfile', url: '/userUpdateProfile', type: 'post'},//更新个人资料

	/*用户实名认证、银行卡、更新手机号码 */
	{name: 'userUpdateHeaderImg', url: '/userUpdateHeaderImg', type: 'post'},//头像上传
	{name: 'userUpdateIderntityCard', url: '/userUpdateIderntityCard', type: 'post'},//提交实名认证资料
	{name: 'userIderntityCard', url: '/userIderntityCard', type: 'post'},//获取实名认证资料
	{name: 'userUpdateBankAccount', url: '/userUpdateBankAccount', type: 'post'},//提交银行卡信息
	{name: 'userBankAccount', url: '/userBankAccount', type: 'post'},//获取银行卡信息
	{name: 'userUpdateMobileSMS', url: '/userUpdateMobileSMS', type: 'post'},//更新用户手机号码发送短信验证码
	{name: 'userUpdateMobile', url: '/userUpdateMobile', type: 'post'},//更新用户手机号码

    {name: "userAccountFlowRecord",url: "/userAccountFlowRecord",type: "post"}, //用户资金流水
    {name: "userAccountFlowRecordCount",url: "/userAccountFlowRecordCount",type: "post"}, //获取用户账户资金流水记录总条数
    // 管理员获取用户列表信息
    { name: "adminUserList", url: "/adminUserList", type: "post" },
    { name: "adminUserListCount", url: "/adminUserListCount", type: "post" },
    { name: "adminUserProfile", url: "/adminUserProfile", type: "post" },
    { name: "adminUserIderntityCard", url: "/adminUserIderntityCard",type: "post"},
    { name: "adminUserBankAccount", url: "/adminUserBankAccount",type: "post"},
    { name: "adminUserAccountFlowRecord", url: "/adminUserAccountFlowRecord",type: "post"},
    { name: "adminUserAccountFlowRecordCount", url: "/adminUserAccountFlowRecordCount",type: "post"},
    { name: "adminUserDisabled", url: "/adminUserDisabled",type: "post"},
    { name: "adminUserFrozen", url: "/adminUserAccountFlowRecordCount",type: "post"},
    { name: "adminUserAuditing", url: "/adminUserAuditing", type: "post" },
    { name: "adminUserAuditingBankAccount",url: "/adminUserAuditingBankAccount",type: "post"},
    { name: "adminUserDisabled", url: "/adminUserDisabled", type: "post" },
    { name: "adminUserFrozen", url: "/adminUserFrozen", type: "post" },
    { name: "adminUserAuditing", url: "/adminUserAuditing", type: "post" },
    { name: "adminUserAuditingBankAccount", url: "/adminUserAuditingBankAccount", type: "post" },
    { name: "adminSettings", url: "/adminSettings", type: "post"},
    { name: "sysUploadFile", url: "/sysUploadFile", type: "post" },

    //管理员项目列表,项目总条数,项目详情,项目编辑,预约审核,合同审核
    { name: 'adminProjectList', url: '/adminProjectList', type: 'post'},
    { name: 'adminProjectListCount', url: '/adminProjectListCount', type: 'post'},
    { name: 'adminProjectDetail', url: '/adminProjectDetail', type: 'post'},
    { name: 'adminUpdateProject', url: '/adminUpdateProject', type: 'post'},
    { name: 'adminProjectInvestList', url: '/adminProjectInvestList', type: 'post'},
    { name: 'adminProjectInvestListCount', url: '/adminProjectInvestListCount', type: 'post'},
    { name: 'adminConfirmSubscribeProject', url: '/adminConfirmSubscribeProject', type: 'post'},
    { name: 'adminUploadProjectAgreement', url: '/adminUploadProjectAgreement', type: 'post'},
    { name: 'adminUploadProjectAgreementSignature', url: '/adminUploadProjectAgreementSignature', type: 'post'},

    //入金记录
    { name: 'adminDepositList', url: '/adminDepositList', type: 'post'},
    { name: 'adminDepositListCount', url: '/adminDepositListCount', type: 'post'},

    { name: "sysDownloadFile", url: "/sysDownloadFile", type: "post"},
    { name: "userUserAgreement", url: "/userUserAgreement", type: "post"},
    { name: "userSignedUserAgreement", url: "/userSignedUserAgreement", type: "post"},
    {name:'sysDownloadImage',url:'/sysDownloadImage',type:'post'}

];

const GET = function(url, data) {
	var d = data || {}; 
	return axios.get(url, { params: d }).catch(() => {
		router.push('/login');
	});
}
const POST = function(url, data) {
	var d = data || {};
	return axios.post(url, d).catch((error) => {
		router.push('/login');
	});
}


const exportObj = new Object();

exportArray.forEach((o, i) => {
	if (o.type == 'get') {
		exportObj[o.name] = function(data){
			return GET(o.url, data);
		}
	}else if (o.type == 'post') {
		exportObj[o.name] = function(data){
			return POST(o.url, data);
		}
	}
});

export default exportObj;
