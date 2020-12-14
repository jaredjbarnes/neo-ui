"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Baseline = Baseline;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _TextField = _interopRequireDefault(require("../inputs/TextField"));

var _SwitchField = _interopRequireDefault(require("../inputs/SwitchField"));

var _OutlineButton = _interopRequireDefault(require("../inputs/OutlineButton"));

var _StoryBackdrop = _interopRequireDefault(require("./StoryBackdrop"));

var _Surface = _interopRequireDefault(require("../core/Surface"));

var _Handle = _interopRequireDefault(require("../layouts/window/Handle"));

var _Select = _interopRequireDefault(require("../inputs/select/Select"));

var _reactJss = require("react-jss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useStyles = (0, _reactJss.createUseStyles)({
  windowHandle: {
    gridColumnStart: 1,
    gridColumnEnd: 1,
    gridRowStart: 1,
    gridRowEnd: 1
  },
  windowBody: {
    gridColumnStart: 1,
    gridColumnEnd: 1,
    gridRowStart: 2,
    gridRowEnd: 2,
    borderBottomRightRadius: "6px",
    borderBottomLeftRadius: "6px",
    overflow: "hidden"
  },
  window: {
    display: "grid",
    gridTemplateColumns: "100%",
    gridTemplateRows: "35px auto",
    width: "500px",
    padding: "0px",
    margin: "0px",
    height: "248px",
    borderRadius: "6px",
    boxSizing: "border-box"
  },
  form: {
    display: "grid",
    width: "100%",
    padding: "16px",
    gridRowGap: "16px",
    boxSizing: "border-box",
    gridTemplateColumns: "50% 50%",
    gridRemplateRows: "59px 35px 50px"
  },
  firstNameField: {
    gridColumnStart: 1,
    gridColumnEnd: 1,
    gridRowStart: 1,
    gridRowEnd: 1,
    width: "90%"
  },
  lastNameField: {
    gridColumnStart: 2,
    gridColumnEnd: 2,
    gridRowStart: 1,
    gridRowEnd: 1,
    width: "90%",
    justifySelf: "end"
  },
  isMarriedField: {
    gridColumnStart: 1,
    gridColumnEnd: 1,
    gridRowStart: 2,
    gridRowEnd: 2,
    width: "90%"
  },
  selectField: {
    gridColumnStart: 2,
    gridColumnEnd: 2,
    gridRowStart: 2,
    gridRowEnd: 2,
    width: "90%",
    justifySelf: "end"
  },
  saveButton: {
    gridColumnStart: 2,
    gridColumnEnd: 2,
    gridRowStart: 3,
    gridRowEnd: 3,
    justifySelf: "end",
    alignSelf: "end"
  }
});
var _default = {
  title: "Form"
};
exports.default = _default;

function Baseline() {
  const classes = useStyles();
  const options = [{
    id: "1",
    label: "First Option",
    value: "1"
  }, {
    id: "2",
    label: "Second Option",
    value: "2"
  }, {
    id: "3",
    label: "Third Option",
    value: "3"
  }, {
    id: "4",
    label: "Fourth Option",
    value: "4"
  }, {
    id: "5",
    label: "Fifth Option",
    value: "5"
  }, {
    id: "6",
    label: "Sixth Option",
    value: "6"
  }, {
    id: "7",
    label: "Seventh Option",
    value: "7"
  }];
  return /*#__PURE__*/_react.default.createElement(_StoryBackdrop.default, null, /*#__PURE__*/_react.default.createElement(_Surface.default, {
    className: classes.window,
    mode: "popOut",
    raisedOffset: 5,
    raisedSpread: 25
  }, /*#__PURE__*/_react.default.createElement(_Handle.default, {
    className: classes.windowHandle,
    name: "Person"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.windowBody
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.form
  }, /*#__PURE__*/_react.default.createElement(_TextField.default, {
    className: classes.firstNameField,
    name: "First Name"
  }), /*#__PURE__*/_react.default.createElement(_TextField.default, {
    className: classes.lastNameField,
    name: "Last Name"
  }), /*#__PURE__*/_react.default.createElement(_SwitchField.default, {
    className: classes.isMarriedField,
    name: "Married"
  }), /*#__PURE__*/_react.default.createElement(_Select.default, {
    value: null,
    className: classes.selectField,
    options: options
  }), /*#__PURE__*/_react.default.createElement(_OutlineButton.default, {
    className: classes.saveButton
  }, "Save")))));
}