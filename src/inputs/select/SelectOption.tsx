import React, { useRef, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { Option } from "../../mediators/select/SelectMediator";
import {
  useSelectedOption,
  useSelectMediator,
  useHighlightedOption,
} from "../../mediators/select/hooks";

const useStyles = createUseStyles({
  selectRow: {
    position: "relative",
    height: "40px",
    minWidth: "100%",
    borderBottom: "2px ridge rgba(255, 255, 255, 0.35)",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    cursor: "pointer",
    userSelect: "none",
    overflow: "hidden",
    lineHeight: "40px",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    color: "rgba(100, 110, 140, 0.8)",
    boxSizing: "border-box",
    fontFamily: "Verdana, Geneva, sans-serif",
    fontSize: "14px",
    padding: "0px 8px",
    "&:hover": {
      backgroundColor: "rgba(30, 167, 253, 0.6)",
      color: "rgba(255, 255, 255, 0.9)",
    },
  },
});

export interface Props {
  option: Option<any>;
}

const SelectOption = ({ option }: Props) => {
  const classes = useStyles();
  const optionRef = useRef<HTMLDivElement | null>(null);
  const selectedOption = useSelectedOption();
  const highlightedOption = useHighlightedOption();
  const selectMediator = useSelectMediator();
  const isHighlighted =
    highlightedOption != null && highlightedOption.id === option.id;
  const isSelected = selectedOption != null && selectedOption.id === option.id;

  useEffect(() => {
    if (isHighlighted && optionRef.current != null) {
      const optionElement = optionRef.current;
      const parentElement = optionElement.parentElement;

      if (parentElement) {
        const elementRect = optionElement.getBoundingClientRect();
        const parentRect = parentElement.getBoundingClientRect();

        const top = Math.max(elementRect.top, parentRect.top);
        const bottom = Math.min(elementRect.bottom, parentRect.bottom);

        if (top > bottom || bottom - top < elementRect.height) {
          if (elementRect.top < parentRect.top) {
            const offset = elementRect.top - parentRect.top;
            const scrollOffset = parentElement.scrollTop;
            parentElement.scrollTop = scrollOffset + offset;
          } else {
            const offset = elementRect.bottom - parentRect.bottom;
            const scrollOffset = parentElement.scrollTop;
            parentElement.scrollTop = scrollOffset + offset;
          }
        }
      }
    }
  }, [isHighlighted]);

  const style: React.CSSProperties = {};

  const selectOption = () => {
    selectMediator.selectOption(option);
    selectMediator.close();
  };

  if (isHighlighted) {
    style.backgroundColor = "rgba(30, 167, 253, 0.9)";
    style.color = "rgba(255, 255, 255, 0.9)";
  }

  return (
    <div
      ref={optionRef}
      onClick={selectOption}
      className={classes.selectRow}
      style={style}
    >
      {option.label}
    </div>
  );
};

export default SelectOption;
