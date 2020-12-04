import React from "react";
import {
  useDropDownWidth,
  useDropDownHeight,
  useIsOpen,
  useSelectMediator,
} from "../../mediators/select/hooks";
import Surface from "../../core/Surface";
import Popover from "../../core/popover/Popover";
import styled from "styled-components";
import { IAnchorPlacement } from "../../core/popover/PopoverMediator";
import ClickAwayListener from "../../core/ClickAwayListener";
import SelectSearch from "./SelectSearch";

const SelectOptionsContainer = styled(Surface)`
  display: grid;
  grid-template-rows: 8px 35px 8px auto 8px;
  grid-template-columns: 8px auto 8px;
  height: 200px;
  border-radius: 8px;
`;

const Search = styled(SelectSearch)`
  width: 100%;
  grid-row-start: 2;
  grid-row-end: 2;
  grid-column-start: 2;
  grid-column-end: 2;
`;

const Options = styled(Surface)`
  grid-row-start: 4;
  grid-row-end: 4;
  grid-column-start: 2;
  grid-column-end: 2;
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;

export interface Props {
  anchorRef:
    | React.RefObject<HTMLDivElement>
    | React.MutableRefObject<HTMLDivElement>;
}

function SelectOptions<T>({ anchorRef }: Props) {
  const open = useIsOpen();
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
        <SelectOptionsContainer mode="popOut" raisedOffset={2} style={style}>
          <Search></Search>
          <Options mode="cutOut" insetOffset={2}></Options>
        </SelectOptionsContainer>
      </ClickAwayListener>
    </Popover>
  );
}

export default SelectOptions;
