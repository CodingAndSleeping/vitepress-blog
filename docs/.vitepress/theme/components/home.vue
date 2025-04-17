<script setup lang="ts">
import { VPHomeContent } from 'vitepress/theme';
import { useData } from 'vitepress';
import { onMounted, ref } from 'vue';

const { frontmatter, theme } = useData();
const descs = [
  '代码写得越急，程序跑得越慢。',
  '在存储日期中的年份的时候，请使用四位数字。',
  '如果你发现特殊情况太多，那你肯定是用错方法了。',
  '程序错误中，80% 是语法错误，16% 是简单的逻辑错误，0.8% 才是困难的问题。',
  '东西没坏，就别乱修。',
  '不要站着调试程序，那会使得你的耐心减半，你需要的是全神贯注。',
  '测试只能证明程序有错误，而不能证明程序没有错误。',
  '修正程序错误的第一步是要复现这个错误。',
  '不要基于想象开发，要基于原型开发。',
  '我没有写过诗，但有人说我写过的代码，像诗一样优雅。',
];
const poem = ref('代码写得越急，程序跑得越慢。');

// let count = 0;

// setInterval(() => {
//   if (count >= descs.length - 1) count = 0;
//   poem.value = '';
//   poem.value = descs[count];
//   count++;
// }, 2000);
</script>

<template>
  <div
    class="VPHome"
    :class="{
      'external-link-icon-enabled': theme.externalLinkIcon,
    }"
  >
    <div class="header">
      <div class="title">CAS BLOG</div>
      <div class="desc">{{ poem }}</div>
    </div>

    <div class="content"></div>
  </div>
</template>

<style scoped lang="scss">
@keyframes desc-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.VPHome {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .header {
    height: 20rem;
    width: 100%;
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      font-size: 4rem;
      margin: 2rem 0;
    }
    .desc {
      animation: desc-fade-in 0.5s ease-in-out;
    }
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
  opacity: 0.1;
  z-index: -1;
}

@media (min-width: 768px) {
  .VPHome {
    margin-bottom: 128px;
  }
}
</style>
