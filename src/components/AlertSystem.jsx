import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useAlert } from "./AlertContext";

function AlertSystem() {
  const { alert, handleClose } = useAlert();

  return (
    <Snackbar
      open={alert.open}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert
        variant="filled"
        onClose={handleClose}
        severity={alert.severity}
        sx={{ width: "100%" }}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
}

export default AlertSystem;
