// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from "react";
// import {
//   Box,
//   Grid,
//   TextField,
//   Typography,
//   Button,
//   MenuItem,
//   Alert,
//   IconButton,
//   InputAdornment,
//   useTheme,
//   Paper,
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import MainLayout from "../layout/MainLayout";
// const Login: React.FC = () => {
//   const navigate = useNavigate();
//   const { login, setUser } = useAuth();
//   const theme = useTheme();
//   const [mode, setMode] = useState<"login" | "register">("login");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("")
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [role, setRole] = useState("patient");
//   const [showPassword, setShowPassword] = useState(false);
//   const [message, setMessage] = useState<{
//     type: "error" | "success";
//     text: string;
//   } | null>(null);
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setMessage(null);
//     try {
//       if (mode === "login") {
//         const user = await login(email, password);
//         if (!user) throw new Error("Invalid credentials");
//         localStorage.setItem("user", JSON.stringify(user));
//         setUser(user);
//         setMessage({
//           type: "success",
//           text: `Welcome back, ${user.name || "User"}!`,
//         });
//         setTimeout(
//           () => navigate(`/${user.role?.toLowerCase() || "dashboard"}`),
//           1200
//         );
//       } else {
//         const res = await fetch(`${import.meta.env.VITE_BACK_URL}/auth/register`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ name, email, password, role }),
//         });
//         const data = await res.json();
//         if (!res.ok || !data.success)
//           throw new Error(data.message || "Registration failed");
//         setMessage({
//           type: "success",
//           text: "🎉 Account created successfully!",
//         });
//         setTimeout(() => {
//           setMode("login");
//           setEmail("");
//           setPassword("");
//           setName("");
//         }, 1500);
//       }
//     } catch (err: any) {
//       setMessage({ type: "error", text: err.message });
//     }
//   };
//   return (
//     <MainLayout>
//       <Grid
//         container
//         sx={{
//           minHeight: "100vh",
//           backgroundColor: theme.palette.background.default,
//         }}
//       >
//         <Grid
//           size={{
//             xs: false,
//             md: 6,
//           }}
//           sx={{
//             display: { xs: "none", md: "flex" },
//             alignItems: "center",
//             justifyContent: "center",
//             background: "linear-gradient(135deg, #2196F3, #1976D2)",
//           }}
//         >
//           <Box
//             component="img"
//             src="./doctor1.jpg"
//             alt="Hospital staff"
//             sx={{
//               width: "80%",
//               maxWidth: 450,
//               borderRadius: 3,
//               boxShadow: 4,
//             }}
//           />
//         </Grid>
//         <Grid
//           size={{
//             xs: 12,
//             md: 6,
//           }}
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             p: 4,
//           }}
//         >
//           <Paper
//             elevation={4}
//             sx={{
//               p: 5,
//               borderRadius: 3,
//               width: "100%",
//               maxWidth: 420,
//             }}
//           >
//             <Typography
//               variant="h4"
//               align="center"
//               fontWeight="bold"
//               color="primary"
//               gutterBottom
//             >
//               {mode === "login" ? "Welcome Back" : "Create Account"}
//             </Typography>
//             <Typography
//               variant="body2"
//               align="center"
//               color="text.secondary"
//               mb={3}
//             >
//               {mode === "login"
//                 ? "Sign in to access your dashboard"
//                 : "Join our hospital network today"}
//             </Typography>
//             {message && (
//               <Alert
//                 severity={message.type}
//                 sx={{ mb: 3, textAlign: "center" }}
//               >
//                 {message.text}
//               </Alert>
//             )}
//             <Box component="form" onSubmit={handleSubmit}>
//               {mode === "register" && (
//                 <TextField
//                   fullWidth
//                   label="Full Name"
//                   variant="outlined"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   margin="normal"
//                   required
//                 />
//               )}
//               <TextField
//                 fullWidth
//                 label="Email"
//                 variant="outlined"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 margin="normal"
//                 required
//               />
//               <TextField
//                 fullWidth
//                 label="Password"
//                 variant="outlined"
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 margin="normal"
//                 required
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={() => setShowPassword(!showPassword)}
//                         edge="end"
//                       >
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//               <TextField
//   fullWidth
//   label="Phone Number"
//   value={phone}
//   onChange={(e) => setPhone(e.target.value)}
//   margin="normal"
//   required
// />

