import axios from "axios"; // https://github.com/axios/axios

const api = axios.create({
  baseURL: "https://icksp-example-domain.com/api/", // todo
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" }
});

async function exampleCall() {
  try {
    const endpoint = await api.get("/endpoint");
    console.log(endpoint.data);
  } catch {
    console.log("something relevant to this endpoint");
  }
}

/**
 * create/update a recurring donation
 * @param {Object} person { fullname, country, addr1, addr2, city, zip, state, email }
 * @param {Object} donate  { amount, recurring, day, week, firstdonation, lastdonation }
 */
function processDonation({ person, donate }) {
  // TODO: call the API to process this donation.
  console.log(
    `${person.fullname} would like to donate $${donate.amount}usd per month`
  );
  console.log(`${exampleCall}... remove this code`); // todo
}

export { processDonation };
