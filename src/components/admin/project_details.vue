<template>
<div class='project-details'>

     <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-menu"></i>项目列表</el-breadcrumb-item>
            <el-breadcrumb-item>项目详情</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div v-loading="loading">
        <h5>{{ projectData.name }}<span>{{ formatState(projectData.state) }}</span></h5>
        <p>进&#12288;度：<el-progress :percentage="progressFormat()" :stroke-width="14"></el-progress></p>
        <p>倒计时：<el-tag>{{ countDown }}</el-tag></p>
        <el-tabs v-model="activeName" @tab-click="tabChanged">
          <el-tab-pane label="基本信息" name="first">
              <el-row>
                <el-col :span="3">发起时间：</el-col>
                <el-col :span="18">{{ formatTime(projectData.createdTime) }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="3">开始时间：</el-col>
                <el-col :span="18">{{ formatTime(projectData.startTime) }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="3">目标金额：</el-col>
                <el-col :span="18">{{ projectData.totalAmount }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="3">单份金额：</el-col>
                <el-col :span="18">{{ projectData.singleAmount }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="3">最低投资金额：</el-col>
                <el-col :span="18">{{ projectData.minInvestAmount }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="3">预约期：</el-col>
                <el-col :span="18">{{ projectData.subscribePeriod }}天</el-col>
              </el-row>
              <el-row>
                <el-col :span="3">募集期：</el-col>
                <el-col :span="18">{{ projectData.collectPeriod }}天</el-col>
              </el-row>
              <el-row>
                <el-col :span="3">运营周期：</el-col>
                <el-col :span="18">{{ projectData.operationPeriod }}天</el-col>
              </el-row>
              <el-row>
                <el-col :span="3">产品简介：</el-col>
                <el-col :span="18">{{ projectData.summary }}</el-col>
              </el-row>
              <el-row v-if="projectData.thumbnail">
                <el-col :span="3">产品缩略图：</el-col>
                <el-col :span="18">
                  <div class="img-box">
                    <img :src="projectData.thumbnail[0].base64Str">
                  </div>
                </el-col>
              </el-row>
              <el-row v-if="projectData.description">
                <el-col :span="3">产品描述：</el-col>
                <el-col :span="18">
                  <div class="img-box">
                    <img :src="projectData.description[0].base64Str">
                  </div>
                </el-col>
              </el-row>
              <el-row v-if="projectData.investScheme">
                <el-col :span="3">融资方案：</el-col>
                <el-col :span="18">
                  <div class="img-box">
                    <img :src="projectData.investScheme[0].base64Str">
                  </div>
                </el-col>
              </el-row>
              <el-row v-if="projectData.riskWarning">
                <el-col :span="3">风险警告：</el-col>
                <el-col :span="18">
                  <div class="img-box">
                    <img :src="projectData.riskWarning[0].base64Str">
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2" :offset="3">
                  <el-button 
                    type="primary" 
                    v-if="projectData.state === 'PENDING_SUBSCRIBE'"
                     @click="projectModify">
                     重新编辑
                   </el-button>
                  <el-button type="primary" v-else disabled>重新编辑</el-button>
                </el-col>
                
              </el-row>
          </el-tab-pane>

          <el-tab-pane label="预约记录" name="second">
            <el-table :data="investData" border style="width: 100%" ref="multipleTable">
                  <el-table-column prop="userNickame" label="用户昵称">
                  </el-table-column>
                  <el-table-column prop="userName" label="用户名">
                  </el-table-column>
                  <el-table-column prop="investAmount" label="预约金额">
                  </el-table-column>
                  <el-table-column prop="createdTime" label="预约时间" :formatter="formaTableTime">
                  </el-table-column>
                  <el-table-column prop="investState" label="操作">
                    <template slot-scope="scope">
                      <template v-if="scope.row.investState === 'SUBSCRIBE'">
                        <el-button size="small" type="primary" @click="investCheckClick(scope.row.id)">审核</el-button>
                      </template>
                      <el-tag type="success" v-else-if="scope.row.investState === 'PENDING_PAY'">通过</el-tag>
                      <el-tag type="danger" v-else>驳回</el-tag>
                    </template>
                  </el-table-column>
              </el-table>
              <div class="pagination" v-if="investTotalRows !== 0">
                <el-pagination
                  @current-change ="investPageChange"
                  layout="prev, pager, next"
                  :total="investTotalRows"
                  :page-size="10">
                </el-pagination>
              </div>
          </el-tab-pane>

          <el-tab-pane label="募集记录" name="third">
            <el-table :data="investedData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="userNickame" label="用户昵称">
                </el-table-column>
                <el-table-column prop="userName" label="用户姓名">
                </el-table-column>
                <el-table-column prop="investAmount" label="众筹金额">
                </el-table-column>
                <el-table-column prop="createdTime" label="投资时间" :formatter="formaTableTime">
                </el-table-column>
                <el-table-column prop="contract" label="合同原件">
                  <template slot-scope="scope">
                    <!-- <input 
                      type="file"
                      class="file" 
                      :id="'upload' + scope.row.id" 
                      v-if="scope.row.investState === 'PENDING_UPLOAD_AGREEMENT'"
                      @change="uploadFile(scope.row.id, 'upload' + scope.row.id, 'fileForm', 1)" /> -->
                      <el-button 
                      size="small" 
                      v-if="scope.row.investState === 'PENDING_UPLOAD_AGREEMENT'"
                      type="primary" 
                      @click="uploadFileClick(scope.row.id)">
                      上传
                    </el-button>
                    <el-button 
                      size="small" 
                      v-else 
                      type="primary" 
                      @click="lookAgreement(scope.row.projectAgreement)">
                      查看
                    </el-button>
                    <!-- <el-upload
                      class="upload-demo"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      multiple
                      :limit="3"
                      :on-exceed="handleExceed"
                      :file-list="fileList"
                      v-else>
                      <el-button size="small" type="primary">上传</el-button>
                    </el-upload> -->
                  </template>
                </el-table-column>
                <el-table-column prop="signedProjectAgreement" label="用户合同" width="160">
                  <template slot-scope="scope">
                    <template v-if="scope.row.signedProjectAgreement">
                      <el-button 
                        size="small" 
                        type="primary" 
                        @click="lookAgreement(scope.row.signedProjectAgreement)">
                        查看
                      </el-button>
                      <el-button size="small" type="primary" @click="investedCheckClick(scope.row.id)">审核</el-button>
                    </template>
                    <el-tag type="danger" v-else>未上传</el-tag>
                  </template>
                </el-table-column>
            </el-table>
            <div class="pagination" v-if="investedTotalRows !== 0">
              <el-pagination
                @current-change ="investedPageChange"
                layout="prev, pager, next"
                :total="investedTotalRows"
                :page-size="10">
              </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
    </div>
    
    <!-- 弹窗 -->
    <el-dialog
      title="预约审核"
      :visible.sync="bespeakexamineDialogVisible"
      width="30%">
        <el-form 
          ref="bespeakexamineDialog"
          :model="bespeakexamineDialog" 
          label-width="90px" 
          :rules="investRules">
          <el-form-item label="审核选项" prop="confirm">
            <el-select v-model="bespeakexamineDialog.confirm" placeholder="审核选项">
              <el-option label="通过" value="ACCEPTED"></el-option>
              <el-option label="驳回" value="REJECTED"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="驳回原因" v-if="bespeakexamineDialog.confirm == 'REJECTED'">
            <el-input v-model="bespeakexamineDialog.reason"></el-input>
          </el-form-item>
          <el-form-item label="操作密码" prop="paymentPassword">
            <el-input v-model="bespeakexamineDialog.paymentPassword" type="password"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="bespeakexamineDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="investCheck('bespeakexamineDialog')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="上传合同"
      :visible.sync="fileFormVisible"
      width="30%">
        <el-form 
          ref="fileForm"
          :model="fileForm" 
          label-width="100px" 
          :rules="fileFormRules">
          <el-form-item label="合同：" prop="file">
            <!-- <label for="upload">上传</label>
            <input
              id="upload"
              class="file"
              @change="uploadFile( 'upload', 'fileForm', 1)"> -->
            <div class="avatar-uploader">
                <!-- <img v-if="investScheme.base64Str" :src="investScheme.base64Str" class="avatar"> -->
                <p v-if="fileForm.file.name">{{ fileForm.file.name }}</p>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <input 
                  type="file" 
                  class="file" 
                  id="upload" 
                  @change="uploadFile( 'upload', 'fileForm', 1)" />
            </div>
          </el-form-item>
          <el-form-item label="操作密码：" prop="paymentPassword">
            <el-input v-model="fileForm.paymentPassword" type="password"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="fileFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadFileSubmit('fileForm')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="合同审核"
      :visible.sync="signaFormVisible"
      width="30%">
        <el-form 
          ref="signaForm"
          :model="signaForm" 
          label-width="90px" 
          :inline="true"
          :rules="signaFormRules">
          <el-form-item label="审核选项" prop="confirm">
            <el-select v-model="signaForm.confirm" placeholder="审核选项" prop="confirm">
              <el-option label="通过" value="ACCEPTED"></el-option>
              <el-option label="驳回" value="REJECTED"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="驳回原因" v-if="signaForm.confirm == 'REJECTED'">
            <el-input v-model="signaForm.reason"></el-input>
          </el-form-item>
          <el-form-item label="操作密码" prop="paymentPassword">
            <el-input v-model="signaForm.paymentPassword" type="password"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="signaFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="signaSubmit('signaForm')">确 定</el-button>
      </span>
    </el-dialog>

    <!-- <el-dialog
      title="合同原件"
      :visible.sync="contractDialogVisible"
      width="70%">
        <span slot="footer" class="dialog-footer">
        <el-button @click="contractDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="contractDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->
</div>
</template>

<script>
export default {
  data() {
    var checkFile = ( rule, value, callback ) =>{
      console.log(rule)
      if (this.fileForm.file.base64Str) {
        callback();
      } else {
        callback(new Error('请上传合同文件'));
      }
    };
    return {
      id: '',
      countDown: '--',  //倒计时
      activeName: "first",  //tab切换
      fileList: [],
      loading: true,
      projectData: {  //项目基本信息
        status: 'bespeak',
        initiateDate: '2017-11-11 14:00:00',
        startDate: '2017-11-25 00:00:00',
        targetSum: 100000,
        monovalent: 1000,
        minSum: 10000,
        bespeak: 30,
        collect: 60,
        business: 90,
        synopsis: '',
        detail: '',
      },
      investTotalRows: 10,  //预约列表数
      investedTotalRows: 10,  //募集列表数
      investForm: { //预约列表请求参数
        id: '',
        pageSize: 10,
        pageNo: 1,
        state: ['SUBSCRIBE', 'PENDING_PAY'],
      },
      investedForm: { //募集列表请求参数
        id: '',
        pageSize: 10,
        pageNo: 1,
        state: ['PENDING_UPLOAD_AGREEMENT', 'PENDING_SIGN_AGREEMENT', 'PENDING_CONFIRM_AGREEMENT', 'INVEST_SUCCESS'],
      },
      investData: [], //预约列表
      investedData: [], //募集列表
      //预约审核
      bespeakexamineDialogVisible: false,
      bespeakexamineDialog: {
        id: '',
        confirm: '',
        paymentPassword: '',
        reason: ''
      },
      investRules: {
        confirm: [
          { required: true, message: '请选择通过或驳回', trigger: 'change' }
        ],
        paymentPassword: [
          { required: true, message: '请输入操作密码', trigger: 'blur' }
        ]
      },
      //上传合同
      fileFormVisible: false,
      fileForm: {
        file: {
          name: '',
          base64Str: '',
          size: '',
          contentType: '',
          owerType: 'projectAgreement',
          owerId: '',
          id: '',
        },
        paymentPassword: '',
      },
      fileFormRules: {
        file: [
          { validator: checkFile, trigger: 'change' }
        ],
        paymentPassword: [
          { required: true, message: '请输入操作密码', trigger: 'blur' }
        ]
      },
      //合同签名审核
      signaFormVisible: false,
      signaForm: {
        id: '',
        confirm: '',
        paymentPassword: '',
        reason: ''
      },
      signaFormRules: {
        confirm: [
          { required: true, message: '请选择通过或驳回', trigger: 'change' }
        ],
        paymentPassword: [
          { required: true, message: '请输入操作密码', trigger: 'blur' }
        ]
      },
    };
  },
  //获取项目详情
  created() {
    this.$api.adminProjectDetail({
      id: this.$route.params.id
    })
    .then(res => {
      if (res.data.id) {
        this.id = res.data.id
        this.investForm.id = res.data.id
        this.investedForm.id = res.data.id
        this.loading = false
        this.projectData = res.data
        this.countDownFn()
      } else {
        this.$message.error('获取项目详情出错：' + res.data.message)
      }
    })
  },
  methods: {
    //标签切换
    tabChanged (tab) {
      if (tab.name === 'second') {
        if ( this.investData.length === 0) { //if数据不存在
          this.getInvest()
        } else {
          return
        }
      } else if (tab.name === 'third') {
        if (this.investedData.length === 0) { //if数据不存在
          this.getInvested()
        } else {
          return
        }
      }
    },
    //获取预约记录
    getInvest () {
      let _self = this
      _self.$api.adminProjectInvestListCount(_self.investForm)
      .then(res => {
        if (res.data.code === 'SUCCESS' && res.data.totalRows !== 0) {
          _self.investTotalRows = res.data.totalRows
        } else {
          _self.investTotalRows = 0
        }
      })
      _self.$api.adminProjectInvestList(_self.investForm)
      .then(res => {
        if (res.data.code === 'SUCCESS') {
          _self.investData = res.data.list
          console.log(_self.investData)
        } else {
          _self.$message.error('获取预约记录出错：' + res.data.message)
        }
      })
    },
    //获取募集记录
    getInvested () {
      let _self = this
      _self.$api.adminProjectInvestListCount(_self.investedForm)
      .then(res => {
        if (res.data.code === 'SUCCESS' && res.data.totalRows !== 0) {
          _self.investedTotalRows = res.data.totalRows
        } else {
          _self.investedTotalRows = 0
        }
      })
      _self.$api.adminProjectInvestList(_self.investedForm)
      .then(res => {
        if (res.data.code === 'SUCCESS') {
          _self.investedData = res.data.list
          console.log(_self.investedData)
        } else {
          _self.$message.error('获取募集记录出错：' + res.data.message)
        }
      })
    },
    //预约记录翻页
    investPageChange (page) {
      this.investForm.pageNo = page
      this.getInvest()
    },
    //募集记录翻页
    investedPageChange (page) {
      this.investedForm.pageNo = page
      this.getInvested()
    },
    //预约审核按钮
    investCheckClick (id) {
      this.bespeakexamineDialogVisible = true
      this.bespeakexamineDialog.id = id
      this.bespeakexamineDialog.confirm = ''
      this.bespeakexamineDialog.reason = ''
      this.bespeakexamineDialog.paymentPassword = ''
    },
    //预约审核提交
    investCheck (formName) {
      let _self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _self.$api.adminConfirmSubscribeProject(_self[formName])
          .then(res => {
            if (res.data.code === 'SUCCESS') {
              _self.$message.success('审核完成')
              this.bespeakexamineDialogVisible = false
              _self.getInvest ()
            } else {
              _self.$message.error('审核出错：' + res.data.message)
            }
          })
        } else {
          return false
        }
      })
    },
    //募集审核按钮
    investedCheckClick (id) {
      this.signaFormVisible = true
      this.signaForm.id = id
      this.signaForm.confirm = ''
      this.signaForm.paymentPassword = ''
      this.signaForm.reason = ''
    },
    //募集审核提交
    investedCheck (formName) {
      let _self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _self.$api.adminConfirmSubscribeProject(_self[formName])
          .then(res => {
            if (res.data.code === 'SUCCESS') {
              _self.$message.success('审核完成')
              this.bespeakexamineDialogVisible = false
              _self.getInvest ()
            } else {
              _self.$message.error('审核出错：' + res.data.message)
            }
          })
        } else {
          return false
        }
      })
    },
    //上传按钮
    uploadFileClick (id) {
      this.fileFormVisible = true
      this.fileForm.file.owerId = id
      this.fileForm.file.base64Str = ''
      this.fileForm.file.name = ''
      let file = document.getElementById('upload')
      file.value = '';  
    },
    //上传合同提交
    uploadFileSubmit (formName) {
      let _self = this
      _self.$refs[formName].validate((valid) => {
        if (valid) {
          _self.loading = true
          _self.fileFormVisible = false
          _self.$api.adminUploadProjectAgreement(_self.fileForm)
          .then(res => {
            _self.loading = false
            console.log(res.data)
            if (res.data.code === 'SUCCESS') {
              _self.$message.success('合同上传完成')
              _self.getInvested()
            } else {
              _self.$message.error('上传合同出错：' + res.data.message)
            }
          })
        } else {
          return false
        }
      })
    },
    //合同查看
    lookAgreement (url) {
      let host
      host = window.location.host
      host = 'http://113.10.171.136:8081'
      window.open(host + url, '_blank')
    },
    //审核合同签名提交
    signaSubmit (formName) {
      let _self = this
      _self.$refs[formName].validate((valid) => {
        if (valid) {
          _self.signaFormVisible = false
          _self.loading = true
          _self.$api.adminUploadProjectAgreementSignature(_self.signaForm)
          .then(res => {
            _self.loading = false
            if(res.data.code === 'SUCCESS') {
              console.log(res.data)
              _self.$message.success('审核签名成功')
              _self.getInvested()
            } else {
              _self.$message.error('审核签名出错：' + res.data.message)
            }
          })
        } else {
          return false
        }
      })
    },
    //文件转码
    uploadFile (dom, data, MB) {
      // dom图片上传input的id
      // data数据对象
      // MB文件大小限制
      const _this = this;
      var file = document.getElementById(dom).files[0];
      if ((file.size / 1024).toFixed(0) > MB * 1024) {
        this.$message.error("您上传的图片不能大于" + MB + "M，请重新选择");
        _this.fileForm.file.base64Str = ''
        _this.fileForm.file.name = ''
      } else if (file.type != "application/pdf") {
        this.$message.error("请上传pdf文件");
        _this.fileForm.file.base64Str = ''
        _this.fileForm.file.name = ''
      } else {
        var r = new FileReader();
        r.onload = function() {
          //_this.form[form_name] = [];
          _this[data].file.base64Str = r.result;
          _this[data].file.contentType = file.type;
          _this[data].file.name = file.name;
          _this[data].file.size = (file.size / 1024).toFixed(0);
          //_this.form[form_name][0] = _this[data];
          console.log(_this[data]);
        };
        r.readAsDataURL(file);
      }
    },
    //格式化进度
    progressFormat () {
      if (this.projectData.state === 'SUBSCRIBING') {
        return (this.projectData.subscribeProgress * 100).toFixed(2) - 0
      } else if (this.projectData.state === 'COLLECTING') {
        return (this.projectData.collectProgress * 100).toFixed(2) - 0
      } else if (this.projectData.state === 'OPERATING') {
        return 100
      } else if (this.projectData.state === 'COMPLATE') {
        return 100
      } else {
        return 0
      }
    },
    //格式化时间
    formatTime (time) {
      if(time) {
        return this.$moment(time * 1000).format('YYYY-MM-DD HH:mm:ss')
      } else {
        return '--'
      }
    },
    //表格时间格式化
    formaTableTime (row, col) {
      if (row.createdTime) {
        return this.$moment(row.createdTime * 1000).format('YYYY-MM-DD HH:mm:ss')
      } else {
        return false
      }
    },
    //格式化状态
    formatState (state) {
      const _state = {
        'PENDING_SUBSCRIBE': '未开始',
        'SUBSCRIBING': '预约期',
        'COLLECTING': '募集期',
        'OPERATING': '运营期',
        'COMPLATE': '已结束'
      }
      return _state[state]
    },
    //项目编辑跳转
    projectModify () {
      var _self = this
      _self.$router.push({ path: 'project_launch', query: { id: _self.projectData.id } })
    },
    //倒计时
    countDownFn () {
      var _self = this
      var time
      if (_self.projectData.state === 'PENDING_SUBSCRIBE') {
        time = _self.$moment(_self.projectData.startTime * 1000).diff(new Date(),'second')
      } else if (_self.projectData.state === 'SUBSCRIBING') {
        time = _self.$moment(_self.projectData.startTime * 1000).add(_self.projectData.subscribePeriod, 'd').diff(new Date(),'second')
      } else if (_self.projectData.state === 'COLLECTING') {
        time = _self.$moment(_self.projectData.startTime * 1000).add(
          {
            'days': _self.projectData.subscribePeriod, 
            'days':  _self.projectData.collectPeriod
          }).diff(new Date(),'second')
      } else if (_self.projectData.state === 'OPERATING') {
        time = _self.$moment(_self.projectData.startTime * 1000).add(
          {
            'days': _self.projectData.subscribePeriod, 
            'days': _self.projectData.collectPeriod,
            'days': _self.projectData.operationPeriod,
          }).diff(new Date(),'second')
      } else {
        _self.countDown = '--'
        return
      }
      if (time <= 0) {
        _self.countDown = '--'
        return
      }
      setInterval( () => {
        time -= 1
        _self.countDown = _self.leftTimer(time)
      },1000)
    },
    //倒计时间计算
    leftTimer (time){
      if (time <= 0) {
        _self.countDown = '--'
        return
      }
      var _self = this
      var leftTime = time
      var days = parseInt(leftTime / 60 / 60 / 24 , 10); //计算剩余的天数 
      var hours = parseInt(leftTime / 60 / 60 % 24 , 10); //计算剩余的小时 
      var minutes = parseInt(leftTime / 60 % 60, 10);//计算剩余的分钟 
      var seconds = parseInt(leftTime % 60, 10);//计算剩余的秒数
      days = _self.checkTime(days); 
      hours = _self.checkTime(hours);
      minutes = _self.checkTime(minutes); 
      seconds = _self.checkTime(seconds);
      return days + '天' + hours + '时' + minutes + '分' + seconds + '秒'
    },
    //时间补位
    checkTime (i) { 
      if (i<10) { 
        i = "0" + i; 
      } 
      return i; 
    }
  },
};
</script>

<style>
.el-progress-bar__inner{
  max-width: 100% !important;
}
.el-progress-bar{
  width: 90%;
}
.avatar-uploader{
  width: auto;
  height: 40px;
  text-align: center;
}
.el-progress{
  display: inline-block;
  width: 300px;
}
#pane-first .el-row{
  margin-bottom: 16px;
  line-height: 24px;
}
#pane-first .el-col-4{
  text-align: right;
}
#pane-first .el-col-3{
  text-align: right;
}
.project-details h5 {
  font-size: 22px;
  margin-bottom: 20px;
  margin-top: 40px;
}
.project-details h5 span {
  font-size: 14px;
  margin-left: 20px;
  width: 100px;
  height: 28px;
  line-height: 28px;
  border-radius: 14px;
  background: #cb0000;
  color: #fff;
  display: inline-block;
  text-align: center;
}
.project-details p {
  margin-bottom: 22px;
}
.el-upload--text{
  border: none;
}
.img-box{
  border: 1px dashed #999;
  border-radius: 10px;
  max-width: 600px;
  overflow: hidden;
  text-align: center;
}
</style>
