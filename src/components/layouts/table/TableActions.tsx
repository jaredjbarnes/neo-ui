import React from "react";
import { SolidButton } from "../../inputs/SolidButton";
import { OutlineButton } from "../../inputs/OutlineButton";
import { useActions, useTable } from "../../../providers/table/hooks";
import { createUseStyles } from "react-jss";
import { joinClassNames } from "../../../utils/joinClassNames";

const useStyles = createUseStyles({
  actionsContainer: {
    width: "100%",
    height: "100%",
  },
  primaryButton: {
    display: "block",
    marginBottom: "10px",
  },
  secondaryButton: {
    display: "block",
    marginBottom: "10px",
  },
});

interface Props {
  style?: React.CSSProperties;
  className?: string;
}

export const TableActions = React.forwardRef<HTMLDivElement, Props>(
  ({ style, className }: Props, ref) => {
    const classes = useStyles();
    const actions = useActions();
    const table = useTable();

    return (
      <div
        ref={ref}
        style={style}
        className={joinClassNames(classes.actionsContainer, className)}
      >
        {actions.map((action, index) => {
          const onClick = () => {
            table.performActionOnSelectedRows(action.name);
          };

          if (action.isPrimary) {
            return (
              <SolidButton
                className={classes.primaryButton}
                onClick={onClick}
                key={index}
              >
                {action.label}
              </SolidButton>
            );
          } else {
            return (
              <OutlineButton
                className={classes.secondaryButton}
                onClick={onClick}
                key={index}
              >
                {action.label}
              </OutlineButton>
            );
          }
        })}
      </div>
    );
  }
);
