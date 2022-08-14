<template>
  <div v-if="show" class="confirm">
    <div class="confirm__header">
      <h4>
        <slot name="header" />
      </h4>
    </div>
    <div class="confirm__body">
      <slot name="body" />
    </div>
    <div class="confirm__actions">
      <Button color="primary" @click="props.onCancel">
        Cancel
      </Button>
      <Button color="error" @click="props.onConfirm">
        Okay
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Button from '@/components/Button/Button.vue'

  interface Props {
    show: boolean,
    // eslint-disable-next-line vue/no-unused-properties
    onConfirm: () => void | Promise<void>,
    // eslint-disable-next-line vue/no-unused-properties
    onCancel: () => void | Promise<void>,
  }

  const props = defineProps<Props>()
</script>

<style lang="scss">
  .confirm {
    position: absolute;
    left: 50%;
    top: 200px;
    transform: translateX(-50%);
    background: white;
    box-shadow: $box-shadow-3;
    border-radius: 3px;
    min-width: 400px;

    &__header {
      padding: 18px;
      border-bottom: 1px solid #eee;

      h4 {
        margin: 0;
      }
    }

    &__body {
      padding: 36px 18px;
    }

    &__actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 18px;
    }
  }
</style>
