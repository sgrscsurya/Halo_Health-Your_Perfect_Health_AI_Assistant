const API_KEY = "AIzaSyA6vUGDicKE72q3zORkd70u6fQjJ-y_XjE";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

let isResponseStopped = false; // Flag to stop response generation

async function fetchModelResponse(body) {
    const chatbox = document.getElementById("chatbox");

    // Add loading message
    const botMessage = createMessageElement("bot", "Fetching Reliable Medical Details...");
    chatbox.appendChild(botMessage);
    chatbox.scrollTop = chatbox.scrollHeight;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{
                        text: `${body.inputs.question}\n\nContext: You are a Halo Health Assistant Bot. Provide a well-structured response with clear headings, bullet points, and logical flow. Format the response as follows:\n\n**🩺 Condition Identification**\n- Describe the possible medical condition\n\n**⚠️ Cause of Occurrence**\n- List potential reasons for this condition\n\n**🩹 Treatment Plan**\n- Steps to manage or cure the condition\n\n**💊 Medication Details**\n- Common medicines prescribed (if applicable)\n\n**🏃‍♂️ Lifestyle Changes**\n- Daily habits that help recovery/prevention\n\n**📅 Follow-Up Instructions**\n- Next steps, doctor visits, monitoring\n\n**🚨 Emergency Signs**\n- When immediate medical help is needed`
                    }]
                }]
            })
        });

        if (!response.ok) throw new Error("Failed to Fetch the Medical Data. Please kindly check your Internet Connection and Try again.");
        
        const data = await response.json();
        if (data && data.candidates && data.candidates.length > 0) {
            let responseText = data.candidates[0].content.parts[0].text;

            // Format response text
            responseText = responseText.replace(/\*\*|\*/g, "").trim();
            responseText = formatText(responseText, 80);

            // Apply typing effect
            botMessage.querySelector("p").innerHTML = "";
            typeText(responseText, botMessage.querySelector("p"), 15); // Faster typing speed
        } else {
            botMessage.querySelector("p").innerText = "Sorry, Found Nothing on this.";
        }
    } catch (error) {
        botMessage.querySelector("p").innerText = error.message;
    }
}

// Function to create message element
function createMessageElement(sender, text) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);

    const img = document.createElement("img");
    img.src = sender === "bot" ? "logo.png" : "userlogo.png";
    img.alt = sender === "bot" ? "Bot Icon" : "User Icon";

    // Align user messages to the right
    if (sender === "user") {
        messageDiv.style.justifyContent = "flex-end"; // Align to the right
    }

    const messageText = document.createElement("p");
    messageText.innerText = text;

    // Append elements based on sender
    if (sender === "user") {
        messageDiv.appendChild(messageText); // Text first
        messageDiv.appendChild(img); // Logo second (to the right of the text)
    } else {
        messageDiv.appendChild(img); // Logo first
        messageDiv.appendChild(messageText); // Text second
    }

    return messageDiv;
}

// Function to add typing effect (FASTER SPEED)
function typeText(text, element, speed = 15) {
    let index = 0;
    function type() {
        if (index < text.length && !isResponseStopped) {
            element.innerHTML += text[index] === "\n" ? "<br>" : text[index];
            index++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Function to format text with line breaks
function formatText(text, maxLength) {
    const words = text.split(" ");
    let formattedText = "", line = "";

    for (const word of words) {
        if ((line + word).length > maxLength) {
            formattedText += line.trim() + "\n";
            line = "";
        }
        line += word + " ";
    }
    formattedText += line.trim();
    return formattedText;
}

// Function to send user message
function sendMessage() {
    const userInput = document.getElementById("userInput");
    const chatbox = document.getElementById("chatbox");

    const userMessage = createMessageElement("user", userInput.value);
    chatbox.appendChild(userMessage);
    chatbox.scrollTop = chatbox.scrollHeight;

    const userText = userInput.value.trim();
    userInput.value = "";

    if (userText !== "") {
        isResponseStopped = false; // Reset stop flag
        fetchModelResponse({ inputs: { question: userText, context: "Halo Health Assistant Chatbot" } });
    }
}

// Function to stop response generation
function stopResponse() {
    isResponseStopped = true;
}

// Function to handle Enter key press
function handleKeyPress(event) {
    if (event.key === "Enter") sendMessage();
}