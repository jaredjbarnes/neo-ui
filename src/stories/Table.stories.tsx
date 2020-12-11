import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import Table from "../layouts/table";
import StoryBackdrop from "./StoryBackdrop";
import TableDataScroller from "../layouts/table/TableDataScroller";
import TableLayout from "../layouts/table/TableLayout";
import TableHeader, { Props } from "../layouts/table/TableHeader";
import TableMediator, {
  Column,
  Response,
  Row,
} from "../mediators/table/TableMediator";
import TableProvider from "../mediators/table/TableProvider";
import { RequestOptions, Action } from "../mediators/table/TableMediator";
import delayAsync from "../utils/delayAsync";
import Surface from "../core/Surface";

export default {
  title: "Table",
  component: Table,
  argTypes: {},
} as Meta;

class Person {
  id!: number;
  firstName!: string;
  lastName!: string;
  age!: number;
}

const columns = [
  {
    label: "First Name",
    name: "firstName",
    width: 100,
    canSort: true,
    alignment: "center",
  },
  {
    label: "Last Name",
    name: "lastName",
    width: 100,
    canSort: true,
    alignment: "left",
  },
  {
    label: "Age",
    name: "age",
    width: 50,
    canSort: true,
    alignment: "center",
  },
] as Column[];

const firstNames = ["Justin", "Jared", "Jeff", "Jocelyn", "Jaelyn", "Jerika"];
const lastNames = ["Barnes", "Lovell", "Bulloch", "Kaffenberger"];

const getRandomFirstName = () => {
  return firstNames[Math.floor(Math.random() * firstNames.length)];
};

const getRandomLastName = () => {
  return lastNames[Math.floor(Math.random() * lastNames.length)];
};

const createPeople = (amount: number) => {
  const people: Person[] = [];

  for (let x = 0; x < amount; x++) {
    const person: any = new Person();
    person.id = x;
    person.firstName = getRandomFirstName();
    person.lastName = getRandomLastName();
    person.age = Math.round(Math.random() * 100);

    people.push(person);
  }
  return people;
};

function convertToRows<T>(data: T[]) {
  const rows: Row<T>[] = [];

  for (let x = 0; x < data.length; x++) {
    const item: any = data[x];
    const cells = Object.keys(item).map((key) => {
      return {
        name: key,
        value: item[key],
      };
    });

    const row = {
      id: item.id.toString() || x.toString(),
      value: item,
      cells,
    } as Row<T>;

    rows.push(row);
  }

  return rows;
}

function onLoadGenerator<T>(data: T[], columns: Column[], maxLatency: number) {
  return ({ rows, query, sorting: sorts }: RequestOptions<T>) => {
    let results;
    let isLast = false;
    let pageSize = 10;

    const filteredResults = data.filter((item: any) => {
      return columns.some((column) => {
        if (
          typeof item[column.name] === "string" ||
          typeof item[column.name] === "number" ||
          typeof item[column.name] === "boolean"
        ) {
          return item[column.name]
            .toString()
            .toLowerCase()
            .includes(query.toLowerCase());
        }
        return false;
      });
    });

    filteredResults.sort((itemA: any, itemB: any) => {
      let score = 0;

      sorts.every((sort) => {
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
        isLast: isLast,
      });
    } else {
      return delayAsync<Response<T>>(Math.floor(Math.random() * maxLatency), {
        data: convertToRows(results),
        isLast: isLast,
      });
    }
  };
}

export function TableBaseline(props: Props) {
  const people = createPeople(30);
  const onLoad = onLoadGenerator(people, columns, 1000);

  const actions: Action<Person>[] = [
    {
      name: "add",
      label: "Add",
      isPrimary: true,
      canAct: () => true,
      handler: (table: TableMediator<Person>) => {
        return Promise.resolve(undefined);
      },
    },
    {
      name: "edit",
      label: "Edit",
      isPrimary: false,
      canAct: () => true,
      handler: () => {
        return Promise.resolve(undefined);
      },
    },
    {
      name: "delete",
      label: "Delete",
      isPrimary: false,
      canAct: () => true,
      handler: (table: TableMediator<Person>) => {
        return Promise.resolve(undefined);
      },
    },
  ];

  return (
    <StoryBackdrop>
      <Surface
        style={{ borderRadius: "20px", padding: "30px" }}
        mode="popOut"
        raisedOffset={5}
      >
        <Table
          columns={columns}
          onLoad={onLoad}
          actions={actions}
          isSelectable={true}
          style={{ width: "500px", height: "400px" }}
          onRowClick={(row, table) => {
            if (table.isRowSelected(row)) {
              table.deselectRow(row);
            } else {
              table.selectRow(row);
            }
          }}
        />
      </Surface>
    </StoryBackdrop>
  );
}

export function TableWithoutActions(props: Props) {
  const people = createPeople(30);
  const onLoad = onLoadGenerator(people, columns, 1000);

  return (
    <StoryBackdrop>
      <Surface
        style={{ borderRadius: "20px", padding: "30px" }}
        mode="popOut"
        raisedOffset={5}
      >
        <TableProvider columns={columns} onLoad={onLoad}>
          <Table
            columns={columns}
            onLoad={onLoad}
            style={{ width: "500px", height: "400px" }}
            onRowClick={(row, table) => {
              if (table.isRowSelected(row)) {
                table.deselectRow(row);
              } else {
                table.selectRow(row);
              }
            }}
          />
        </TableProvider>
      </Surface>
    </StoryBackdrop>
  );
}

export function DataScroller(props: Props) {
  const people = createPeople(30);
  const onLoad = onLoadGenerator(people, columns, 1000);

  return (
    <StoryBackdrop>
      <TableProvider columns={columns} onLoad={onLoad}>
        <TableDataScroller style={{ width: "200px", height: "200px" }} />
      </TableProvider>
    </StoryBackdrop>
  );
}

export function Header(props: Props) {
  const onLoad = () => {
    return Promise.resolve<Response<Person>>({
      data: [],
      isLast: true,
    });
  };

  return (
    <StoryBackdrop>
      <TableProvider columns={columns} onLoad={onLoad}>
        <TableHeader />
      </TableProvider>
    </StoryBackdrop>
  );
}
