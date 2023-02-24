export interface artistIdState {
  artistId: {
    artistId: string;
  };
}

export interface topTracksState {
  topTracks: {
    topTracks: {
      album: {
        images: { url: string }[];
      };
      duration_ms: number;
      name: string;
      uri: string;
      id: string;
    }[];
  };
}

export interface trackUri {
  topTracks: {
    uriSelected: string;
  };
}
