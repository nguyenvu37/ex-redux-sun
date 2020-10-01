import getEleInArray from "./getEleInArray";

export default function getArrDataFilterKeyCheckbox(
  arrData,
  arrDataType,
  type
) {
  let dataTypes = [];
  if (type === "type") {
    dataTypes = arrData.map((item) => item.type);
  }

  if (type === "brand") {
    dataTypes = arrData.map((item) => item.brand);
  }

  if (type === "rate") {
    dataTypes = arrData.map((item) => item.rate);
  }

  let keyTypes = Object.keys(getEleInArray(dataTypes));
  let valueTypes = Object.values(getEleInArray(dataTypes));
  let arrTypes = [];

  for (let i = 0; i < keyTypes.length; i++) {
    let type = {
      id: i + 1,
      key: keyTypes[i],
      value: valueTypes[i],
      select: true,
    };

    arrTypes.push({
      ...type,
    });
  }

  return [...arrTypes];
}
