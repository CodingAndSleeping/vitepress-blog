<template>
  <div class="footer">
    <div>本站总访问量 <span id="busuanzi_value_site_pv" /> 次</div>
    <div>本站访客数<span id="busuanzi_value_site_uv" /> 人次</div>
  </div>
</template>

<style scoped lang="scss">
.footer {
  padding: 0.8rem 1rem;
  color: #666;
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  font-size: 0.85rem;
  opacity: 1;
  position: absolute;
  bottom: 0;
}

.footer div {
  display: flex;
  align-items: center;
}
</style>
