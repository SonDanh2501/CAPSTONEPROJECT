import React, { memo } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

const steps = [
  {
    id: "Greet",
    message: "Welcome to our website!",
    trigger: "Ask Name",
  },
  {
    id: "Ask Name",
    message: "Please enter your name",
    trigger: "Waiting!",
  },
  {
    id: "Waiting!",
    user: true,
    trigger: "Name",
  },
  {
    id: "Name",
    message: "Hi {previousValue} , Please select your issue",
    trigger: "issues",
  },
  {
    id: "issues",
    options: [
      { value: "Booking", label: "Booking", trigger: "Booking" },
      { value: "Money", label: "Money", trigger: "Money" },
      { value: "FAQ", label: "Question", trigger: "FAQ" },
      { value: "Checkout", label: "Checkout", trigger: "Checkout" },
    ],
  },
  {
    id: "Booking",
    message:
      "Customers please place an order after selecting a certain course by going to that course's detail page and selecting the date and shift",
    trigger: "Time",
  },
  {
    id: "Time",
    options: [
      { value: "Date", label: "Date", trigger: "Date" },
      { value: "Shift", label: "Shift", trigger: "Shift" },
    ],
  },
  {
    id: "Date",
    message: "Select a available day then you can select a shift in that day",
    end: true,
  },
  {
    id: "Shift",
    message: "Select a available shift in the day you have shift, if shift haven't booked you can add that pitch to your cart",
    end: true,
  },
  {
    id: "Money",
    message:
      "All courts on the website will be divided into 3 prices corresponding to certain times of the day. Customers please review carefully before booking to avoid mistakes in the prices of the courts",
    // end: true,
    trigger: "Money_2",
  },
  {
    id: "Money_2",
    options: [
      { value: "Money", label: "Money", trigger: "Money" },
      { value: "FAQ", label: "Question", trigger: "FAQ" },
      { value: "Checkout", label: "Checkout", trigger: "Checkout" },
    ],
    // trigger: "issues",
  },
  {
    id: "Checkout",
    message: "Current payment methods are: Cash or Zalo Pay",
    end: true,
  },
  {
    id: "FAQ",
    message:
      "Customers can visit the FAQ page to see some of the questions we have answered or can send questions directly to us via email.",
    end: true,
  },
];
const theme = {
  background: "white",
  headerBgColor: "#08992e",
  headerFontSize: "20px",
  botBubbleColor: "#08992e", // Text background
  headerFontColor: "white",
  botFontColor: "white",
  userBubbleColor: "#FF5733",
  userFontColor: "white",
};

const Chatbox = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <ChatBot
          // This appears as the header
          // text for the chat bot
          steps={steps}
          floating={true}
          headerTitle="Support"
        />
      </ThemeProvider>
    </div>
  );
};

export default memo(Chatbox);
