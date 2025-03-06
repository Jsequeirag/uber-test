import { formatIsoDate, formatDateToIso } from "../format/formatIsoDate";
export const searchFilter = (
  arrayData,
  string,
  orderByDate,
  branchSelected,
  dateSelected
) => {
  console.log(arrayData);
  if (Object.keys(arrayData[0]).length <= 0) {
    return [];
  }
  let array = [];
  array = finteringByBranch(arrayData, branchSelected);
  array = filterByDate(arrayData, dateSelected);
  try {
    array = arrayData.map((value, index) => {
      value.filter = false;
      if (string) {
        let propertyValues = Object.values(value);
        for (let i = 0; i < propertyValues.length; i++) {
          if (propertyValues[i]) {
            if (
              propertyValues[i]
                .toString()
                .toLowerCase()
                .trim()
                .startsWith(string.toLowerCase().trim())
            ) {
              arrayData[index].filter = true;

              break;
            }
          }
        }
      } else {
        arrayData.map((value, index) => {
          arrayData[index].filter = true;
        });
      }

      return value;
    });
    return orderByRecentDate(array, orderByDate);
  } catch (e) {
    console.log(e);
  }
};
function orderByRecentDate(array, orderByDate) {
  return array.sort(function (a, b) {
    return orderByDate
      ? new Date(a.CreationDate) - new Date(b.CreationDate)
      : new Date(b.CreationDate) - new Date(a.CreationDate);
  });
}
function finteringByBranch(arrayData, branchSelected) {
  let array = [];
  //primera vez que el programa corre muestra todas las ordenes
  if (branchSelected === "all") {
    array = arrayData.map((value) => {
      value.storeFiltered = true;
      return value;
    });
  } else if (branchSelected === "none") {
    array = arrayData.map((value) => {
      value.storeFiltered = false;
      return value;
    });
  } else {
    //si se escoje una  sucursal
    array = arrayData.map((value, index) => {
      //para el dashboard
      if (value?.StoreId?.startsWith(branchSelected)) {
        value.storeFiltered = true;
        return value;
      }
      //para el filtro por fechas
      if (value?.storeId?.startsWith(branchSelected)) {
        value.storeFiltered = true;
        return value;
      }
      value.storeFiltered = false;
      return value;
    });
  }
  console.log(array);
  return array;
}

function filterByDate(arrayData, dateSelected) {
  let array;
  if (dateSelected === "none") {
    array = arrayData.map((value) => {
      value.dateFiltered = true;
      return value;
    });
  } else {
    array = arrayData.map((value) => {
      if (
        formatIsoDate(value.CreationDate).startsWith(
          formatIsoDate(dateSelected + "T15:24:00.000")
        )
      ) {
        value.dateFiltered = true;
      } else {
        value.dateFiltered = false;
      }
      return value;
    });
  }
  return array;
}

export const orderByNumber = (branches) => {
  var result = Object.keys(branches).map((key) => [key, branches[key]]);
  var array = result.sort((a, b) => b[1].result - a[1].result);
  return array;
};

//getActuallyWeek
export const getActuallyWeek = () => {
  var curr = new Date(); // get current date
  var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  var last = first + 6; // last day is the first day + 6
  return {
    firstday: formatDateToIso(new Date(curr.setDate(first))),
    lastday: formatDateToIso(new Date(curr.setDate(last))),
  };
};

export const getActuallyMonth = () => {
  let date = new Date();
  return {
    firstday: new Date(date.getFullYear(), date.getMonth(), 1),
    lastday: new Date(date.getFullYear(), date.getMonth() + 1, 0),
  };
};
