const axios = require("axios");
const { options } = require("../cashfreeRoute/cashfreeRoute");

const newOrderId = async (req, res) => {
  try {
    const response = await axios.post(
      "https://sandbox.cashfree.com/pg/orders",
      {
        customer_details: {
          customer_id: "321646941664",
          customer_email: "test@gmail.com",
          customer_phone: "1234567890",
          customer_name: "code semie",
        },
        order_id: "154145423261",
        order_amount: 10,
        order_currency: "INR",
        order_meta: {
          payment_methods: "cc,dc,upi",
          notify_url:
            "https://webhook.site/e25e2f74-dd28-4efe-9778-d16474a1a59f",
        },
        order_note: "this is my order",
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "x-api-version": "2023-08-01",
          "x-client-id": "TEST101970492972e6b5fd2dccff28cb9407910",
          "x-client-secret":
            "cfsk_ma_test_a4a3fa1156260d23a5330cf5515537f6_8369e208",
        },
      }
    );
    axios.request(options).then(function (response) {
      return console.log(response.data);
      return res.status(200).send(response.data.payment_session_id);
    });
    // Handle response here
    console.log(response.data);
    res.send(response.data); // Send response back to client
  } catch (error) {
    // Handle error here
    console.error(error);
    res.status(500).send("Internal Server Error"); // Send error response to client
  }
};
