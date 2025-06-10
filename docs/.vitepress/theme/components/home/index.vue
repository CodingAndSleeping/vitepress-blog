<script setup lang="ts">
import Header from './header.vue';
import BlogList from './blogList.vue';
import UserCard from './userCard.vue';
import { useData } from 'vitepress';
import LabelCard from './labelCard.vue';
import { useLive2d } from 'vitepress-theme-website';

const { theme } = useData();

useLive2d({
  enable: true,
  model: {
    url: 'https://raw.githubusercontent.com/iCharlesZ/vscode-live2d-models/master/model-library/ryoufuku/ryoufuku.model.json',
  },
  display: {
    position: 'left',
    width: '135px',
    height: '300px',
    xOffset: '50px',
    yOffset: '0px',
  },
  mobile: {
    show: false,
  },
  react: {
    opacity: 1,
  },
});
</script>

<template>
  <div
    class="VPHome"
    :class="{
      'external-link-icon-enabled': theme.externalLinkIcon,
    }"
  >
    <Header></Header>
    <div class="content">
      <BlogList></BlogList>
      <el-affix :offset="65">
        <UserCard></UserCard>
        <LabelCard></LabelCard>
      </el-affix>
    </div>
  </div>
</template>

<style scoped lang="scss">
@keyframes focusing {
  100% {
    background-position: left;
  }
}
.VPHome {
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem 10rem 2rem;

  .content {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
  }
}

.VPHome::before {
  content: '';
  min-height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-image: url('/background.png');
  background-repeat: repeat;
  background-size: 20%;
  opacity: 0.07;
  z-index: -1;
}

@media (min-width: 768px) {
  .VPHome {
    margin-bottom: 128px;
  }
}

:deep(.el-affix--fixed) {
  z-index: 1 !important;
}
</style>
