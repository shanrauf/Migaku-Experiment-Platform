<template>
  <v-card class="mx-auto" style="padding: 20px;">
    <BaseSelect :items="possibleComponents" :value="currentComponent"/>
    <v-autocomplete :items="previousLabels" hint="This is the key that the user's input will be stored under in the database" />
    <BaseTextField label="Note: (Optional)" />

    <h2>Rules:</h2>
    <BaseSelect :items="rules" />

    <br />

    <h2>Required?</h2>
    <option>Yes</option>
    <option>No</option>

    <br />

    <h2>Items:</h2>
    <BaseSelect :items="itemsSelection" />
    <p>OR</p>
    <h2>Create your own items array:</h2>
    <p>... (implement)</p>

    <br />

    <div v-if="currentComponent">
        <h2>Result:</h2>
        <component :is="currentComponent"></component>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      itemsSelection: [], // import from somewhere
      possibleComponents: [],
      currentComponent: "",
      rules: [], // import from somewhere,
      previousLabels: [] // get from DB
    };
  },
  created() {
    this.possibleComponents = Object.keys(components);
  }
};
</script>

<style lang="scss" scoped>
</style>