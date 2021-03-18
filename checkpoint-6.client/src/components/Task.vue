<template>
  <div class="col-12 p-2 px-4  bg-light rounded  mb-2">
    <div class="row justify-content-between align-items-center">
      <h6 class="mb-0">
        {{ task.title }}
      </h6>
      <div class="d-inline-flex">
        <i class="fa fa-comment " aria-hidden="true" @click="state.commentsToggled = !state.commentsToggled" v-if="state.comments.filter(c=>c.taskId === task.id)[0]"></i>
        <i class="fa fa-pencil mx-2" aria-hidden="true" @click="editTask(task)"></i>
        <i class="fa fa-trash" aria-hidden="true" @click="deleteTask(task.id)"></i>
      </div>
    </div>
    <div class="row" v-show="state.commentsToggled">
      <Comment v-for="comment in state.comments.filter(c => c.taskId === task.id)" :key="comment.id" :comment="comment" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { taskService } from '../services/TaskService'
import { commentService } from '../services/CommentService'

export default {
  name: 'Task',
  props: {
    task: { type: Object, default: undefined }
  },
  setup() {
    onMounted(() => {
      commentService.getComments()
    })
    const state = reactive({
      user: computed(() => AppState.user),
      comments: computed(() => AppState.comments),
      commentsToggled: false
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
  transform: scale(1.4);
}

li {
  list-style-type: none;
}

.col-12{
  filter: drop-shadow(1px 1px 1px black);
}
</style>
