<template>
    <div class="project_launch">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                  <i class="el-icon-menu"></i> 发起项目</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box" v-loading.fullscreen.lock="loading">
            <el-form ref="form"
                :model="form" 
                label-width="120px"
                :rules="rules">
                <el-form-item label="产品名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="目标募集金额" prop="totalAmount">
                    <el-input v-model.number="form.totalAmount"></el-input>
                </el-form-item>
                <el-form-item label="单份投资金额" prop="singleAmount">
                    <el-input v-model.number="form.singleAmount"></el-input>
                </el-form-item>
                <el-form-item label="最低购买金额" prop="minInvestAmount">
                    <el-input v-model.number="form.minInvestAmount"></el-input>
                </el-form-item>
                <el-form-item label="开始时间" prop="startTime">
                  <el-date-picker
                    v-model="form.startTime"
                    type="datetime"
                    placeholder="选择开始日期时间"
                    :picker-options="dateOptions"
                    value-format="yyyy-MM-dd HH:mm:ss">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="产品预约期"  prop="subscribePeriod">
                    <el-select v-model="form.subscribePeriod" placeholder="请选择">
                        <el-option key="oneweek" label="21天" :value="21"></el-option>
                        <el-option key="twoweek" label="14天" :value="14"></el-option>
                        <el-option key="threeweek" label="7天" :value="7"></el-option>
                        <el-option key="hrefweek" label="3天" :value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="产品募集期"  prop="collectPeriod">
                    <el-select v-model="form.collectPeriod" placeholder="请选择">
                        <el-option key="oneweek" label="21天" :value="21"></el-option>
                        <el-option key="twoweek" label="14天" :value="14"></el-option>
                        <el-option key="threeweek" label="7天" :value="7"></el-option>
                        <el-option key="hrefweek" label="3天" :value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="运营周期"  prop="operationPeriod">
                    <el-select v-model="form.operationPeriod" placeholder="请选择">
                        <el-option key="year" label="360天" :value="360"></el-option>
                        <el-option key="hrefyear" label="180天" :value="180"></el-option>
                        <el-option key="month" label="30天" :value="30"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目总周期">
                    {{ parseInt(form.subscribePeriod) + parseInt(form.collectPeriod) + parseInt(form.operationPeriod) ? parseInt(form.subscribePeriod) + parseInt(form.collectPeriod) + parseInt(form.operationPeriod) : "--" }} 天
                </el-form-item>

                <el-form-item label="产品简介"  prop="summary">
                    <el-input type="textarea" v-model="form.summary"></el-input>
                </el-form-item>
                <el-form-item label="产品缩略图"  prop="thumbnail">
                    <div class="avatar-uploader">
                        <img v-if="thumbnail.base64Str" :src="thumbnail.base64Str" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <input type="file" class="file" id="imageUrl" @change="uploadImg" />
                    </div>
                </el-form-item>
                <el-form-item label="项目介绍"  prop="description">
                    <!-- <quill-editor ref="myTextEditor" v-model="form.txt" :config="editorOption"></quill-editor> -->
                    <div class="avatar-uploader">
                        <img v-if="description.base64Str" :src="description.base64Str" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <input type="file" class="file" id="description" @change="uploadFile('description', 'description', 'description', 8)" />
                    </div>
                </el-form-item>
                <el-form-item label="融资方案" style="width: 800px"  prop="investScheme">
                    <div class="avatar-uploader">
                        <img v-if="investScheme.base64Str" :src="investScheme.base64Str" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <input type="file" class="file" id="investScheme" @change="uploadFile('investScheme', 'investScheme', 'investScheme', 4)" />
                    </div>
                </el-form-item>

                <el-form-item label="风险警告" style="width: 800px"  prop="riskWarning">
                    <div class="avatar-uploader">
                        <img v-if="riskWarning.base64Str" :src="riskWarning.base64Str" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <input type="file" class="file" id="riskWarning" @change="uploadFile('riskWarning', 'riskWarning', 'riskWarning', 4)" />
                    </div>
                </el-form-item>
    
                <el-form-item>
                    <el-button :disabled="loading" type="primary" @click="UpdateProject('form')">{{ loadingText }}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

 <script>
