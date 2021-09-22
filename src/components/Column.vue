<template>
  <div class="column" :class="{ expanded, wide }">
    <div class="column-header">
      <div class="column-title" @click.prevent="toggleCollapse()">
        <div class="column-generation">
          <span v-if="expanded">Column</span>
          {{ info.generation }}
        </div>
      </div>
      <div
        class="control move-left"
        @click.prevent="moveLeft()"
        v-if="expanded && columnIndex > 0"
      >L</div>
      <div class="control width" @click.prevent="toggleWidth()" v-if="expanded">
        <span v-if="wide">W</span>
        <span v-else>N</span>
      </div>
      <div
        class="control move-right"
        @click.prevent="moveRight()"
        v-if="expanded && rightPosition > 0"
      >R</div>
      <div class="delete" @click.prevent="deleteColumn()">&cross;</div>
    </div>
    <div class="column-body" v-if="expanded">
      <Widget
        v-for="(widgetInfo, widgetIndex) in info.widgets"
        :info="widgetInfo"
        :columnInfo="info"
        :key="widgetInfo.generation"
        :columnIndex="columnIndex"
        :widgetIndex="widgetIndex"
      />
      <div class="controls">
        <div class="add" @click.prevent="addWidget()">&plus;</div>
      </div>
    </div>
  </div>
</template>

<script>
import Widget from './Widget.vue';

export default {
  name: 'Column',
  components: {
    Widget,
  },
  props: {
    info: Object,
    columnIndex: Number,
  },
  computed: {
    rightPosition() {
      return this.$store.state.columns.length - this.columnIndex - 1;
    },
  },
  data() {
    return {
      expanded: true,
      wide: false,
    };
  },
  methods: {
    toggleCollapse() {
      this.expanded = !this.expanded;
    },
    toggleWidth() {
      this.wide = !this.wide;
    },
    addWidget() {
      this.$store.commit('addWidget', this.columnIndex);
    },
    deleteColumn() {
      this.$store.commit('deleteColumn', this.columnIndex);
    },
    moveLeft() {
      this.$store.commit('moveLeft', this.columnIndex);
    },
    moveRight() {
      this.$store.commit('moveRight', this.columnIndex);
    },
  },
};
</script>

<style scoped lang="scss">
.column {
  background: #F7F7F7;
  display: flex;
  flex-direction: column;

  &.expanded {
    min-width: 300px;
    flex-basis: 100%;
    flex-shrink: 3;
    flex-grow: 1;

    &.wide {
      min-width: 600px;
      max-width: 100%;
      flex-shrink: 1;
      flex-grow: 3;
    }
  }

  > .column-header {
    background: #666;
    color: #DDD;
    display: flex;
    justify-content: space-between;
    > * {
      padding: 10px;
    }
    > .column-title {
      cursor: pointer;
      flex: 1;
      &:hover {
        background: #444;
      }
      > .column-generation {
        font-weight: 700;
      }
    }
    > .delete, > .control {
      opacity: 0;
    }
    &:hover > .delete, &:hover > .control {
      opacity: 1;
    }
    > .delete:hover {
      background: red;
      color: white;
      cursor: pointer;
    }
    > .control:hover {
      background: #333;
      color: white;
      cursor: pointer;
    }
  }
  .column-body {
    overflow-y: auto;
    > .controls {
      display: flex;
      justify-content: center;
      > .add {
        margin: 10px;
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
  }
}
</style>
