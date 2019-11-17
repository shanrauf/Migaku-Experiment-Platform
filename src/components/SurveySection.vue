<template>
  <BaseCard>
    <template #body>slotProps is NOT available here</template>
  </BaseCard>
</template>

<script>
import BaseCard from "@/components/BaseCard.vue";
export default {
  components: {
    BaseCard
  }
};
</script>

<style lang="scss" scoped>
.blur {
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
  width: 100px;
  height: 100px;
}
</style>