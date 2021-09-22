<template>
  <div class="lorem" :style="`font-size: ${fontSize}pt;`">
    <p v-for="i in Array(Number(reps) || 1)" :key="i">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
      architecto accusantium aperiam nostrum pariatur, hic aut veritatis
      excepturi reprehenderit assumenda aliquid inventore, sapiente mollitia
      exercitationem molestias quisquam fuga? Quis, dolores.
    </p>
  </div>
</template>

<script>
export default {
  name: 'LoremWidget',
  props: {
    info: Object,
  },
  computed: {
    reps() {
      let reps;
      if (this.info.inputs.reps.kind === 'global') {
        reps = this.$store.state.globalFields[this.info.inputs.reps.value];
      } else {
        reps = this.info.inputs.reps.value;
      }
      return reps;
    },
    fontSize() {
      let fontSize;
      if (this.info.inputs.fontSize.kind === 'global') {
        fontSize = this.$store.state.globalFields[this.info.inputs.fontSize.value];
      } else {
        fontSize = this.info.inputs.fontSize.value;
      }
      return fontSize;
    },
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
.lorem {
  > p {
    margin: 1em 0 0;
    &:first-child {
      margin: 0;
    }
  }
  margin: 0 auto;
  max-width: 800px;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  line-height: 1.5;
  color: #333;
}
</style>
