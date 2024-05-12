async function fetchStockAdvice(body) {
    try {
      const response = await fetch('https://ojw6chmqtd36wcmf6nokamysei0xfoet.lambda-url.ap-northeast-2.on.aws/stockAdvice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body), // Directly stringify the body argument
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const jsonResponse = await response.json();
      return jsonResponse.advice;
    } catch (error) {
      console.error('Error fetching stock advice:', error);
      return null;
    }
  }

async function sendMessage() {
    const button = document.getElementById('send-button');
    const spinner = button.querySelector('i.fa-spinner');

    const message = document.getElementById('message').value;
  
    if (!message) {
        alert('Please enter your message.');
        return;
    }
  
    const body = {
        prompt: message // Include user message in the prompt
    };

    button.disabled = true; // Disable the button while sending
    spinner.style.display = 'inline'; // Show the spinner
  
    const stockAdvice = await fetchStockAdvice(body); // Pass body object to fetchStockAdvice
    if (stockAdvice === null) {
        alert('Failed to fetch stock advice. Please try again later.');
        return;
    }

    const chatWindow = document.getElementById('chat-window');

    // Create a new message div for user message
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'me');
    userMessage.textContent = message;
    chatWindow.appendChild(userMessage);

    // Create a space div between messages
    const spaceDiv = document.createElement('div');
    spaceDiv.classList.add('space');
    chatWindow.appendChild(spaceDiv);

    // Create a new message div for stock advice
    const adviceMessage = document.createElement('div');
    adviceMessage.classList.add('message');
    adviceMessage.innerHTML = `<em>${stockAdvice}</em>`;
    chatWindow.appendChild(adviceMessage);

    // Clear input field after sending message
    document.getElementById('message').value = '';

    button.disabled = false; // Enable the button after sending
    spinner.style.display = 'none'; // Hide the spinner
}
