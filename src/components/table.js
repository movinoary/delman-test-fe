"use client";
// Module
import { useEffect, useState } from "react";
import { FixedSizeGrid as Grid } from "react-window";
// Context
import { useDataContext } from "@/context/dataReducer";
// Component
import { Cell } from "@/components/cell";

export default function Table({ type }) {
  const [dataState, { dataDispatch }] = useDataContext();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [columnWidth, setColumnWidth] = useState(0);

  useEffect(() => {
    let column;
    const width = window?.innerWidth - 300;
    const height = window?.innerHeight - 200;
    const columnWidth = window?.innerWidth - 500;

    if (columnWidth >= 300) {
      column = 200;
    } else if (columnWidth <= 100) {
      column = 100;
    } else {
      column = columnWidth;
    }
    setColumnWidth(column);
    setWidth(width);
    setHeight(height);
  }, [width, height]);

  const dataSales = dataState?.sales !== undefined ? dataState?.sales : [];
  const dataUsers = dataState?.users !== undefined ? dataState?.users : [];
  const dataTable =
    type === "sales" ? dataSales : type === "users" ? dataUsers : [];

  let data = [];
  let body = {};
  let fields = [];

  for (const property in dataTable[0]) {
    body[property] = property;
    fields.push(property);
  }
  data = [body, ...dataTable];

  useEffect(() => {
    dataDispatch.pushFields(fields);
  }, [fields.length]);

  return (
    <Grid
      columnCount={fields.length}
      columnWidth={columnWidth}
      rowCount={data.length}
      rowHeight={30}
      itemData={data}
      height={height}
      width={width}
    >
      {Cell}
    </Grid>
  );
}
