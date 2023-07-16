import { createPinia } from 'pinia';
import useDemoStore from './modules/demo';

const pinia = createPinia();

export default pinia;
export { useDemoStore };