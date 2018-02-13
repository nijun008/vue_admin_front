<template>
  <div>

    <div class="wrap wrap-banner">
    </div>

    <div class="wrap step-wrap">
      <div class="content step">
        <h2>采集检测流程</h2>
        <el-row type="flex" justify="space-between">
          <el-col :span="5" class="step-item">
            <img src="../../../static/img/icon_step1.png">
            <p>在原动力基因官网上购买相关基因的检测服务，购买后2个工作日内快递发出采样盒。</p>
          </el-col>
          <el-col :span="1" class="step-right">
            <img src="../../../static/img/icon_right.png">
          </el-col>
          <el-col :span="5" class="step-item">
            <img src="../../../static/img/icon_step2.png">
            <p>收到采样盒后，请然后严格按照说明书完成唾液样本采集，妥善保存</p>
          </el-col>
          <el-col :span="1" class="step-right">
            <img src="../../../static/img/icon_right.png">
          </el-col>
          <el-col :span="5" class="step-item">
            <img src="../../../static/img/icon_step3.png">
            <p>将采集完成的样本，邮寄到原动力基因检测中心，邮寄方式选择到付即可。</p>
          </el-col>
          <el-col :span="1" class="step-right">
            <img src="../../../static/img/icon_right.png">
          </el-col>
          <el-col :span="5" class="step-item">
            <img src="../../../static/img/icon_step4.png">
            <p>原动力实验室收到样本20个工作日后，检测报告会将以pdf形式放在您本网站的个人中心，您可以选择纸质报告回寄给您。</p>
          </el-col>
        </el-row>
        <h2>将你的DNA转化为报告</h2>
        <el-row class="step-txt">
          <el-col :span="11">
            <p>人与人之间DNA的相似性高达99.5%，但正是那0.5%的区别塑造了如此千差万别的你我，这些差别就是突变造成的。DNA突变在一定程度上决定了我们的健康状况、遗传特征和祖源成分。</p>
            <p>唾液中的DNA来自于口腔中的脱落细胞。通过使用原动力 的唾液采集器，我们可以获取你的唾液样本，我们的实验室会从中提取你的DNA，并用全定制基因芯片检测约60万个突变位点。</p>
            <p>随后我们会出具你的个人基因检测报告，报告中的检测结果解读主要是依据现有的学术数据库和FDA等机构公布的数据。随着检测样本量的扩大和科学研究的推进，基因检测会为我们带来更多可靠的指导和参考。</p>
            <h3>基因检测的局限性</h3>
            <ul>
              <li>无法覆盖所有与该项目相关的位点</li>
              <li>基因只是影响性状的一部分因素，其他可能的因素包括生活环境和生活方式等</li>
              <li>结果不能用于临床诊断</li>
              <li>结果会随着参与人数的增多不断优化</li>
            </ul>
          </el-col>
          <el-col :span="11" :offset="1">
            <h4><span>Affymetrix</span>高密度定制芯片</h4>
            <img src="../../../static/img/img_xinpian.png">
          </el-col>
        </el-row>
      </div>
    </div>

  </div>
</template>

<script>
</script>

<style lang="less" scoped>
@import "../../../static/css/global.less";
.wrap-banner{
  background-image: url("@{static}/img/banner_analyse.jpg");
  height: 276px;
  background-size: cover;
  background-position: center;
}
.step-wrap{
  padding: 10px 0 50px 0;
}
.step h2{
  font-size: 30px;
  line-height: 110px;
  padding-left: 14px;
}
.step-item{
  height: 260px;
  padding: 20px 16px 0 16px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.step-item p{
  text-align: left;
  line-height: 25px;
  margin-top: 12px;
}
.step-right{
  line-height: 260px;
  text-align: center;
}
.step-txt p{
  margin-bottom: 24px;
  line-height: 26px;
}
.step-txt h3{
  color: #239ffd;
  margin-top: 30px;
  font-size: 24px;
  margin-bottom: 16px;
}
.step-txt ul{
  list-style: disc;
  padding-left: 20px;
}
.step-txt li{
  list-style: disc;
  line-height: 26px;
}
.step-txt h4{
  font-size: 24px;
  margin-bottom: 10px;
}
.step-txt h4 span{
  margin-right: 10px;
  color: #c44fdd;
}
.step-txt .el-col-offset-1{
  text-align: center;
}
</style>