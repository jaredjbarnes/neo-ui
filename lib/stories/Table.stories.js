"use strict";

require("core-js/modules/es.array.sort");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.includes");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiggingTableBaseline = DiggingTableBaseline;
exports.DiggingTableWithoutActions = DiggingTableWithoutActions;
exports.TableWithoutActions = TableWithoutActions;
exports.DataScroller = DataScroller;
exports.Header = Header;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _DiggingTable = require("../layouts/table/DiggingTable");

var _Table = require("../layouts/table/Table");

var _StoryBackdrop = _interopRequireDefault(require("./StoryBackdrop"));

var _TableDataScroller = _interopRequireDefault(require("../layouts/table/TableDataScroller"));

var _TableHeader = _interopRequireDefault(require("../layouts/table/TableHeader"));

var _TableProvider = _interopRequireDefault(require("../mediators/table/TableProvider"));

var _delayAsync = _interopRequireDefault(require("../utils/delayAsync"));

var _Surface = _interopRequireDefault(require("../core/Surface"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _default = {
  title: "Table",
  component: _DiggingTable.DiggingTable,
  argTypes: {}
};
exports.default = _default;
console.log(process.env.NODE_ENV);

class Person {}

const columns = [{
  label: "First Name",
  name: "firstName",
  width: 100,
  canSort: true,
  alignment: "center"
}, {
  label: "Last Name",
  name: "lastName",
  width: 100,
  canSort: true,
  alignment: "left"
}, {
  label: "Age",
  name: "age",
  width: 50,
  canSort: true,
  alignment: "center"
}];
const firstNames = ["Justin", "Jared", "Jeff", "Jocelyn", "Jaelyn", "Jerika"];
const lastNames = ["Barnes", "Lovell", "Bulloch", "Kaffenberger"];

const getRandomFirstName = () => {
  return firstNames[Math.floor(Math.random() * firstNames.length)];
};

const getRandomLastName = () => {
  return lastNames[Math.floor(Math.random() * lastNames.length)];
};

const createPeople = amount => {
  const people = [];

  for (let x = 0; x < amount; x++) {
    const person = new Person();
    person.id = x;
    person.firstName = getRandomFirstName();
    person.lastName = getRandomLastName();
    person.age = Math.round(Math.random() * 100);
    people.push(person);
  }

  return people;
};

function convertToRows(data) {
  const rows = [];

  for (let x = 0; x < data.length; x++) {
    const item = data[x];
    const cells = Object.keys(item).map(key => {
      return {
        name: key,
        value: item[key]
      };
    });
    const row = {
      id: item.id.toString() || x.toString(),
      value: item,
      cells
    };
    rows.push(row);
  }

  return rows;
}

function onLoadGenerator(data, columns, maxLatency) {
  return (_ref) => {
    let {
      rows,
      query,
      sorting: sorts
    } = _ref;
    let results;
    let isLast = false;
    let pageSize = 10;
    const filteredResults = data.filter(item => {
      return columns.some(column => {
        if (typeof item[column.name] === "string" || typeof item[column.name] === "number" || typeof item[column.name] === "boolean") {
          return item[column.name].toString().toLowerCase().includes(query.toLowerCase());
        }

        return false;
      });
    });
    filteredResults.sort((itemA, itemB) => {
      let score = 0;
      sorts.every(sort => {
        const propertyName = sort.name;
        const direction = sort.direction === "ASC" ? 1 : -1;

        if (itemA[propertyName] < itemB[propertyName]) {
          score = -1 * direction;
          return false;
        } else if (itemA[propertyName] > itemB[propertyName]) {
          score = 1 * direction;
          return false;
        } else {
          return true;
        }
      });
      return score;
    });
    results = filteredResults.slice(rows.length, rows.length + pageSize);
    isLast = results.length + rows.length >= filteredResults.length;

    if (maxLatency === 0) {
      return Promise.resolve({
        data: convertToRows(results),
        isLast: isLast
      });
    } else {
      return (0, _delayAsync.default)(Math.floor(Math.random() * maxLatency), {
        data: convertToRows(results),
        isLast: isLast
      });
    }
  };
}

function DiggingTableBaseline(props) {
  const people = createPeople(30);
  const onLoad = onLoadGenerator(people, columns, 1000);
  const actions = [{
    name: "add",
    label: "Add",
    isPrimary: true,
    canAct: () => true,
    handler: table => {
      return Promise.resolve(undefined);
    }
  }, {
    name: "edit",
    label: "Edit",
    isPrimary: false,
    canAct: () => true,
    handler: () => {
      return Promise.resolve(undefined);
    }
  }, {
    name: "delete",
    label: "Delete",
    isPrimary: false,
    canAct: () => true,
    handler: table => {
      return Promise.resolve(undefined);
    }
  }];
  return /*#__PURE__*/_react.default.createElement(_StoryBackdrop.default, null, /*#__PURE__*/_react.default.createElement(_Surface.default, {
    style: {
      borderRadius: "20px",
      padding: "30px"
    },
    mode: "popOut",
    raisedOffset: 5
  }, /*#__PURE__*/_react.default.createElement(_DiggingTable.DiggingTable, {
    columns: columns,
    onLoad: onLoad,
    actions: actions,
    isSelectable: true,
    isSearchable: true,
    style: {
      width: "500px",
      height: "400px"
    },
    onRowClick: (row, table) => {
      if (table.isRowSelected(row)) {
        table.deselectRow(row);
      } else {
        table.selectRow(row);
      }
    }
  })));
}

function DiggingTableWithoutActions(props) {
  const people = createPeople(30);
  const onLoad = onLoadGenerator(people, columns, 1000);
  return /*#__PURE__*/_react.default.createElement(_StoryBackdrop.default, null, /*#__PURE__*/_react.default.createElement(_Surface.default, {
    style: {
      borderRadius: "20px",
      padding: "30px"
    },
    mode: "popOut",
    raisedOffset: 5
  }, /*#__PURE__*/_react.default.createElement(_DiggingTable.DiggingTable, _extends({}, props, {
    columns: columns,
    onLoad: onLoad,
    style: {
      width: "500px",
      height: "400px"
    },
    isSearchable: true,
    onRowClick: (row, table) => {
      if (table.isRowSelected(row)) {
        table.deselectRow(row);
      } else {
        table.selectRow(row);
      }
    }
  }))));
}

function TableWithoutActions(props) {
  const people = createPeople(90);
  const rows = convertToRows(people);
  return /*#__PURE__*/_react.default.createElement(_StoryBackdrop.default, null, /*#__PURE__*/_react.default.createElement(_Surface.default, {
    style: {
      borderRadius: "20px",
      padding: "30px"
    },
    mode: "popOut",
    raisedOffset: 5
  }, /*#__PURE__*/_react.default.createElement(_Table.Table, _extends({}, props, {
    rows: rows,
    columns: columns,
    isSelectable: true,
    isSearchable: true,
    style: {
      width: "500px",
      height: "400px"
    },
    onRowClick: (row, table) => {
      if (table.isRowSelected(row)) {
        table.deselectRow(row);
      } else {
        table.selectRow(row);
      }
    }
  }))));
}

function DataScroller(props) {
  const people = createPeople(30);
  const onLoad = onLoadGenerator(people, columns, 1000);
  return /*#__PURE__*/_react.default.createElement(_StoryBackdrop.default, null, /*#__PURE__*/_react.default.createElement(_TableProvider.default, {
    columns: columns,
    onLoad: onLoad
  }, /*#__PURE__*/_react.default.createElement(_TableDataScroller.default, {
    style: {
      width: "200px",
      height: "200px"
    }
  })));
}

function Header(props) {
  const onLoad = () => {
    return Promise.resolve({
      data: [],
      isLast: true
    });
  };

  return /*#__PURE__*/_react.default.createElement(_StoryBackdrop.default, null, /*#__PURE__*/_react.default.createElement(_TableProvider.default, {
    columns: columns,
    onLoad: onLoad
  }, /*#__PURE__*/_react.default.createElement(_TableHeader.default, null)));
}