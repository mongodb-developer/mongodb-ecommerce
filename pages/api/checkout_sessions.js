const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function CreateStripeSession(req, res) {
  const { items } = req.body;
  if (req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: items,
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.json({ id: session.id });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
