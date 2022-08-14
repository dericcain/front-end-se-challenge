<template>
  <div class="message-item" :class="classes.item" @click.prevent="toggleActive">
    <div class="message-item__top">
      <div v-if="urgent" class="message-item__urgent-icon">
        <FontAwesomeIcon class="fa-xl" :icon="['fas', classes.urgent]" />
      </div>
      <div class="message-item__checkbox">
        <FontAwesomeIcon class="fa-lg" :icon="['far', classes.icon]" />
      </div>
      <div>
        <div class="message-item__from">
          {{ message.from }}
        </div>
        <div class="message-item__subject">
          {{ message.subject }}
        </div>
      </div>
      <div class="message-item__timestamp">
        {{ message.timestamp }}
      </div>
    </div>
    <div class="message-item__preview">
      {{ truncateMessage(message.message) }}
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { computed } from 'vue'
  import { Message } from '@/types/Exercise-1/Message'

  const props = defineProps<{
    message: Message,
    selected: boolean,
    urgent: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: boolean): void,
  }>()

  const classes = computed(() => ({
    item: {
      'message-item__selected': props.selected,
      'message-item__urgent': props.urgent,
    },
    icon: [props.selected ? 'check-square' : 'square'],
    urgent: [props.urgent ? 'exclamation' : ''],
  }))

  function toggleActive(): void {
    emit('update:selected', !props.selected)
  }

  function truncateMessage(text: string): string {
    const MAX_LETTERS = 160
    const MAX_WORDS = 36
    const splitWords = text.split(' ')
    const numberOfWords = splitWords.length
    const numberOfLetters = text.length
    if (numberOfWords <= MAX_WORDS || numberOfLetters <= MAX_LETTERS) {
      return text
    }
    return `${splitWords.slice(0, MAX_WORDS).join(' ')}...`
  }
</script>

<style lang="scss">
.message-item {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 12px 24px;
  background-position: center;
  transition: background 800ms;

  &__top {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  &__preview {
    margin-left: 42px;
    max-height: 120px;
    color: lighten(#000, 50%);
  }

  &:hover {
    background: rgba(133, 146, 158, 0.05)
      radial-gradient(circle, transparent 1%, rgba(133, 146, 158, 0.05) 1%)
      center/15000%;
  }

  &:active {
    background-color: rgba(133, 146, 158, 0.05);
    background-size: 100%;
    transition: background 0s;
  }

  &__read {
    opacity: .3;

    &:hover {
      opacity: 1;
    }
  }

  &__urgent {
    border-left: 4px solid $color-error;

    &-icon {
      color: $color-error;
      margin-left: -12px;
      margin-top: -12px;
    }
  }

  &__checkbox {
    margin: 10px 24px 24px 6px;
  }
}

.message-item--selected .message-item__from {
  color: #76d7c4;
}

.message-item__from {
  color: #2c3e50;
  font-weight: bold;
  transition: all 250ms;
}

.message-item__subject {
  font-size: 0.85rem;
}

.message-item__timestamp {
  font-size: 0.75rem;
  margin-left: auto;
}
</style>
