const BASE_URL = "http://localhost:5000/api";// Replace with your backend URL

export const fetchMessages = async () => {
  try {
    const response = await fetch(`${BASE_URL}/messages`);
    if (!response.ok) throw new Error("Failed to fetch messages");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const sendMessage = async (message) => {
  try {
    const response = await fetch(`${BASE_URL}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
    if (!response.ok) throw new Error("Failed to send message");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

