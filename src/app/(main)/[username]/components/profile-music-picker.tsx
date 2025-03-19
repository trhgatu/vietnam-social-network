import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/shared/contexts/auth-context";
import { Search } from "lucide-react";
import instance from "@/api-client/axios-client";
import { Track, TrackResponse } from "@/shared/types/track";
import { toast } from "@/hooks/use-toast";

export default function ProfileMusicPicker() {
    const { user, token } = useAuth();
    const [searchTerm, setSearchTerm] = useState("");
    const [tracks, setTracks] = useState<Track[]>([]);
    const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!searchTerm || loading) return;
        setLoading(true);
        try {
            if (!user) throw new Error("User not authenticated");

            const res = await instance.get<TrackResponse>("spotify/search", {
                headers: { Authorization: `Bearer ${token}` },
                params: { query: searchTerm },
                withCredentials: true,
            });

            setTracks(res.data.tracks);
        } catch (error) {
            console.error("Error fetching tracks:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectTrack = async (track: Track) => {
        setSelectedTrack(track);
        try {
            await instance.post(`/users/${user?._id}/favorite-song`, {
                trackId: track.id,
            });

            toast({ title: "Bài hát sẽ hiển thị trên hồ sơ", description: `${track.name}` });

            setIsOpen(false);
        } catch (error) {
            console.error("Lỗi khi lưu bài hát:", error);
            toast({ title: "Lỗi!", description: "Không thể lưu bài hát.", variant: "destructive" });
        }
    };

    return (
        <div>
            {user && (
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="text-sm" onClick={() => setIsOpen(true)}>
                            Chọn bài hát ưa thích
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Chọn bài hát yêu thích</DialogTitle>
                        </DialogHeader>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Nhập tên bài hát..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                disabled={loading}
                            />
                            <Button onClick={handleSearch} disabled={loading}>
                                {loading ? "Đang tìm..." : <Search className="w-4 h-4" />}
                            </Button>
                        </div>
                        <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
                            {tracks.map((track) => (
                                <div key={track.id} className="flex items-center gap-2">
                                    <iframe
                                        src={`https://open.spotify.com/embed/track/${track.id}`}
                                        width="300"
                                        height="80"
                                        allow="encrypted-media"
                                        className="mt-2"
                                    ></iframe>
                                    <Button onClick={() => handleSelectTrack(track)}>Chọn</Button>
                                </div>
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
