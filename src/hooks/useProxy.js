import * as React from "react";
import useInstance from "./useInstance";
import createNestedProxy from "../utils/createNestedProxy";

export default function useProxy(stateObject) {
  const [, rerender] = React.useReducer(() => []);

  const proxyHandlers = React.useMemo(
    () => ({
      get: function (target, prop, receiver) {
        return Reflect.get(target, prop, receiver);
      },
      set: function (target, prop, value) {
        console.log(target, prop, value);
        // If the new value added to the proxy state is a object
        // make that a proxy too, so mutations on it trigger rerender.
        const newValue =
          typeof value === "object" && value !== null
            ? createNestedProxy(value, proxyHandlers)
            : value;
        // Check is value changed
        const didValueChanged = !Object.is(target[prop], value);
        // Check if its object cause even if mutated value equality check
        // for reference type will return true
        const isObjectType =
          typeof target[prop] === "object" && target[prop] !== null;
        // If its object always rerender, if not, only rerender if value changed
        if (isObjectType || didValueChanged) rerender();
        const didSet = Reflect.set(target, prop, newValue);
        return didSet;
      }
    }),
    []
  );

  const stateProxy = useInstance(() =>
    createNestedProxy(stateObject, proxyHandlers)
  );

  return stateProxy;
}
