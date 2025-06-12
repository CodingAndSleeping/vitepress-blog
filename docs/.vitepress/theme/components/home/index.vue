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
        <SkillCard></SkillCard>
        <LabelCard></LabelCard>
      </el-affix>
    </div>

    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress';

import Header from './header.vue';
import BlogList from './blogList.vue';
import UserCard from './userCard.vue';
import LabelCard from './labelCard.vue';
import SkillCard from './skillCard.vue';

import Footer from './footer.vue';

const { theme } = useData();
</script>

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
