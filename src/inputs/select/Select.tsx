import React, { useRef } from "react";
import { Option } from "../../mediators/select/SelectMediator";
import SelectProvider from "../../mediators/select/SelectProvider";
import SelectOptions from "./SelectOptions";
import SelectButton from "./SelectButton";
import useForkRef from "../../core/hooks/useForkRef";
import { createUseStyles } from "react-jss";
import joinClassNames from "../../utils/joinClassNames";

const useStyles = createUseStyles({
  button: {
    width: "100%",
  },
  container: {
    width: "200px",
    height: "35px",
  },
});

export interface Props<T> {
  options: Option<T>[];
  value?: T | null;
  selectRef?: React.Ref<HTMLDivElement>;
  className?: string;
  style?: React.CSSProperties;
  dropDownWidth?: number;
  dropDownHeight?: number;
}

function Select<T>({
  options,
  selectRef,
  style,
  className,
  dropDownWidth,
  dropDownHeight,
  value,
}: Props<T>) {
  const classes = useStyles();
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const ref = useForkRef(selectRef, buttonRef);
  let selectedOption = null;

  if (Array.isArray(options)) {
    selectedOption = options.find((o) => o.value === value) || null;
  }

  return (
    <SelectProvider<T>
      options={options}
      selectedOption={selectedOption}
      dropDownWidth={dropDownWidth}
      dropDownHeight={dropDownHeight}
    >
      <div
        style={style}
        className={joinClassNames(classes.container, className)}
      >
        <SelectButton innerRef={ref} className={classes.button}></SelectButton>
        <SelectOptions anchorRef={buttonRef}></SelectOptions>
      </div>
    </SelectProvider>
  );
}

export default Select;
