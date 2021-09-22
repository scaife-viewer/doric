import { createStore } from 'vuex';

export default createStore({
  state: {
    nextGeneration: 2,
    columns: [{
      generation: 1,
      nextGeneration: 2,
      widgets: [{
        generation: 1,
        component: 'lorem-widget',
        inputs: {
          reps: {
            value: 'num1',
            kind: 'global',
          },
          fontSize: {
            value: 'num2',
            kind: 'global',
          },
        },
      }],
    }, {
      generation: 2,
      nextGeneration: 3,
      widgets: [{
        generation: 1,
        component: 'range-slider-widget',
        outputs: {
          number: {
            value: 2,
            send: 'num1',
          },
        },
      }, {
        generation: 2,
        component: 'range-slider-widget',
        outputs: {
          number: {
            value: 12,
            send: 'num2',
          },
        },
      }],
    }],
    globalFields: {
      num1: 2,
      num2: 12,
    },
  },
  mutations: {
    addColumn(state) {
      state.columns.push({
        generation: state.nextGeneration,
        nextGeneration: 1,
        widgets: [],
      });
      state.nextGeneration += 1;
    },
    deleteColumn(state, columnIndex) {
      state.columns.splice(columnIndex, 1);
    },
    moveLeft(state, columnIndex) {
      state.columns.splice(columnIndex - 1, 0, state.columns.splice(columnIndex, 1)[0]);
    },
    moveRight(state, columnIndex) {
      state.columns.splice(columnIndex + 1, 0, state.columns.splice(columnIndex, 1)[0]);
    },
    addWidget(state, columnIndex) {
      state.columns[columnIndex].widgets.push({
        generation: state.columns[columnIndex].nextGeneration,
        fields: {},
      });
      state.columns[columnIndex].nextGeneration += 1;
    },
    deleteWidget(state, payload) {
      const { columnIndex, widgetIndex } = payload;
      state.columns[columnIndex].widgets.splice(widgetIndex, 1);
    },
    moveUp(state, payload) {
      const { columnIndex, widgetIndex } = payload;
      state.columns[columnIndex].widgets.splice(
        widgetIndex - 1, 0, state.columns[columnIndex].widgets.splice(
          widgetIndex, 1,
        )[0],
      );
    },
    moveDown(state, payload) {
      const { columnIndex, widgetIndex } = payload;
      state.columns[columnIndex].widgets.splice(
        widgetIndex + 1, 0, state.columns[columnIndex].widgets.splice(
          widgetIndex, 1,
        )[0],
      );
    },
    pickWidget(state, payload) {
      const { columnIndex, widgetIndex, widgetData } = payload;
      state.columns[columnIndex].widgets[widgetIndex].component = widgetData.component;
      state.columns[columnIndex].widgets[widgetIndex].inputs = widgetData.inputs;
      state.columns[columnIndex].widgets[widgetIndex].outputs = widgetData.outputs;
    },
    updateGlobal(state, payload) {
      const { name, value } = payload;
      state.globalFields[name] = value;
      console.log(name, value);
    },
  },
  actions: {
  },
  modules: {
  },
});
