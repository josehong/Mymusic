<template>
  <div class="sticky" :style="getPosition">
    <div class="sticky-warp">
      <slot></slot>
    </div>
  </div>
</template>
<script type="text/babel">
  export default {
    data () {
      return {}
    },
    computed: {
      getPosition(){
        var position = this.cssSupport('position', 'sticky') ? 'sticky' : 'relative';
        return 'position:' + position;
      }
    },
    methods: {
      cssSupport: function (attr, value) {
        var element = document.createElement('div');
        if (attr in element.style) {
            element.style[attr] = value;
            return element.style[attr] === value;
        } else {
            return false;
        }
      }
    }
  }
</script>

<style>
  .sticky {
    width: 100%;
  }
  .sticky .sticky-warp {
    width: 100%;
    background: inherit;
    will-change: change;
    height: inherit;
    top: inherit;
  }
</style>