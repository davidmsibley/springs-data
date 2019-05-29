<template>
  <div>
    <div v-for="(item, index) in choices" :key="item" class="choice">
      <input 
        type="radio"
        :name="name"
        :id="id(index)"
        :value="item"
        @change="selectItem(item)">
      <label :for="id(index)">{{item}}</label>
    </div>
  </div>
</template>

<script>
import { genId } from './gen-id.js';

export default {
  name: "InRadio",
  data: function() {
    return {
      choice: null,
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
    })(),
    selectItem: function(item) {
      console.log('boo', item);
    }
  },
  props: {
    name: {
      type: String
    },
    choices: {
      type: Array
    }
  }
}
</script>