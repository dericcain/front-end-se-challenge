<template>
  <div v-if="show" class="confirm">
    <div class="confirm__header">
      <h3>
        <span class="confirm__header-warning">
          <FontAwesomeIcon class="fa-lg" icon="circle-exclamation" />
        </span>
        <slot name="header" />
      </h3>
    </div>
    <div class="confirm__body">
      <slot name="body" />
    </div>
    <div class="confirm__actions">
      <Button color="primary" @click="props.onCancel">
        {{ props.cancelButtonText ?? 'Cancel' }}
      </Button>
      <Button :color="props.okayButtonColor ?? 'error'" @click="props.onConfirm">
        {{ props.okayButtonText ?? 'Okay' }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import Button from '@/components/Button/Button.vue'

  // I am not sure of the idiomatic way to declare props using TS without having eslint
  // yell at me even tough I am using the props. Maybe I should relent and use
  // the defineProps macro object?
  interface Props {
    show: boolean,
    // eslint-disable-next-line vue/no-unused-properties
    onConfirm: () => void | Promise<void>,
    // eslint-disable-next-line vue/no-unused-properties
    onCancel: () => void | Promise<void>,
    // eslint-disable-next-line vue/no-unused-properties
    okayButtonText?: string,
    // eslint-disable-next-line vue/no-unused-properties
    cancelButtonText?: string,
    // eslint-disable-next-line vue/no-unused-properties
    okayButtonColor?: 'error' | 'primary',
  }

  const props = defineProps<Props>()
</script>

<style lang="scss">
  .confirm {
    position: absolute;
    left: 50%;
    top: 10%;
    transform: translateX(-50%);
    background: white;
    box-shadow: $box-shadow-3;
    border-radius: 3px;
    min-width: 85%;
    text-align: left;

    &__header {
      padding: 18px;
      border-bottom: 1px solid #eee;

      &-warning {
        color: $color-error;
      }

      h3 {
        margin: 0;
      }
    }

    &__body {
      padding: 24px;
      border-bottom: 1px solid #eee;
    }

    &__actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 12px 18px;
    }

    &.inline {
     position: relative;
      top: unset;
      right: unset;
      transform: unset;
    }
  }
</style>
