<template>
  <div class="col-sm-2 mt-2">
    <div class="bg-img d-block-flex align-items-between" :style="'background-image: url(' + board.bgImg + ')'">
      <router-link :to="{name: 'BoardPage', params: { id: board.id }}">
        <div class="row px-4 d-flex big-height">
          <h5 class="text-light text-center">
            {{ board.title }}
          </h5>
        </div>
      </router-link>
      <div class="row px-4 d-flex justify-content-between align-self-end">
        <div class="bg-dark d-inline-flex justify-content-around w-100 p-1 mb-1">
          <i class="fa fa-pencil text-info" aria-hidden="true" @click="editBoard(board)"></i>
          <i class="fa fa-trash text-danger" aria-hidden="true" @click="deleteBoard(board.id)"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { boardService } from '../services/BoardService'
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
      deleteBoard(id) {
        boardService.deleteBoard(id)
      },
      editBoard(board) {
        boardService.editBoard(board)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.bg-img {
  border: 1px solid #757575;
  min-height: 125px;
  border-radius: 15px;
  background-size: cover;
  text-shadow: 2px 2px 2px black;
}

.big-height{
  height: 100px;
}

.fa:hover {
  cursor: pointer;
  transform: scale(1.4);
}

.bg-dark {
  border-radius: 15px;
  border: 1px solid gray;
}
</style>
