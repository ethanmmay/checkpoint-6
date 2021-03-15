<template>
  <div class="bg-img rounded text-white">
    <router-link :to="{name: 'BoardPage', params: {id: board.id}}">
      <h5> {{ board.title }} </h5>
    </router-link>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Board',
  props: {
    board: { type: Object, default: undefined }
  },
  setup() {
    const state = reactive({
      user: computed(() => AppState.user)
    })
    return {
      state
    }
  }
}
</script>

<style scoped lang="scss">
</style>
