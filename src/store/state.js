/**
 * Module state.js
 *
 * Application state
 *
 * @author  Alexey Marunin <amarunin@oneplus1.ru>
 * @since   1.0
 */

import Error404 from '../components/errors/Error404'
import Error500 from '../components/errors/Error500'

export default {

  // Текущий пользователь
  user: null,

  //MomentJs instance after moment.locale(userLocale)
  moment() {
    return window.moment
  },

  //Current router
  currentRouterName (component) {
    return component.$route.name
  },

  isErrorPage: false,
  errorComponent: null,

  error (error) {
    this.isErrorPage = true

    if (typeof(error) == 'object') {
      this.errorComponent = (error.response && error.response.status == 404 ? Error404 : Error500)
    } else {
      this.errorComponent = (error*1 == 404 ? Error404 : Error500)
    }

    return this.errorComponent
  },

  hideError () {
    this.isErrorPage = false
    this.errorComponent = null
  },

  displayDateFormat_MomentJS: 'DD MMMM YYYY',
  datePickerInternalFormat: 'yyyy.MM.dd',
  datePickerInternalFormat_MomentJS: 'YYYY.MM.DD',

  initFilterData: {
    dateFrom: new Date(2017, 11, 1),
    dateTo: new Date(2018, 0, 31),

    disabledDateOptions: {
      from: new Date(2017, 11, 1),
      to: new Date(2018, 1, 1),
    },

    weekStartsWith: 1,
    isShowTodayBtn: false,
    isShowClearBtn: false,
  },

  formatDateStrFromDatePicker (dateStr) {
    return dateStr ? this.moment()(dateStr, this.datePickerInternalFormat_MomentJS).format(this.displayDateFormat_MomentJS) : ''
  },

  formatDateObjectToDatePickerInternalFormat (dateObject, dateFormatStrForMomentJS) {
    return this.moment()(dateObject).format(dateFormatStrForMomentJS)
  },

  getStrDatePickerDateFrom() {
    return this.formatDateObjectToDatePickerInternalFormat(this.initFilterData.dateFrom, this.datePickerInternalFormat_MomentJS)
  },

  getStrDatePickerDateTo() {
    return this.formatDateObjectToDatePickerInternalFormat(this.initFilterData.dateTo, this.datePickerInternalFormat_MomentJS)
  },

  convertJsDateToApiFormat(date) {
    if (typeof(date) == 'string') {
        date = this.moment()(date, this.datePickerInternalFormat_MomentJS).toDate()
    }

    return ((typeof(date) == 'object' && date) ? date.getFullYear()+'.'+(date.getMonth()+1)+'.'+date.getDate() : null)
  }
}
