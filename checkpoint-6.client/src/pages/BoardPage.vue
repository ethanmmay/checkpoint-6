<template>
  <div class="col-12 text-dark mt-3" onload="loadState()">
    <form class="form-inline d-flex" @submit.prevent="createList">
      <div class="form-group">
        <input type="text" id="listTitle" class="form-control border-dark" maxlength="14" v-model="state.newListName">
        <input type="color" id="listColor" title="Background Color" v-model="state.newListBgColor">
        <button type="submit" class="btn btn-dark text-light">
          +
        </button>
      </div>
    </form>
    <div class="row d-flex justify-content-evenly">
      <List v-for="list in state.lists.filter(l => l.boardId == route.params.id)" :key="list.id" :list="list" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { listService } from '../services/ListService'
import { boardService } from '../services/BoardService'
import { useRoute } from 'vue-router'

export default {
  name: 'BoardPage',
  setup() {
    const route = useRoute()

    onMounted(() => {
      listService.getLists() // ASYNC AWAIT DOESNT WORK WITH ONMOUNTED
      boardService.getBoards()
    })

    const state = reactive({
      boards: computed(() => AppState.boards),
      lists: computed(() => AppState.lists),
      newListName: 'List Title',
      newListBgColor: '#404040'
    })
    return {
      state,
      createList(event) {
        listService.createList(event, route)
      },
      loadState() {
      },
      route
    }
  }
}
</script>

<style lang="scss">
.dropdown-item {
  min-height: 20px;
}

input[type="color"] {
  height: 38px;
  width: 38px;
  border-radius: 6px;
  border: 1.5px solid black;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
