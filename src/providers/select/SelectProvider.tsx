import React, { useMemo, useEffect, useContext } from "react";
import { SelectMediator, Option } from "../../mediators/select/SelectMediator";

const defaultSelectMediator = new SelectMediator<any>();

export const SelectContext = React.createContext(defaultSelectMediator);

export const useSelectMediator = () => {
  return useContext(SelectContext);
};

export interface Props<T> {
  selectedOption: Option<T> | null;
  options: Option<T>[];
  children?: React.ReactNode | React.ReactNode[];
  dropDownWidth?: number;
  dropDownHeight?: number;
}

export function SelectProvider<T>({
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
      mediator.dropDownWidth.setValue(dropDownWidth);
    }
  }, [dropDownWidth]);

  useEffect(() => {
    if (typeof dropDownHeight === "number") {
      mediator.dropDownHeight.setValue(dropDownHeight);
    }
  }, [dropDownHeight]);

  useEffect(() => {
    if (typeof dropDownHeight === "number") {
      mediator.dropDownHeight.setValue(dropDownHeight);
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
