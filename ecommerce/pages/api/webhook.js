import { initMongoose } from "@/lib/mongoose";
import Order from "@/models/Order";
import { buffer } from "micro";
//localhost:3000/api/webhook
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export default async function handler(req, res) {
  initMongoose();
  const signingSecret = process.env.SIGNING_SECRET;
  const payload = buffer(request.body);
  const signature = req.header["stripe-signature"];
  const event = stripe.webhooks.constructEvent(
    payload,
    signature,
    signingSecret
  );

  res.json("ok");
}

export const config = {
  api: {
    bodyParser: false,
  },
};
