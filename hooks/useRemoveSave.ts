import { useState } from "react";
import axios from "axios";

const useDeleteSaved = (accessToken: string) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const deleteTrack = async (trackId: string) => {
    try {
      await axios({
        method: "delete",
        url: "https://api.spotify.com/v1/me/tracks",
        data: { ids: [trackId] },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      setIsDeleted(true);
    } catch (error: any) {
      console.log(error);
    }
  };

  return { deleteTrack, isDeleted };
};

export default useDeleteSaved;
