<template>
  <div class="form">
    <template v-if="kind === 'global'">
      <label>{{ property }}</label>
      <select v-model="kind" @change="fieldUpdate()">
        <option>local</option>
        <option>global</option>
      </select>
      <select class="remote" v-model="value" @change="fieldUpdate()">
        <option v-for="(v, k) in globalFields" :key="k">{{ k }}</option>
      </select>
    </template>
    <template v-else>
      <label>{{ property }}</label>
      <select v-model="kind" @change="fieldUpdate()">
        <option>local</option>
        <option>global</option>
      </select>
      <input v-model="value" @change="fieldUpdate()"/>
    </template>
  </div>
</template>

<script>
export default {
  name: 'InputFieldConfiguration',
  props: {
    property: String,
    initialValue: Object,
  },
  data() {
    return {
      value: this.initialValue.value,
      kind: this.initialValue.kind,
    };
  },
  computed: {
    globalFields() {
      return this.$store.state.globalFields;
    },
  },
  methods: {
    fieldUpdate() {
      this.$emit('field-update', { property: this.property, value: this.value, kind: this.kind });
    },
  },
};
</script>

<style scoped lang="scss">
.form {
  padding: 5px;
  display: flex;
  gap: 5px;
  label {
    font-size: 14pt;
    font-weight: 500;
    flex-basis: 100px;
  }
  input {
    flex-basis: 400px;
    font-size: 14pt;
    text-align: right;
  }
  select {
    font-size: 14pt;
  }
  select.remote {
    flex-basis: 408px;
  }
}
</style>
