"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Typography,
  Button,
  TextField,
  Container,
  Stack,
  AppBar,
  Toolbar,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#fafafa",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: "none",
        },
      },
    },
  },
});

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          sx={{ bgcolor: "background.default" }}
        >
          <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Register
              </Typography>
            </Toolbar>
          </AppBar>
          <form onSubmit={handleRegister}>
            <Stack spacing={2} sx={{ width: "100%" }}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Register
              </Button>
            </Stack>
          </form>
          <Button onClick={() => router.push("/login")} sx={{ mt: 2 }}>
            Already have an account? Login
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}