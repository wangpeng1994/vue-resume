<template>
  <div id="resumePreview">
    {{ resume }}
  </div>
</template>

<script>
export default {
  name: 'ResumePreview',
  computed: {
    resume(){
      return this.$store.state.resume
    }
  }
}
</script>

<style>
  #resumePreview {
    flex-grow: 1;
    margin-left: 16px;
    background:#fff;
    box-shadow:0 1px 3px 0 rgba(0,0,0,0.25);
    border-radius: 4px;
  }
</style>


