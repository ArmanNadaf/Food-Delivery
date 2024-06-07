import React from "react";
import "./About.css";

const AboutPage = () => {
  return (
    <div>
      <div className="header"></div>
      <div className="about-container">
        <div className="about-content">
          <h1>About Our Food Delivery App</h1>
          <p>
            Welcome to our food delivery app! We are passionate about delivering
            delicious meals straight to your doorstep. Our mission is to provide
            convenient, high-quality food delivery service to satisfy your
            cravings.
          </p>
          <p>
            With our easy-to-use app, you can explore a variety of cuisines,
            place orders seamlessly, and enjoy quick deliveries. Whether you're
            craving pizza, sushi, or a healthy salad, we've got you covered!
          </p>
          <p>
            Thank you for choosing our app. We look forward to serving you
            delicious meals!
          </p>

          {/* Mission, Vision, and Goals Cards */}
          <div className="mission-vision-goals-container">
            <div className="mission-card">
              <h2>Mission</h2>
              <p>
                Our mission is to provide convenient, high-quality food delivery
                service to satisfy our customers' cravings.
              </p>
            </div>
            <div className="vision-card">
              <h2>Vision</h2>
              <p>
                Our vision is to become the leading food delivery platform,
                offering a seamless and delightful experience for our users.
              </p>
            </div>
            <div className="goals-card">
              <h2>Goals</h2>
              <p>
                Our goals include expanding our delivery network, enhancing
                customer satisfaction, and innovating our services to meet
                evolving needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
