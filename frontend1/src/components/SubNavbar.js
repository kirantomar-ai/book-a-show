// src/components/SubNavbar.js
import React from "react";
import { Box, Button } from "@mui/material";

const menuItems = [
  "Movies",
  "Stream",
  "Events",
  "Plays",
  "Sports",
  "Activities",
  "ListYourShow",
  "Corporates",
  "Offers",
  "Gift Cards",
];

export default function SubNavbar() {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderTop: "1px solid #e0e0e0",
        borderBottom: "1px solid #e0e0e0",
        px: 2,
        display: "flex",
        overflowX: "auto",
        maxWidth: "100%",
        whiteSpace: "nowrap",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1280px",
          display: "flex",
          alignItems: "center",
          gap: 2,
          py: 1,
        }}
      >
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant="text"
            sx={{
              color: "#333",
              fontWeight: 500,
              fontSize: 14,
              whiteSpace: "nowrap",
              "&:hover": {
                color: "red",
                backgroundColor: "transparent",
              },
            }}
          >
            {item}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
