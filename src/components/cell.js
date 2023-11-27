import { useDataContext } from "@/context/dataReducer";

export const Cell = ({ columnIndex, rowIndex, style, data }) => {
  const [dataState] = useDataContext();
  const { fields } = dataState;

  let item = data?.[rowIndex];
  item = item?.[fields?.[columnIndex]];
  const typeOf = typeof item;

  // style
  let backgroundColor =
    rowIndex === 0
      ? "rgb(203, 228, 249)"
      : rowIndex % 2 === 0
      ? "rgb(255, 255, 255)"
      : "rgb(235, 241, 246)";
  let textAlign =
    rowIndex === 0 ? "center" : typeOf === "number" ? "right" : "left";

  return (
    <div
      style={{
        ...style,
        backgroundColor: backgroundColor,
        border: "1px solid rgba(0, 0, 0, 0.3)",
        textAlign: textAlign,
      }}
      className="paragraph"
    >
      {item}
    </div>
  );
};
