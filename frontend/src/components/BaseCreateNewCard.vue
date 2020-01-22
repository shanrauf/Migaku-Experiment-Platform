<template>
  <v-card v-bind="$attrs" :to="to" class="mx-auto card-container" style="text-align: center" raised>
    <div class="create-new-container">
      <v-icon color="black" x-large>$vuetify.icons.add</v-icon>
      <h1>Create New</h1>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
.card-container {
  border: 2px dashed gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.card-button-container {
  background-color: inherit;
}
.card-container:hover {
  .create-new-container {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
    cursor: pointer;
  }
}
</style>
