<script setup lang="ts">
//
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import CustomNavbar from './components/CustomNavbar.vue'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import HotPanel from './components/HotPanel.vue'
import PageSkeleton from './components/PageSkeleton.vue'
import { useGuessList } from '@/composables'

//获取轮播图数据
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}
//获取前台分类数据
const categoryList = ref<CategoryItem[]>([])
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}
//获取热门推荐数据
const hotList = ref<HotItem[]>([])
const getHomeHotData = async () => {
  const res = await getHomeHotAPI()
  hotList.value = res.result
}
//是否加载中标记
const isLoading = ref(false)
//页面加载
onLoad(async () => {
  isLoading.value = true
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])
  isLoading.value = false
})
//猜你喜欢组合式函数调用
const { guessRef, onScrolltolower } = useGuessList()
//当前下拉刷新状态
const isTriggered = ref(false)
//自定义下拉刷新被触发
const onrefresherrefresh = async () => {
  //开始动画
  isTriggered.value = true
  //重置猜你喜欢组件数据
  guessRef.value?.resetData()
  //加载数据
  await Promise.all([
    getHomeBannerData(),
    getHomeCategoryData(),
    getHomeHotData(),
    guessRef.value?.getMore(),
  ])
  //关闭动画
  isTriggered.value = false
}
</script>

<template>
  <!-- <uni-card
    title="基础卡片"
    sub-title="副标题"
    extra="额外信息"
    thumbnail="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
  >
    <text>这是一个带头像和双标题的基础卡片，此示例展示了一个完整的卡片。</text>
  </uni-card> -->
  <!-- 自定义导航栏 -->
  <CustomNavbar />
  <scroll-view scroll-y refresher-enabled @refresherrefresh="onrefresherrefresh" :refresher-triggered="isTriggered"
    @scrolltolower="onScrolltolower" class="scroll-view">
    <!-- 骨架屏 -->
    <PageSkeleton v-if="isLoading" />
    <template v-else>
      <!-- 自定义轮播图 -->
      <XtxSwiper :list="bannerList" />
      <!-- 分类面板 -->
      <!-- <category :list="categoryList" /> -->
      <!-- 热门推荐 -->
      <HotPanel :list="hotList" />
      <!-- 猜你喜欢 -->
      <XtxGress ref="guessRef" />
    </template>
    <!-- <view class="index">何尚爵</view> -->
  </scroll-view>
</template>

<style lang="scss">
/* #ifdef APP-PLUS */
#app,
/* #endif */
//
page {
  background-color: #f7f7f7;
  height: 100%;
  flex-direction: column;
  display: flex;
}

.scroll-view {
  flex: 1;
}
</style>
