import createFastContext from "./createStore";
import { Vector3 } from "three";

const { Provider, useStore } = createFastContext('config', {
  followObject: true,
  movementType: 'mruv',
  parameters: {
    ballSize: 0.5,
    initialPosition: new Vector3(0, 0.5, 0),
    initialRotation: new Vector3(190.1, 0, 0),
    useInitialVelocity: false,
    initialVelocity: 0,
    acceleration: 0.0,
  },
});

export default Provider;

export const useConfigStore = useStore;
