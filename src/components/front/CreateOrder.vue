<template>
  <div>
    <div class="wrap order-wrap">
      <div class="content">
        <h2>购买</h2>
      </div>
      <div class="content order-num">
        <el-row type="flex" justify="space-between">
          <el-col :span="6">
            <div class="order-name">标准套餐</div>
          </el-col>
          <el-col :span="3">
            <router-link :to="'/'" class="select-other">选择其他套餐>></router-link>
          </el-col>
        </el-row>
        <div class="num-box">
          <h3>套餐介绍</h3>
          <p>检测范围：含60万个基础点，以及约940万个基于基础点计算得出的基因型填补位点</p>
          <el-row>
            <el-col :span="16" class="el-row">
              <div class="order-tag el-row">
                <el-col :span="9">
                  <img src="../../../static/img/icon_tag1.png">
                </el-col>
                <el-col :span="15">
                  祖源
                </el-col>
              </div>
              <div class="order-tag el-row">
                <el-col :span="9">
                  <img src="../../../static/img/icon_tag2.png">
                </el-col>
                <el-col :span="15">
                  遗传风险
                </el-col>
              </div>
              <div class="order-tag el-row">
                <el-col :span="9">
                  <img src="../../../static/img/icon_tag3.png">
                </el-col>
                <el-col :span="15">
                  罕见遗传病
                </el-col>
              </div>
              <div class="order-tag el-row">
                <el-col :span="9">
                  <img src="../../../static/img/icon_tag4.png">
                </el-col>
                <el-col :span="15">
                  遗传特质
                </el-col>
              </div>
              <div class="order-tag el-row">
                <el-col :span="9">
                  <img src="../../../static/img/icon_tag5.png">
                </el-col>
                <el-col :span="15">
                  运动健身
                </el-col>
              </div>
              <div class="order-tag el-row">
                <el-col :span="9">
                  <img src="../../../static/img/icon_tag6.png">
                </el-col>
                <el-col :span="15">
                  营养需求
                </el-col>
              </div>
              <div class="order-tag el-row">
                <el-col :span="9">
                  <img src="../../../static/img/icon_tag7.png">
                </el-col>
                <el-col :span="15">
                  药物反应
                </el-col>
              </div>
            </el-col>
            <el-col :span="8" class="sum-box">
              <p><span class="sum-label">价格:</span><span>￥{{ orderForm.num * orderForm.price }}</span></p>
              <p>
                <span class="sum-label">检测人数:</span>
                <el-input-number v-model="orderForm.num" :min="1" :max="99"></el-input-number>
              </p>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="fill-box content">
        <h3 class="fill-title">收件人信息</h3>
        <el-form label-position="right" label-width="90px" :model="orderForm" class="fill-form">
          <el-form-item label="收件人姓名">
            <el-input v-model="orderForm.name" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="orderForm.region" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="收件地址">
              <el-col :span="4">
                <el-select
                  v-model="address.sheng"
                  filterable
                  allow-create
                  placeholder="选择省份">
                  <el-option
                    v-for="item in shengs"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="4" style="margin-left: 20px;">
                <el-select
                  v-model="address.city"
                  filterable
                  allow-create
                  placeholder="选择城市">
                  <el-option
                    v-for="item in cityes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="4" style="margin-left: 20px;">
                <el-select
                  v-model="address.qu"
                  filterable
                  allow-create
                  placeholder="选择区域">
                  <el-option
                    v-for="item in qus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请填写具体街道地址" v-model="orderForm.type" style="width: 526px"></el-input>
          </el-form-item>
        </el-form>
        <h3 class="fill-title">发票信息</h3>
        <el-row>
          <el-col :span="7">
            <div 
              class="invoice" 
              :class="{ 'invoice-active': !orderForm.invoice }" 
              @click="orderForm.invoice = false">
              <img src="../../../static/img/icon_checked.png">不开发票
            </div>
          </el-col>
          <el-col :span="14">
            <div class="invoice" :class="{ 'invoice-active': orderForm.invoice }" @click="invoiceTrue()">
              <img src="../../../static/img/icon_checked.png">增值税专用发票（纸质发票）
            </div>
          </el-col>
        </el-row>
        <el-row class="message-box">
          <el-col :span="12" class="message-l">
            <p>留言</p>
            <!-- <el-input
              type="textarea"
              :rows="2"
              placeholder="选填：您这次都有什么特殊要求"
              v-model="orderForm.message">
            </el-input> -->
            <textarea placeholder="选填：您这次都有什么特殊要求" v-model="orderForm.message">
              
            </textarea>
            <el-row class="tip-box">
              <el-col :span="10">
                <el-tooltip effect="light" placement="bottom">
                  <div slot="content">
                    <h6>七天无理由退货规则</h6>
                    <p>1、在产品签售之日起，7日内可申请无理由退货；
                      <br>2、申请无理由退货请直接联系原动力客服人员；
                      <br>3、无理由退货必须保证唾液采集器包装未被拆封;
                      <br>4、非产品质量问题产生的退货，所以邮费由客户承担。
                    </p>
                  </div>
                  <p><span class="tip-icon">7</span>支持7天无理由退货</p>
                </el-tooltip>
              </el-col>
              <el-col :span="10"><span class="tip-icon">￥</span>价格保护</el-col>
            </el-row>
          </el-col>
          <el-col :span="12"  class="message-r">
            <p>金额合计：<span>￥{{ orderForm.num * orderForm.price }}</span></p>
            <p>运费：<span>顺丰免邮（下单后3个工作日内发货）</span></p>
            <el-row>
              <el-col 
                :span="10" 
                :offset="4"
                class="submit-col">
                <p>应付金额：
                  <span>￥{{ orderForm.num * orderForm.price }}</span>
                </p>
              </el-col>
              <el-col :span="10">
                <a href="javascript:void(0)" class="order-btn">确认付款</a>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      
    </div>

    <el-dialog
      title="增值税专用发票（纸质发票）"
      :visible.sync="invoiceDialog"
      width="560px"
      class="invoice-dialog">
      <el-form label-width="120px">
        <el-form-item label="发票内容:">
          <el-radio-group v-model="invoiceForm.content">
            <el-radio-button checked label="基因解读服务费"></el-radio-button>
            <el-radio-button label="资讯服务费"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="单位名称:">
          <el-input 
            type="text" 
            v-model="invoiceForm.company"
            style="width: 290px"></el-input>
        </el-form-item>
        <el-form-item label="纳税人识别码:">
          <el-input 
            type="text" 
            v-model="invoiceForm.invoiceCode"
            style="width: 290px"></el-input>
        </el-form-item>
        <el-form-item label="注册地址:">
          <el-input 
          type="text" 
          v-model="invoiceForm.address"
          style="width: 290px"></el-input>
        </el-form-item>
        <el-form-item label="注册电话:">
          <el-input 
            type="text" 
            v-model="invoiceForm.phone"
            style="width: 290px"></el-input>
        </el-form-item>
        <el-form-item label="开户银行:">
          <el-input 
            type="text" 
            v-model="invoiceForm.bank"
            style="width: 290px"></el-input>
        </el-form-item>
        <el-form-item label="银行账户:">
          <el-input 
            type="text" 
            v-model="invoiceForm.bankAccount"
            style="width: 290px"></el-input>
        </el-form-item>
        <div class="invoice-tip">
          <h6>温馨提示</h6>
          <p>请仔细核对公司名称、纳税人识别号等信息，提供的信息错误导致发票退回重开所产生的快递费需自行承担。</p>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="invoiceDialog = false">取 消</el-button>
        <el-button type="primary" @click="invoiceDialog = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data () {
    return {
      orderForm: {
        num: 1,
        price: 499,
        invoice: false,
        message: '',
      },
      invoiceDialog: false,
      invoiceForm: {
        content: '基因解读服务费',
        company: '',
        invoiceCode: '',
        address: '',
        phone: '',
        bank: '',
        bankAccount: '',
      },
      address: {
        sheng: '',
        city: '',
        qu: '',
        xiangxi: ''
      },
      shengs: [
        { label: '四川省', value: '四川省' },
        { label: '浙江省', value: '浙江省' },
      ],
      cityes: [
        { label: '成都市', value: '成都市' },
        { label: '眉山市', value: '眉山市' },
      ],
      qus: [
        { label: '金牛区', value: '金牛区' },
        { label: '高新区', value: '高新区' },
      ]
    }
  },
  methods: {
    //需要发票
    invoiceTrue () {
      this.orderForm.invoice = true
      this.invoiceDialog = true
    }
  }
}
</script>

