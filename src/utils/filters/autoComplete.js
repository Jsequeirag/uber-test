// TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com
import { Autocomplete, Input, initTE } from "tw-elements";
initTE({ Input });

export const autocomplete = (data, property) => {
  var newData = data.map((value) => {
    return { [property]: value[property] };
  });
  try {
    const asyncAutocomplete = document.querySelector("#async");
    new Autocomplete(asyncAutocomplete, {
      filter: () => newData,
      displayValue: (value) => value[property],
    });
  } catch (e) {
    console.log(e);
  }
};
