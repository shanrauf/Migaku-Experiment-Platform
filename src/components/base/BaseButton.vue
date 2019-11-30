<template>
  <button :class="{ rounded, disabled }" v-on="listeners">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    rounded: {
      type: Boolean,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners
      };
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  background-color: #204f70;
  color: #ffffff;
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
