import React, {
  useRef,
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
  useEffect,
} from 'react';

// store globals
const globalStores = {};

export default function createFastContext(name, initialState) {
  function useStoreData() {
    const store = useRef(initialState);

    const get = useCallback(() => store.current, []);

    const subscribers = useRef(new Set());

    const set = useCallback((value) => {
      store.current = { ...store.current, ...value };
      subscribers.current.forEach((callback) => callback());
    }, []);

    const subscribe = useCallback((callback) => {
      subscribers.current.add(callback);
      return () => subscribers.current.delete(callback);
    }, []);

    return {
      get,
      set,
      subscribe,
    };
  }

  const StoreContext = createContext(null);

  function Provider({ children }) {
    const store = useStoreData();

    useEffect(() => {
      globalStores[name] = store;
    }, [store]);

    return (
      <StoreContext.Provider value={store}>
        {children}
      </StoreContext.Provider>
    );
  }

  function useStore(selector) {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error("Store not found");
    }
    const state = useSyncExternalStore(
      store.subscribe,
      () => selector ? selector(store.get()) : store.get(),
      () => selector ? selector(initialState) : initialState,
    );

    // @ts-ignore
    return [state, store.set];
  }

  return {
    Provider,
    useStore,
  };
}

export { globalStores };