<style lang="less">
@import url(../../../static/css/global.less);
.order-wrap{
  background-color: #f5f5f5;
  padding-bottom: 40px;
}
.content h2{
  color: @mainColor;
  font-size: 30px;
  line-height: 76px;
}
.order-num{
  background-color: #fff;
  padding: 25px;
  padding-bottom: 18px;
}
.num-box{
  padding: 16px 0 25px 18px;
  border: 1px solid @mainColor;
  margin-top: 20px;
}
.num-box>p{
  color: #9c9c9c;
  margin-top: 10px;
  margin-bottom: 6px;
}
.select-other{
  display: inline-block;
  margin-top: 26px;
  color: #9c9c9c;
}
.order-tag{
  width: 134px;
  line-height: 48px;
  background-color: #f5f5f5;
  text-align: center;
  margin-top: 8px;
  border-radius: 3px;
  float: left;
  margin-right: 40px;
}
.order-tag .el-col-15{
  padding-right: 10px;
}
.sum-box p{
  margin-bottom: 20px;
}
.sum-box span{
  font-size: 18px;
}
.sum-box .sum-label{
  display: inline-block;
  width: 100px;
  text-align: right;
  margin-right: 10px;
  font-size: 14px;
}
.el-input-number{
  width: 150px;
}
.order-name{
  width: 121px;
  line-height: 46px;
  background-color: @mainColor;
  font-size: 18px;
  text-align: center;
  color: #fff;
  border-radius: 4px;
}
.fill-box{
  padding: 22px 28px 76px 28px;
  background-color: #fff;
  margin-top: 22px;
}
.fill-title{
  border-bottom: 1px solid #f5f5f5;
  padding-left: 20px;
  font-size: 20px;
  line-height: 50px;
}
.fill-form{
  margin-top: 46px;
  margin-bottom: 50px;
}
.invoice{
  line-height: 85px;
  display: inline-block;
  cursor: pointer;
  padding: 0 84px;
  border: 1px solid #9c9c9c;
  border-radius: 5px;
  margin-top: 42px;
  color: #9c9c9c;
  font-size: 16px;
  margin-left: 20px;
}
.invoice img{
  vertical-align: middle;
  visibility: hidden;
  margin-right: 6px;
  margin-top: -3px;
}
.invoice-active{
  border-color: @mainColor;
  color: @mainColor;
}
.invoice-active img{
  visibility: visible;
}
.message-box{
  padding: 20px;
}
.message-box{
  border-top: 1px solid #f5f5f5;
  margin-top: 40px;
}
.message-l p{
  font-size: 16px;
  margin-bottom: 14px;
}
.message-l textarea{
  background-color: #f5f5f5;
  resize: none;
  width: 380px;
  height: 112px;
  line-height: 22px;
  padding: 10px;
  color: #5d5d5d;
  border-color: #e5e5e5;
  border-radius: 5px;
  outline: none;
  margin-bottom: 12px;
}
.message-l textarea:focus{
  border-color: @mainColor;
}
.tip-icon{
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: #585858;
  color: #fff;
  border-radius: 50%;
  line-height: 20px;
  text-align: center;
  margin-right: 5px;
}
.message-r{
  text-align: right;
}
.message-r p{
  margin-bottom: 20px;
  color: #9c9c9c;
  font-size: 16px;
}
.message-r span{
  color: #000;
}
.order-btn{
  display: inline-block;
  width: 160px;
  line-height: 70px;
  color: #fff;
  background-color: @mainColor;
  text-align: center;
  font-size: 20px;
  border-radius: 35px;
}
.submit-col{
  line-height: 70px;
}
.submit-col span{
  color: @mainColor;
  font-size: 30px;
}
.invoice-dialog .el-dialog__header,.invoice-dialog .el-dialog__footer{
  text-align: center;
}
.invoice-dialog .el-dialog__header {
  background-color: #f4f4f4;
}
.invoice-tip{
  width: 360px;
  background-color: #e8f2f7;
  margin-left: 50px;
  padding: 12px;
  box-sizing: border-box;
}
.invoice-tip h6{
  color: @mainColor;
  text-align: center;
  font-size: 14px;
}
.invoice-tip p{
  font-size: 13px;
  line-height: 26px;
  color: #333;
  margin-top: 10px;
}
</style>