import React, { useEffect, useState } from "react";

const Following = (props) => {
  const { user, petId } = props;

  const [isFollowing, setFollowingState] = useState(false);
  const [userId, setUserId] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }
    setUserId(user.internal_user_id);
    getFollowingState();
  }, [user, userId]);

  const updateFollowingState = () => {
    if (!isFollowing) {
      // update
      addPetmark();
    } else {
      removePetmark();
    }
    setFollowingState(!isFollowing);
  };

  const getFollowingState = () => {
    if (!userId) {
      setFollowingState(false);
      return;
    }
    fetch(
      `/api/petmark/state/?user_id=${encodeURIComponent(
        userId
      )}&pet_id=${encodeURIComponent(petId)}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFollowingState(data ? true : false);
      });
  };

  const addPetmark = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        petId,
      }),
    };
    fetch(`/api/petmark/state`, requestOptions)
      .then((res) => res.json())
      .then((res) => {});
  };

  const removePetmark = () => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        petId,
      }),
    };

    fetch(`/api/petmark/state`, requestOptions)
      .then((res) => res.json())
      .then((res) => {});
  };

  return (
    <div className="follow-text-div">
      {user && !user.is_creator && !user.is_admin ? (
        <a onClick={updateFollowingState}>
          {isFollowing ? "Unfollow" : "Follow"}
        </a>
      ) : (
        ""
      )}
    </div>
  );
};

export default Following;
