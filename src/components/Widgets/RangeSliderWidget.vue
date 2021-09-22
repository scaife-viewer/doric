<template>
  <div class="range-slider">
    {{ outputs.number.value }}
    <input type="range" min="1" max="20" v-model="outputs.number.value" @change="submit()" />
  </div>
</template>

<script>
export default {
  name: 'RangeSliderWidget',
  props: {
    info: Object,
  },
  data() {
    return {
      outputs: { ...this.info.outputs },
    };
  },
  methods: {
    submit() {
      this.$emit('configuration-update', { outputs: this.outputs });
    },
  },
};
</script>

<style scoped lang="scss">
</style>
