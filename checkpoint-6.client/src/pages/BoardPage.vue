<template>
  <div class="col-12 text-dark mt-3" onload="loadState()">
    <button @click="createList()" class="btn btn-secondary">
      Create List
    </button>
    <List v-for="list in state.lists" :key="list.title" :list="list" />
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { listService } from '../services/ListService'
export default {
  name: 'BoardPage',
  setup() {
    onMounted(async() => {
      await listService.getLists()
    })
    const state = reactive({
      lists: computed(() => AppState.lists)
    })
    return {
      state,
      loadState() {
      },
      async createList() {
        await listService.createList()
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
