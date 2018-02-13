<template>
  <div class="wrap">

    <div class="wrap">
      <el-carousel
        trigger="click" 
        height="650px"
        :interval="4000">
        <el-carousel-item style="background-image: url(../../../static/img/banner2.jpg)">
          <el-row class="content">
            <el-col :span="20" :offset="2">
              <h2>只需2毫升唾液</h2>
              <h2>带您探索那些专属于您的<span>秘密</span></h2>
              <router-link :to="'/'" class="banner-btn">基因检测</router-link>
              <p>检测报告终身更新，数据质量透明可见；对东亚群体设计的全基因组芯片，并为中国群体进行了特别优化，可用于探索族群起源，研究遗传相关的性状与疾病。</p>
            </el-col>
          </el-row>
        </el-carousel-item>
        <el-carousel-item style="background-image: url(../../../static/img/banner1.jpg)">
          <el-row class="content">
            <el-col :span="20" :offset="2">
              <h2>只需2毫升唾液</h2>
              <h2>带您探索那些专属于您的<span>秘密</span></h2>
              <router-link :to="'/'" class="banner-btn">基因检测</router-link>
              <p>检测报告终身更新，数据质量透明可见；对东亚群体设计的全基因组芯片，并为中国群体进行了特别优化，可用于探索族群起源，研究遗传相关的性状与疾病。</p>
            </el-col>
          </el-row>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="wrap source-wrap">
      <div class="content source">
        <p>早在500万年前，我们的祖先就生活在了这片世界。</p>
        <p>他们的不断迁徙，不断成长，不断进化，造就了现在唯一又特别的你，</p>
        <p>所以你对自己祖源不好奇吗？</p>
        <router-link :to="'/'">了解更多</router-link>
        <div class="source-radius">
          <h4>祖源分析</h4>
          <p>祖源成分 / 父系祖源 / 母系祖源</p>
        </div>
        <div class="animate-radius1"></div>
        <div class="animate-radius2"></div>
      </div>
    </div>

    <div class="wrap analyse-wrap">
      <div class="content analyse">
        <h3>探究你的运动天赋</h3>
        <p>个性化的运动方式，建立在对体质的科学分析。我是更适合长跑还是推举？</p>
        <p>无须舍近求远，自己的基因就可以回答。</p>
        <router-link :to="'/'">了解更多</router-link>
      </div>
    </div>

    <div class="wrap danger-wrap">
      <div class="content danger">
        <el-row>
          <el-col :span="13" :offset="11">
            <p>我们的基因来自于父母的遗传，有的很美，有的存在暗藏的风险，</p>
            <p>打开基因的密码，了解疾病风险的遗传。</p>
            <el-row>
              <el-col :span="5" class="danger-item">
                <img src="../../../static/img/icon_danger1.png">
                <p>健康风险</p>
              </el-col>
              <el-col :span="5" :offset="2" class="danger-item">
                <img src="../../../static/img/icon_danger2.png">
                <p>遗传性疾病</p>
              </el-col>
              <el-col :span="5" :offset="2" class="danger-item">
                <img src="../../../static/img/icon_danger3.png">
                <p>遗传特征</p>
              </el-col>
            </el-row>
            <router-link :to="'/'">了解更多</router-link>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="wrap children-wrap">
      <div class="content children">
        <h3>看看孩子的天赋基因</h3>
        <p>提前发现孩子的优势基因，辅以引导，让孩子在赢在人生</p>
        <p>的起跑线上。</p>
        <router-link :to="'/'">了解更多</router-link>
      </div>
    </div>

    <div class="wrap step-wrap">
      <div class="content step">
        <h3>简单四部 完成基因检测</h3>
        <p>只需要采集2ml唾液，就可以完成整个基因检测</p>
        <router-link :to="'/'">了解更多</router-link>
      </div>
    </div>

    <div class="wrap partner-wrap">
      <div class="content partner">
        <h3>合作伙伴</h3>
        <div class="partner-banner">
            <!-- <el-col :span="4" class="partner-item">
              <img src="../../../static/img/img_partner01.png">
            </el-col>
            <el-col :span="4" class="partner-item">
              <img src="../../../static/img/img_partner02.png">
            </el-col>
            <el-col :span="4" class="partner-item">
              <img src="../../../static/img/img_partner03.png">
            </el-col>
            <el-col :span="4" class="partner-item">
              <img src="../../../static/img/img_partner04.png">
            </el-col>
            <el-col :span="4" class="partner-item">
              <img src="../../../static/img/img_partner05.png">
            </el-col> -->
            <swiper :options="swiperOption">
              <swiper-slide v-for="item in swiperLists">
                <div class="partner-item">
                  <img :src="item.img">
                </div>
              </swiper-slide>
            </swiper>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      swiperOption: {
        slidesPerView: 5,
        slidesPerGroup: 1,
        autoplay: true,
        observeParents: true,
        spaceBetween: 10,
        loop: true,
        speed: 500,
      },
      swiperLists: [
        { img: '../../../static/img/img_partner01.png' },
        { img: '../../../static/img/img_partner02.png' },
        { img: '../../../static/img/img_partner03.png' },
        { img: '../../../static/img/img_partner04.png' },
        { img: '../../../static/img/img_partner05.png' },
        { img: '../../../static/img/img_partner01.png' },
        { img: '../../../static/img/img_partner02.png' },
        { img: '../../../static/img/img_partner03.png' },
        { img: '../../../static/img/img_partner04.png' },
        { img: '../../../static/img/img_partner05.png' },
      ],
    }
  },
  mounted () {
    
  },
  methods: {
    
  }
}
</script>

