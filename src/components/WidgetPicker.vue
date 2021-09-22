<template>
  <div class="widget-picker">
    WIDGET PICKER:
    <ul>
      <li v-for="(widgetData, widgetType) in widgetTypeData" :key="widgetType">
        <a href="#" @click.prevent="pickWidget(widgetData)">{{ widgetType }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'WidgetPicker',
  props: {
    info: Object,
    columnIndex: Number,
    widgetIndex: Number,
  },
  data() {
    return {
      widgetTypeData: {
        lorem: {
          component: 'lorem-widget',
          inputs: {
            reps: {
              value: 2,
              kind: 'local',
            },
            fontSize: {
              value: 12,
              kind: 'local',
            },
          },
        },
        rangeSlider: {
          component: 'range-slider-widget',
          outputs: {
            number: {
              value: 12,
              send: '',
            },
          },
        },
      },
    };
  },
  methods: {
    pickWidget(widgetData) {
      this.$store.commit('pickWidget', {
        columnIndex: this.columnIndex,
        widgetIndex: this.widgetIndex,
        widgetData,
      });
    },
  },
};
</script>