//               {mode === "register" && (
//                 <TextField
//                   select
//                   fullWidth
//                   label="Role"
//                   value={role}
//                   onChange={(e) => setRole(e.target.value)}
//                   margin="normal"
//                 >
//                   <MenuItem value="patient">Patient</MenuItem>
//                   <MenuItem value="doctor">Doctor</MenuItem>
//                   <MenuItem value="admin">Admin</MenuItem>
//                 </TextField>
//               )}
//               <Button
//                 type="submit"
//                 variant="contained"
//                 fullWidth
//                 size="large"
//                 sx={{ mt: 3, borderRadius: 2, py: 1.5 }}
//               >
//                 {mode === "login" ? "Sign In" : "Register"}
//               </Button>
//             </Box>
//             <Typography
//               variant="body2"
//               align="center"
//               sx={{ mt: 3, color: "text.secondary" }}
//             >
//               {mode === "login" ? (
//                 <>
//                   Don’t have an account?{" "}
//                   <Button
//                     variant="text"
//                     color="primary"
//                     onClick={() => setMode("register")}
//                   >
//                     Register
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   Already have an account?{" "}
//                   <Button
//                     variant="text"
//                     color="primary"
//                     onClick={() => setMode("login")}
//                   >
//                     Sign In
//                   </Button>
//                 </>
//               )}
//             </Typography>
//           </Paper>
//         </Grid>
//       </Grid>
//     </MainLayout>
//   );
// };
// export default Login;


/* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from "react";
// import {
//   Box,
//   Grid,
//   TextField,
//   Typography,
//   Button,
//   Alert,
//   IconButton,
//   InputAdornment,
//   useTheme,
//   Paper,
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import MainLayout from "../layout/MainLayout";

// const Login: React.FC = () => {
//   const navigate = useNavigate();
//   const { login, setUser } = useAuth();
//   const theme = useTheme();

//   const [mode, setMode] = useState<"login" | "register">("login");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const [message, setMessage] = useState<{
//     type: "error" | "success";
//     text: string;
//   } | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setMessage(null);

//     try {
//       if (mode === "login") {
//         const user = await login(email, password);

//         if (!user) throw new Error("Invalid email or password");

//         localStorage.setItem("user", JSON.stringify(user));
//         setUser(user);

//         setMessage({
//           type: "success",
//           text: `Welcome back, ${user.name || "User"}!`,
//         });

//         setTimeout(() => {
//           navigate(`/${user.role.toLowerCase()}`);
//         }, 1200);
//       } 
      
//       else {
//         // ✅ REGISTER AS PATIENT ONLY (NO ROLE SENT)
//         const res = await fetch(
//           `${import.meta.env.VITE_BACK_URL}/auth/register`,
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               name,
//               email,
//               password,
//               phone, // ✅ REQUIRED BY BACKEND
//             }),
//           }
//         );

//         const data = await res.json();
//         if (!res.ok || !data.success)
//           throw new Error(data.message || "Registration failed");

//         setMessage({
//           type: "success",
//           text: "🎉 Patient account created successfully!",
//         });

//         setTimeout(() => {
//           setMode("login");
//           setEmail("");
//           setPassword("");
//           setName("");
//           setPhone("");
//         }, 1500);
//       }
//     } catch (err: any) {
//       setMessage({ type: "error", text: err.message });
//     }
//   };

//   return (
//     <MainLayout>
//       <Grid
//         container
//         sx={{
//           minHeight: "100vh",
//           backgroundColor: theme.palette.background.default,
//         }}
//       >
//         {/* LEFT IMAGE */}
//         <Grid
//           item
//           xs={false}
//           md={6}
//           sx={{
//             display: { xs: "none", md: "flex" },
//             alignItems: "center",
//             justifyContent: "center",
//             background: "linear-gradient(135deg, #2196F3, #1976D2)",
//           }}
//         >
//           <Box
//             component="img"
//             src="./doctor1.jpg"
//             alt="Hospital staff"
//             sx={{
//               width: "80%",
//               maxWidth: 450,
//               borderRadius: 3,
//               boxShadow: 4,
//             }}
//           />
//         </Grid>

//         {/* RIGHT FORM */}
//         <Grid
//           item
//           xs={12}
//           md={6}
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             p: 4,
//           }}
//         >
//           <Paper
//             elevation={4}
//             sx={{
//               p: 5,
//               borderRadius: 3,
//               width: "100%",
//               maxWidth: 420,
//             }}
//           >
//             <Typography
//               variant="h4"
//               align="center"
//               fontWeight="bold"
//               color="primary"
//               gutterBottom
//             >
//               {mode === "login" ? "Welcome Back" : "Patient Registration"}
//             </Typography>

//             <Typography
//               variant="body2"
//               align="center"
//               color="text.secondary"
//               mb={3}
//             >
//               {mode === "login"
//                 ? "Sign in to access your dashboard"
//                 : "Create your hospital patient account"}
//             </Typography>

//             {message && (
//               <Alert
//                 severity={message.type}
//                 sx={{ mb: 3, textAlign: "center" }}
//               >
//                 {message.text}
//               </Alert>
//             )}

//             <Box component="form" onSubmit={handleSubmit}>
//               {mode === "register" && (
//                 <>
//                   <TextField
//                     fullWidth
//                     label="Full Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     margin="normal"
//                     required
//                   />

//                   <TextField
//                     fullWidth
//                     label="Phone Number"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     margin="normal"
//                     required
//                   />
//                 </>
//               )}

