<template>
  <header>
    <Navbar />
  </header>
  <main class="container-fluid">
    <router-view />
  </main>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from './AppState'
import { boardService } from './services/BoardService'
export default {
  name: 'App',
  setup() {
    onMounted(() => {
      boardService.getBoards()
    })
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.nav-link {
  color: var(--dark);
}
</style>
