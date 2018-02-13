<template>
  <div>

    <div class="wrap wrap-banner">
      <div class="content">
        <h3>代理申请</h3>
        <p>基因决定人的生老病死，是健康、靓丽、长寿之因，是生命的操纵者和调控者。</p>
        <p>而基因检测是通过科技破解基因的秘密，让人们能了解自己的基因信息，从而通过改变环境和行为，让自己更加健康</p>
      </div>
    </div>

    <div class="wrap apply-wrap">
      <div class="content apply">
        <el-row type="flex" justify="space-between">
          <el-col :span="7" class="apply-item">
            <img src="../../../static/img/img_apply1.jpg">
            <h5>是商机更是造福</h5>
            <p>基因检测能提前发现患病风险，帮助人们正确预防；准确判别疾病病因与分型，帮助医生精准、个性化治疗疾病；提示人们自身遗传物质,指导人们扬长避短，做更好的自己 。然而这些知识，多数人并不知晓。 因此，从事基因检测，既是创业，更是回报社会！</p>
          </el-col>
          <el-col :span="7"  class="apply-item">
            <img src="../../../static/img/img_apply2.jpg">
            <h5>市场广阔国家重推</h5>
            <p>在《福布斯》刊文中，中国基因测序技术将构成一个千亿美元规模的市场。 据国内机构预测，2017-2021年均复合增长率约为36.86%，2021年市场规模将达到421亿元。未来五年内我国约有3亿人的市场潜在需求。2014年在国家对基因检测领域进行规范及开放注册之后，一系列政策为基因检测 的发展描绘出宏伟的蓝图。</p>
          </el-col>
          <el-col :span="7" class="apply-item">
            <img src="../../../static/img/img_apply3.jpg">
            <h5>权威资质实力强劲</h5>
            <p>原动力基因拥有医学检测、司法、基因体检全套资质，实验室通过了CNAS认证（全球认可）。选择原动力基因，正规检测免除后顾之忧；原动力基因拥有150多名硕士、博士学位的专业研发团队，根据市场需求定期推出新产品，满足市场需求 选择核子基因，及时的新产品将保证您的市场优势。</p>
          </el-col>
        </el-row>
        <!-- <router-link :to="'/'" class="apply-btn">申请成为代理</router-link> -->
      </div>
    </div>

  </div>
</template>

<script>
</script>

<style lang="less" scoped>
@import "../../../static/css/global.less";
.wrap-banner{
  background-image: url("@{static}/img/banner_applyagent.jpg");
  background-size: cover;
  background-position: center;
  color: #fff;
  text-align: center;
  padding: 80px 0;
}
.wrap-banner h3{
  font-size: 30px;
  margin-bottom: 32px;
}
.wrap-banner p{
  line-height: 26px;
}
.apply-wrap{
  padding: 40px 0 50px 0;
}
.apply-item{
  height: 460px;
  border: 1px solid #d2d2d2;
}
.apply-item h5{
  color: @mainColor;
  padding: 0 20px;
  margin: 16px 0;
  font-size: 20px;
}
.apply-item p{
  line-height: 24px;
  padding: 0 20px;
}
.apply-btn{
  .btn(288px, 62px, block, #fff);
  background-color: @mainColor;
  font-size: 20px;
  position: relative;
  margin: 0 auto;
  margin-top: 26px;
}
</style>