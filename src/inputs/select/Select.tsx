import React, { useRef } from "react";
import { Option } from "../../mediators/select/SelectMediator";
import SelectProvider from "../../mediators/select/SelectProvider";
import SelectOptions from "./SelectOptions";
import SelectButton from "./SelectButton";
import styled from "styled-components";
import useForkRef from "../../core/hooks/useForkRef";

const StyledButton = styled(SelectButton)`
  width: 100%;
`;

const SelectContainer = styled.div`
  width: 200px;
  height: 35px;
`;

export interface Props<T> {
  options: Option<T>[];
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
}: Props<T>) {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const ref = useForkRef(selectRef, buttonRef);
  const selectedOption = options.find((o) => o.isSelected) || null;

  return (
    <SelectProvider<T>
      options={options}
      selectedOption={selectedOption}
      dropDownWidth={dropDownWidth}
      dropDownHeight={dropDownHeight}
    >
      <SelectContainer style={style} className={className}>
        <StyledButton innerRef={ref}></StyledButton>
        <SelectOptions anchorRef={buttonRef}></SelectOptions>
      </SelectContainer>
    </SelectProvider>
  );
}

export default Select;
