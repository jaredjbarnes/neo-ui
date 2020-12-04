import React, { useMemo, useEffect } from "react";
import SelectMediator, { Option } from "./SelectMediator";

const defaultSelectMediator = new SelectMediator<any>();
export const SelectContext = React.createContext(defaultSelectMediator);

interface Props<T> {
  selectedOption: Option<T> | null;
  options: Option<T>[];
  children?: React.ReactNode | React.ReactNode[];
  dropDownWidth?: number;
  dropDownHeight?: number;
}

function SelectProvider<T>({
  children,
  dropDownHeight,
  dropDownWidth,
  selectedOption,
  options,
}: Props<T>) {
  options = Array.isArray(options) ? options : [];

  const mediator = useMemo(() => {
    return new SelectMediator<T>();
  }, []);

  useEffect(() => () => mediator.dispose(), []);

  useEffect(() => {
    if (typeof dropDownWidth === "number") {
      mediator.dropDownWidth.value = dropDownWidth;
    }
  }, [dropDownWidth]);

  useEffect(() => {
    if (typeof dropDownHeight === "number") {
      mediator.dropDownHeight.value = dropDownHeight;
    }
  }, [dropDownHeight]);

  useEffect(() => {
    if (typeof dropDownHeight === "number") {
      mediator.dropDownHeight.value = dropDownHeight;
    }
  }, [dropDownHeight]);

  useEffect(() => {
    mediator.setOptions(options);
  }, [options]);

  useEffect(() => {
    mediator.selectOption(selectedOption);
  }, [selectedOption]);

  return (
    <SelectContext.Provider value={mediator}>{children}</SelectContext.Provider>
  );
}

export default SelectProvider;