<style lang="less" scoped>
@import "../../../static/css/global.less";
.wrap-bg{
  background-size: cover;
  background-position: center;
}
.el-carousel__item{
  padding-top: 120px;
  box-sizing: border-box;
  background-size: cover;
  background-position: center;
  color: #fff;
  font-size: 24px;
}
.el-carousel__item h2{
  font-size: 48px;
  line-height: 90px;
  font-weight: 200;
}
.el-carousel__item h2 span{
  background: linear-gradient(to right, #ed6ea0, #ec8c69); /* 背景色渐变 */
  -webkit-background-clip: text;         /* 规定背景的划分区域 */
  -webkit-text-fill-color: transparent;  /* 防止字体颜色覆盖 */
}
.banner-btn {
  .btn (170px, 56px, block, #fff);
  background: linear-gradient(to right, #ed6ea0, #ec8c69);
  margin-bottom: 20px;
}
.el-carousel__item p{
  line-height: 40px;
  font-weight: 300;
}
.source-wrap{
  background-image: url("@{static}/img/bg_source.jpg");
  padding-top: 82px;
  .wrap-bg
}
.source{
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  height: 370px;
}
.source a{
  .btn (126px, 44px, block, @mainColor);
  position: relative;
  margin: 0 auto;
  border: 1px solid @mainColor;
  margin-top: 30px;
  z-index: 2;
}
.source-radius{
  width: 300px;
  height: 300px;
  position: absolute;
  border-radius: 50%;
  left: 50%;
  margin-left: -150px;
  bottom: -170px;
  background-image: radial-gradient(circle, #5dd7d5, #219dfe);
  padding-top: 40px;
  box-sizing: border-box;
  color: #fff;
}
.source-radius h4{
  font-size: 30px;
}
.source-radius p{
  font-size: 16px;
}
@keyframes animateRadius {
  0% { 
    width: 300px;
    height: 300px;
    position: absolute;
    border-radius: 50%;
    left: 50%;
    margin-left: -150px;
    bottom: -170px;
    border-color: #219dfe;
  }
  100% { 
    width: 1120px;
    height: 1120px;
    bottom: -700px;
    left: 0;
    border-color: transparent;
  }
}
.animate-radius1{
  z-index: 0;
  position: absolute;
  width: 650px;
  height: 650px;
  border: 1px solid #e6e6e6;
  border-radius: 50%;
  bottom: -380px;
  left: 240px;
  animation: animateRadius 4s linear infinite;
  -webkit-animation: animateRadius 4s linear infinite;
}
.animate-radius2{
  position: absolute;
  width: 400px;
  height: 400px;
  border: 1px dashed #e6e6e6;
  left: 50%;
  margin-left: -200px;
  bottom: -230px;
  border-radius: 50%;
}
.analyse-wrap{
  .wrap-bg;
  background-image: url("@{static}/img/bg_analyse.jpg");
  padding: 80px 0 280px 0;
}
.analyse{
  padding-left: 20px;
  color: #fff;
  font-size: 20px;
}
.analyse h3{
  font-size: 30px;
  margin-bottom: 30px;
}
.analyse p{
  line-height: 40px;
}
.analyse a{
  .btn(128px, 44px, block, #fff);
  border: 1px solid #fff;
  margin-top: 36px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
}
.danger-wrap{
  .wrap-bg;
  padding: 140px 0 40px 0;
  background-image: url("@{static}/img/bg_danger.jpg");
}
.danger{
  
}
.danger p{
  font-size: 20px;
  line-height: 40px;
}
.danger>.el-row .el-row{
  margin-top: 50px;
}
.danger-item{
  height: 106px;
  background-color: #229efd;
  border-radius: 4px;
  text-align: center;
  padding-top: 20px;
  position: relative;
}
.danger-item p{
  font-size: 14px;
  color: #fff;
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
}
.danger a{
  .btn(126px, 46px, block, @mainColor);
  font-size: 20px;
  border: 1px solid @mainColor;
  position: relative;
  margin-left: 176px;
  margin-top: 40px;
}
.children-wrap{
  .wrap-bg;
  background-image: url("@{static}/img/bg_children.jpg");
  padding: 110px 0 170px 0;
  color: #fff;
  font-size: 20px;
}
.children{
  padding-left: 20px;
}
.children h3{
  font-size: 30px;
  margin-bottom: 36px;
}
.children p{
  line-height: 40px;
}
.children a{
  .btn(146px, 45px , block, #fff);
  border: 1px solid #fff;
  margin-top: 30px;
}
.step-wrap{
  padding: 30px 0;
}
.step{
  text-align: center;
  background: url("@{static}/img/bg_step.jpg") center no-repeat;
  font-size: 20px;
}
.step h3{
  font-size: 30px;
  margin-bottom: 20px;
}
.step a{
  .btn(126px, 44px, inline-block, @mainColor);
  border: 1px solid @mainColor;
  margin-top: 240px;
}
.partner-wrap{
  background-color: #f5f5f5;
  padding: 34px 0;
}
.partner h3{
  margin-bottom: 40px;
  font-size: 30px;
  padding-left: 20px;
}
.partner-item{
  width: 211px;
}
</style>