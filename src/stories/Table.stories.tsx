import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import Table from "../layouts/Table";
import StoryBackdrop from "./StoryBackdrop";
import TableDataScroller from "../layouts/Table/TableDataScroller";
import TableLayout from "../layouts/Table/TableLayout";
import TableHeader, { Props } from "../layouts/Table/TableHeader";
import { Column, Response, Row } from "../mediators/table/TableMediator";
import TableProvider from "../mediators/table/TableProvider";
import FieldSet from "../inputs/FieldSet";
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
    alignment: "right",
  },
] as Column[];

const firstNames = ["Justin", "Jared", "Jeff", "Jocelyn", "Jaelyn", "Jerika"];
const lastNames = ["Barnes", "Lovell", "Bulloch", "Superlonglastname"];

const getRandomFirstName = () => {
  return firstNames[Math.floor(Math.random() * firstNames.length)];
};

const getRandomLastName = () => {
  return lastNames[Math.floor(Math.random() * lastNames.length)];
};

const actions: Action<Person>[] = [
  {
    name: "add",
    label: "Add",
    isPrimary: true,
    canActOn: () => true,
    handler: () => {
      return Promise.resolve(undefined);
    },
    shouldReloadRowsAfterAction: true,
  },
  {
    name: "edit",
    label: "Edit",
    isPrimary: false,
    canActOn: () => true,
    handler: () => {
      return Promise.resolve(undefined);
    },
    shouldReloadRowsAfterAction: false,
  },
  {
    name: "delete",
    label: "Delete",
    isPrimary: false,
    canActOn: () => true,
    handler: () => {
      return Promise.resolve(undefined);
    },
    shouldReloadRowsAfterAction: true,
  },
];

const createRows = (amount: number) => {
  const people: Row<Person>[] = [];

  for (let x = 0; x < amount; x++) {
    const person: any = new Person();
    person.id = x;
    person.firstName = getRandomFirstName();
    person.lastName = getRandomLastName();
    person.age = Math.round(Math.random() * 100);

    const cells = Object.keys(person).map((key) => {
      return {
        name: key,
        value: person[key],
      };
    });

    const row = {
      id: person.id.toString(),
      value: person,
      cells,
    } as Row<Person>;

    people.push(row);
  }

  return people;
};

export function BaseTableLayout(props: Props) {
  const data = createRows(30);

  const onLoad = ({ rows, keywords, sorts }: RequestOptions<Person>) => {
    let results;
    let isLast = false;
    let pageSize = 10;

    const filteredResults = data.filter(
      (r: Row<Person>) =>
        r.value.firstName.toLowerCase().includes(keywords.toLowerCase()) ||
        r.value.lastName.toLowerCase().includes(keywords.toLowerCase())
    );

    filteredResults.sort((rowA, rowB) => {
      let score = 0;
      const personA: any = rowA.value;
      const personB: any = rowB.value;

      sorts.every((sort) => {
        const propertyName = sort.name;
        const direction = sort.direction === "ASC" ? 1 : -1;

        if (personA[propertyName] < personB[propertyName]) {
          score = -1 * direction;
          return false;
        } else if (personA[propertyName] > personB[propertyName]) {
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

    return delayAsync<Response<Person>>(Math.floor(Math.random() * 1000), {
      data: results,
      isLast: isLast,
    });
  };

  return (
    <StoryBackdrop>
      <Surface style={{ borderRadius: "20px", padding: "30px" }} mode="popOut" raisedOffset={5}>
        <TableProvider columns={columns} onLoad={onLoad} actions={actions}>
          <TableLayout style={{ width: "500px", height: "400px" }} />
        </TableProvider>
      </Surface>
    </StoryBackdrop>
  );
}

export function DataScroller(props: Props) {
  const onLoad = () => {
    return Promise.resolve<Response<Person>>({
      data: createRows(30),
      isLast: true,
    });
  };

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
      data: createRows(30),
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
