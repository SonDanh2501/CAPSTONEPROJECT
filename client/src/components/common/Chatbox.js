import React, { memo } from "react";
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';


const steps = [
    {
        id: 'Greet',
        message: 'Welcome to our website!',
        trigger: 'Ask Name',
    },
    {
        id: 'Ask Name',
        message: 'Please enter your name',
        trigger: 'Waiting!',
    },
    {
        id: 'Waiting!',
        user: true,
        trigger: 'Name',
    },
    {
        id: 'Name',
        message: 'Hi {previousValue} , Please select your issue',
        trigger: 'issues',
    },
    {
        id: 'issues',
        options: [
            { value: "Money", label: "Money", trigger: "Money" },
            { value: "Checkout", label: "Checkout", trigger: "Checkout" }
        ]
    },
    {
        id: 'Money',
        message: 'Please contact to number 090909090',
        end: true
    },
    {
        id: 'Checkout',
        message: 'Please contact to number 090909090',
        end: true
    },
];
const theme = {
    background: 'white',
    headerBgColor: '#1E3A8A',
    headerFontSize: '20px',
    botBubbleColor: '#0F3789',
    headerFontColor: 'white',
    botFontColor: 'white',
    userBubbleColor: '#FF5733',
    userFontColor: 'white',
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
                    headerTitle='Support Bot'


                />
            </ThemeProvider>        </div >
    );
};

export default memo(Chatbox);
