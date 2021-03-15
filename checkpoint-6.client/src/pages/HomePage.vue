<template>
  <div class="col-12 text-dark text-center mt-5" v-if="state">
    <h2>Boards: </h2>
    <Board v-for="board in state.boards" :key="board.title" :board="board" />
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      boards: computed(() => AppState.boards)
    })
    return state
  }
}
</script>

<style scoped lang="scss">
</style>
