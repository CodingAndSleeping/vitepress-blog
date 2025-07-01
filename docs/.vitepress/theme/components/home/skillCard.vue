<template>
  <div class="main">
    <el-card shadow="hover" body-class="skill-card">
      <div class="skill-card__title">
        <span><img :src="withBase('/skill.svg')" alt="" />个人技能</span>
      </div>
      <div class="skill-card__content">
        <img
          v-for="(skill, index) in skills"
          :key="skill.name"
          class="skill-icon floaty"
          :src="withBase(`/icon/${skill.name}.svg`)"
          :style="{ '--i': index % 7 }"
          @mouseover="e => handleMouseover(e, skill.name)"
          @click="handleClick(skill.url)"
        />

        <ClientOnly>
          <el-tooltip
            :visiable="visiable"
            :content="skillName"
            :virtual-ref="imgRef"
            virtual-triggering
            placement="top"
          >
          </el-tooltip>
        </ClientOnly>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { withBase } from 'vitepress'
import skills from './skills'

const visiable = ref(false)
const imgRef = ref<HTMLImageElement | null>(null)

const skillName = ref('')
const handleMouseover = (e: MouseEvent, name: string) => {
  skillName.value = name
  visiable.value = true
  imgRef.value = e.currentTarget as HTMLImageElement
}

const handleClick = (url: string) => {
  window.open(url)
}
</script>
<style scoped lang="scss">
.main {
  width: 20rem;
  margin: 1rem 0;

  :deep(.skill-card) {
    padding: 0.5rem 1rem;
    .skill-card__title {
      border-bottom: 1px solid #dddddd;
      height: 1.8rem;
      margin-bottom: 0.5rem;
      display: flex;
      justify-content: space-between;

      span {
        font-size: 0.9rem;
        font-weight: bold;
        display: flex;
        align-items: center;
        img {
          width: 1rem;
          margin: 0 5px;
        }
      }
    }

    .skill-card__content {
      padding: 5px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(30px, 1fr));
      gap: 10px;
      justify-items: center;
      .skill-icon {
        background: var(--code-bg);
        border-radius: 10px;
        padding: 5px;
        width: 30px;
        height: 30px;
        transition: all 0.3s ease;
        filter: brightness(1) contrast(1.1);
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
      }
      .skill-icon:hover {
        cursor: pointer;
        background: radial-gradient(circle at center, rgba(100, 100, 255, 0.2), transparent);
        box-shadow: 0 0 8px rgba(64, 128, 255, 0.4), 0 0 14px rgba(64, 128, 255, 0.2);
      }
    }
  }
}

.floaty {
  animation: float 3s ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.4s);
}
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(5px);
  }
}
</style>
