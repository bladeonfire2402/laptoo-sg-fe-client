/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";


export const formatValueTable = (data: any, config: any) => {
  if (!data[config.key] && config.type !== "number" && config.type !== "percent") {
    return "-";
  }

  switch (config.type) {
    case "date":
      return coverDateNumberToString(data[config.key]);
    case "number":
      return formatNumber(data[config.key]);
    case "percent":
      return `${data[config.key] ?? 0}%`;
    default:
      return data[config.key];
  }
};

export const formatValue = (value: any, type?: "number" | "date" | "percent") => {
  if (!value && type !== "number" && type !== "percent") {
    return "-";
  }
  switch (type) {
    case "date":
      return coverDateNumberToString(value);
    case "number":
      return formatNumber(value);
    case "percent":
      return `${value ?? 0}%`;
    default:
      return value;
  }
};

export function formatCurrency(amount: number | undefined) {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return amount ? formatter.format(amount) : 0;
}


export const coverDateNumberToString = (date: any) => {
  if (date?.length < 10) {
    return date;
  }
  if (/[0-3][0-9]\/[0-1][0-9]\/[1-2]\d{3}/.test(date)) {
    return date;
  }
  if (date && moment(date).isValid()) {
    return moment(date).format("DD/MM/YYYY");
  }
  return date;
};

export const formatNumber = (num: number | string) => {
  return !isNaN(+num) ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0";
};
