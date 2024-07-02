const sendNotification = async (title, body, userId) => {
  const response2 = await fetch(`http://localhost:8080/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      body,
      userId,
    }),
  });

  const result = await response2.json();
  return result;
};

export { sendNotification };
