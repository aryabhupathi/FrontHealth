import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Alert,
  IconButton,
  InputAdornment,
  Paper,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import MainLayout from "../../layout/MainLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  registerSchema,
  type LoginFormValues,
  type RegisterFormValues,
} from "../../schemas/auth.schema";
const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, setUser } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });
  const handleLogin = async (values: LoginFormValues) => {
    setMessage(null);
    const user = await login(values.email, values.password);
    if (!user) {
      setMessage({ type: "error", text: "Invalid email or password" });
      return;
    }
    setUser(user);
    setMessage({
      type: "success",
      text: `Welcome back, ${user.name}!`,
    });
    setTimeout(() => {
      navigate(`/${user.role.toLowerCase()}`);
    }, 1200);
  };
  const handleRegister = async (values: RegisterFormValues) => {
    setMessage(null);
    const res = await fetch(`${import.meta.env.VITE_BACK_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      setMessage({
        type: "error",
        text: data.message || "Registration failed",
      });
      return;
    }
    setMessage({
      type: "success",
      text: "Patient account created successfully!",
    });
    setTimeout(() => {
      setMode("login");
      registerForm.reset();
    }, 1500);
  };
  const handleForgot = () => {
    navigate("/forgot");
  };
  const isLogin = mode === "login";
  return (
    <MainLayout>
      <Box
        sx={(theme) => ({
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, sm: 4 },
          py: { xs: 2, sm: 1 },
          backgroundImage: theme.palette.layout.authBg,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: "-40%",
            background:
              "conic-gradient(from 140deg at 20% 20%, rgba(59,130,246,0.35), transparent 40%, rgba(236,72,153,0.4), transparent 70%, rgba(56,189,248,0.35))",
            opacity: 0.8,
            filter: "blur(60px)",
          },
        })}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backdropFilter: "blur(2px)",
            background:
              "radial-gradient(circle at top left, rgba(255,255,255,0.06), transparent 55%)",
          }}
        />
        <Grid
          container
          sx={{
            position: "relative",
            maxWidth: 1080,
            width: "100%",
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <Grid
            size={{ xs: 0, md: 6 }}
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "stretch",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Box
              sx={(theme) => ({
                flex: 1,
                p: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                color: theme.palette.text.primary,
                background:
                  "radial-gradient(circle at top, rgba(56,189,248,0.15), transparent 65%)",
              })}
            >
              <Box>
                <Typography
                  variant="overline"
                  sx={(theme) => ({
                    letterSpacing: 2,
                    color: theme.palette.text.secondary,
                  })}
                >
                  CARETRACK
                </Typography>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  Smart hospital dashboard for everyday clinicians.
                </Typography>
                <Typography
                  variant="body2"
                  sx={(theme) => ({
                    mt: 2,
                    color: theme.palette.text.secondary,
                    maxWidth: 360,
                  })}
                >
                  Manage appointments, patients, and reports from a single,
                  secure workspace designed for modern healthcare teams.
                </Typography>
              </Box>
              <Box
                sx={(theme) => ({
                  mt: 4,
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: 2,
                  fontSize: 12,
                  color: theme.palette.text.secondary,
                })}
              >
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: "1px solid rgba(96,165,250,0.35)",
                  }}
                >
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Realtime insights
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: 12.5 }}>
                    Live vitals, queues, and occupancy in a single glance.
                  </Typography>
                </Box>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: "1px solid rgba(45,212,191,0.35)",
                  }}
                >
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Zero paperwork
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: 12.5 }}>
                    Digital patient history, labs, and prescriptions.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              alignItems: "stretch",
              justifyContent: "center",
              position: "relative",
              backdropFilter: "blur(20px)",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                px: { xs: 2, sm: 4 },
                py: { xs: 3, sm: 2 },
                width: "100%",
                maxWidth: 420,
                height:"350px"
              }}
            >
              <Box sx={{ mb: 1 }}>
                <Typography variant="h6" fontSize="bold" fontWeight= "500" textAlign="center">
                  {isLogin ? "Welcome back" : "Create New Account"}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  {isLogin
                    ? "Sign in to your CareTrack workspace."
                    : "Register once, manage all your hospital visits."}
                </Typography>
              </Box>
              {forgot ? (
                <Box>
                  <TextField
                    fullWidth
                    size="small"
                    label="Email"
                    {...loginForm.register("email")}
                    error={!!loginForm.formState.errors.email}
                    helperText={loginForm.formState.errors.email?.message}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, py: 1 }}
                    onClick={handleForgot}
                  >
                    Reset Password
                  </Button>
                  <Button
                    size="small"
                    onClick={() => setForgot(false)}
                    sx={(theme) => ({
                      mt: 1,
                      textTransform: "none",
                      color: theme.palette.text.secondary,
                      px: 0,
                      minWidth: 0,
                      "&:hover": {
                        background: "none",
                        color: theme.palette.primary.light,
                        textDecoration: "underline",
                      },
                    })}
                  >
                    Back to login
                  </Button>
                </Box>
              ) : (
                <>
                  {message && (
                    <Alert
                      severity={message.type}
                      sx={{
                        mb: 2,
                        borderRadius: 2,
                        bgcolor:
                          message.type === "error"
                            ? "rgba(239,68,68,0.09)"
                            : "rgba(34,197,94,0.08)",
                      }}
                    >
                      {message.text}
                    </Alert>
                  )}
                  {isLogin ? (
                    <Box
                      component="form"
                      onSubmit={loginForm.handleSubmit(handleLogin)}
                      noValidate
                    >
                      <TextField
                        fullWidth
                        size="small"
                        label="Email"
                        {...loginForm.register("email")}
                        error={!!loginForm.formState.errors.email}
                        helperText={loginForm.formState.errors.email?.message}
                      />
                      <TextField
                        fullWidth
                        size="small"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        {...loginForm.register("password")}
                        error={!!loginForm.formState.errors.password}
                        helperText={
                          loginForm.formState.errors.password?.message
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                size="small"
                                sx={(theme) => ({
                                  color: theme.palette.text.secondary,
                                  "&:hover": {
                                    color: theme.palette.text.primary,
                                  },
                                })}
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="small"
                        type="submit"
                        sx={{ mt: 2, py: 1 }}
                      >
                        Sign in
                      </Button>
                      <Box
                        sx={(theme) => ({
                          mt: 2,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          fontSize: 13,
                          color: theme.palette.text.secondary,
                        })}
                      >
                        <Button
                          size="small"
                          onClick={handleForgot}
                          sx={(theme) => ({
                            textTransform: "none",
                            color: theme.palette.text.secondary,
                            px: 0,
                            minWidth: 0,
                            "&:hover": {
                              background: "none",
                              color: theme.palette.primary.light,
                              textDecoration: "underline",
                            },
                          })}
                        >
                          Forgot password?
                        </Button>
                       
                        <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    fontSize: 13,
  }}
>
  <Typography
    variant="body2"
    color="text.secondary"
    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
  >
  Need an account?
    <Button
      onClick={() => setMode("register")}
      size="small"
      sx={(theme) => ({
        textTransform: "none",
        color: theme.palette.secondary.light,
        fontWeight: 500,
        padding: 0,
        minWidth: 0,
        lineHeight: 1,
        "&:hover": { background: "none" },
      })}
    >
      Register
    </Button>
  </Typography>
</Box>

                      </Box>
                    </Box>
                  ) : (
                    <Box
                      component="form"
                      onSubmit={registerForm.handleSubmit(handleRegister)}
                      noValidate
                    >
                      <Grid container spacing={1}>
                        <Grid size={{ xs: 12 }}>
                          <TextField
                            fullWidth
                            label="Full name"
                            size="small"
                            {...registerForm.register("name")}
                            error={!!registerForm.formState.errors.name}
                            helperText={
                              registerForm.formState.errors.name?.message
                            }
                          />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Phone"
                            {...registerForm.register("phone")}
                            error={!!registerForm.formState.errors.phone}
                            helperText={
                              registerForm.formState.errors.phone?.message
                            }
                          />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Email"
                            {...registerForm.register("email")}
                            error={!!registerForm.formState.errors.email}
                            helperText={
                              registerForm.formState.errors.email?.message
                            }
                          />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Password"
                            type="password"
                            {...registerForm.register("password")}
                            error={!!registerForm.formState.errors.password}
                            helperText={
                              registerForm.formState.errors.password?.message
                            }
                          />
                        </Grid>
                      </Grid>
                      <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        type="submit"
                        size="small"
                        sx={{ mt: 3, py: 1 }}
                      >
                        Register as patient
                      </Button>
                      <Divider
                        sx={{
                          my: 1,
                          borderColor: "rgba(51,65,85,0.9)",
                        }}
                      />
                      {/* <Box sx={{ textAlign: "center", fontSize: 13 }}>
                        <Typography variant="body2" color="text.secondary">
                          Already have an account?{" "}
                          <Button
                            onClick={() => setMode("login")}
                            size="small"
                            sx={(theme) => ({
                              textTransform: "none",
                              color: theme.palette.secondary.light,
                              fontWeight: 500,
                              px: 0,
                              minWidth: 0,
                              "&:hover": { background: "none" },
                            })}
                          >
                            Sign in
                          </Button>
                        </Typography>
                      </Box> */}
                      <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    fontSize: 13,
    mt: 1,
  }}
>
  <Typography
    variant="body2"
    color="text.secondary"
    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
  >
    Already have an account?
    <Button
      onClick={() => setMode("login")}
      size="small"
      sx={(theme) => ({
        textTransform: "none",
        color: theme.palette.secondary.light,
        fontWeight: 500,
        padding: 0,
        minWidth: 0,
        lineHeight: 1,
        "&:hover": { background: "none" },
      })}
    >
      Sign in
    </Button>
  </Typography>
</Box>

                    </Box>
                  )}
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
};
export default Login;
