import React from "react";

export default function Payment() {
  const handlePayment = async () => {
    const options = {
      key: "RAZORPAY_PUBLIC_KEY", // replace with your Razorpay Key ID
      amount: 50000, // ₹500
      currency: "INR",
      name: "Service Desk Premium",
      description: "Get premium support",
      handler: function (response) {
        alert("Payment Successful: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "User",
        email: "user@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#3399cc"
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <h2>Upgrade to Premium</h2>
      <button onClick={handlePayment}>Pay ₹500</button>
    </div>
  );
}