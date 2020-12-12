import React, { useRef } from "react";
import useTable from "../../mediators/table/hooks/useTable";
import TextInput from "../../inputs/TextInput";
import Search from "@material-ui/icons/Search";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  searchContainer: {
    display: "grid",
    gridTemplateColumns: "auto 30px",
    gridColumnStart: 1,
    gridColumnEnd: 1,
    gridRowStart: 1,
    gridRowEnd: 1,
    width: "100%",
  },
  searchInput: {
    gridColumnStart: 1,
    gridColumnEnd: 1,
    gridRowStart: 1,
    gridRowEnd: 1,
    width: "100%",
  },
  searchIconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gridColumnStart: 2,
    gridColumnEnd: 2,
    gridRowStart: 1,
    gridRowEnd: 1,
    width: "100%",
  },
  searchIcon: {
    color: "rgba(100, 110, 140, 0.8)",
  },
});

export function TableSearch() {
  const classes = useStyles();
  const table = useTable();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const search = (value: string) => {
    if (inputRef.current != null) {
      table.search(value);
    }
  };

  return (
    <div className={classes.searchContainer}>
      <div className={classes.searchIconContainer}>
        <Search className={classes.searchIcon} />
      </div>
      <TextInput
        className={classes.searchInput}
        inputRef={inputRef}
        onValueChange={search}
      />
    </div>
  );
}
