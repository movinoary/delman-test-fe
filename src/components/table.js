"use client";
// Module
import { useEffect } from "react";
import { FixedSizeGrid as Grid } from "react-window";
// Context
import { useDataContext } from "@/context/dataReducer";
// Component
import { Cell } from "@/components/cell";

export default function Table({ type }) {
  const [dataState, { dataDispatch }] = useDataContext();
  const width = window?.innerWidth - 300;
  const height = window?.innerHeight - 200;

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
      columnWidth={200}
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
