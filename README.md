Notes:

We should only use raised surfaces to indicate they are interactable. We should use paper surfaces to create boundaries for scrollable content. Maybe use value to provide depth to the papers surfaces. So it appears to be further in.

Dividers would be beveled

Edges of Paper surfaces shouldn't be rounded unless all sides of the paper is visible. So surfaces that go to the edge should not be rounded.

Colored text or icons should have a halo affect to create the appearance of subsurface scattering.

We need to make a handle for popup windows. We can use ridges to signify to the user that they can drag the windows around. I think that the title would look good centered.

Boundaries can be signified with surfaces, or with ridges. These are just borders with a highlight and a shadow giving the appearance of a ridge.

We need to build Windows, Tabs, Sortable Tabs.

We need to trap tab to stay within a Window, This could be done by placing a hidden element in the window to catch the last tab and to refocus to the beginning hidden element. This will prevent unwanted tabbing to other windows.

OutlineButton
Select
Checkbox
Date / Datetime
Radio
Form Tabs
Field Layout
Legends
Dynamic Table (Lazy Loads Pages) These two table look identical.
Table (Front Loads all Data No Pages)
Navigation Tree (Expandable Tree)
Icon List
PopOver (Works for context menus and Drop downs, and Tooltips.)

I want to have a Table Component with this contract

```
interface Cell {
    name: string;
    value: string | React.Component,
}

interface Row<T> {
    cells: Cell[];
    value: T;
}

interface Results<T> {
    data: Row<T>[],
    isLastResult: boolean;
    count?: number;
}

interface Column {
    name: string;
    label: string;
    canSort: boolean;
}

interface Sort {
    name: string;
    direction: "ASC" | "DESC"
}

interface Page {
    onPage: number;
    sort: Sort[];
    keywords?: string;
}

interface TableProps<T> {
    onLoad: (page: Page)=>Promise<Results<T>>
    columns: Column[];
    onView?: (item: T) => void;
    onAdd?: (item: T) => Promise<void>;
    onEdit?: (item: T) => Promise<void>;
    onDelete?: (item: T) => Promise<void>;
    canView?: boolean;
    canAdd?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
    rowHeight?: number;
}
//

<Table
    onLoad={({rows, keywords })=>{

        return Promise.resolve([]);
    }}
 />
```

We need to make a ArrayTable that just takes an array and displays them with the actions needed. This of course, would be built
on the Table just has a bit more opinion on it. 
