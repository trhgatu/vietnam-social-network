export default function PostsPage() {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-medium mb-4">Bài viết</h2>
          <div className="flex space-x-4 mb-4">
            <button className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full font-medium">
              Tất cả bài viết
            </button>
            <button className="hover:bg-gray-100 px-4 py-1 rounded-full text-gray-600">
              Bài viết của bạn
            </button>
            <button className="hover:bg-gray-100 px-4 py-1 rounded-full text-gray-600">
              Đã lưu
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3].map((post) => (
            <div key={post} className="bg-white rounded-lg shadow">
              <div className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div>
                    <p className="font-medium">Tên người dùng</p>
                    <p className="text-xs text-gray-500">{post} tuần trước</p>
                  </div>
                </div>
                <p className="mb-4">Đây là nội dung bài viết mẫu #{post}.</p>
              </div>
              <div className="h-48 bg-gray-200"></div>
              <div className="border-t border-b px-4 py-2 flex justify-between text-gray-500">
                <button className="flex items-center space-x-1 hover:bg-gray-100 px-2 py-1 rounded">
                  <span className="w-5 h-5 bg-gray-300 rounded-full"></span>
                  <span>Thích</span>
                </button>
                <button className="flex items-center space-x-1 hover:bg-gray-100 px-2 py-1 rounded">
                  <span className="w-5 h-5 bg-gray-300 rounded-full"></span>
                  <span>Bình luận</span>
                </button>
                <button className="flex items-center space-x-1 hover:bg-gray-100 px-2 py-1 rounded">
                  <span className="w-5 h-5 bg-gray-300 rounded-full"></span>
                  <span>Chia sẻ</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }