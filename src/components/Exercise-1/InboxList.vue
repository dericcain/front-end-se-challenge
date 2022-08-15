<template>
  <div class="inbox-list">
    <div class="inbox-list__top-bar">
      <div class="inbox-list__title">
        {{ messagingStore.selectedMessageLabel }}
      </div>
      <div class="inbox-list__actions">
        <FontAwesomeIcon class="fa-lg" :icon="['fas', 'search']" />
        <button type="button" :disabled="messagingStore.selectedMessages.length < 1" class="inbox-list__actions-delete" @click="openConfirmModal">
          <FontAwesomeIcon class="fa-lg" :icon="['fas', 'trash-can']" />
        </button>
      </div>
    </div>
    <Confirm :show="showConfirm" :on-confirm="deleteMessages" :on-cancel="closeConfirmModal">
      <template #header>
        Are you sure?
      </template>
      <template #body>
        This action cannot be undone...
      </template>
    </Confirm>
    <div v-if="messagingStore.hasMessages" class="inbox-list__messages">
      <MessageItem
        v-for="message in messages"
        :key="message.id"
        :message="message"
        :selected="message.selected"
        :urgent="message.urgent"
        @update:selected="messagingStore.toggleSelectMessage(message)"
      />
    </div>
    <div v-else class="inbox-list__no-messages">
      <p>You have no messages at this time...</p>
    </div>
  </div>
</template>


<script lang="ts" setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { ref, PropType } from 'vue'
  import Confirm from '@/components/Confirm/Confirm.vue'
  import MessageItem from '@/components/Exercise-1/MessageItem.vue'
  import { useMessagingStore } from '@/stores/messaging'
  import { Message } from '@/types/Exercise-1/Message'

  const messagingStore = useMessagingStore()

  defineProps({
    messages: {
      type: Array as PropType<Message[]>,
      default: () => [],
    },
  })

  const showConfirm = ref<boolean>(false)

  function closeConfirmModal(): void {
    showConfirm.value = false
  }

  function openConfirmModal(): void {
    showConfirm.value = true
  }

  function deleteMessages(): void {
    // Call the message store to delete the messages once confirmed
    messagingStore.deleteMessages(messagingStore.selectedMessages)
    closeConfirmModal()
  }
</script>

<style lang="scss">
.inbox-list {
  background-color: white;
  border-radius: 4px;
  box-shadow: $box-shadow-1;
  position: relative;

  &__no-messages {
   padding: 18px;
  }
}

.inbox-list__top-bar {
  display: flex;
  align-items: center;
  color: white;
  background-color: #76d7c4;
  box-shadow: $box-shadow-2;
  height: 64px;
  justify-content: space-between;
  padding: 12px 24px;
}

.inbox-list__actions {
  display: flex;
  gap: 24px;
  position: relative;

  &-delete {
    background: none;
    border: none;
    outline: none;
    color: white;

    &:hover {
      cursor: pointer;
    }
  }
}

.inbox-list__title {
  font-size: 1.5em;
  font-weight: bold;
}
</style>
