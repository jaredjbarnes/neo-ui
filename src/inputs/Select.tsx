import React from "react";
import Surface from "../core/Surface";

export interface SelectProps<T> {
  value: T;
  innerRef:
    | ((instance: HTMLDivElement | null) => void)
    | React.MutableRefObject<HTMLDivElement | null>
    | null;
}

export default function Select<T>({ value }: SelectProps<T>) {
  return null;
}
