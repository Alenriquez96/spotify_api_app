import { useState } from "react";
import axios from "axios";

const useSave = (accessToken: string) => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const saveTrack = async (trackId: string) => {
    setIsSaving(true);

    try {
      await axios({
        method: "put",
        url: "https://api.spotify.com/v1/me/tracks",
        data: { ids: [trackId] },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      setIsSaving(false);
      setSuccess(true);
    } catch (error: any) {
      setIsSaving(false);
      setError(error);
    }
  };

  return { saveTrack, isSaving, error, success };
};

export default useSave;
