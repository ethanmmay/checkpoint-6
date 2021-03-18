<template>
  <div class="col-3 mt-4">
    <div class="w-100 rounded p-1 d-flex align-items-center" :style="'background-color: ' + list.color">
      <div class="d-inline-flex justify-content-between align-items-center w-100 px-2">
        <h5 class="text-light text-center my-2">
          {{ list.title }}
        </h5>
        <i class="fa fa-trash text-danger" aria-hidden="true" @click="deleteList(list.id)"></i>
      </div>
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
h5, .fa {
  text-shadow: 2px 2px 2px black;
}

.fa {
  font-size: 16pt;
}

.fa:hover {
  cursor: pointer;
  transform: scale(0.8);
}

ul {
  padding-left: 0;
}
</style>
