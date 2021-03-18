<template>
  <div class="col-lg-3 mt-4">
    <div class="w-100 rounded p-1 d-block-flex align-items-center" :style="'background-color: ' + list.color">
      <div class="row d-inline-flex w-100 px-2">
        <div class="col-12 d-flex align-items-center justify-content-between">
          <h5 class="text-light text-center my-2">
            {{ list.title }}
          </h5>
          <div class="d-inline-flex">
            <i class="fa fa-plus-circle text-light" aria-hidden="true" @click="addTask(list.id)"></i>
            <i class="fa fa-pencil text-info mx-3" aria-hidden="true" @click="editList(list)"></i>
            <i class="fa fa-trash text-danger" aria-hidden="true" @click="deleteList(list.id)"></i>
          </div>
        </div>
      </div>
      <div class="row d-flex px-3">
        <ul>
          <Task v-for="task in state.tasks.filter(t => t.listId == list.id)" :key="task.title" :task="task" />
        </ul>
      </div>
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
      },
      editList(rawList) {
        listService.editList(rawList)
      },
      addTask(listId) {
        taskService.createTask(listId)
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
