<template>
  <div>
    <h1 v-if="siteinfo">{{siteinfo.County}} County Spring #{{siteinfo.SpringID}}</h1>
    <div data-element="table" v-for="(key, value) in siteinfo" :key="key">
        <td class="label"><label :for="id(key)">{{key}}</label></td><td class="detail"><span :id="id(key)">{{value}}</span></td>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SiteDetails',
  data: function() {
    return {}
  },
  props: {
    siteinfo: {
      type: Object
    }
  },
  methods: {
    id: (function() {
      const memo = {};
      return function(index) {
        if (!memo[index]) {
          memo[index] = genId();
        }
        return memo[index];
      }
    })()
  }
}
</script>


<style scoped>
  @import url("./css/reset.css");
  @import url("./css/variables.css");
  @import url("./css/typography.css");

  [data-element="table"] {
    display: grid;
    grid-template-columns: 30% 70%;
    grid-gap: 0.5em;
  }

  td {
    padding: 0.5em;
  }

  .label {
    background-color: var(--palette-dark);
    font-weight: var(--font-weight-bold);
  }

  .detail {
    background-color: var(--palette-light);
  }
</style>