export default function createNestedProxy(objectToProxy, proxyHandlers) {
  // If its array  make a proxy with the mapped array
  // if theres are any objects inside we want to proxy those too recursively.
  if (Array.isArray(objectToProxy))
    return new Proxy(
      objectToProxy.map((arrayItem) => {
        if (typeof arrayItem === "object" && arrayItem !== null)
          return createNestedProxy(arrayItem, proxyHandlers);
        return arrayItem;
      }),
      proxyHandlers
    );
  // If its an object we make a proxy from it and we map the
  // object making sure to proxy any nested objects recursively.
  return new Proxy(
    Object.entries(objectToProxy).reduce((finalProxy, [property, value]) => {
      if (typeof value === "object" && value !== null) {
        return {
          ...finalProxy,
          [property]: createNestedProxy(value, proxyHandlers)
        };
      }
      return {
        ...finalProxy,
        [property]: value
      };
    }, {}),
    proxyHandlers
  );
}
