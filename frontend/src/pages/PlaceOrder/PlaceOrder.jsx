import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import QRCode from "qrcode";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [qrCode, setQrCode] = useState("");
  const [error, setError] = useState("");
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const generateQRCode = async (paymentInfo) => {
    try {
      const qrCodeUrl = await QRCode.toDataURL(paymentInfo);
      setQrCode(qrCodeUrl);
      setError(""); // Reset error state if QR code generation succeeds
    } catch (error) {
      console.error("Error generating QR code:", error);
      setError("Error generating QR code. Please try again."); // Set error message
    }
  };

  const fetchConversionRate = async () => {
    try {
      // Replace with actual API call to fetch real-time conversion rate
      const response = await fetch(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      const data = await response.json();
      return data.rates.INR; // Conversion rate from USD to INR
    } catch (error) {
      console.error("Error fetching conversion rate:", error);
      return 75; // Fallback conversion rate if API call fails
    }
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    // Calculate total order amount including delivery charges in USD
    const subtotal = getTotalCartAmount();
    const deliveryCharge = 2; // Delivery charge in USD
    const totalAmountUSD = subtotal + deliveryCharge;

    // Fetch conversion rate and convert USD to INR
    const conversionRate = await fetchConversionRate();
    const totalAmountINR = totalAmountUSD * conversionRate;

    // Generate QR code with UPI ID and total amount in INR
    const { firstName, lastName } = data;
    const upiId = "algoprime.infotech@okhdfcbank"; // Replace with your actual UPI ID
    const paymentInfo = `upi://pay?pa=${upiId}&pn=${firstName}%20${lastName}&mc=0000&tid=your_transaction_id&tr=your_transaction_reference&tn=Payment%20for%20order&am=${totalAmountINR.toFixed(
      2
    )}&cu=INR`;

    await generateQRCode(paymentInfo);
  };

  const handlePaymentSuccess = () => {
    // Set the orderConfirmed state to true to show the modal
    setOrderConfirmed(true);
  };

  // Calculate total order amount including delivery charges in USD
  const subtotal = getTotalCartAmount();
  const deliveryCharge = 2; // Delivery charge in USD
  const totalAmountUSD = subtotal + deliveryCharge;

  return (
    <div>
      <form onSubmit={placeOrder} className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              required
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
              type="text"
              placeholder="First Name"
            />
            <input
              required
              name="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
              type="text"
              placeholder="Last Name"
            />
          </div>

          <input
            required
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Email address"
          />
          <input
            required
            name="street"
            onChange={onChangeHandler}
            value={data.street}
            type="text"
            placeholder="Street"
          />

          <div className="multi-fields">
            <input
              required
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              type="text"
              placeholder="City"
            />
            <input
              required
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              type="text"
              placeholder="State"
            />
          </div>
          <div className="multi-fields">
            <input
              required
              name="zipcode"
              onChange={onChangeHandler}
              value={data.zipcode}
              type="text"
              placeholder="Zip Code"
            />
            <input
              required
              name="country"
              onChange={onChangeHandler}
              value={data.country}
              type="text"
              placeholder="Country"
            />
          </div>
          <input
            required
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
            type="text"
            placeholder="Phone"
          />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery fee</p>
                <p>${deliveryCharge.toFixed(2)}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${totalAmountUSD.toFixed(2)}</b>
              </div>
            </div>
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
          {error && <div className="error">{error}</div>}
          {qrCode && (
            <div className="qr-code">
              <h3>Scan to Pay</h3>
              <img src={qrCode} alt="QR Code" />
              <button
                type="button"
                onClick={handlePaymentSuccess}
                className="paid-button"
              >
                I have paid
              </button>
            </div>
          )}
        </div>
      </form>
      {orderConfirmed && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setOrderConfirmed(false)}>
              &#10006;
            </span>
            <button onClick={() => setOrderConfirmed(false)}>X</button>
            <p>🎉 Order confirmed successfully! 🎉</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;

// import React, { useContext, useState } from "react";
// import "./PlaceOrder.css";
// import { StoreContext } from "../../context/StoreContext";
// import axios from "axios";
// import Cashfree from "@cashfreepayments/cashfree-js";

// const PlaceOrder = () => {
//   const { getTotalCartAmount, token, food_list, cartItems, url } =
//     useContext(StoreContext);

//   const [data, setData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [sessionId, setSessionId] = useState(null);

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const placeOrder = async (event) => {
//     event.preventDefault();

//     let orderItems = [];
//     food_list.forEach((item) => {
//       if (cartItems[item._id] > 0) {
//         let itemInfo = item;
//         itemInfo["quantity"] = cartItems[item._id];
//         orderItems.push(itemInfo);
//       }
//     });

//     let orderData = {
//       address: data,
//       items: orderItems,
//       amount: getTotalCartAmount() + 2,
//     };

//     try {
//       const response = await axios.post(`${url}/api/order/place`, orderData, {
//         headers: { token },
//       });

//       if (response.data.success) {
//         getSessionId(response.data.orderId, orderData.amount, data);
//       } else {
//         alert("Error");
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);
//       alert("Error placing order. Please try again later.");
//     }
//   };

//   const getSessionId = async (orderId, amount, customerDetails) => {
//     setLoading(true);
//     try {
//       const response = await axios.post(`${url}/api/payment`, {
//         orderId,
//         amount,
//         customerDetails,
//       });
//       setLoading(false);
//       setSessionId(response.data.payment_session_id); // Adjust this according to the response format
//     } catch (error) {
//       setLoading(false);
//       console.error("Error fetching session ID:", error);
//     }
//   };

//   const handlePayment = () => {
//     const checkoutOptions = {
//       paymentSessionId: sessionId,
//       returnUrl: "https://yourwebsite.com/payment/callback?order_id={order_id}",
//     };

//     Cashfree.pay(checkoutOptions).then((result) => {
//       if (result.error) {
//         alert(result.error.message);
//       }
//       if (result.redirect) {
//         console.log("Redirection");
//       }
//     });
//   };

//   return (
//     <form onSubmit={placeOrder} className="place-order">
//       <div className="place-order-left">
//         <p className="title">Delivery Information</p>
//         <div className="multi-fields">
//           <input
//             required
//             name="firstName"
//             onChange={onChangeHandler}
//             value={data.firstName}
//             type="text"
//             placeholder="First Name"
//           />
//           <input
//             required
//             name="lastName"
//             onChange={onChangeHandler}
//             value={data.lastName}
//             type="text"
//             placeholder="Last Name"
//           />
//         </div>

//         <input
//           required
//           name="email"
//           onChange={onChangeHandler}
//           value={data.email}
//           type="email"
//           placeholder="Email address"
//         />
//         <input
//           required
//           name="street"
//           onChange={onChangeHandler}
//           value={data.street}
//           type="text"
//           placeholder="Street"
//         />

//         <div className="multi-fields">
//           <input
//             required
//             name="city"
//             onChange={onChangeHandler}
//             value={data.city}
//             type="text"
//             placeholder="City"
//           />
//           <input
//             required
//             name="state"
//             onChange={onChangeHandler}
//             value={data.state}
//             type="text"
//             placeholder="State"
//           />
//         </div>
//         <div className="multi-fields">
//           <input
//             required
//             name="zipcode"
//             onChange={onChangeHandler}
//             value={data.zipcode}
//             type="text"
//             placeholder="Zip Code"
//           />
//           <input
//             required
//             name="country"
//             onChange={onChangeHandler}
//             value={data.country}
//             type="text"
//             placeholder="Country"
//           />
//         </div>
//         <input
//           required
//           name="phone"
//           onChange={onChangeHandler}
//           value={data.phone}
//           type="text"
//           placeholder="Phone"
//         />
//       </div>
//       <div className="place-order-right">
//         <div className="cart-total">
//           <h2>Cart Totals</h2>
//           <div>
//             <div className="cart-total-details">
//               <p>Subtotal</p>
//               <p>${getTotalCartAmount()}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Delivery fee</p>
//               <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <b>Total</b>
//               <b>
//                 ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
//               </b>
//             </div>
//           </div>
//           <button type="submit" disabled={loading}>
//             PROCEED TO PAYMENT
//           </button>
//           {sessionId && (
//             <button onClick={handlePayment} disabled={loading}>
//               PAY NOW
//             </button>
//           )}
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;
