<template>
  <div class="columns">
    <Column
      v-for="(columnInfo, columnIndex) in columns"
      :info="columnInfo"
      :key="columnInfo.generation"
      :columnIndex="columnIndex"
    />
    <div class="controls">
      <div class="add" @click.prevent="addColumn()">+</div>
    </div>
  </div>
</template>

<script>
import Column from '@/components/Column.vue';

export default {
  name: 'App',
  components: {
    Column,
  },
  data() {
    return this.$store.state;
  },
  methods: {
    addColumn() {
      this.$store.commit('addColumn');
    },
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
  background: #BBB;
}
.columns {
  height: 100vh;
  display: flex;
  overflow-y: hidden;
  flex-grow: 1;
  gap: 1px;
  > .controls > .add {
    padding: 10px;
    font-size: 20px;
    line-height: 16px;
    &:hover {
      background: green;
      color: white;
      cursor: pointer;
    }
  }
}
</style>
