<template>
  <div class="col-12 text-dark text-center mt-5" v-show="state">
    <h2>Boards: </h2>
    {{ state.boars }}
    <!-- <Board v-for="board in state.boards" :key="board.id" :board="board" /> -->
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { boardService } from '../services/BoardService'
export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      await boardService.getBoards()
    })
    const state = reactive({
      boards: computed(() => AppState.boards)
    })
    return state // FLIP YOU JUST GIVE THE FLIPPING STATE TO THEM
  }
}
</script>

<style scoped lang="scss">
</style>
