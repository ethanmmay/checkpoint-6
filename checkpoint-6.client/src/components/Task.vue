<template>
  <li>
    <div class="card text-left">
      <div class="card-body">
        <h4 class="card-title">
          {{ task.title }}
        </h4>

        <p><i class="fa fa-pencil" aria-hidden="true"></i></p>
      </div>
    </div>
  </li>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
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
      state
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
