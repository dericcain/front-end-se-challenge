<template>
  <button class="button" :type="props.type" :class="classes.color">
    <slot />
  </button>
</template>

<script setup lang="ts">
  import { computed, withDefaults } from 'vue'

  interface Props extends Partial<HTMLButtonElement> {
    color: 'error' | 'primary' | 'success',
    // I definitely need to brush up on using TS correctly with Vue props...
    // eslint-disable-next-line vue/no-unused-properties
    type: 'button' | 'submit' | 'reset' | undefined,
  }

  const props = withDefaults(defineProps<Props>(), {
    type: 'button',
    color: 'primary',
  })

  const classes = computed(() => ({
    color: `button__${props.color}`,
  }))
</script>

<style lang="scss">
.button {
  all: unset;
  margin: 6px;
  padding: 12px 18px;
  border-radius: 2px;

  &:hover {
    cursor: pointer;
    opacity: .8;
    transition: all .2s ease-in-out;
  }

  &__primary {
    background-color: $button-color-primary;
  }

  &__error {
    background-color: $button-color-error;
    color: #fff;
  }

  &__success {
    background-color: $button-color-success;
    color: #fff;
  }
}
</style>
