<template>
  <button
    type="button"
    :class="{ rounded, disabled }"
    :style="styles"
    v-on="listeners"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default {
  props: {
    rounded: {
      type: Boolean,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    color: {
      type: String,
      required: false
    },
    backgroundColor: {
      type: String,
      required: false
    }
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners
      };
    },
    colorStyle() {
      return this.color || '#ffffff';
    },
    backgroundColorStyle() {
      return this.backgroundColor || '#204f70';
    },
    styles() {
      return {
        color: this.colorStyle,
        'background-color': this.backgroundColorStyle
      };
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

.rounded {
  border-radius: 20px;
  border-style: solid;
  border-color: inherit;
}

.disabled {
  background-color: gray;
}
</style>
