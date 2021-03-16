<template>
  <li>
    <div class="card text-left m-2 border-dark">
      <div class="card-body p-2">
        <div class="card-title d-inline-flex align-items-center my-2 justify-content-between w-100">
          <h4 class="mb-0">
            {{ task.title }}
          </h4>
          <i class="fa fa-pencil text-info" aria-hidden="true"></i>
        </div>
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
.fa:hover {
  cursor: pointer;
  transform: scale(1.2);
}
li {
  list-style-type: none;
}
</style>
