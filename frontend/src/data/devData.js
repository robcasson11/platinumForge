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
    fName: i + "Flynn",
    lName: i + "Casson",
    phoneNumber: i + "098523847",
    addressRequired: true,
    address: i + "home",
    itemDescription: i + "Paw",
    workRequired: i + "Touch",
    quoteRequired: randomDayNum === 1 ? randomTrueOrFalse : false,
    quoteDetails: i + "How much would it cost to do stuff to this stuff?",
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
    materialsNotes: "",
    timescale: 1,
    completed: randomDayNum === 0 ? randomTrueOrFalse : false,
    quoted: (randomDayNum === 1) & (randomTrueOrFalse === true) ? false : true,
  };
  console.log(randomNumber(2));
}

export default dataObject;
