function appendMessage(sender, message) {
    const chatbox = document.getElementById('chatbox');
    const msg = document.createElement('div');
    msg.innerHTML = `<strong>${sender}:</strong> ${message}`;
    msg.classList.add(sender.toLowerCase() + "-message"); // Add sender class for styling
    chatbox.appendChild(msg);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function sendMessage() {
    const userInput = document.getElementById("user-input");
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage("You", message);

    fetch("/chatbot/ask/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCSRFToken(),
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        appendMessage("Bot", data.response);
        userInput.value = "";
    })
    .catch(error => {
        console.error("Error:", error);
        appendMessage("Bot", "Oops! Something went wrong.");
    });
}

function getCSRFToken() {
    const cookieValue = document.cookie.match('(^|;)\\s*csrftoken\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}
