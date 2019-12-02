<template>
  <v-input
    :messages="[`${note}`]"
    :append-icon="icon && '$vuetify.icons.edit'"
    @click:append="$emit('edit', true)"
  >
    <v-radio-group
      v-model="inputValue"
      :rules="rules"
      :placeholder="placeholder"
      :value="value"
      :label="label"
      :mandatory="required"
      @change="$emit('update', inputValue)"
    >
      <v-radio
        v-for="item in items"
        :key="item.key || item"
        :label="item.key || item"
        :value="item.value || item"
      />
    </v-radio-group>
  </v-input>
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
    note: {
      type: String,
      required: false,
      default: ""
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
    },
    editable: {
      type: Boolean,
      required: false
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
