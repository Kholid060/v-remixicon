import { h } from 'vue';

export default {
  name: 'v-remixicon',
  props: {
    name: String,
    title: String,
    viewBox: {
      type: String,
      default: '0 0 24 24',
    },
    size: {
      type: [String, Number],
      default: 24,
    },
    fill: {
      type: String,
      default: 'currentColor',
    },
    rotate: {
      type: [Number, String],
      default: 0
    },
    path: {
      type: String,
      default: '',
    },
  },
  lib: {},
  add(icons) {
    if (typeof icons === 'object' && icons !== null) {
      this.lib = icons;
    }
  },
  computed: {
    icon() {
      if (this.path) return path;
      
      const icon = this.$options.lib[this.name];
      
      if (typeof icon === 'undefined') {
        console.error(`[v-remixicon] ${this.name} name of the icon is incorrect`);
        return;
      }

      return icon;
    },
  },
  render() {
    return h(
      'svg',
      {
        viewBox: this.viewBox,
        fill: this.fill,
        height: this.size,
        width: this.size,
        class: 'v-remixicon',
        xmlns: 'http://www.w3.org/2000/svg',
        style: {
          transform: this.rotate ? `rotate(${this.rotate}deg)` : null,
        },
      },
      [
        this.title ? h('title', {}, this.title) : null,
        h('g', {}, [
          h('path', { fill: 'none', d: 'M0 0h24v24H0z' }),
          h('path', { 'fill-rule': 'nonzero', d: this.icon }),
        ])
      ]
    );
  }
};
