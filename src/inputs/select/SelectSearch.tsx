import React, { useCallback } from "react";
import styled from "styled-components";
import TextInput from "../TextInput";
import Search from "@material-ui/icons/Search";
import {
  useSelectMediator,
  useFilterKeywords,
} from "../../mediators/select/hooks";

const SearchContainer = styled.div`
  display: inline-grid;
  grid-template-columns: auto 30px;
  height: 35px;
`;

const IconContainer = styled.div`
  display: flex;
  grid-column-start: 2;
  grid-column-end: 2;
  align-items: center;
  justify-content: flex-end;
`;

const InputContainer = styled.div`
  display: flex;
  grid-column-start: 1;
  grid-column-end: 1;
  align-items: center;
  justify-content: center;
`;

const SearchIcon = styled(Search)`
  color: rgba(100, 110, 140, 0.8);
`;

const StyledInput = styled(TextInput)`
  width: 100%;
`;

export interface Props {
  style?: React.CSSProperties;
  className?: string;
}

const SelectSearch = ({ style, className }: Props) => {
  const selectMediator = useSelectMediator();
  const keywords = useFilterKeywords();

  const inputRef = useCallback((element) => {
    if (element != null) {
      element.focus();
    }
  }, []);

  return (
    <SearchContainer style={style} className={className}>
      <InputContainer>
        <StyledInput inputRef={inputRef} />
      </InputContainer>
      <IconContainer>
        <SearchIcon />
      </IconContainer>
    </SearchContainer>
  );
};

export default SelectSearch;
