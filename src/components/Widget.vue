<template>
  <div class="widget" :class="{ expanded, configureMode }">
    <div class="widget-header">
      <div class="widget-title" @click.prevent="toggleCollapse()">
        {{ columnInfo.generation }}.{{ info.generation }} {{ info.component }}</div>
      <div
        class="control configure"
        :class="{ configureMode }"
        @click.prevent="toggleConfigure()"
        v-if="info.component"
      >C</div>
      <div
        class="control move-up"
        @click.prevent="moveUp()"
        v-if="widgetIndex > 0"
      >U</div>
      <div
        class="control move-down"
        @click.prevent="moveDown()"
        v-if="bottomPosition > 0"
      >D</div>
      <div class="delete" @click.prevent="deleteWidget()">&cross;</div>
    </div>
    <div class="widget-body" v-if="expanded">
      <widget-picker
        :columnIndex="columnIndex" :widgetIndex="widgetIndex"
        v-if="!info.component"
      />
      <widget-configuration
        :info="info"
        @configuration-update="configurationUpdate($event)"
        v-if="configureMode"
      />
      <component
        :is="info.component"
        :info="info"
        @configuration-update="configurationUpdate($event)"
        v-else
      />
    </div>
  </div>
</template>

<script>
import LoremWidget from './Widgets/LoremWidget.vue';
import RangeSliderWidget from './Widgets/RangeSliderWidget.vue';
import WidgetConfiguration from './WidgetConfiguration.vue';
import WidgetPicker from './WidgetPicker.vue';

export default {
  name: 'Widget',
  components: {
    LoremWidget,
    RangeSliderWidget,
    WidgetConfiguration,
    WidgetPicker,
  },
  props: {
    columnInfo: Object,
    info: Object,
    columnIndex: Number,
    widgetIndex: Number,
  },
  data() {
    return {
      expanded: true,
      configureMode: false,
    };
  },
  computed: {
    bottomPosition() {
      return this.$store.state.columns[this.columnIndex].widgets.length - this.widgetIndex - 1;
    },
  },
  methods: {
    toggleCollapse() {
      this.expanded = !this.expanded;
    },
    toggleConfigure() {
      this.configureMode = !this.configureMode;
    },
    deleteWidget() {
      this.$store.commit('deleteWidget', {
        columnIndex: this.columnIndex, widgetIndex: this.widgetIndex,
      });
    },
    moveUp() {
      this.$store.commit('moveUp', {
        columnIndex: this.columnIndex, widgetIndex: this.widgetIndex,
      });
    },
    moveDown() {
      this.$store.commit('moveDown', {
        columnIndex: this.columnIndex, widgetIndex: this.widgetIndex,
      });
    },
    configurationUpdate(configuration) {
      this.configureMode = false;

      const { inputs, outputs } = configuration;

      // are these needed?
      this.$store.state.columns[this.columnIndex].widgets[this.widgetIndex].inputs = inputs;
      this.$store.state.columns[this.columnIndex].widgets[this.widgetIndex].outputs = outputs;

      // any shared fields need to be updated in the sharedField object
      Object.values(outputs).forEach(
        (output) => {
          if (output.send) {
            this.$store.commit('updateGlobal', {
              name: output.send,
              value: output.value,
            });
          }
        },
      );
    },
  },
};
</script>

<style scoped lang="scss">
.widget {
  border-bottom: 1px solid #BBB;
  > .widget-header {
    background: #DDD;
    display: flex;
    justify-content: space-between;
    > * {
      padding: 10px;
    }
    > .widget-title {
      cursor: pointer;
      flex: 1;
      font-weight: 500;
      &:hover {
        background: #CCC;
      }
    }
    > .delete, > .control {
      opacity: 0;
    }
    > .control.configureMode {
      opacity: 1;
      background: yellow;
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
      background: #666;
      color: white;
      cursor: pointer;
    }
  }
  .widget-body {
    padding: 10px;
  }
  &.configureMode {
    background: #BBB;
  }
}
</style>
