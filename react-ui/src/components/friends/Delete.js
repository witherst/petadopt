import React, { useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";

const Delete = (props) => {
  const { pet, setMount } = props;

  useEffect(() => {}, [pet]);

  const handleClick = () => {
    confirmAlert({
      title: "Confirm pet delete",
      message: "Are you sure you want to delete this pet?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDelete(),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

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
    <div>
      <a onClick={handleClick}>Delete Profile</a>
    </div>
  );
};

export default Delete;
