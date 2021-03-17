<template>
  <div class="col-2">
    <router-link :to="{name: 'BoardPage', query: { id: board.id }}" @click="setCurrentBoardId(board.id)">
      <div class="bg-img w-100">
        <h5 class="text-light text-center">
          {{ board.title }}
        </h5>
      </div>
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
      state,
      setCurrentBoardId(boardId) {
        AppState.currentBoardId = boardId
      }
    }
  }
}
</script>

<style scoped lang="scss">
.bg-img {
  border: 2px solid black;
  min-height: 125px;
  border-radius: 15px;
  background-image: url('../assets/img/mountains.jpg');
  background-size: cover;
}
</style>
