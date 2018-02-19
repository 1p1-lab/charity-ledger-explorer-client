<template>
  <input :type="type" v-model="localValue"/>
</template>

<script>
  export default {
    name: 'FormInput',
    props: {
      type: {
        'type': String,
        'default': 'text'
      },
      value: {
        'type': String,
        'default': ''
      },
      size: {
        'type': 'string',
        'default': 'text'
      }
    },

    data () {
      return {
        localValue: this.value
      }
    },

    watch: {
      localValue (newValue, oldValue) {
        if (newValue !== this.value) {
          this.$emit('input', newValue)
        }
      }
    }
  }
</script>

<style scoped>

</style>