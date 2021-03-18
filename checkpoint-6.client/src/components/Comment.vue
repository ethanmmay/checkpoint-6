<template>
  <div class="col-12 d-inline-flex justify-content-between align-items-center">
    {{ comment.creator.name.substring(0, comment.creator.name.indexOf('@')) + ': ' + comment.title }}
    <i class="fa fa-minus-circle" aria-hidden="true" @click="deleteComment(comment.id)" v-if="comment.creator.name === state.user.name"></i>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { commentService } from '../services/CommentService'
import { AppState } from '../AppState'
export default {
  name: 'Comment',
  props: {
    comment: { type: Object, default: undefined }
  },
  setup() {
    onMounted(() => {
      commentService.getComments()
    })
    const state = reactive({
      user: computed(() => AppState.user)
    })
    return {
      state,
      deleteComment(id) {
        commentService.deleteComment(id)
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

</style>
