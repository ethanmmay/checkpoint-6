<template>
  <div class="col-2">
    <div class="bg-img w-100">
      <h5 class="text-light text-center">
        {{ list.title }}
      </h5>
      <ul><Task v-for="task in state.tasks" :key="task.title" :task="task" /></ul>
    </div>
  </div>
</template>

<script>
import { computed, reactive, onMounted } from 'vue'
import { AppState } from '../AppState'
import { taskService } from '../services/TaskService'
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
      state
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
