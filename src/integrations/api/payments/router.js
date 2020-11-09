// stripe-ware. https://stripe.com/docs/legacy-checkout/express#step-1-install-dependencies
const keySecret = process.env.SECRET_KEY;
const stripe = require("stripe")(keySecret);

// database models.
const { members, reminders, donations } = require("./models");

// /api
const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).send('¡Viva Cristo Rey!')
});
router.get("/members", (req, res) => {
  members
    .find()
    .then((all_members) =>
      all_members.map((m) => ({ id: m.id, member: m.fullname }))
    );
});

router.post("/members", (req, res) => {
  console.log("posting to /members");
  const member = Object(req.body); // verify this before continuing.
  console.log(member);
  if (!(member && member.fullname)) {
    res.status(404);
  } else {
    members
      .add(member)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(500).json(err));
  }
});

router.get("/members/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(404);
  } else {
    members
      .findById(id)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(500).json(err));
  }
});

router.get("/email/:email", (req, res) => {
  const email = req.params.email;
  if (!email) {
    console.log("no email");
    res.status(404);
  } else {
    members
      .findBy({ email })
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(500).json(err));
  }
});

router.post("/reminders", async (req, res) => {
  const reminder = Object(req.body);
  console.log(reminder);
  try {
    const result = await reminders.add(reminder);
    res.status(200).json(result);
  } catch(err) {
    res.status(400).json(err);
  }
})

router.get("/reminders/:id", async (req, res) => {
  const id = req.params.id;
  try{
    const reminder = await reminders.findById(id);
    res.status(200).json(reminder)
  } catch (err) {
    res.status(500).json(err);
  }
})
router.get("/reminders/member/:member_id", async (req, res) => {
  const member_id = req.params.member_id;
  try {
    const reminder = await reminders.findBy({ member_id })
    res.status(200).json(reminder)
  } catch (err) {
    res.status(500).json(err);
  }
})
router.post("/donations", (req, res) => {
  const donation = Object(req.body); // verify this before continuing.
  if (!donation.amount) {
    res.status(404);
  } else {
    donations
      .add(donation)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(500).json(err));
  }
});
router.get("/donations/member/:member_id", async (req, res) => {
  const member_id = req.params.member_id;
  try {
    const reminder = await donations.findBy({ member_id })
    res.status(200).json(reminder)
  } catch (err) {
    res.status(500).json(err);
  }
})


router.post("/charge", (req, res) => {
  let amount = 500;
  stripe.customers.create({
     email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Sample Charge",
         currency: "usd",
         customer: customer.id
    }))
  .then(charge => res.render("charge.pug"));
});

module.exports = router;

// import Stripe from "stripe";

// const stripe = new Stripe(process.env.SECRET_KEY);

// const postPayment = async (req, res) => {
//   if (req.method === "POST") {
//     try {
//       const { amount } = req.body;
//       // Psst. For production-ready applications we recommend not using the
//       // amount directly from the client without verifying it first. This is to
//       // prevent bad actors from changing the total amount on the client before
//       // it gets sent to the server. A good approach is to send the quantity of
//       // a uniquely identifiable product and calculate the total price server-side.
//       // Then, you would only fulfill orders using the quantity you charged for.

//       const paymentIntent = await stripe.paymentIntents.create({
//         amount,
//         currency: "usd"
//       });

//       res.status(200).send(paymentIntent.client_secret);
//     } catch (err) {
//       res.status(500).json({ statusCode: 500, message: err.message });
//     }
//   } else {
//     res.setHeader("Allow", "POST");
//     res.status(405).end("Method Not Allowed");
//   }
// };

// export default postPayment;
