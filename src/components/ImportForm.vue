<template>
  <div class="import-form">
    <form class="form-horizontal" @submit.prevent="submit" enctype="multipart/form-data">

      <div class="form-group">
        <label for="resource" class="col-sm-2 control-label">{{ $t('importForm.DOCUMENT_TYPE_LABEL') }}</label>
        <div class="col-sm-10">
          <select id="resource" class="form-control" v-model="resource">
            <option value="foundation">{{ $t('importForm.DOCUMENT_TYPE_FOUNDATIONS') }}</option>
            <option value="program">{{ $t('importForm.DOCUMENT_TYPE_PROGRAMS_OF_FOUNDATIONS') }}</option>
            <option value="target">{{ $t('importForm.DOCUMENT_TYPE_TARGETS_OR_EVENTS') }}</option>
            <option value="donation">{{ $t('importForm.DOCUMENT_TYPE_DONATIONS') }}</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label for="file" class="col-sm-2 control-label">{{ $t('importForm.FILE') }}</label>
        <div class="col-sm-10">
          <span class="btn btn-default btn-file">
            {{ $t('importForm.CHOOSE_FILE') }} <input type="file" class="form-control" id="file" @change="onFileChanged" accept="text/csv"
                                 placeholder="$t('importForm.CHOOSE_FILE')">
          </span>
          <span>{{ fileName }}</span>
          <div class="alert alert-danger" v-show="!!error">{{ error }}</div>

        </div>
      </div>

      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="submit" class="btn btn-success">{{ $t('importForm.START_IMPORT') }}</button>

          <div class="alert alert-success" v-show="status !== null">
            <p>{{ $t('RESULT_RECORDS_CREATED') }} <strong>{{ status ? status.created : 0 }}</strong></p>
            <p>{{ $t('RESULT_RECORDS_UPDATED') }} <strong>{{ status ? status.updated : 0 }}</strong></p>
            <p>{{ $t('RESULT_ERRORS_COUNT') }} <strong>{{ status ? status.invalid : 0 }}</strong></p>
          </div>

        </div>
      </div>
    </form>

  </div>
</template>

<script>
  //import {importApi} from '../api'

  export default {

    data () {
      return {
        maxSize:  10485760,
        resource: 'foundation',
        file:     null,
        fileName: null,
        error:    null,
        status:   null
      }
    },

    methods: {
      submit () {
        this.status = null
        /*return importApi.upload(this.resource, this.file)
          .then(response => {
            this.status = response
            return response
          })
          .catch((response) => {
            console.log(response)
        })*/
      },

      onFileChanged (event) {
        this.error  = null
        const files = (event.target.files || event.dataTransfer.files)
        if (!files.length) return
        const file = files[0]

        if (file.size > this.maxSize) {
          this.error = this.$i18n.translate('importForm.ERROR_MAX_FILE_SIZE') + ' ' + parseFloat(this.maxSize / (1024 * 1024)) + this.$i18n.translate('importForm.FILE_SIZE_MB')
          return
        }

        if (file.type !== 'text/csv' && file.type !== 'application/vnd.ms-excel') {
          this.error = this.$i18n.translate('importForm.ERROR_INCORRECT_FILE_TYPE')
          return
        }

        this.fileName = file.name

        this.file = file
      }
    }
  }
</script>

<style scoped>
  .btn-file {
    position: relative;
    overflow: hidden;
  }

  .btn-file input[type=file] {
    position:   absolute;
    top:        0;
    right:      0;
    min-width:  100%;
    min-height: 100%;
    font-size:  100px;
    text-align: right;
    filter:     alpha(opacity=0);
    opacity:    0;
    outline:    none;
    background: white;
    cursor:     inherit;
    display:    block;
  }

  .form-group {
    padding: 10px;
  }

  .col-sm-10 {
    padding: 10px;
  }
</style>
