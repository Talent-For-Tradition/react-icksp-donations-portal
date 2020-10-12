import { atom } from "recoil";

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
    email: ""
  }
});

const reminder = atom({
  key: "reminder",
  default: { mobile: "", hour: "10:00AM", timezone: "EST" }
});

const donation = atom({
  key: "donation",
  default: {
    amount: 0,
    recurring: false,
    day: 0, // 1-7 (monday - sunday) * optional
    week: 0, // 1-4 (first, second, third, or last) * optional
    firstdonation: 0, // UTC timestamp
    lastdonation: 0 // UTC timestamp
  }
});

export { member, reminder, donation };
