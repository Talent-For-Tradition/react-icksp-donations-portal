import axios from "axios"; // https://github.com/axios/axios

// Stripe https://youtu.be/w1oLdAPyuok?t=1280
// https://github.com/tmarek-stripe/demo-react-stripe-js/blob/master/pages/api/payment_intents.js

const api = axios.create({
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
      return result.len > 0 ? result[0]:result;
    } catch (err) {
      console.log("failed to add new reminder", err);
      return false;
    }
  }
  const updates = Object.keys(reminder).filter(
    (key) => reminder[key] !== oldReminder[key]
  );
  console.log("updates: ", updates);
  return oldReminder.id;
}

async function processDonation(donation) {
  console.log(`id ${donation.member_id} amount $${donation.amount}`);
  console.log(donation);
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
  console.log('TODO: Update donation');
}
export {
  processDonation,
  newMember,
  newReminder,
  memberByEmail,
  reminderByMember,
  donationByMember,
  updateDonation
};
