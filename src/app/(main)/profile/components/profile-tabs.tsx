interface Props {
    activeTab: string;
    setActiveTab: (tab: string) => void;
  }

  export default function ProfileTabs({ activeTab, setActiveTab }: Props) {
    const tabs = [
      { name: "Bài viết", key: "posts" },
      { name: "Giới thiệu", key: "info" },
      { name: "Bạn bè", key: "friends" },
      { name: "Ảnh", key: "photos" },
      { name: "Video", key: "videos" },
    ];

    return (
      <div className="flex space-x-4 sm:mt-12 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`px-4 py-2 ${activeTab === tab.key ? "border-b-2 border-blue-500 font-bold" : "text-gray-500"}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.name}
          </button>
        ))}
      </div>
    );
  }
