import { h, inject, computed } from 'vue';

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
  setup(props) {
    const icons = inject('remixicons');
    const icon = computed(() => {
      if (props.path) return props.path;
      
      const icon = icons[props.name];
      
      if (typeof icon === 'undefined') {
        console.error(`[v-remixicon] ${props.name} name of the icon is incorrect`);
        return;
      }

      return icon;
    });

    return () => h(
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
        props.title ? h('title', {}, props.title) : null,
        h('g', {}, [
          h('path', { fill: 'none', d: 'M0 0h24v24H0z' }),
          h('path', { 'fill-rule': 'nonzero', d: icon.value }),
        ])
      ]
    )
  }
};
