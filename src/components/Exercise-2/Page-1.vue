<template>
  <div class="page-1">
    <Confirm
      :show="showConfirm"
      :on-confirm="saveAndNavigate"
      :on-cancel="closeConfirmModal"
      okay-button-text="Save & Continue?"
      cancel-button-text="Cancel"
      okay-button-color="primary"
    >
      <template #header>
        Are you sure?
      </template>
      <template #body>
        It looks like you have some work that has not been saved. Do you want to save your work before you proceed?
      </template>
    </Confirm>
    <h3 class="page-1__title">
      Page 1
    </h3>
    <textarea v-model="input" rows="4" class="page-1__textarea" placeholder="Type something here..." />
    <RippleButton class="page-1__save-button" :disabled="inputMatches" @click="save">
      Save
    </RippleButton>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { onBeforeRouteLeave, useLink } from 'vue-router'
  import Confirm from '@/components/Confirm/Confirm.vue'
  import RippleButton from '@/components/RippleButton.vue'
  import { useSavedInput } from '@/stores/savedInput'

  const { navigate } = useLink({
    to: 'page-2',
  })

  const savedInputStore = useSavedInput()
  const input = ref(savedInputStore.input)
  const showConfirm = ref<boolean>(false)
  const inputMatches = computed(() => input.value === savedInputStore.input)

  function save(): void {
    savedInputStore.save(input.value)
  }

  async function saveAndNavigate(): Promise<void> {
    savedInputStore.save(input.value)
    closeConfirmModal()
    await navigate()
  }

  function closeConfirmModal(): void {
    showConfirm.value = false
  }

  onBeforeRouteLeave(() => {
    if (!inputMatches.value) {
      showConfirm.value = true
      return false
    }
    return true
  })
</script>

<style lang="scss">
.page-1 {
  text-align: center;
}

.page-1__textarea {
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  margin: auto;
  outline-color: #76d7c4;
  overflow: auto;
  padding: 24px;
  resize: none;
  width: 85%;
}
</style>
