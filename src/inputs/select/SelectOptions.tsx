import React from "react";
import {
  useDropDownWidth,
  useDropDownHeight,
  useOptions,
  useIsOpen,
  useSelectMediator,
} from "../../mediators/select/hooks";
import Surface from "../../core/Surface";
import Popover from "../../core/popover/Popover";
import { createUseStyles } from "react-jss";
import { IAnchorPlacement } from "../../core/popover/PopoverMediator";
import ClickAwayListener from "../../core/ClickAwayListener";
import SelectSearch from "./SelectSearch";
import joinClassNames from "../../utils/joinClassNames";

const useStyles = createUseStyles({
  selectOptions: {
    display: "grid",
    gridTemplateRows: "8px 35px 8px auto 8px",
    gridTemplateColumns: "8px auto 8px",
    height: "200px",
    borderRadius: "8px",
  },
  search: {
    width: "100%",
    gridRowStart: 2,
    gridRowEnd: 2,
    gridColumnStart: 2,
    gridColumnEnd: 2,
  },
  options: {
    gridRowStart: 4,
    gridRowEnd: 4,
    gridColumnStart: 2,
    gridColumnEnd: 2,
    width: "100%",
    height: "100%",
    borderRadius: "4px",
  },
});

export interface Props {
  anchorRef:
    | React.RefObject<HTMLDivElement>
    | React.MutableRefObject<HTMLDivElement>;
}

function SelectOptions<T>({ anchorRef }: Props) {
  const classes = useStyles();
  const open = useIsOpen();
  const options = useOptions();
  const selectMediator = useSelectMediator();
  const dropDownWidth = useDropDownWidth();
  const dropDownHeight = useDropDownHeight();

  const placement = {
    vertical: "bottom",
    horizontal: "left",
  } as IAnchorPlacement;

  const close = () => {
    selectMediator.close();
  };

  const style = {
    width: `${dropDownWidth}px`,
    height: `${dropDownHeight}px`,
  };

  return (
    <Popover open={open} anchorRef={anchorRef} placement={placement}>
      <ClickAwayListener onClickAway={close}>
        <Surface
          mode="popOut"
          raisedOffset={2}
          style={style}
          className={classes.selectOptions}
        >
          <SelectSearch className={classes.search}></SelectSearch>
          <Surface mode="cutOut" insetOffset={2} className={classes.options}>
            {options.map((o) => (
              <div>{o.label}</div>
            ))}
          </Surface>
        </Surface>
      </ClickAwayListener>
    </Popover>
  );
}

export default SelectOptions;