//               <TextField
//                 fullWidth
//                 label="Email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 margin="normal"
//                 required
//               />

//               <TextField
//                 fullWidth
//                 label="Password"
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 margin="normal"
//                 required
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={() => setShowPassword(!showPassword)}
//                         edge="end"
//                       >
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />

//               <Button
//                 type="submit"
//                 variant="contained"
//                 fullWidth
//                 size="large"
//                 sx={{ mt: 3, borderRadius: 2, py: 1.5 }}
//               >
//                 {mode === "login" ? "Sign In" : "Register as Patient"}
//               </Button>
//             </Box>

//             <Typography
//               variant="body2"
//               align="center"
//               sx={{ mt: 3, color: "text.secondary" }}
//             >
//               {mode === "login" ? (
//                 <>
//                   Don’t have an account?{" "}
//                   <Button
//                     variant="text"
//                     onClick={() => setMode("register")}
//                   >
//                     Register
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   Already have an account?{" "}
//                   <Button
//                     variant="text"
//                     onClick={() => setMode("login")}
//                   >
//                     Sign In
//                   </Button>
//                 </>
//               )}
//             </Typography>
//           </Paper>
//         </Grid>
//       </Grid>
//     </MainLayout>
//   );
// };

// export default Login;


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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../layout/MainLayout";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  registerSchema,
  type LoginFormValues,
  type RegisterFormValues,
} from "../schemas/auth.schema"

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, setUser } = useAuth();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  /* ✅ LOGIN FORM */
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  /* ✅ REGISTER FORM */
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

    const res = await fetch(
      `${import.meta.env.VITE_BACK_URL}/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );

    const data = await res.json();

    if (!res.ok || !data.success) {
      setMessage({ type: "error", text: data.message || "Registration failed" });
      return;
    }

    setMessage({
      type: "success",
      text: "🎉 Patient account created successfully!",
    });

    setTimeout(() => {
      setMode("login");
      registerForm.reset();
    }, 1500);
  };

  return (
    <MainLayout>
      <Grid container sx={{ minHeight: "100vh" }}>
        {/* LEFT IMAGE */}
        <Grid
        size={{xs:12, md:6}}
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
            sx={{ width: "80%", maxWidth: 450, borderRadius: 3 }}
          />
        </Grid>

        {/* FORM */}
        <Grid size={{xs:12, md:6}} display="flex" justifyContent="center">
          <Paper sx={{ p: 5, maxWidth: 420, width: "100%" }}>
            <Typography variant="h4" align="center" fontWeight="bold">
              {mode === "login" ? "Welcome Back" : "Patient Registration"}
            </Typography>

            {message && (
              <Alert severity={message.type} sx={{ my: 2 }}>
                {message.text}
              </Alert>
            )}

            {/* ✅ LOGIN FORM */}
            {mode === "login" && (
              <Box
                component="form"
                onSubmit={loginForm.handleSubmit(handleLogin)}
              >
                <TextField
                  fullWidth
                  label="Email"
                  margin="normal"
                  {...loginForm.register("email")}
                  error={!!loginForm.formState.errors.email}
                  helperText={
                    loginForm.formState.errors.email?.message
                  }
                />

                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  margin="normal"
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
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button fullWidth variant="contained" type="submit" sx={{ mt: 3 }}>
                  Sign In
                </Button>
              </Box>
            )}

            {/* ✅ REGISTER FORM */}
            {mode === "register" && (
              <Box
                component="form"
                onSubmit={registerForm.handleSubmit(handleRegister)}
              >
                <TextField
                  fullWidth
                  label="Full Name"
                  margin="normal"
                  {...registerForm.register("name")}
                  error={!!registerForm.formState.errors.name}
                  helperText={
                    registerForm.formState.errors.name?.message
                  }
                />

                <TextField
                  fullWidth
                  label="Phone"
                  margin="normal"
                  {...registerForm.register("phone")}
                  error={!!registerForm.formState.errors.phone}
                  helperText={
                    registerForm.formState.errors.phone?.message
                  }
                />

                <TextField
                  fullWidth
                  label="Email"
                  margin="normal"
                  {...registerForm.register("email")}
                  error={!!registerForm.formState.errors.email}
                  helperText={
                    registerForm.formState.errors.email?.message
                  }
                />

                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  {...registerForm.register("password")}
                  error={!!registerForm.formState.errors.password}
                  helperText={
                    registerForm.formState.errors.password?.message
                  }
                />

                <Button fullWidth variant="contained" type="submit" sx={{ mt: 3 }}>
                  Register as Patient
                </Button>
              </Box>
            )}

            <Typography align="center" mt={3}>
              {mode === "login" ? (
                <Button onClick={() => setMode("register")}>
                  Register
                </Button>
              ) : (
                <Button onClick={() => setMode("login")}>
                  Sign In
                </Button>
              )}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default Login;
