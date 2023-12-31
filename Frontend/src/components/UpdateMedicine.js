import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import styles from "../css/Addmedicine.module.css";

import "../App.css";

export default function UpdateMedicine(props) {
  const [open, setOpen] = useState(false);
  const { row, us, setUs } = props.props;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // console.log(props.props._id);
  const handlesubmit = () => {
    const current_stock = document.getElementById("current_stock").value;

    if (!current_stock) {
      alert("Please fill the all the fields");
    } else {
      axios.post("http://localhost:8000/update", {
        current_stock,
        threshold: props.props.row.threshold,
        _id: props.props.row._id,
      });
      setUs(true);
      setOpen(false);
      alert("Stock updated successfully");
    }
  };

  return (
    <div className={styles.Addmedicine}>
      <Button onClick={handleClickOpen}>{row && row.current_stock}</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update</DialogTitle>
        <DialogContent>
          <DialogContentText>Please update stock</DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="current_stock"
            label="Current Stock"
            type="number"
            fullWidth
            variant="standard"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlesubmit} id="submit">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
