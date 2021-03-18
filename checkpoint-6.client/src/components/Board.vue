<template>
  <div class="col-sm-2 mt-2">
    <router-link :to="{name: 'BoardPage', params: { id: board.id }}">
      <div class="bg-img w-100" :style="'background-image: url(' + board.bgImg + ')'">
        <h5 class="text-light text-center">
          {{ board.title }}
        </h5>
      </div>
    </router-link>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Board',
  props: {
    board: { type: Object, default: undefined }
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

<style scoped lang="scss">
.bg-img {
  border: 1px solid #757575;
  min-height: 125px;
  border-radius: 15px;
  background-size: cover;
  text-shadow: 2px 2px 2px black;
}
</style>
