"use strict";

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _useTable = _interopRequireDefault(require("./useTable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useIsRowSelected = row => {
  const table = (0, _useTable.default)();
  const [isSelected, setIsSelected] = (0, _react.useState)(table.isRowSelected(row));
  const subscription = (0, _react.useMemo)(() => {
    return table.selectedRows.onChange(() => {
      setIsSelected(table.isRowSelected(row));
    });
  }, [table]);
  (0, _react.useEffect)(() => () => subscription.unsubscribe(), [subscription]);
  return isSelected;
};

var _default = useIsRowSelected;
exports.default = _default;