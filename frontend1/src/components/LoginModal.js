// src/components/LoginModal.js
import React, { useState } from "react";
import {
    Modal,
    Box,
    Button,
    Typography,
    Divider,
    TextField,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import AppleIcon from "@mui/icons-material/Apple";
import GoogleIcon from "@mui/icons-material/Google";
import apiClient from "../services/apiClient";

import { useDispatch, useSelector } from "react-redux";
import { closeLoginModal, setUser } from "../store/slices/authSlice";
import { useEffect } from "react";

export default function LoginModal() {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.auth.isLoginModalOpen);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("pass123");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            const res = await apiClient.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            dispatch(setUser(res.data.user));
            dispatch(closeLoginModal());
        } catch (err) {
            setError("Invalid credentials");
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            apiClient
                .get("/auth/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    dispatch(setUser(res.data));
                })
                .catch(() => {
                    localStorage.removeItem("token");
                });
        }
    }, []);

    return (
        <Modal open={open} onClose={() => dispatch(closeLoginModal())}>
            <Box
                sx={{
                    width: 400,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    p: 3,
                    mx: "auto",
                    mt: "10vh",
                    position: "relative",
                    boxShadow: 24,
                }}
            >
                <IconButton
                    sx={{ position: "absolute", top: 10, right: 10 }}
                    onClick={() => dispatch(closeLoginModal())}
                >
                    <CloseIcon />
                </IconButton>

                <Typography variant="h6" align="center" fontWeight="bold" mb={2}>
                    Get Started
                </Typography>

                {/* Dummy Auth Buttons */}
                <Button
                    fullWidth
                    startIcon={<GoogleIcon />}
                    sx={{ border: "1px solid #ccc", mb: 1, textTransform: "none" }}
                >
                    Continue with Google
                </Button>
                <Button
                    fullWidth
                    startIcon={<EmailIcon />}
                    sx={{ border: "1px solid #ccc", mb: 1, textTransform: "none" }}
                >
                    Continue with Email
                </Button>
                <Button
                    fullWidth
                    startIcon={<AppleIcon />}
                    sx={{ border: "1px solid #ccc", mb: 2, textTransform: "none" }}
                >
                    Continue with Apple
                </Button>

                <Divider sx={{ mb: 2 }}>OR</Divider>

                {/* Actual Login Inputs */}
                <TextField
                    label="Email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Password"
                    fullWidth
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: 2 }}
                />
                {error && (
                    <Typography color="error" fontSize={13} mb={1}>
                        {error}
                    </Typography>
                )}
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleLogin}
                    sx={{ textTransform: "none" }}
                >
                    Login
                </Button>

                {/* Footer */}
                <Typography variant="caption" align="center" display="block" mt={3}>
                    I agree to the{" "}
                    <a href="#" target="_blank" rel="noreferrer">
                        Terms & Conditions
                    </a>{" "}
                    &{" "}
                    <a href="#" target="_blank" rel="noreferrer">
                        Privacy Policy
                    </a>
                </Typography>
            </Box>
        </Modal>
    );
}
