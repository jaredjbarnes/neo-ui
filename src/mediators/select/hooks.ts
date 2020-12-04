import { useContext } from "react";
import { SelectContext } from "./SelectProvider";
import { Option } from "./SelectMediator";
import createStatefulSubjectHook from "../../utils/createStatefulSubjectHook";

export const useSelectMediator = () => {
  return useContext(SelectContext);
};

export const useFilteredOptions = createStatefulSubjectHook<Option<any>[]>(
  useSelectMediator,
  "filteredOptions"
);

export const useOptions = createStatefulSubjectHook<Option<any>[]>(
  useSelectMediator,
  "options"
);

export const useSelectedOption = createStatefulSubjectHook<Option<any>>(
  useSelectMediator,
  "selectedOption"
);

export const useFilterKeywords = createStatefulSubjectHook<string>(
  useSelectMediator,
  "filterKeywords"
);

export const useIsOpen = createStatefulSubjectHook<boolean>(
  useSelectMediator,
  "isOpen"
);

export const useDropDownWidth = createStatefulSubjectHook<boolean>(
  useSelectMediator,
  "dropDownWidth"
);

export const useDropDownHeight = createStatefulSubjectHook<boolean>(
  useSelectMediator,
  "dropDownHeight"
);
