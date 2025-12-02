import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  MenuItem,
  Alert,
  IconButton,
  InputAdornment,
  useTheme,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../layout/MainLayout";
const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, setUser } = useAuth();
  const theme = useTheme();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      if (mode === "login") {
        const user = await login(email, password);
        if (!user) throw new Error("Invalid credentials");
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setMessage({
          type: "success",
          text: `Welcome back, ${user.name || "User"}!`,
        });
        setTimeout(
          () => navigate(`/${user.role?.toLowerCase() || "dashboard"}`),
          1200
        );
      } else {
        const res = await fetch(`${import.meta.env.VITE_BACK_URL}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, role }),
        });
        const data = await res.json();
        if (!res.ok || !data.success)
          throw new Error(data.message || "Registration failed");
        setMessage({
          type: "success",
          text: "🎉 Account created successfully!",
        });
        setTimeout(() => {
          setMode("login");
          setEmail("");
          setPassword("");
          setName("");
        }, 1500);
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    }
  };
  return (
    <MainLayout>
      <Grid
        container
        sx={{
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Grid
          size={{
            xs: false,
            md: 6,
          }}
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #2196F3, #1976D2)",
          }}
        >
          <Box
            component="img"
            src="./doctor1.jpg"
            alt="Hospital staff"
            sx={{
              width: "80%",
              maxWidth: 450,
              borderRadius: 3,
              boxShadow: 4,
            }}
          />
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
          }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 5,
              borderRadius: 3,
              width: "100%",
              maxWidth: 420,
            }}
          >
            <Typography
              variant="h4"
              align="center"
              fontWeight="bold"
              color="primary"
              gutterBottom
            >
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </Typography>
            <Typography
              variant="body2"
              align="center"
              color="text.secondary"
              mb={3}
            >
              {mode === "login"
                ? "Sign in to access your dashboard"
                : "Join our hospital network today"}
            </Typography>
            {message && (
              <Alert
                severity={message.type}
                sx={{ mb: 3, textAlign: "center" }}
              >
                {message.text}
              </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit}>
              {mode === "register" && (
                <TextField
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  margin="normal"
                  required
                />
              )}
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {mode === "register" && (
                <TextField
                  select
                  fullWidth
                  label="Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  margin="normal"
                >
                  <MenuItem value="patient">Patient</MenuItem>
                  <MenuItem value="doctor">Doctor</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </TextField>
              )}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{ mt: 3, borderRadius: 2, py: 1.5 }}
              >
                {mode === "login" ? "Sign In" : "Register"}
              </Button>
            </Box>
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 3, color: "text.secondary" }}
            >
              {mode === "login" ? (
                <>
                  Don’t have an account?{" "}
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => setMode("register")}
                  >
                    Register
                  </Button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => setMode("login")}
                  >
                    Sign In
                  </Button>
                </>
              )}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </MainLayout>
  );
};
export default Login;
