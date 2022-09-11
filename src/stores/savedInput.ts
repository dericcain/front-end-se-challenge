import { defineStore } from 'pinia'

type SavedInputState = {
  input: string,
}

export const useSavedInput = defineStore('savedInput', {
  state: (): SavedInputState => ({
    input: '',
  }),
  actions: {
    save(value: string) {
      this.input = value
    },
  },
})
