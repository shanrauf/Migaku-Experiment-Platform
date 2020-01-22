<template>
  <!-- <div style="width: 200px;"> -->
  <v-input
    :messages="[`${note}`]"
    :append-icon="icon && '$vuetify.icons.edit'"
    @click:append="$emit('edit', true)"
  >
    <v-select
      v-model="inputValue"
      menu-props="menuProps"
      hide-selected
      :items="items"
      :placeholder="placeholder"
      :value="value"
      :rules="rules"
      :label="label || 'Select one:'"
      @input="$emit('update', inputValue)"
    />
  </v-input>
</template>

<script>
export default {
  name: 'BaseSelect',
  props: {
    label: {
      type: String,
      required: false
    },
    note: {
      type: String,
      required: false,
      default: ''
    },
    value: {
      type: [String, Number],
      required: false
    },
    placeholder: {
      type: [String, Number],
      required: false
    },
    items: {
      type: Array,
      required: true
    },
    rules: {
      type: Array,
      required: false
    },
    editable: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      menuProps: {
        closeOnClick: true,
        closeOnContentClick: true,
        openOnClick: true,
        transition: true
      },
      inputValue: ''
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
