// import axios from 'axios'

function processDonation({ person, donate }) {
  // TODO: call the backend to process this donation.
  console.log(
    `${person.fullname} would like to donate $${donate.amount}usd per month`
  );
}

export { processDonation };
