import { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";

export default function ChatForm() {
  const [symptoms, setSymptoms] = useState("");
  const [chats, setChats] = useState([]); // Store conversation history

  const handleInput = (event) => {
    setSymptoms(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Add user's message to the chat
    const userMessage = { sender: "user", message: symptoms };
    setChats((prevChats) => [...prevChats, userMessage]);

    const data = { input: symptoms };

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      // Add system's message to the chat
      const systemMessage = {
        sender: "system",
        message: `Predicted Disease: ${result.predicted_disease}`,
        details: {
          description: result.description,
          diets: result.diets,
          medications: result.medications,
          precautions: result.precautions,
          workout: result.workout,
        },
      };
      setChats((prevChats) => [...prevChats, systemMessage]);
      setSymptoms(""); // Clear input field
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box
      component="main"
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          width: "100%",
          maxWidth: "600px",
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            mb: 2,
            p: 2,
            backgroundColor: "#f5f5f5",
            borderRadius: "10px",
          }}
        >
          {chats.map((chat, index) => (
            <Box
              key={index}
              sx={{
                mb: 2,
                display: "flex",
                justifyContent:
                  chat.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              <Paper
                sx={{
                  p: 2,
                  backgroundColor:
                    chat.sender === "user" ? "#1976d2" : "#e0e0e0",
                  color: chat.sender === "user" ? "#fff" : "#000",
                  borderRadius: "10px",
                  maxWidth: "70%",
                }}
              >
                <Typography variant="body1">{chat.message}</Typography>
                {chat.sender === "system" && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2">
                      Description: {chat.details.description}
                    </Typography>
                    <Typography variant="body2">
                      Diets: {chat.details.diets}
                    </Typography>
                    <Typography variant="body2">
                      Medications: {chat.details.medications}
                    </Typography>
                    <Typography variant="body2">
                      Precautions: {chat.details.precautions}
                    </Typography>
                    <Typography variant="body2">
                      Workout: {chat.details.workout}
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Box>
          ))}
        </Box>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", width: "100%" }}
        >
          <TextField
            fullWidth
            variant="outlined"
            label="Your message"
            placeholder="Type your symptoms..."
            value={symptoms}
            onChange={handleInput}
            sx={{ mr: 2 }}
          />
          <Button type="submit" variant="contained" color="primary">
            Send
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
