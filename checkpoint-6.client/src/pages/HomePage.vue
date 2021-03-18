<template>
  <div class="col-12 text-dark mt-3" onload="loadState()">
    <form class="form-inline d-flex" @submit.prevent="createBoard">
      <div class="form-group">
        <input type="text" id="boardTitle" class="form-control border-dark mr-2" maxlength="14" v-model="state.newListName">
        <!-- Add board Image? -->
        <button type="submit" class="btn btn-dark text-light">
          +
        </button>
      </div>
    </form>
    <h3>Boards: </h3><br>
    <div class="row">
      <Board v-for="board in state.boards" :key="board.title" :board="board" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { boardService } from '../services/BoardService'
export default {
  name: 'Home',
  setup() {
    onMounted(() => {
      boardService.getBoards()
    })
    const state = reactive({
      boards: computed(() => AppState.boards)
    })
    return {
      state,
      loadState() {
      },
      createBoard(event) {
        boardService.createBoard(event)
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
