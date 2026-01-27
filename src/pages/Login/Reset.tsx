import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import MainLayout from "../../layout/MainLayout";

type ResetPasswordForm = {
  password: string;
  confirmPassword: string;
};

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordForm>();

  const onSubmit = async (values: ResetPasswordForm) => {
    if (!token) {
      setMessage({ type: "error", text: "Invalid reset link" });
      return;
    }

    setMessage(null);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACK_URL}/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: values.password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage({
          type: "error",
          text: data.message || "Password reset failed",
        });
        return;
      }

      setMessage({
        type: "success",
        text: "Password reset successful. Redirecting to login...",
      });

      setTimeout(() => navigate("/login"), 3000);
    } catch {
      setMessage({
        type: "error",
        text: "Network error. Please try again.",
      });
    }
  };

  return (
    <MainLayout>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          background:
            "radial-gradient(1200px circle at 10% 10%, rgba(59,130,246,0.15), transparent 40%), radial-gradient(1200px circle at 90% 90%, rgba(236,72,153,0.15), transparent 40%)",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: "100%",
            maxWidth: 420,
            p: 4,
            borderRadius: 3,
          }}
        >
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Reset password
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={2}>
            Enter a new password for your account.
          </Typography>

          {message && (
            <Alert severity={message.type} sx={{ mb: 2 }}>
              {message.text}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              fullWidth
              label="New password"
              type="password"
              margin="normal"
              size="small"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <TextField
              fullWidth
              label="Confirm password"
              type="password"
              margin="normal"
              size="small"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 2, py: 1.2 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Reset password"
              )}
            </Button>
          </Box>
        </Paper>
      </Box>
    </MainLayout>
  );
};

export default ResetPassword;
