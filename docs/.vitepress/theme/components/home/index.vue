<script setup lang="ts">
import { useData, useRouter } from 'vitepress';
import useQuotes from '../../hooks/useQuotes';
import { data } from '../../../blog.data';
import { computed, ref } from 'vue';
const router = useRouter();
const { theme } = useData();
const { quote, changeQuote } = useQuotes();
const currentPage = ref(1);
const blogs = computed(() => {
  return data.slice((currentPage.value - 1) * 10, currentPage.value * 10);
});

const handleBlogClik = (url: string) => {
  router.go('/vitepress-blog' + url);
};
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
      <div
        class="card"
        v-for="item in blogs"
        :key="item.url"
        @click="handleBlogClik(item.url)"
      >
        <i class="top" v-if="item.top"> </i>
        <el-card shadow="hover" body-class="card-body">
          <div class="title">{{ item.title }}</div>
          <div class="desc">{{ item.desc }}</div>

          <div class="info">
            <div class="user split">CAS</div>

            <div class="date split">{{ item.date.ZHString }}</div>
            <div class="label">
              <div v-for="label in item.label" :key="label">
                <el-tag>{{ label }}</el-tag>
              </div>
            </div>
          </div>
        </el-card>
      </div>

      <div class="pagination">
        <el-pagination
          small
          background
          layout="prev, pager, next, total"
          v-model:currentPage="currentPage"
          :total="data.length"
          :page-size="10"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.VPHome {
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 10rem;
  .header {
    width: 100%;
    padding: 1rem 0;
    margin: 2rem;
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

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 4px;
    .card {
      width: 50rem;
      margin: 0.5rem;
      cursor: pointer;
      position: relative;

      .top {
        position: absolute;
        overflow: hidden;
        width: 30px;
        height: 30px;
        top: -2px;
        left: -2px;
        opacity: 0.5;
      }
      .top::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 30px;
        background-image: linear-gradient(
          45deg,
          var(--el-color-primary),
          var(--el-color-primary)
        );
        transform: rotate(-45deg) translateY(-20px);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 5px 10px #0000003b;
      }

      .title {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
      }
      .desc {
        margin: 1rem 0;
        font-size: 0.8rem;
      }
      .info {
        display: flex;
        align-items: center;
        font-size: 0.7rem;
        line-height: 8px;
        height: 8px;
        font-weight: 500;
        .split::after {
          content: '';
          display: inline-block;
          width: 1px;
          height: 8px;
          margin: 0 10px;
          background-color: #4e5969;
        }

        .label {
          display: flex;
          div {
            margin: 0 0.5rem;
          }
        }
      }
    }

    .pagination {
      margin: 1rem;
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
  opacity: 0.07;
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
