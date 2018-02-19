import Vue from 'vue'
import moment from 'moment'
import router from './router'
import store from './store'
import App from './App'
import _ from 'lodash'
import vuexI18n from 'vuex-i18n'
import Simplert from 'vue2-simplert-plugin'
import * as uiv from 'uiv'
import config from './../env'

//For customize default config see:
//https://github.com/mazipan/vue2-simplert-plugin
Vue.use(Simplert)

Vue.config.productionTip = false
Vue.use(vuexI18n.plugin, store)
Vue.use(uiv)

window.availableLangs = ['en', 'ru']
window.langFullNames = {
  'en': 'en-US',
  'ru': 'ru-RU'
}

//navigator.language is the same as navigator.userLanguage for IE.
//https://zzz.buzz/2016/01/13/detect-browser-language-in-javascript/

//The NavigatorLanguage.language read-only property returns a string representing the preferred
// language of the user, usually the language of the browser UI.
window.userLocaleFull = window.navigator.userLanguage || window.navigator.language
window.userLocale = window.userLocaleFull.substr(0, 2)

//Determine most preferred language
//For Chrome || Firefox
//https://zzz.buzz/2016/01/13/detect-browser-language-in-javascript/
if (navigator.languages && navigator.languages.length > 1) {
    let priorityLang = navigator.languages[0]

    if (window.availableLangs.indexOf(priorityLang) > -1) {
      window.userLocaleFull = priorityLang
      window.userLocale = window.userLocaleFull.substr(0, 2)
    }
}

if (window.availableLangs.indexOf(window.userLocale) === -1) {
  window.userLocaleFull = 'en-US'
  window.userLocale = 'en'
} else {
  window.userLocaleFull = window.langFullNames[window.userLocale]
}

//Adding translations to i18n
for (let langName in window.langFullNames) {
  let langFullName = window.langFullNames[langName]

  //Load client lang
  let addingLang = require('./lang/'+langFullName)

  //Load uiv lang data
  let uivLocale = require('uiv/src/locale/lang/'+langFullName)

  //Merge uiv lang data
  _.merge(addingLang, uivLocale)

  //Adding merged result to i18n
  Vue.i18n.add(langName, addingLang.default)
}

Vue.i18n.set(window.userLocale)

moment.locale(window.userLocale)

window.moment = moment

// Global date filter
// См. https://ru.vuejs.org/v2/guide/filters.html
Vue.filter('date', value => {
  const format = config.dateFormat || 'DD MMMM YYYY'
  return moment(value).format(format)
})

// Locale float format filter
Vue.filter('localeString', value => {
  return value ? (typeof(value) === 'number' ? value.toLocaleString() : parseFloat(value).toLocaleString()) : value
})

// Ruble currency filter
Vue.filter('rub', value => {
  const language = config.language || 'EN'
  return language.toUpperCase() === 'RU' ? (value + '  \u20bd') : ('$' + value)
})

store.dispatch('setUserLocale', window.userLocale)
store.dispatch('setUserLocaleFull', window.userLocaleFull)

/* eslint-disable no-new */
window.$vue = new Vue({
  el:         '#app',
  template:   '<App/>',
  //components: {App, moment},
  components: {App},
  router,
  store,
})

