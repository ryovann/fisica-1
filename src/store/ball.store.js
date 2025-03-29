

import { Vector3 } from "three";
import createFastContext from "./createStore";

const { Provider, useStore } = createFastContext('ball', {
  size: 0.1,
  position: new Vector3(0, 0, 0),
  velocity: 0,
  time: 0,
  acceleration: 0,
  displacement: 0,
});

export default Provider;

export const useBallStore = useStore;
