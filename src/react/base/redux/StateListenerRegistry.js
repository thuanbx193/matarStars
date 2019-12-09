import type { Store } from "redux";

type Listener
    = (selection: any, store: Store<*, *>, prevSelection: any) => void;

type Selector = (state: Object, prevSelection: any) => any;

type SelectorListener = {
    listener: Listener,
    selector: Selector
};

class StateListenerRegistry {
    _selectorListeners: Set<SelectorListener> = new Set();

    _listener: ({
        prevSelections: Map<SelectorListener, any>,
        store: Store<*, *>
    }) => void;

    _listener({ prevSelections, store }: {
            prevSelections: Map<SelectorListener, any>,
            store: Store<*, *>
    }) {
        for (const selectorListener of this._selectorListeners) {
            const prevSelection = prevSelections.get(selectorListener);

            try {
                const selection
                    = selectorListener.selector(
                        store.getState(),
                        prevSelection);

                if (prevSelection !== selection) {
                    prevSelections.set(selectorListener, selection);
                    selectorListener.listener(selection, store, prevSelection);
                }
            } catch (e) {
            }
        }
    }

    register(selector: Selector, listener: Listener) {
        this._selectorListeners.add({
            listener,
            selector
        });
    }

    subscribe(store: Store<*, *>) {
        if (this._selectorListeners.size) {
            store.subscribe(
                this._listener.bind(
                    this,
                    {
                        prevSelections: new Map(),
                        store
                    }));
        }
    }
}

export default new StateListenerRegistry();