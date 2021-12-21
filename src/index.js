import VRemix from './vue-remixicon';

export const VRemixicon = VRemix;

export default {
	install(app, icons){
		app.provide('remixicons', icons);
		app.component(VRemix.name, VRemix);
	},
}
