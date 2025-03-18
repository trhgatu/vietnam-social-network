export default function TimelinePage() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-medium mb-4">Tạo bài viết</h2>
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gray-200"></div>
          <div className="bg-gray-100 rounded-full px-4 py-2 flex-1 text-gray-500 cursor-pointer hover:bg-gray-200 transition duration-200">
            Bạn đang nghĩ gì?
          </div>
        </div>
        <div className="flex justify-between pt-3 border-t">
          <div className="flex items-center space-x-1 text-gray-500 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
            <span className="w-5 h-5 bg-gray-300 rounded-full"></span>
            <span>Ảnh/Video</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
            <span className="w-5 h-5 bg-gray-300 rounded-full"></span>
            <span>Cảm xúc</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
            <span className="w-5 h-5 bg-gray-300 rounded-full"></span>
            <span>Sự kiện</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            <div>
              <p className="font-medium">Tên người dùng</p>
              <p className="text-xs text-gray-500">2 giờ trước</p>
            </div>
          </div>
          <p className="mb-4">Đây là nội dung bài viết mẫu trên dòng thời gian.</p>
        </div>
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
        <div className="p-4">
          <div className="flex space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-200"></div>
            <div className="flex-1 bg-gray-100 rounded-2xl px-3 py-2">
              <p className="font-medium text-sm">Người bình luận</p>
              <p className="text-sm">Đây là nội dung bình luận.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}