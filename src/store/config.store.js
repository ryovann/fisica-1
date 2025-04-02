import createFastContext from "./createStore";

const { Provider, useStore } = createFastContext('config', {
  followObject: true,
  movementType: 'mruv',
  parameters: {
    useInitialVelocity: false,
    initialVelocity: 0,
    acceleration: 0.0,
  },
});

export default Provider;

export const useConfigStore = useStore;
