let arr1 = document.getElementById("arr");
let arr2 = document.getElementById("newArr");

async function dataArr() {
  let response = await fetch("https://fortress.no/data/oppgave-2-2020.json");
  let arr = await response.json();
  arr1.innerHTML = displayArr(arr);
  let newArr = cleanAndSort(arr);
  arr2.innerHTML = displayArr(newArr);
}

let displayArr = (arr) => {
  let str = arr
    .map((item) => {
      for (let index in item) {
        return (
          "name: " +
          item["name"] +
          " , value: " +
          item["value"] +
          " , description: " +
          item["description"] +
          "<br/>"
        );
      }
    })
    .join("");
  return str;
};

let cleanAndSort = (arr) => {
  let newArr = arr.filter((el) => {
    return !(
      el.description == "nei" ||
      el.description == "" ||
      el.description == "false" ||
      el.description == "0"
    );
  });

  newArr.sort((a, b) => {
    let aVal = parseInt(a.value);
    let bVal = parseInt(b.value);

    if (aVal > bVal) return 1;
    else if (aVal < bVal) return -1;
    else return 0;
  });
  return newArr;
};

dataArr();
