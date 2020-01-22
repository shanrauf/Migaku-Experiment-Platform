<template>
  <v-card class="mx-auto" style="padding: 20px;">
    <BaseSelect :items="possibleComponents" :value="currentComponent" />
    <v-autocomplete label="Label" :items="previousKeys" />
    <BaseTextField label="Note: (Optional)" :value="currentNote" />

    <h2>Rules:</h2>
    <BaseSelect :items="rules" />

    <br />

    <BaseRadioButtons label="Required?" :value="required" :items="yesOrNo" />

    <br />

    <h2>Items:</h2>
    <BaseSelect :items="itemsSelection" />
    <p>OR</p>
    <h2>Create your own items array:</h2>
    <p>... (implement)</p>

    <br />

    <div v-if="currentComponent">
      <h2>Result:</h2>
      <component :is="currentComponent" :items="currentItems"></component>
    </div>
    <v-card-actions>
      <v-btn color="error" @click="$emit('edit', false)">Cancel</v-btn>
      <v-btn color="primary">Create</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import BaseSelect from '@/components/form/BaseSelect.vue';
import BaseRadioButtons from '@/components/form/BaseRadioButtons.vue';
import BaseTextField from '@/components/form/BaseTextField.vue';

// by "keys" I prob meant id of the question

export default {
  name: 'editInputForm',
  components: {
    BaseSelect,
    BaseRadioButtons,
    BaseTextField
  },
  data() {
    return {
      currentNote: '',
      required: '',
      yesOrNo: ['Yes', 'No'],
      itemsSelection: ['preset item sets'], // import from somewhere
      possibleComponents: ['BaseSelect', 'BaseRadioButtons', 'BaseTextField'],
      currentComponent: '',
      currentItems: ['asdf'],
      rules: ['asdf'], // import from somewhere,
      previousKeys: ['key1', 'key2'] // get from DB
    };
  }
};
</script>

<style lang="scss" scoped></style>
