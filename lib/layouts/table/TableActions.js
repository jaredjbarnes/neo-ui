"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _SolidButton = _interopRequireDefault(require("../../inputs/SolidButton"));

var _OutlineButton = _interopRequireDefault(require("../../inputs/OutlineButton"));

var _useActions = _interopRequireDefault(require("../../mediators/table/hooks/useActions"));

var _useTable = _interopRequireDefault(require("../../mediators/table/hooks/useTable"));

var _reactJss = require("react-jss");

var _joinClassNames = _interopRequireDefault(require("../../utils/joinClassNames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useStyles = (0, _reactJss.createUseStyles)({
  actionsContainer: {
    width: "100%",
    height: "100%"
  },
  primaryButton: {
    display: "block",
    marginBottom: "10px"
  },
  secondaryButton: {
    display: "block",
    marginBottom: "10px"
  }
});

const TableActions = /*#__PURE__*/_react.default.forwardRef((_ref, ref) => {
  let {
    style,
    className
  } = _ref;
  const classes = useStyles();
  const actions = (0, _useActions.default)();
  const table = (0, _useTable.default)();
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: ref,
    style: style,
    className: (0, _joinClassNames.default)(classes.actionsContainer, className)
  }, actions.map((action, index) => {
    const onClick = () => {
      table.performActionOnSelectedRows(action.name);
    };

    if (action.isPrimary) {
      return /*#__PURE__*/_react.default.createElement(_SolidButton.default, {
        className: classes.primaryButton,
        onClick: onClick,
        key: index
      }, action.label);
    } else {
      return /*#__PURE__*/_react.default.createElement(_OutlineButton.default, {
        className: classes.secondaryButton,
        onClick: onClick,
        key: index
      }, action.label);
    }
  }));
});

var _default = TableActions;
exports.default = _default;