import VueCoreImageUpload from "vue-core-image-upload";
import { quillEditor } from "vue-quill-editor";
export default {
  data () {
    var checkAmount = ( rule, value, callback ) => {
      if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'));
      } else {
        if (value < 0 || value === 0) {
          callback(new Error('金额不能小于1'))
        } else {
          callback();
        }
      }
    };
    var checkFile = ( rule, value, callback ) =>{
      console.log(rule)
      let key = rule.field
      let _error = {
        'thumbnail': '项目缩略图',
        'description': '项目描述',
        'investScheme': '投资方案',
        'riskWarning': '风险警告'
      }
      if (this[key].base64Str) {
        callback();
      } else {
        callback(new Error('请上传' + _error[key]));
      }
    };
    return {
      loading: false,
      thumbnail: {
        base64Str: "",
        size: "",
        contentType: "",
        name: "",
        owerType: 'projectThumbnail',
        owerId: '',
        id: ''
      },
      investScheme: {
        base64Str: "",
        size: "",
        contentType: "",
        name: "",
        owerType: 'investScheme',
        owerId: '',
        id: ''
      },
      description: {
        base64Str: "",
        size: "",
        contentType: "",
        name: "",
        owerType: 'projectDescription',
        owerId: '',
        id: ''
      },
      riskWarning: {
        base64Str: "",
        size: "",
        contentType: "",
        name: "",
        owerType: 'projectRiskWarning',
        owerId: '',
        id: ''
      },
      //表单
      form: {
        id: '',
        name: "",
        totalAmount: '',
        minInvestAmount: '',
        singleAmount: '',
        startTime: '',
        subscribePeriod: '',
        collectPeriod: '',
        operationPeriod: '',
        summary: '',
        thumbnail: [],
        investScheme: [],
        description: [],
        riskWarning: [],
      },
      //日期选择范围限制
      dateOptions: {
        disabledDate (date) {
          return date.getTime() < new Date().getTime()
        }
      },
      //表单验证
      rules: {
        name: [
          { required: true, message: '请输入产品名称', trigger: 'blur' },
        ],
        totalAmount: [
          { type: 'number', required: true, message: '请输入募集金额', trigger: 'blur' },
          { validator: checkAmount, trigger: 'blur' }
        ],
        singleAmount: [
          { type: 'number', required: true, message: '请输入单份投资金额', trigger: 'blur' },
          { validator: checkAmount, trigger: 'blur' }
        ],
        minInvestAmount: [
          { type: 'number', required: true, message: '请输入最小投资金额', trigger: 'blur' },
          { validator: checkAmount, trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '请选择开始时间', trigger: 'blur' },
        ],
        subscribePeriod: [
          { type: 'number', required: true, message: '请选择预约周期', trigger: 'change' },
        ],
        collectPeriod: [
          { type: 'number', required: true, message: '请选择募集周期', trigger: 'change' },
        ],
        operationPeriod: [
          { type: 'number', required: true, message: '请选择运营周期', trigger: 'change' },
        ],
        summary: [
          { required: true, message: '请输入项目简介', trigger: 'blur' },
        ],
        thumbnail: [
          //{ type: 'array', required: true, message: '请上传产品缩略图', trigger: 'blur' },
          { validator: checkFile, trigger: 'change' }
        ],
        investScheme: [
          //{ type: 'array', required: true, message: '请上传融资方案图', trigger: 'blur' },
          { validator: checkFile, trigger: 'change' }
        ],
        description: [
          //{ type: 'array', required: true, message: '请上传项目描述图', trigger: 'blur' },
          { validator: checkFile, trigger: 'change' }
        ],
        riskWarning: [
          //{ type: 'array', required: true, message: '请上传风险警告', trigger: 'blur' },
          { validator: checkFile, trigger: 'change' }
        ],
      },
      loading: false,
      loadingText: '提交',
      editorOption: {}
    };
  },
  created() {
    var _self = this
    if (_self.$route.query.id) {
      _self.loading = true
      _self.form.id = _self.$route.query.id
      _self.$api.adminProjectDetail({
        id: _self.form.id
      })
      .then(res => {
        console.log(res.data)
        let time = _self.$moment(res.data.startTime * 1000).format('YYYY-MM-DD HH:mm:ss')
        res.data.startTime = time
        _self.form = res.data
        console.log(_self.form)
        if (res.data.thumbnail) {
          _self.thumbnail.id = res.data.thumbnail[0].id
          _self.thumbnail.base64Str = res.data.thumbnail[0].base64Str
        }
        if (res.data.description) {
          _self.description.id = res.data.description[0].id
          _self.description.base64Str = res.data.description[0].base64Str
        }
        if (res.data.investScheme) {
          _self.investScheme.id = res.data.investScheme[0].id
          _self.investScheme.base64Str = res.data.investScheme[0].base64Str
        }
        if (res.data.riskWarning) {
          _self.riskWarning.id = res.data.riskWarning[0].id
          _self.riskWarning.base64Str = res.data.riskWarning[0].base64Str
        }
        _self.thumbnail.owerId = res.data.id
        _self.description.owerId = res.data.id
        _self.investScheme.owerId = res.data.id
        _self.riskWarning.owerId = res.data.id
        _self.form.thumbnail = []
        _self.form.description = []
        _self.form.riskWarning = []
        _self.form.investScheme = []
        console.log(_self.form)
        this.loading = false
      })
    } else {
      _self.from.id = ''
    }
  },
  components: {
    VueCoreImageUpload,
    quillEditor
  },
  computed: {},
  methods: {
    Submitproject () {},
    uploadFile (dom, data, form_name, MB) {
      // dom图片上传input的id
      // data数据对象
      // form_name表单中的字段
      // MB图片大小限制
      const _this = this;
      var file = document.getElementById(dom).files[0];
      if ((file.size / 1024).toFixed(0) > MB * 1024) {
        this.$message.error("您上传的图片不能大于" + MB + "M，请重新选择");
      } else if (file.type != "image/jpeg" && file.type != "image/png") {
        this.$message.error("请上传jpg、jepg或png格式的照片");
      } else {
        var r = new FileReader();
        r.onload = function() {
          _this.form[form_name] = [];
          _this[data].contentType = file.type;
          _this[data].name = file.name;
          _this[data].size = (file.size / 1024).toFixed(0);
          _this.form[form_name][0] = _this[data];
          _this.compressionImg(r.result, data, file.type)
        };
        r.readAsDataURL(file);
      }
    },
    //图片压缩
    compressionImg (url, data, type) {
      let _self = this
      let cvs = document.createElement('canvas')
      let ctx = cvs.getContext('2d')
      let img = new window.Image()
      img.src = url
      img.onload = () => {
        cvs.width = img.width > 1068 ? 1068 : img.width
        cvs.height = img.height / img.width * cvs.width
        setTimeout(() => {
          ctx.drawImage(img, 0, 0, cvs.width, cvs.height)
          this[data].base64Str = cvs.toDataURL('image/jpeg', 0.8)
        }, 0)
      }
    },
    //图片裁剪

    //缩略图转码
    uploadImg() {
      const _this = this;
      var file = document.getElementById("imageUrl").files[0];
      if ((file.size / 1024).toFixed(0) > 3072) {
        this.$message.error("您上传的图片不能大于3M，请重新选择");
      } else if (file.type != "image/jpeg" && file.type != "image/png") {
        this.$message.error("请上传jpg、jepg或png格式的照片");
      } else {
        var r = new FileReader();
        r.onload = function() {
          _this.form.thumbnail = [];
          _this.thumbnail.contentType = file.type;
          _this.thumbnail.name = file.name;
          _this.thumbnail.size = (file.size / 1024).toFixed(0);
          _this.form.thumbnail[0] = _this.thumbnail
          //_this.thumbnail.base64Str = r.result;
          _this.compressionImg(r.result, 'thumbnail')
        };
        r.readAsDataURL(file);
      }
    },
    //项目提交
    UpdateProject(formName) {
      const _self = this
      console.log(_self.form)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _self.loading = true
          _self.loadingText = '提交中...'
          _self.$api.adminUpdateProject(_self.form)
          .then(res => {
            console.log(res)
            if (res.data.code == 'SUCCESS') {
              _self.$message.success('项目发起成功')
              _self.form = {}
              _self.thumbnail = {}
              _self.description = {}
              _self.investScheme = {}
              _self.riskWarning = {}
            } else {
              _self.$message.error('项目发起出错:' + res.data.message)
            }
            _self.loading = false
            _self.loadingText = '提交'
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor;
    }
  }
};
</script>

<style>
.project_launch .form-box {
  max-width: 560px;
  margin-top: 50px;
}
.project_launch .form-box .el-select {
  width: 100%;
}
.project_launch .form-box textarea {
  height: 120px;
}
.project_launch .form-box .el-button {
  width: 100%;
}
.project_launch .el-upload--text {
  width: 100%;
  height: 200px;
  line-height: 200px;
}
.ql-toolbar {
  line-height: 24px;
}
.project_launch .avatar-uploader {
  width: 560px;
  height: 360px;
}
.project_launch .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 560px;
  height: 360px;
  line-height: 360px;
  text-align: center;
}
</style>
