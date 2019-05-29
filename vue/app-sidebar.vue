<template>
<div>
  <h1 class="header">{{title}}</h1>
  <div>The current time is <span>{{trackTime}}</span></div>
  <in-radio data-element="views" in-name="view" :choices="tabs"></in-radio>
  <slot></slot>
  <slot name="filter" hidden></slot>
  <slot name="details" hidden></slot>
  <div>Last refresh: {{renderTime}}</div>
</div>
</template>

<script>
import InRadio from './in-radio.vue'

export default {
  name: 'AppSidebar',
  data: function() {
    return {
      trackTime: null,
      tabs: ["default","filter","details"]
    }
  },
  props: {
    title: {
      type: String,
      required: false
    }
  },
  computed: {
    renderTime: function() {return new Date();}
  },
  components: {
    InRadio
  }
}
</script>

<style scoped>
  @import url("./css/reset.css");
  @import url("./css/variables.css");
  @import url("./css/typography.css");

  :host {
    padding: 0 1.5em 1.5em 1.5em;
  }

  .header {
    position: -webkit-sticky;
    position: sticky;
    top: 0px;
    background-color: var(--palette-white);
    padding: 1em;
  }

  [data-element=views] {
    display: grid;
    grid-template-columns: 33% 33% 33%;
  }
</style>
