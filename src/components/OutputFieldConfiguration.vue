<template>
  <div class="form">
    <label>{{ property }}</label>
    <input v-model="value" @change="fieldUpdate()"/>
    sent to:
    <input v-model="send" @change="fieldUpdate()"/>
  </div>
</template>

<script>
export default {
  name: 'OutputFieldConfiguration',
  props: {
    property: String,
    initialValue: Object,
  },
  data() {
    return {
      value: this.initialValue.value,
      send: this.initialValue.send,

    };
  },
  methods: {
    fieldUpdate() {
      this.$emit('field-update', { property: this.property, value: this.value, send: this.send });
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
