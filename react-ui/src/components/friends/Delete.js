import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import './styles/delete-styles.css'

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const Delete = (props) => {
  const { pet, setMount } = props;
  useEffect(() => {}, [pet]);

  const handleDelete = async function () {
    const petId = pet.internal_pet_id;
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ petId }),
    };
    const promise = await fetch("/api/pet/delete", requestOptions);
    const res = await promise.json();
    res && setMount && setMount(false);
  };

  return (
    <div className="friends-delete-div" style={{cursor: "pointer"}}>
      <AlertDialog handleDelete={handleDelete}/>
    </div>
  );
};

const AlertDialog = (props) => {
  const [open, setOpen] = useState(false);

  const styles = {
    backgroundColor: "transparent",
    padding: "0px",
    margin: "0px"
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    props.handleDelete();
    handleClose();
  };
  const handleDisagree = () => {
    handleClose();
  };
  return (
    <div>
      {/* Button to trigger the opening of the dialog */}
      <Button onClick={handleClickOpen} style={styles} >Delete</Button>
      {/* Dialog that is displayed if the state open is true */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Successful Alert"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this pet?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree} color="primary">
            No
          </Button>
          <Button onClick={handleAgree} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Delete;