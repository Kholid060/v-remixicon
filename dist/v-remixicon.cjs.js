'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

var VRemix = {
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
    return vue.h(
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
        this.title ? vue.h('title', {}, this.title) : null,
        vue.h('g', {}, [
          vue.h('path', { fill: 'none', d: 'M0 0h24v24H0z' }),
          vue.h('path', { 'fill-rule': 'nonzero', d: this.icon }),
        ])
      ]
    );
  }
};

const VRemixIcon = VRemix;

var index = {
	install(app){
		app.component(VRemix.name, VRemix);
	},
	add(icons){
		VRemix.add(icons);
	}
};

exports.VRemixIcon = VRemixIcon;
exports['default'] = index;
