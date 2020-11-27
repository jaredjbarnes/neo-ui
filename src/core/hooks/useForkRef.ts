import React from "react";

function useForkRef<T> (...args: React.Ref<T>[]) {
  return (obj: any | null) => {
    args.forEach((ref) => {
      if (typeof ref === "function") {
        ref(obj);
      } else if (
        typeof ref === "object" &&
        ref != null &&
        ref.hasOwnProperty("current")
      ) {
        (ref as any).current = obj;
      }
    });
  };
};

export default useForkRef;
