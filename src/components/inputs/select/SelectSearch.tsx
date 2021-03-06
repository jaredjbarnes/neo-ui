import React, { useCallback } from "react";
import { createUseStyles } from "react-jss";
import { TextInput } from "../TextInput";
import Search from "@material-ui/icons/Search";
import { useSelectMediator } from "../../../providers/select/SelectProvider";
import { useValue } from "../../../utils/hooks/useValue";
import { joinClassNames } from "../../../utils/joinClassNames";

const useStyles = createUseStyles({
  searchContainer: {
    display: "inline-grid",
    gridTemplateColumns: "auto 30px",
    height: "35px",
  },
  iconContainer: {
    display: "flex",
    gridColumnStart: 2,
    gridColumnEnd: 2,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  inputContainer: {
    display: "flex",
    gridColumnStart: 1,
    gridColumnEnd: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchIcon: {
    color: "rgba(100, 110, 140, 0.8)",
  },
  input: {
    width: "100%",
  },
});

export interface Props {
  style?: React.CSSProperties;
  className?: string;
}

export function SelectSearch({ style, className }: Props) {
  const classes = useStyles();
  const selectMediator = useSelectMediator();
  const keywords = useValue(selectMediator.filterKeywords);

  const inputRef = useCallback((element) => {
    if (element != null) {
      element.focus();
    }
  }, []);

  const onValueChange = (value: string) => {
    selectMediator.filter(value);
  };

  return (
    <div
      style={style}
      className={joinClassNames(classes.searchContainer, className)}
    >
      <div className={classes.inputContainer}>
        <TextInput
          value={keywords}
          onValueChange={onValueChange}
          inputRef={inputRef}
          className={classes.input}
        />
      </div>
      <div className={classes.iconContainer}>
        <Search className={classes.searchIcon} />
      </div>
    </div>
  );
}
