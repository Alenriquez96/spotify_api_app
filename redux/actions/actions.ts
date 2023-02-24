import { Types } from "@/redux/types";

export const addArtistId = (id: string) => ({
  type: Types.ADDARTISTID,
  payload: id,
});

export const addTopTracks = (tracks: []) => ({
  type: Types.ADDTOPTRACKS,
  payload: tracks,
});

export const addRecommendations = (recommendations: []) => ({
  type: Types.ADDRECOMMENDEDARTISTS,
  payload: recommendations,
});

export const addAlbumId = (albumId: string) => ({
  type: Types.ADDALBUMID,
  payload: albumId,
});

export const addUri = (uri: string) => ({
  type: Types.ADDURI,
  payload: uri,
});
