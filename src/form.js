import Vue from 'vue'
import store from './store'
import VueHtml5Editor from 'vue-html5-editor'
import Snotify from 'vue-snotify'
import i18n from './i18n'

import Switch from './components/Switch.vue'
Vue.component('b-switch', Switch)

import FormField from './components/FormField.vue'
Vue.component('b-form-field', FormField)

import DataValue from './components/DataValue.vue'
Vue.component('b-data-value', DataValue)

import FormBuilder from './components/FormBuilder.vue'
Vue.component('b-form-builder', FormBuilder)


export default {
  init() {
    const language = i18n.locale == 'zh-CN' ? 'zh-cn' : 'en-us'
    window.document.execCommand("defaultParagraphSeparator", false, "p");

    Vue.use(VueHtml5Editor, {
      name: 'b-html-editor',
      language,
      image: {
        upload: {
          url: global.API_URI + "upload",
          headers: { Authorization: 'Bearer ' + store.state.auth.token },
          fieldName: 'file'
        },
        uploadHandler(res) {
          let data
          try {
            data = JSON.parse(res)
          } catch (e) {
            this.$notify.error('上传失败')
          }
          return data.url
        }
      }
    });
  }
}