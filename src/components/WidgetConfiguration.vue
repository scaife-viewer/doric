<template>
  <div class="configuration">
    <div v-if="inputs">
    Inputs:
    <input-field-configuration
      :property="k"
      :initialValue="v"
      v-for="(v, k) in inputs"
      :key="k"
      @field-update="inputsUpdate($event)"
    />
    </div>
    <div v-if="outputs">
    Outputs:
    <output-field-configuration
      :property="k"
      :initialValue="v"
      v-for="(v, k) in outputs"
      :key="k"
      @field-update="outputsUpdate($event)"
    />
    </div>
    <button @click="submit()">Submit</button>
  </div>
</template>

<script>
import InputFieldConfiguration from './InputFieldConfiguration.vue';
import OutputFieldConfiguration from './OutputFieldConfiguration.vue';

export default {
  name: 'WidgetConfiguration',
  components: {
    InputFieldConfiguration,
    OutputFieldConfiguration,
  },
  props: {
    info: Object,
  },
  data() {
    return {
      inputs: { ...this.info.inputs },
      outputs: { ...this.info.outputs },
    };
  },
  methods: {
    inputsUpdate(data) {
      this.inputs[data.property].value = data.value;
      this.inputs[data.property].kind = data.kind;
    },
    outputsUpdate(data) {
      this.outputs[data.property].value = data.value;
      this.outputs[data.property].send = data.send;
    },
    submit() {
      this.$emit('configuration-update', {
        inputs: this.inputs,
        outputs: this.outputs,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.configuration {
  button {
   font-size: 14pt;
  }
}
</style>
