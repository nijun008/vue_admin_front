<template>
  <div class="system">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-menu"></i> 系统管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row>
      <el-col :span="24">
        <span>默认签名</span>
        <el-button type="primary" class='am-fr' @click='autographVisibles'>{{hasSign}}</el-button>
        <el-button type="" class='am-fr' v-if='adminimg!=""' @click='checkSign' style='margin-right:10px'>查看</el-button>
        <el-dialog title="签名" :visible.sync="checkVisible" width="80%" center>
          <img :src="adminimg" alt="">
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="checkVisible = false">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog class="sign" title="请签名" :visible.sync="signVisible" center>
          <canvas id="adminCanvas" width="740" height="300" style="border:1px solid #ddd"></canvas>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cleared">清除</el-button>
            <el-button type="primary" @click="subSign">提交</el-button>
          </span>
        </el-dialog>
      </el-col>
      <el-col :span="24">
        <span>认证实名投资人协议</span>
        <el-button type="primary" class="am-fr" style='position:relative'>
          {{hasContact}}
          <input type="file" @change="uploadContact" id="contact" class="pure-button file" />
        </el-button>
        <a :href='pdfSrc' v-if='pdfSrc!=""' target="_blank" style='margin-right:10px' class='am-fr'>
          <el-button>查看</el-button>
        </a>
        <!-- <el-button v-if='pdfSrc!=""' type="" class="am-fr" @click='checkContact' :visible.sync="contactVisible" style='margin-right:10px'>查看</el-button>
                <el-dialog title="认证实名投资人协议" :visible.sync="contactVisible" center class='contact'>
                    <pdf :src='pdfSrc'></pdf>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="contactVisible=false">确定</el-button>
                    </span>
                </el-dialog> -->
      </el-col>
    </el-row>
    <el-row>

    </el-row>
  </div>
</template>

<script>

export default {
  computed: {
    hasSign() {
      const self = this
      console.log(self.$store.state.admin.signID)
      if(self.$store.state.admin.signID!=''){
        self.btnSign = "修改";
        self.$api.sysDownloadImage({id:self.$store.state.admin.signID}).then(res=>{
            console.log(res.data)
            if(res.data.code =='SUCCESS'){           
              this.$store.state.admin.sign = res.data.base64Str              
              this.adminimg= this.$store.state.admin.sign
            }else{
              self.$message.error(res.data.message)
            }       
        })
      }else{
          this.btnSign = "设置";
      }
      return this.btnSign;
    },
    hasContact() {      
        this.$api.userUserAgreement().then(res => {
          console.log(res.data);
          if (res.data.code != "SUCCESS") {
            this.pdfSrc = "";
            this.uploadFile = "上传";
          } else if (res.data.code== "SUCCESS") {
            this.pdfSrc = "http://113.10.171.136:8081" + res.data.userAgreementUrl;
              console.log(this.pdfSrc)
           this.uploadFile = "重新上传";
          }
        });
      return this.uploadFile;
    }
  },
  created() {
    //获取管理员签名id
     this.getadminsignid()
  },
  data: function() {
    return {
      adminSignature: {
        base64Str: "",
        size: "666",
        contentType: "image/png",
        name: "sign.png"
      },
      defaultContact: {
        base64Str: "",
        size: "",
        contentType: "application/pdf",
        name: ""
      },
      pdfSrc: "",
      uploadFile: "上传",
      checkVisible: false,
      signVisible: false,
      contactVisible: false,
      btnSign: "",
      adminimg: ""
    };
  },
  methods: {
    getadminsignid(){
      this.$api.adminSettings().then(res=>{
        console.log(res.data)
        res.data.id = this.$store.state.admin.signID
      })
    },
    //清除签名
    cleared() {
      var adminS = new Handwriting("adminCanvas");
      adminS.clear();
    },
    //提交签名
    subSign() {
      const type = "";
      const canvas = document.getElementById("adminCanvas");
      const imgData = canvas.toDataURL(type);
      this.adminSignature.base64Str = imgData;
      const signature = {
        file: [
          {
            base64Str: this.adminSignature.base64Str,
            name: this.adminSignature.name,
            size: this.adminSignature.size,
            contentType: "image/png",
            owerId: this.$store.state.admin.userid,
            owerType: "defaultSecondPartySignature",
            id: ""
          }
        ]
      };
      this.$api.sysUploadFile(signature).then(res => {
        console.log(res.data);
        if (res.data.code != "SUCCESS") {
          this.$message.error(res.data.message);
        } else if (res.data.code == "SUCCESS") {
          this.$message.success("签名提交成功");
          this.btnSign = "修改签名";
          this.cleared();
          this.signVisible = false;
          this.$store.state.admin.signID = res.data.attachmentId[0]
        } else {
          this.$message.error("出错了");
        }
      });
    },
    //去签名
    autographVisibles() {
      this.signVisible = true;
      this.$nextTick(() => {
        var adminS = new Handwriting("adminCanvas");
        adminS.lineMax = 40;
        adminS.lineMin = 5;
        adminS.linePressure = 2.5;
        adminS.smoothness = 100;
      });
    },
    //查看合同
    checkContact() {
      this.contactVisible = true;
    },
    //查看签名
    checkSign() {
      this.checkVisible = true;
    },
    //提交合同
    uploadContact() {
      const self = this;
      var file = document.getElementById("contact").files[0];
      self.defaultContact.contentType = file.type;
      self.defaultContact.name = file.name;
      self.defaultContact.size = file.size.toFixed(0);
      if (file.type != "application/pdf") {
        self.$message.error("请上传PDF格式的文件");
      } else {
        var r = new FileReader();
        r.onload = function() {
          self.defaultContact.base64Str = r.result;
          const defaultC = {
            file: [
              {
                base64Str: self.defaultContact.base64Str,
                name: self.defaultContact.name,
                size: self.defaultContact.size,
                contentType: self.defaultContact.contentType,
                owerId: self.$store.state.admin.userid,
                owerType: "defaultUserAgreement",
                id: ""
              }
            ]
          };
          self.uploadFile = "上传中...";
          self.$api.sysUploadFile(defaultC).then(res => {
            if (res.data.code != "SUCCESS") {
              self.$message.error(res.data.message);
            } else if (res.data.code == "SUCCESS") {
              self.uploadFile = "重新上传";
              self.$store.state.admin.defaultContactId =
                res.data.attachmentId[0];
            } else {
              alert("出错了");
            }
          });
        };
      }
      r.readAsDataURL(file);
    }
  }
};
</script>

<style>
.system .el-col {
  line-height: 40px;
  padding-bottom: 10px;
  border-bottom: 1px #ccc solid;
  margin-bottom: 10px;
}
.system .sign .el-dialog {
  width: 800px;
  /* margin-left:-400px; */
}
.system .contact .el-dialog {
  width: 1200px;
  overflow: hidden;
}
</style>
