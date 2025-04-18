<script setup lang="ts">
import { useData } from 'vitepress';
import useQuotes from '../../hooks/useQuotes';
import { data } from '../../../blog.data';

console.log(data);
const { theme } = useData();
const { quote, changeQuote } = useQuotes();
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

      <Transition mode="out-in">
        <div class="desc" :key="quote" @click="changeQuote">{{ quote }}</div>
      </Transition>
    </div>

    <div class="content">
      <div class="card" v-for="item in data" :key="item.url"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.VPHome {
  position: absolute;
  // height: 100%;
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
      font-size: 1rem;
      cursor: pointer;
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

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
