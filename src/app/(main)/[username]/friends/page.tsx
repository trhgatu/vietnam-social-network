export default function FriendsPage() {
    const friends = [
      { id: 1, name: "Nguyễn Văn A", mutualFriends: 5 },
      { id: 2, name: "Trần Thị B", mutualFriends: 3 },
      { id: 3, name: "Lê Văn C", mutualFriends: 2 },
      { id: 4, name: "Phạm Thị D", mutualFriends: 8 },
      { id: 5, name: "Hoàng Văn E", mutualFriends: 1 },
      { id: 6, name: "Đỗ Thị F", mutualFriends: 4 },
    ];

    return (
      <div className="space-y-4">
        <div className="rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Bạn bè</h2>
            <div className="text-blue-500 font-medium">
              {friends.length} bạn bè
            </div>
          </div>

          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Tìm kiếm bạn bè"
              className="w-full  rounded-full py-2 px-4 pr-10"
            />
            <span className="absolute right-3 top-2 ">
              🔍
            </span>
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-2 mb-2">
            <button className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full font-medium whitespace-nowrap">
              Tất cả bạn bè
            </button>
            <button className="hover:bg-gray-100 px-4 py-1 rounded-full text-gray-600 whitespace-nowrap">
              Bạn mới
            </button>
            <button className="hover:bg-gray-100 px-4 py-1 rounded-full text-gray-600 whitespace-nowrap">
              Thành phố hiện tại
            </button>
            <button className="hover:bg-gray-100 px-4 py-1 rounded-full text-gray-600 whitespace-nowrap">
              Từ quê nhà
            </button>
            <button className="hover:bg-gray-100 px-4 py-1 rounded-full text-gray-600 whitespace-nowrap">
              Theo trường học
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {friends.map((friend) => (
            <div key={friend.id} className=" rounded-lg shadow p-4">
              <div className="flex">
                <div className="w-24 h-24  rounded-lg mr-3"></div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{friend.name}</h3>
                  <p className=" text-sm">{friend.mutualFriends} bạn chung</p>
                  <div className="mt-2 space-x-2">
                    <button className="bg-blue-500 hover:bg-blue-600  px-3 py-1 rounded font-medium text-sm">
                      Nhắn tin
                    </button>
                    <button className=" px-3 py-1 rounded font-medium text-sm">
                      Hủy kết bạn
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }