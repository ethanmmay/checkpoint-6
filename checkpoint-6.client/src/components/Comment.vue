<template>
  {{ comment.title }}
</template>

<script>
export default {
  name: 'Comment',
  props: {
    comment: { type: Object, default: undefined }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
