import React from "react";
import styled from "styled-components";
import SolidButton from "../../inputs/SolidButton";
import OutlineButton from "../../inputs/OutlineButton";
import useActions from "../../mediators/table/hooks/useActions";
import useTable from "../../mediators/table/hooks/useTable";

const ActionsContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const PrimaryButton = styled(SolidButton)`
  display: block;
  margin-bottom: 10px;
`;

const SecondaryButton = styled(OutlineButton)`
  display: block;
  margin-bottom: 10px;
`;

interface Props {
  style?: React.CSSProperties;
  className?: string;
}

const TableActions = React.forwardRef<HTMLDivElement, Props>(
  ({ style, className }: Props, ref) => {
    const actions = useActions();
    const table = useTable();

    return (
      <ActionsContainer ref={ref} style={style} className={className}>
        {actions.map((action, index) => {
          const onClick = () => {
            table.performActionOnSelectedRows(action.name);
          };

          if (action.isPrimary) {
            return (
              <PrimaryButton onClick={onClick} key={index}>
                {action.label}
              </PrimaryButton>
            );
          } else {
            return (
              <SecondaryButton onClick={onClick} key={index}>
                {action.label}
              </SecondaryButton>
            );
          }
        })}
      </ActionsContainer>
    );
  }
);

export default TableActions;
