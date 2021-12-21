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
  setup(props) {
    const icons = vue.inject('remixicons');
    const icon = vue.computed(() => {
      if (props.path) return path;
      
      const icon = icons[props.name];
      
      if (typeof icon === 'undefined') {
        console.error(`[v-remixicon] ${props.name} name of the icon is incorrect`);
        return;
      }

      return icon;
    });

    return () => vue.h(
      'svg',
      {
        viewBox: props.viewBox,
        fill: props.fill,
        height: props.size,
        width: props.size,
        class: 'v-remixicon',
        xmlns: 'http://www.w3.org/2000/svg',
        style: {
          transform: props.rotate ? `rotate(${props.rotate}deg)` : null,
        },
      },
      [
        props.title ? vue.h('title', {}, props.title) : null,
        vue.h('g', {}, [
          vue.h('path', { fill: 'none', d: 'M0 0h24v24H0z' }),
          vue.h('path', { 'fill-rule': 'nonzero', d: icon.value }),
        ])
      ]
    )
  }
};

const VRemixicon = VRemix;

var index = {
	install(app, icons){
		app.provide('remixicons', icons);
		app.component(VRemix.name, VRemix);
	},
};

exports.VRemixicon = VRemixicon;
exports['default'] = index;
