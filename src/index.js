import VRemix from './vue-remixicon';

export const VRemixIcon = VRemix;

export default {
	install(app){
		app.component(VRemix.name, VRemix);
	},
	add(icons){
		VRemix.add(icons);
	}
}
