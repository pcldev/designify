import { useSyncExternalStore } from "react";
import { cleanStackTrace } from "../utils/cleanStackTrace";
import { differencesObject } from "../utils/differencesObject";

type State = {};

type Selector<T, U> = (state: T) => U;

type Listener<T> = (state: T) => void;

export type Reducer<T, A> = (state: T, action: A) => T;

// Define a type with index signature for the stores
type GlobalStoreHistory = {
  histories: any[];
  stores: {
    [key: string]: any[];
  };
};

export interface Store<T, A> {
  getState: () => T;
  dispatch: (action: A, notifyListeners?: boolean, skipTrace?: boolean) => any;
  subscribe: (listener: Listener<T>) => () => void;
  resetState: () => void;
  enableTracing: (enabled: boolean) => void;
  getHistory: () => Array<{
    action: A;
    fromState: T;
    toState: T;
    diff: any;
    stackTrace: string[];
  }>;
}

// Global variable for tracing control
let tracingEnabled = false;

// Fallback object if window is not available
const globalStoreHistoryRaw: GlobalStoreHistory = {
  histories: [],
  stores: {},
};

/**
 *
 * @param reducer Reducer to manage state mutation of instance store
 * @param initialState Default state
 * @returns Store
 *
 * @description Global state is a concept that we should leverage to manage complex state more perform.
 * Each component can subscribe to listen to an instance global state
 *
 * @practices
 * 1. Should only listen state that need to read instead of reading an entire state then selecting property inside
 *    For example: `useStore(Store, state => state.title)`. Component will only update when title is updated even parent state is changed.
 *
 * 2. Should only update state synchronously. Avoid updating in side effect like useEffect hook or componentDidUpdate.
 *    This action can potentially update state with un-expected behavior.
 *
 * 3. Often use debugger to keep trace of state mutation -> get insight if your state is updating perform or not.
 *    Please see DEBUGGER lecture at the end of this file.
 *
 * @example
 * ```
 *    // Define store reducer
 *    const reducer = (state: T, action: Action<ActionTypes>) => {
 *      const payload = action.payload
 *
 *      switch (action.type) {
 *         case 'UPDATE_TITLE': {
 *           return {
 *               title: payload.title
 *           }
 *         }
 *      }
 *    }
 *
 *    // Create store
 *    const Store = createStore(reducer, { title: "Untitled" })
 *
 *    // Use store
 *    const title = useStore(Store, state => state.title)
 * ```
 */

export const createStore = <T extends State, A>(
  reducer: Reducer<T, A>,
  initialState: T,
): Store<T, A> => {
  const reducerName = reducer.name;
  const storeNameSuffix = "reducer";
  const storeKey = reducerName.toLowerCase().includes(storeNameSuffix)
    ? reducerName.split(storeNameSuffix)[0]
    : reducerName;

  let state = initialState;
  const listeners = new Set<Listener<T>>();

  // Initialize the global history for this store key if it doesn't exist
  if (!globalStoreHistoryRaw.stores[storeKey]) {
    globalStoreHistoryRaw.stores[storeKey] = [];
  }

  /** @get Get current state */
  const getState = () => state;

  /** @update Dispatch state */
  //  # ---------------------------------------------------------------#
  //  # NOTE: Sometimes we need to update data but don't want UI components to re-render. So, I added
  //  # the `notifyListeners` param here to support that. A use-case for this behavior is when
  //  # we change the `src` of an image from a data URL to a traditional URL that represents
  //  # the same image, UI components should not need to re-render the image which will make
  //  # the image flashing unnecessary.                  #
  //  # ---------------------------------------------------------------#
  const dispatch = (
    action: A,
    notifyListeners: boolean = true,
    skipTrace: boolean = false,
  ) => {
    const newState = reducer(state, action);

    // Capture the raw call stack and clean it up
    const rawStackTrace = new Error().stack || "";
    const cleanTrace = cleanStackTrace(rawStackTrace);

    if (!skipTrace) {
      trace(action, newState, cleanTrace);
    }
    // End capture tracer

    state = newState;

    if (notifyListeners) {
      listeners.forEach((listener) => listener(state));
    }
  };

  /** @reset Reset state to initial state */
  const resetState = () => {
    state = initialState;
  };

  /** @subscribe Subscribe store to global */
  const subscribe = (listener: Listener<T>) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  /** @trace Tracer function to log actions and state changes in global history */
  const trace = (action: A, newState: T, stackTrace: string[]) => {
    if (tracingEnabled) {
      const fromState = getState();
      const tracer = {
        action,
        fromState,
        toState: newState,
        diff: differencesObject(fromState, newState),
        stackTrace, // Added stack trace to the tracer
      };

      // Save step in global history
      globalStoreHistoryRaw.histories.push(tracer);
      globalStoreHistoryRaw.stores[storeKey].push(tracer);
    }
  };

  // Enable tracing instance store
  const enableTracing = (enabled: boolean) => {
    tracingEnabled = enabled;
  };

  // Get history state mutation instance store
  const getHistory = () => globalStoreHistoryRaw.stores[storeKey];

  return {
    getState,
    dispatch,
    subscribe,
    resetState,
    enableTracing,
    getHistory,
  };
};

export const useStore = <T extends State, A, U>(
  store: Store<T, A>,
  selector: Selector<T, U>,
): U => {
  const externalStore = useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(store.getState()),
  );

  return externalStore;
};

/**
 * DEBUGGER FOR EXTERNAL STORE
 * @description Like other softwares, libraries or mechanisms, a debugger is an essential implementation
 * for keeping these safe, sustained and scalable. And external-store is not an exception.
 *
 * @see
 * We can easily get insight the histories of each store and even total stores
 * globalStoreHistory = {
 *    histories: Array // This histories is total stores added step-by-step
 *    stores: {
 *       [key: string]: Array // Histories for specific store
 *    }
 * }
 *
 * @example
 * For getting visual or insight about histories update state. There are two ways to obtain.
 * 1. For global stores (all stores are being subscribed)
 *   1. On console: window.globalStoreHistory
 *   2. It will alert that we need to enable tracingEnabled variable first,
 *      and at this time, your store mutation starts tracking
 *
 * 2. For specific instance store
 *   1. We modify the store module: Store.enableTracing()
 *   2. On console: window.globalStoreHistory
 */
if (typeof window !== "undefined") {
  // Set up Proxy for globalStoreHistory
  window.globalStoreHistory = new Proxy(globalStoreHistoryRaw, {
    get(target, prop: string | symbol) {
      if (!tracingEnabled) {
        console.log(
          "Enable tracing by setting 'window.tracingEnabled = true' first.",
        );
      }
      return target[prop as keyof GlobalStoreHistory]; // Access the property safely
    },
    set(target, prop: string | symbol, value) {
      target[prop as keyof GlobalStoreHistory] = value;
      return true;
    },
  });

  // Expose tracing control to window
  Object.defineProperty(window, "tracingEnabled", {
    get() {
      return tracingEnabled;
    },
    set(value) {
      tracingEnabled = value;
      console.log(`Tracing is now ${value ? "enabled" : "disabled"}`);
    },
  });
}
