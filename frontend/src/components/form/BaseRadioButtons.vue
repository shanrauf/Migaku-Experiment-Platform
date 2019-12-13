<template>
  <v-radio-group
    v-model="inputValue"
    row
    :rules="rules"
    :placeholder="placeholder"
    :value="value"
    :label="label"
    :mandatory="required"
    @change="$emit('update', inputValue)"
  >
    <v-radio v-for="item in items" :key="item" :label="item.toString()" :value="item.value" />
  </v-radio-group>
</template>

<script>
export default {
  name: "BaseRadioButtons",
  props: {
    label: {
      type: String,
      required: false
    },
    value: {
      type: String | Number,
      required: false
    },
    placeholder: {
      type: String | Number,
      required: false
    },
    rules: {
      type: Array,
      required: false
    },
    required: {
      type: Boolean,
      required: false
    },
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      inputValue: ""
    };
  },
  computed: {
    icon() {
      if (!this.editable) {
        return undefined;
      } else {
        return true;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
