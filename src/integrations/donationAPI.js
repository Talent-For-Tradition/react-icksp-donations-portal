import axios from "axios";
// these functions call the API to store member information.
function filterExtra(a, b) {
  const d0 = {...a, ...b };
  const o = {};
  // return a clean copy
  Object.keys(a).forEach(key => {
    // include original keys
    o[key] = d0[key]
  });
  return o;
}
const api = new axios.create({
  // preload with api headers & url
  baseURL: "http://localhost:5000/api",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" }
});

async function memberByEmail(email) {
  try {
    const path = "/email/" + email;
    const endpoint = await api.get(path);
    if (endpoint.data.length > 0) {
      return endpoint.data[0];
    }
  } catch (err) {
    console.log("failed to connect with endpoint", err);
  }
  return false;
}

async function reminderByMember(member_id) {
  try {
    const path = "/reminders/member/" + member_id;
    const endpoint = await api.get(path);
    if (endpoint.data.length > 0) {
      return endpoint.data[0];
    }
  } catch (err) {
    console.log("failed to get reminders for member with id ", member_id);
  }
}
async function donationByMember(member_id) {
  try {
    const path = "/donations/member/" + member_id;
    const endpoint = await api.get(path);
    if (endpoint.data.length > 0) {
      return endpoint.data[0];
    }
  } catch (err) {
    console.log("failed to get donation for member with id ", member_id);
  }
}

///donations/member/:member_id
async function newMember(member) {
  console.log("called newMember");
  // check if member email exists
  const oldMember = await memberByEmail(member.email);
  if (!oldMember) {
    try {
      const endpoint = await api.post("/members", member);
      const [id] = endpoint.data;
      console.log(id);
      return id;
    } catch (err) {
      console.log("failed to add new member", err);
      return undefined;
    }
  }
  const updates = Object.keys(member).filter(
    (key) => member[key] !== oldMember[key]
  );
  console.log("updates: ", updates);
  return oldMember.id;
}

async function newReminder(reminder) {
  console.log("called newReminder", reminder);
  const oldReminder = await reminderByMember(reminder.member_id);
  if (!oldReminder) {
    try {
      const result = await api.post("/reminders", reminder);
      console.log(result);
      return result.len > 0 ? result[0] : result;
    } catch (err) {
      console.log("failed to add new reminder", err);
      return false;
    }
  }
  console.log("updating...");
  const updates = filterExtra(oldReminder, reminder);
  const path = "/reminders/" + oldReminder.id;
  const result = await api.put(path, updates);
  return result;
}

async function processDonation(donation) {
  console.log(`id ${donation.member_id} amount $${donation.amount}`);
  // console.log(donation);
  try {
    const endpoint = await api.post("/donations", donation);
    const [id] = endpoint.data;
    console.log(id);
    return id;
  } catch (err) {
    console.log("API failed to process donation", err);
  }
}
async function updateDonation(donation) {
  // console.log('TODO: Update donation');
  const path = "/donations/" + donation.id;
  try {
    const endpoint = await api.put(path, donation);
    // console.log("endpoint", endpoint);
    return endpoint.data;
  } catch (err) {
    console.log("error, ", err);
    return false;
  }
}

async function postPayment({email, amount}){
  const path = "/charge";
  try {
    const payment_intent = await api.post(path, {email, amount})
    console.log('intent: ', payment_intent)
    return payment_intent;
  } catch (err) {
    console.log("error", err);
    return false
  }
};


export {
  newMember,
  newReminder,
  memberByEmail,
  processDonation,
  reminderByMember,
  donationByMember,
  updateDonation,
  postPayment
};
