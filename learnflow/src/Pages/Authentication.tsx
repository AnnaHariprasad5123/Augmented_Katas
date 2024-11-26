import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";

const Authentication = () => {
  const [currentForm, setCurrentForm] = useState<
    "signup" | "login" | "forgotPassword"
  >("signup");
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [forgotEmail, setForgotEmail] = useState("");
  const [errors, setErrors] = useState({} as Record<string, string>);

  // Input change handlers
  const handleSignUpChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSignUpData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleLoginChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate sign-up form
  const validateSignUp = () => {
    const newErrors: Record<string, string> = {};
    if (!signUpData.name) newErrors.name = "Name is required.";
    if (
      !signUpData.email ||
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(signUpData.email)
    )
      newErrors.email = "Enter a valid email.";
    if (!signUpData.password || signUpData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (signUpData.password !== signUpData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    return newErrors;
  };

  // Validate login form
  const validateLogin = () => {
    const newErrors: Record<string, string> = {};
    if (
      !loginData.email ||
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(loginData.email)
    )
      newErrors.email = "Enter a valid email.";
    if (!loginData.password) newErrors.password = "Password is required.";
    return newErrors;
  };

  // Validate forgot password form
  const validateForgotPassword = () => {
    const newErrors: Record<string, string> = {};
    if (!forgotEmail || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(forgotEmail))
      newErrors.forgotEmail = "Enter a valid email.";
    return newErrors;
  };

  // Submit handlers
  const handleSignUpSubmit = () => {
    const validationErrors = validateSignUp();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Simulating saving to `data.json`
    console.log("Sign-up Data Saved:", signUpData);
    setToast({
      open: true,
      message: "Sign-up successful!",
      severity: "success",
    });
  };

  const handleLoginSubmit = () => {
    const validationErrors = validateLogin();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Simulating login
    console.log("Login Data:", loginData);
    setToast({ open: true, message: "Login successful!", severity: "success" });
  };

  const handleForgotPasswordSubmit = () => {
    const validationErrors = validateForgotPassword();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Simulating password reset
    console.log("Forgot Password Email:", forgotEmail);
    setToast({
      open: true,
      message: "Password reset instructions sent!",
      severity: "info",
    });
  };

  return (
    <Container maxWidth="xs">
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={toast.severity as any}>{toast.message}</Alert>
      </Snackbar>

      <Box
        sx={{
          mt: 5,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        {currentForm === "signup" && (
          <>
            <Typography variant="h5" gutterBottom>
              Sign Up
            </Typography>
            <TextField
              label="Name"
              name="name"
              fullWidth
              margin="normal"
              variant="outlined"
              value={signUpData.name}
              onChange={handleSignUpChange}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="Email"
              name="email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={signUpData.email}
              onChange={handleSignUpChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={signUpData.password}
              onChange={handleSignUpChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={signUpData.confirmPassword}
              onChange={handleSignUpChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleSignUpSubmit}
            >
              Sign Up
            </Button>
            <Link
              component="button"
              variant="body2"
              onClick={() => setCurrentForm("login")}
              sx={{ mt: 2, display: "block" }}
            >
              Already have an account? Login
            </Link>
          </>
        )}

        {currentForm === "login" && (
          <>
            <Typography variant="h5" gutterBottom>
              Login
            </Typography>
            <TextField
              label="Email"
              name="email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={loginData.email}
              onChange={handleLoginChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={loginData.password}
              onChange={handleLoginChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleLoginSubmit}
            >
              Login
            </Button>
            <Link
              component="button"
              variant="body2"
              onClick={() => setCurrentForm("forgotPassword")}
              sx={{ mt: 2, display: "block" }}
            >
              Forgot Password?
            </Link>
            <Link
              component="button"
              variant="body2"
              onClick={() => setCurrentForm("signup")}
              sx={{ mt: 2, display: "block" }}
            >
              Create an account
            </Link>
          </>
        )}

        {currentForm === "forgotPassword" && (
          <>
            <Typography variant="h5" gutterBottom>
              Forgot Password
            </Typography>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={forgotEmail}
              onChange={(e) => {
                setForgotEmail(e.target.value);
                setErrors((prev) => ({ ...prev, forgotEmail: "" }));
              }}
              error={!!errors.forgotEmail}
              helperText={errors.forgotEmail}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleForgotPasswordSubmit}
            >
              Reset Password
            </Button>
            <Link
              component="button"
              variant="body2"
              onClick={() => setCurrentForm("login")}
              sx={{ mt: 2, display: "block" }}
            >
              Back to Login
            </Link>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Authentication;
