<template>
  <div class="col-12 p-2 px-4 bg-light rounded mb-2 shadow-dark">
    <div class="row justify-content-between align-items-center">
      <h6 class="mb-0">
        {{ task.title }}
      </h6>
      <div class="d-inline-flex">
        <i class="fa fa-angle-left mr-2 bold" aria-hidden="true" @click="shiftTaskLeft(task)" v-show="state.lists.filter(l => l.boardId === route.params.id)[0].id !== task.listId"></i>
        <i class="fa fa-angle-right mr-2 bold" aria-hidden="true" @click="shiftTaskRight(task)" v-show="state.lists.filter(l => l.boardId === route.params.id)[state.lists.filter(l => l.boardId === route.params.id).length-1].id !== task.listId"></i>
        <i class="fa fa-comment mr-2" aria-hidden="true" @click="state.commentsToggled = !state.commentsToggled" v-if="state.comments.filter(c=>c.taskId === task.id)[0]"></i>
        <i class="fa fa-plus-square" aria-hidden="true" @click="createComment(task.id)"></i>
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
import { useRoute } from 'vue-router'

export default {
  name: 'Task',
  props: {
    task: { type: Object, default: undefined }
  },
  setup() {
    const route = useRoute()
    onMounted(() => {
      commentService.getComments()
    })
    const state = reactive({
      user: computed(() => AppState.user),
      lists: computed(() => AppState.lists),
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
      },
      createComment(taskId) {
        state.commentsToggled = !state.commentsToggled
        commentService.createComment(taskId)
      },
      route,
      shiftTaskLeft(task) {
        taskService.shiftTaskLeft(task, route)
      },
      shiftTaskRight(task) {
        taskService.shiftTaskRight(task, route)
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

.bold {
  font-weight: bold;
}

li {
  list-style-type: none;
}

.shadow-dark {
  filter: drop-shadow(1px 1px 1px black);
}
</style>
