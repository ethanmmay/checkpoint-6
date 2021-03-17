<template>
  <div class="col-3 mt-4">
    <div class="w-100 rounded p-1" :style="'background-color: ' + list.color">
      <h5 class="text-light text-center my-2">
        {{ list.title }}
        <i class="fa fa-trash" aria-hidden="true" @click="deleteList(list.id)"></i>
      </h5>
      <ul>
        <Task v-for="task in state.tasks.filter(t => t.listId == list.id)" :key="task.title" :task="task" />
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, reactive, onMounted } from 'vue'
import { AppState } from '../AppState'
import { taskService } from '../services/TaskService'
import { listService } from '../services/ListService'
export default {
  name: 'List',
  props: {
    list: { type: Object, default: undefined }
  },
  setup() {
    onMounted(async() => {
      await taskService.getTasks()
    })
    const state = reactive({
      user: computed(() => AppState.user),
      tasks: computed(() => AppState.tasks)
    })
    return {
      state,
      deleteList(id) {
        listService.deleteList(id)
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

ul {
  padding-left: 0;
}
</style>
