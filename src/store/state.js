export default {
  loginState: false,
  token: null,
  mobile: '',
  userName: "",
  user: {
    headerImg: "", //头像
    nickname: "", //昵称
    accountBanlance: 0, //用户可用余额
    accountInvest: 0 //投资金额
  },
  //用户登录状态
  sysUser: {
    userState: "", //用户实名状态
    setPaymentPass: null,
    userid: "",//用户id
    bankAccountState:''//银行卡状态
  },
  admin: {
    userid: "",
    sign: "",//管理员签名
    defaultContact:'',//默认合同
    defaultContactId: "",//合同id
    signID:''//签名id
  }
};
