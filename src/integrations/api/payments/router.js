// stripe-ware. https://stripe.com/docs/legacy-checkout/express#step-1-install-dependencies
const keySecret = process.env.SECRET_KEY;
const stripe = require("stripe")(keySecret);
const { filterExtra } = require("./shared");

// database models.
const { members, reminders, donations } = require("./models");

// /api
const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).send("¡Viva Cristo Rey!");
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
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/reminders/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const reminder = await reminders.findById(id);
    res.status(200).json(reminder);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/reminders/:id", async (req, res) => {
  const id = Number(req.params.id);
  const data = Object(req.body);
  // console.log(data);
  try {
    const original = await reminders.findById(id);
    // console.log(original);
    const updates = filterExtra(original, data);
    const result = await reminders.updateById(updates, id);
    res.status(200).json(result);
  } catch (err) {
    // console.log(err)
    res.status(500).json(err);
  }
});

router.get("/reminders/member/:member_id", async (req, res) => {
  const member_id = req.params.member_id;
  try {
    const reminder = await reminders.findBy({ member_id });
    res.status(200).json(reminder);
  } catch (err) {
    res.status(500).json(err);
  }
});
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

router.put("/donations/:id", async (req, res) => {
  const donation_id = Number(req.params.id);
  const data = Object(req.body); // verify this before continuing.
  if (donation_id !== data.id) {
    res.status(403).send("mismatch");
  }
  // console.log("put donation", data.id);
  const original = await donations.findById(donation_id);
  // console.log(original)
  const updates = filterExtra(original, data);
  try {
    const result = await donations.updateById(updates, donation_id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/donations/member/:member_id", async (req, res) => {
  const member_id = req.params.member_id;
  try {
    const reminder = await donations.findBy({ member_id });
    res.status(200).json(reminder);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/charge", async (req, res) => {
  try {
    const { email, amount } = req.body;
    const member = await members.findBy({ email }).first();
    // console.log('member', member)
    const donation = await donations.findBy({member_id: member.id}).first();
    // console.log('donation', donation)
    // console.log('compare amount to donation', amount, donation.amount);
    if (amount === donation.amount) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // TIP Stripe, amount is lowest common denomination
        currency: "usd"
      });
      res.status(200).send(paymentIntent.client_secret);
    } else {
      res.status(403).send("amount differs. what's going on?")
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
});

module.exports = router;
