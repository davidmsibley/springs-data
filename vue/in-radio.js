import Vue from 'vue'
import wrap from '@vue/web-component-wrapper'
import Component from './in-radio.vue'

const CustomElement = wrap(Vue, Component)

window.customElements.define('in-radio', CustomElement)