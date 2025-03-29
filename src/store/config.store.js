import createFastContext from "./createStore";

const { Provider, useStore } = createFastContext('config', {
  followObject: true, 
  motionType: 'mu',
  objectParameters: {
    size: 0.0335,
    velocity: 0.001,
    acceleration: 0,
    position: { x: 0, y: 0, z: 0 }
  },
});
  
export default Provider;

export const useConfigStore = useStore;