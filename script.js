document.addEventListener("DOMContentLoaded", function () {
    // Hide logo video after playing and show main content
    let logoVideo = document.getElementById("logo-video");
    if (logoVideo) {
        logoVideo.addEventListener("ended", function () {
            document.querySelector(".video-container").style.display = "none";
            document.getElementById("main-content").style.display = "block";
        });
    }

    // Function to handle form submission via AJAX
    function handleSubmit(formId, phpFile) {
        let form = document.getElementById(formId);
        if (form) {
            form.addEventListener("submit", function (e) {
                e.preventDefault(); // Stop default form submission

                let formData = new FormData(this);

                fetch(phpFile, {
                    method: "POST",
                    body: formData
                })
                .then(response => response.text())
                .then(data => {
                    if (data.trim() === "success") {
                        window.location.href = "main-menu.html"; // Redirect after successful login/signup
                    } else {
                        alert(data); // Show error message
                    }
                })
                .catch(error => console.error("Error:", error));
            });
        }
    }

    // Attach event listeners for login and signup forms
    handleSubmit("signup-form", "signup.php");
    handleSubmit("login-form", "login.php");

    // Page redirection functions
    function enterApp() {
        window.location.href = "login.html";
    }

    // Toggle between login & signup forms
    function showSignup() {
        document.querySelector(".login-container").style.display = "none";
        document.querySelector(".signup-container").style.display = "block";
    }

    function showLogin() {
        document.querySelector(".signup-container").style.display = "none";
        document.querySelector(".login-container").style.display = "block";
    }

    // Chatbot feature
    function sendMessage() {
        let userInput = document.getElementById("userInput").value;
        let chatbotResponse = "I'm here to assist you!";
        
        if (userInput.toLowerCase().includes("hello")) {
            chatbotResponse = "Hello! How can I help you today?";
        } else if (userInput.toLowerCase().includes("health")) {
            chatbotResponse = "I can help you track your health. Try using the Health Tracking feature.";
        }
        
        document.querySelector(".chatbox").innerHTML += `<p>You: ${userInput}</p>`;
        document.querySelector(".chatbox").innerHTML += `<p>Bot: ${chatbotResponse}</p>`;
        document.getElementById("userInput").value = "";
    }

    // Set reminders
    function setReminder() {
        let reminderMessage = "Reminder set! Don't forget to take your medicine.";
        document.getElementById("reminder-message").innerText = reminderMessage;
        alert(reminderMessage);
    }

    // Health tracker
    function trackHealth() {
        let steps = document.getElementById("steps").value;
        let message = steps >= 5000 ? "Great job! Keep it up!" : "Try to walk a bit more for better health.";
        document.getElementById("health-status").innerText = message;
    }

    // Expose functions globally
    window.enterApp = enterApp;
    window.showSignup = showSignup;
    window.showLogin = showLogin;
    window.sendMessage = sendMessage;
    window.setReminder = setReminder;
    window.trackHealth = trackHealth;
});

function toggleMenu() {
    const menuDropdown = document.getElementById("menuDropdown");
    menuDropdown.classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.menu-icon')) {
        const dropdowns = document.getElementsByClassName("menu-dropdown");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};


// Function to show the add contact form
function showAddContactForm() {
    const contactForm = document.getElementById("contactForm");
    contactForm.style.display = "block";
}

// Function to add a new contact
function addContact() {
    const hospitalName = document.getElementById("hospitalName").value;
    const doctorName = document.getElementById("doctorName").value;
    const specification = document.getElementById("specification").value;
    const contactNumber = document.getElementById("contactNumber").value;

    if (!hospitalName || !doctorName || !specification || !contactNumber) {
        alert("Please fill all fields!");
        return;
    }

    // Create a new contact item
    const contactList = document.getElementById("contactList");
    const contactItem = document.createElement("div");
    contactItem.className = "contact-item";

    contactItem.innerHTML = `
        <div>
            <strong>${hospitalName}</strong><br>
            <span>${doctorName} (${specification})</span>
        </div>
        <button onclick="callNumber('${contactNumber}')">Call</button>
    `;

    contactList.appendChild(contactItem);

    // Clear the form
    document.getElementById("hospitalName").value = "";
    document.getElementById("doctorName").value = "";
    document.getElementById("specification").value = "";
    document.getElementById("contactNumber").value = "";

    // Hide the form
    document.getElementById("contactForm").style.display = "none";
}

// Function to call a number
function callNumber(number) {
    window.location.href = `tel:${number}`;
}

// Function to call emergency number (108)
function callEmergency() {
    window.location.href = "tel:108";
}