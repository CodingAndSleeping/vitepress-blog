<template>
  <div class="header">
    <div class="header__title">{{ theme.title || 'CAS BLOG' }}</div>

    <Transition mode="out-in">
      <div class="header__desc" :key="quote" @click="changeQuote">
        {{ quote }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { theme } = useData();
import { useData } from 'vitepress';
import useQuotes from '../../hooks/useQuotes';

const { quote, changeQuote } = useQuotes();
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  padding: 1rem;
  margin: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .header__title {
    font-style: italic;
    font-weight: bold;
    font-size: 4rem;
    margin: 3rem 0;
  }

  .header__desc {
    font-size: 1rem;
    cursor: pointer;
    text-align: center;
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
