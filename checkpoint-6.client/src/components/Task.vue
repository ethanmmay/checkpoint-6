<template>
  <li>
    <div class="card text-left m-2 border-dark">
      <div class="card-body p-2">
        <div class="card-title mb-0 d-inline-flex align-items-center justify-content-between w-100">
          <h6 class="mb-0">
            {{ task.title }}
          </h6>
          <div class="d-inline-flex">
            <i class="fa fa-pencil text-info ml-3" aria-hidden="true" @click="editTask(task)"></i>
            <i class="fa fa-trash text-danger ml-2" aria-hidden="true" @click="deleteTask(task.id)"></i>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { taskService } from '../services/TaskService'
export default {
  name: 'Task',
  props: {
    task: { type: Object, default: undefined }
  },
  setup() {
    const state = reactive({
      user: computed(() => AppState.user)
    })
    return {
      state,
      deleteTask(id) {
        taskService.deleteTask(id)
      },
      editTask(rawTask) {
        taskService.editTask(rawTask)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fa:hover {
  cursor: pointer;
  transform: scale(1.2);
}
.fa {
  text-shadow: 2px 1px 2px black;
}
li {
  list-style-type: none;
}
</style>
