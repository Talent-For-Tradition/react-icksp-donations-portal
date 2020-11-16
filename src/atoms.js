import { atom } from "recoil";

// amplify / cognito user pool
const user = atom({
  key: "user",
  default: {
    id: null,
    user: "", // stringify the user object and store.
  }
});

// dynamo 
const member = atom({
  key: "member",
  default: {
    fullname: "",
    country: "",
    addr1: "",
    addr2: "",
    city: "",
    zip: "",
    state: "",
    email: "",
    username: "",
    phone_number: "",
    hour: "10:00AM", timezone: "EST" ,
    donation: false,
    recurring: false,
    amount: 0,
    day: 0, // 1-7 (monday - sunday) * optional
    week: 0, // 1-4 (first, second, third, or last) * optional
    email_verified: false,
    phone_number_verified: false,
    sub: ""
  }
});

// reminder as stringified obj
const reminder = atom({
  key: "reminder",
  default: { id: null, mobile: "", hour: "10:00AM", timezone: "EST" }
});

// donation as stringified obj
const donation = atom({
  key: "donation",
  default: {
    id: null,
    amount: 0,
    recurring: false,
    day: 0, // 1-7 (monday - sunday) * optional
    week: 0, // 1-4 (first, second, third, or last) * optional
    firstdonation: 0, // UTC timestamp
    lastdonation: 0 // UTC timestamp
  }
});


// const todo = atom({
//   key: "todo",
//   default: { redirect: "/where" }
// })

export { member, user, reminder, donation };
