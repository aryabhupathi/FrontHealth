import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import { useForm } from "react-hook-form";
import { LoginCard, LoginWrapper } from "../../components/styledcomp";

type ForgotPasswordForm = {
  email: string;
};

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>();

  const onSubmit = async (values: ForgotPasswordForm) => {
    setMessage(null);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACK_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        setMessage({
          type: "error",
          text: data.message || "Unable to send reset link",
        });
        return;
      }

      setMessage({
        type: "success",
        text: "Password reset link sent. Check your email.",
      });
    } catch {
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <MainLayout>
        <LoginWrapper><LoginCard>
          
          <Typography variant="h4" gutterBottom textAlign="center">
            Forgot password
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Enter your email address and we’ll send you a reset link.
          </Typography>

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

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              fullWidth
              label="Email address"
              size="small"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 2, py: 1 }}
              disabled={isSubmitting}
            >
              Send reset link
            </Button>

            <Button
              fullWidth
              size="small"
              sx={{
                mt: 1.5,
                textTransform: "none",
              }}
              onClick={() => navigate("/login")}
            >
              Back to sign in
            </Button>
          </Box>
       </LoginCard></LoginWrapper>
      
    </MainLayout>
  );
};

export default ForgotPassword;
