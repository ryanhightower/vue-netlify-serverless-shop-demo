// Adapted from sdras sample-stripe-handler (azure websites serverless function)
// see https://github.com/sdras/sample-stripe-handler/blob/master/stripe-handler/index.js

import Stripe from "stripe";

// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const stripe = Stripe("sk_test_xgaZtW7Kwk6GJfwERj8zQwDO");

export function handler(event, context, callback) {

  console.log({stripeKey: process.env.STRIPE_SECRET_KEY})
  const body = event.body;
  let params = {};
  let contentType = event.headers["content-type"];
  if (contentType != "application/json") {
    callback(null, {
      statusCode: 400,
      // eslint-disable-next-line prettier/prettier
      body: JSON.stringify({ message: "Malformed request. 'Content Type` header must be 'application/json'." })
    });
    return;
  }
  try {
    params = JSON.parse(body);
  } catch (error) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        message: "Malformed request. Must be in proper JSON format."
      })
    });
    return;
  }

  console.log({ params });
  console.log(Object.keys(params.stripeProducts).length);
  const { user, stripeProducts, stripeToken, stripeAmt } = params;
  let errors = [];

  if (!user.email) errors.push("Email was not given.");
  if (!stripeToken) errors.push("Error processing payment.");
  if (!stripeAmt || stripeAmt <= 0) errors.push("An incorrect total given.");
  if (!stripeProducts || Object.keys(params.stripeProducts).length <= 0)
    errors.push("No products submitted.");
  if (errors.length > 0) {
    console.log("Missing params.", { params });
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        message:
          "Missing information. Please fix the following issues before submitting.",
        errors
      })
    });
    return;
  }

  const customer = {
    email: user.email,
    source: stripeToken
  };

  if (!user.pickup) {
    customer.shipping = user.shipping;
    if (!customer.shipping.name) {
      customer.shipping.name = user.fullName;
    }
  }

  console.log(`creating the stripe customer: ${user.email}`);
  stripe.customers
    .create(customer)
    .then(customer => {
      console.log(`starting the stripe charges ${user.email}`);
      const charge = {
        amount: stripeAmt,
        description: ``,
        currency: "usd",
        customer: customer.id,
        metadata: stripeProducts,
        receipt_email: user.email,
        shipping: user.shipping
      };

      return stripe.charges.create(charge);
    })
    .then(charge => {
      console.log("finished the stripe charges", charge);
      // eslint-disable-next-line prettier/prettier
      callback(null, { statusCode: 200, body: "Charge complete." });
    })
    .catch(err => {
      console.log(err);
      callback(err, { statusCode: 500, body: "Something happened." });
    });
}

// // PARSE API REQUEST
// function parseBody(body) {
//  let params = {};
//   import Querystring from "querystring";
//   if (contentType.includes("multipart/form-data")) {
//     // TODO: parse body for mulipart/form-data
//     contentType = "multipart/form-data";
//   }
//   switch (contentType) {
//     case "multipart/form-data"
//     case "application/x-www-form-urlencoded":
//       params = Querystring.parse(body);
//       break;
//     case "application/json":
//       params = JSON.parse(body);
//       break;
//   }
//   return params
// }
