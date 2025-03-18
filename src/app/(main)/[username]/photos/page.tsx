export default function PhotosPage() {
    return (
      <div className="space-y-4">
        <div className=" rounded-lg shadow p-4">
          <h2 className="text-xl font-medium mb-4">Ảnh</h2>

          <div className="flex space-x-4 mb-4">
            <button className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full font-medium">
              Ảnh của bạn
            </button>
            <button className="hover:bg-gray-100 px-4 py-1 rounded-full text-gray-600">
              Album
            </button>
            <button className="hover:bg-gray-100 px-4 py-1 rounded-full text-gray-600">
              Được gắn thẻ
            </button>
          </div>
        </div>

        <div className=" rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Ảnh gần đây</h3>
            <a href="#" className="text-blue-500 text-sm font-medium">Xem tất cả</a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="aspect-square bg-gray-200 rounded overflow-hidden">
                <div className="w-full h-full hover:opacity-90 cursor-pointer"></div>
              </div>
            ))}
          </div>
        </div>

        <div className=" rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Album</h3>
            <a href="#" className="text-blue-500 text-sm font-medium">Tạo album</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Ảnh đại diện', 'Ảnh bìa', 'Du lịch'].map((album, index) => (
              <div key={index} className="rounded overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                <div className="h-40 bg-gray-200"></div>
                <div className="p-2">
                  <h4 className="font-medium">{album}</h4>
                  <p className="text-xs text-gray-500">{5 * (index + 1)} ảnh</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }