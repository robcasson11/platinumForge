import { firstName, lastName, description, work, details } from "./falseData";

function randomNumber(int) {
  return Math.floor(Math.random() * int);
}

const randomBoolean = [true, false];

const dataObject = [];
for (let i = 0; i < 20; i++) {
  const randomTrueOrFalse = randomBoolean[randomNumber(2)];
  const date = new Date();
  const randomDay = [0, 1, 0, 1, 3, 5];
  const randomDayNum = randomDay[randomNumber(6)];
  const dueDate = new Date(date.setDate(date.getDate() + randomDayNum));
  dataObject[i] = {
    dueDate: dueDate,
    jobNum: i + 450,
    fName: firstName[randomNumber(12)],
    lName: lastName[randomNumber(11)],
    phoneNumber: i + "098523847",
    addressRequired: true,
    address: i + "123 House Close, House Street, London, E1 6AN",
    itemDescription: description[randomNumber(7)],
    workRequired: work[randomNumber(6)],
    quoteRequired: randomDayNum === 1 ? randomTrueOrFalse : false,
    quoteDetails: details[randomNumber(5)],
    price: "1",
    additionalNotesRequired: false,
    additionalNotes: "",
    damagedRequired: false,
    damagedNotes: "",
    depositRequired: false,
    depositAmount: "",
    materialsRequired:
      (randomDayNum === 5 && true) || (randomDayNum === 3 && true) || false,
    materialsSupplier:
      (randomDayNum === 5 && "supplier2") ||
      (randomDayNum === 3 && "supplier1") ||
      "",
    materialsNotes: i + " 6mm crown needed in steel",
    timescale: 1,
    completed: randomDayNum === 0 ? randomTrueOrFalse : false,
    quoted: (randomDayNum === 1) & (randomTrueOrFalse === true) ? false : true,
  };
}

export default dataObject;
