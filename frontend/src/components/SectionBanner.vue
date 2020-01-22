<template>
  <div class="section-label">
    <div class="section-label-text-container">
      <div class="section-label-text">Section {{ sectionId }} of {{ numberOfSections }}</div>
    </div>
    <div class="triangle"></div>
  </div>
</template>

<script>
export default {
  props: {
    sectionId: {
      type: Number,
      required: true
    },
    numberOfSections: {
      type: Number,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.section-label {
  display: flex;
}
.section-label-text-container {
  background-color: #204f70;
}
.section-label-text {
  color: white;
  padding: 8px 8px 8px 42px;
}
.triangle {
  margin: 0px;
  padding: 0px;
  display: inline-block;
  border-top: 40px solid #204f70;
  border-right: 30px solid transparent;
}
</style>
