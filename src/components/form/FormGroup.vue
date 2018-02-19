<template>
  <div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
    <div class="col-sm-10">
      <form-input type="email" class="form-control" id="inputEmail3" placeholder="Email"></form-input>
      <span class="help-block"></span>
    </div>
  </div>
</template>

<script>
  import FormInput from './FormInput'

  export default {
    name: 'FormGroup',
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

    components: { FormInput },

    watch: {
      localValue (newValue, oldValue) {
        if (newValue !== this.value) {
          this.$emit('input', newValue, this)
        }
      }
    }
  }
</script>

<style scoped>

</style>