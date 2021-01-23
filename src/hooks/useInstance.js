import * as React from "react";

export default function useInstance(initClassIntance) {
  const [instanceRef] = React.useState(initClassIntance);
  return instanceRef;
}
