export interface Track {
    id: string;
    trackId: string;
    name: string;
    artist: string;
    preview_url: string | null;
    imageUrl: string;
    spotifyUrl: string;
}


export interface TrackResponse {
    tracks: Track[];
}