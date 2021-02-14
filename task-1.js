async function dataArr() {
  let response = await fetch(
    "https://fortress.no/data/data-2020-interview.json"
  );
  let resp = await response.json();
  createTemplate(resp);
}

const formatPriceString = (priceStr, thousandSep, decimalSuffix) => {
  splits = [];
  len = priceStr.length;
  nextIdx = priceStr.length % 3;
  if (nextIdx > 0) {
    splits.push(priceStr.substr(0, nextIdx));
  }
  for (; nextIdx < len; nextIdx += 3) {
    splits.push(priceStr.substr(nextIdx, 3));
  }
  return splits.join(thousandSep) + decimalSuffix;
};

const formatTelephone = (telephone) => {
  return telephone.replace(/(\d{2})(\d{3})(\d{2})(\d{3})/, "$1 $2 $3 $4");
};

const formatString = (str) => {
  str = str.toString();
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const createTemplate = (res) => {
  res.title.forEach((item) => {
    let header = document.createElement("h2");
    header.setAttribute("class", "whiteText");
    header.innerHTML = item;
    document.getElementById("template").appendChild(header);
  });

  let section = document.createElement("ul");
  section.setAttribute("class", "section");
  res.details.forEach((ele) => {
    let item = document.createElement("li");
    let name = document.createElement("span");
    name.setAttribute("class", "whiteText");
    let value = document.createElement("span");
    value.classList.add("goldText", "priceVal");
    name.innerHTML = formatString(ele.name);
    inp = ele.value.toString();
    if (isNaN(inp)) {
      value.innerHTML = formatString(inp);
    } else {
      value.innerHTML = formatPriceString(inp, ".", ",-");
    }
    item.appendChild(name);
    item.appendChild(value);
    section.appendChild(item);
  });

  document.getElementById("template").appendChild(section);

  let footer = document.createElement("ul");
  footer.setAttribute("class", "footer");

  let address = document.createElement("li");
  address.setAttribute("class", "whiteText");
  address.innerHTML = "Adresse";
  let streetName = document.createElement("li");
  streetName.setAttribute("class", "goldText");
  streetName.innerHTML = res.address.street + ",";
  let zipAndCity = document.createElement("li");
  zipAndCity.setAttribute("class", "goldText");
  zipAndCity.innerHTML = res.address.zipCode + " " + res.address.city;
  footer.appendChild(address);
  footer.appendChild(streetName);
  footer.appendChild(zipAndCity);

  let contact = document.createElement("li");
  contact.setAttribute("class", "whiteText");
  contact.innerHTML = "Kontakt";
  let contactName = document.createElement("li");
  contactName.setAttribute("class", "goldText");
  contactName.innerHTML = res.contact.name;
  let contactPhone = document.createElement("li");
  contactPhone.setAttribute("class", "goldText");
  contactPhone.innerHTML = formatTelephone("+47" + res.contact.phone);
  footer.appendChild(contact);
  footer.appendChild(contactName);
  footer.appendChild(contactPhone);

  document.getElementById("template").appendChild(footer);
};

dataArr();
