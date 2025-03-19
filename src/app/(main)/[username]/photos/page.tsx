export default function PhotosPage() {
  const albums = [
    { name: 'Ảnh đại diện', count: 12, cover: 'gradient-1' },
    { name: 'Ảnh bìa', count: 8, cover: 'gradient-2' },
    { name: 'Du lịch', count: 27, cover: 'gradient-3' },
    { name: 'Sự kiện', count: 14, cover: 'gradient-4' }
  ];

  const gradients = {
    'gradient-1': 'from-blue-400 to-indigo-500',
    'gradient-2': 'from-purple-400 to-pink-500',
    'gradient-3': 'from-indigo-400 to-purple-500',
    'gradient-4': 'from-pink-400 to-red-500'
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-6">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-slate-800">Ảnh</h2>

        <div className="flex space-x-3 mb-6 overflow-x-auto py-1">
          <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-xl font-medium shadow-md hover:shadow-lg transition-shadow">
            Ảnh của bạn
          </button>
          <button className="bg-white hover:bg-slate-50 px-6 py-2 rounded-xl text-slate-600 border border-slate-200 hover:border-indigo-200 transition-colors">
            Album
          </button>
          <button className="bg-white hover:bg-slate-50 px-6 py-2 rounded-xl text-slate-600 border border-slate-200 hover:border-indigo-200 transition-colors">
            Được gắn thẻ
          </button>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-slate-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-indigo-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              Ảnh gần đây
            </h3>
            <a href="#" className="text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors flex items-center">
              Xem tất cả
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="aspect-square rounded-xl overflow-hidden bg-slate-100 hover:shadow-md transition-shadow relative group">
                <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-slate-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-indigo-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
              </svg>
              Album
            </h3>
            <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors bg-indigo-50 px-4 py-1.5 rounded-lg flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Tạo album
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {albums.map((album, index) => (
              <div key={index} className="rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow bg-white border border-slate-100">
                <div className={`h-40 bg-gradient-to-br ${gradients[album.cover as keyof typeof gradients]} relative`}>
                  <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm rounded-full py-1 px-3 text-xs font-medium text-slate-800">
                    {album.count} ảnh
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-slate-800">{album.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">Cập nhật 2 ngày trước</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}