import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import Table from "../layouts/Table";
import StoryBackdrop from "./StoryBackdrop";
import TableDataScroller from "../layouts/Table/TableDataScroller";
import TableLayout from "../layouts/Table/TableLayout";
import TableHeader, { Props } from "../layouts/Table/TableHeader";
import { Column, Response, Row } from "../mediators/table/TableMediator";
import TableProvider from "../mediators/table/TableProvider";
import AsyncAction from "../utils/AsyncAction";
import Surface from "../core/Surface";
import styled from "styled-components";
import FieldSet from "../inputs/FieldSet";
import { RequestOptions } from "../mediators/table/TableMediator";

export default {
  title: "Table",
  component: Table,
  argTypes: {},
} as Meta;

class Person {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

const columns = [
  {
    label: "First Name",
    name: "firstName",
    width: 100,
    canSort: false,
  },
  {
    label: "Last Name",
    name: "lastName",
    width: 100,
    canSort: false,
  },
  {
    label: "Age",
    name: "age",
    width: 50,
    canSort: false,
  },
] as Column[];

const firstNames = ["Justin", "Jared", "Jeff", "Jocelyn", "Jaelyn", "Jerika"];
const lastNames = ["Barnes", "Lovell", "Bulloch"];

const getRandomFirstName = () => {
  return firstNames[Math.floor(Math.random() * firstNames.length)];
};

const getRandomLastName = () => {
  return lastNames[Math.floor(Math.random() * lastNames.length)];
};

const createRows = (amount: number) => {
  const people: Row<Person>[] = [];

  for (let x = 0; x < amount; x++) {
    const person = new Person();
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

export function Header(props: Props) {
  const onLoad = () => {
    return AsyncAction.resolve<Response<Person>>({
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

export function DataScroller(props: Props) {
  const onLoad = () => {
    return AsyncAction.resolve<Response<Person>>({
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

export function BaseTableLayout(props: Props) {
  const data = createRows(30);

  const onLoad = ({ keywords, sorts }: RequestOptions<Person>) => {
    const results = data.filter(
      (r) =>
        r.value.firstName.includes(keywords) ||
        r.value.lastName.includes(keywords)
    );

    results.sort((rowA, rowB) => {
      let score = 0;
      const personA = rowA.value;
      const personB = rowB.value;

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

    return AsyncAction.resolve<Response<Person>>({
      data: results,
      isLast: true,
    });
  };

  return (
    <StoryBackdrop>
      <FieldSet name="My Table">
        <TableProvider columns={columns} onLoad={onLoad}>
          <TableLayout style={{ width: "500px", height: "400px" }} />
        </TableProvider>
      </FieldSet>
    </StoryBackdrop>
  );
}
