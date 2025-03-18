export default function AboutPage() {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-medium mb-4">Giới thiệu</h2>

          <div className="space-y-8">
            <section>
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <span className="w-8 h-8 rounded-full bg-gray-200 mr-2 flex items-center justify-center text-gray-500">
                  i
                </span>
                Thông tin cơ bản
              </h3>
              <div className="ml-10 space-y-3">
                <div className="flex">
                  <div className="w-1/3 text-gray-500">Họ tên</div>
                  <div className="w-2/3 font-medium">Tên người dùng</div>
                </div>
                <div className="flex">
                  <div className="w-1/3 text-gray-500">Ngày sinh</div>
                  <div className="w-2/3 font-medium">01/01/1990</div>
                </div>
                <div className="flex">
                  <div className="w-1/3 text-gray-500">Giới tính</div>
                  <div className="w-2/3 font-medium">Nam</div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <span className="w-8 h-8 rounded-full bg-gray-200 mr-2 flex items-center justify-center text-gray-500">
                  w
                </span>
                Công việc và học vấn
              </h3>
              <div className="ml-10 space-y-3">
                <div className="flex">
                  <div className="w-1/3 text-gray-500">Nghề nghiệp</div>
                  <div className="w-2/3 font-medium">Lập trình viên</div>
                </div>
                <div className="flex">
                  <div className="w-1/3 text-gray-500">Học vấn</div>
                  <div className="w-2/3 font-medium">Đại học</div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <span className="w-8 h-8 rounded-full bg-gray-200 mr-2 flex items-center justify-center text-gray-500">
                  h
                </span>
                Liên hệ
              </h3>
              <div className="ml-10 space-y-3">
                <div className="flex">
                  <div className="w-1/3 text-gray-500">Email</div>
                  <div className="w-2/3 font-medium">email@example.com</div>
                </div>
                <div className="flex">
                  <div className="w-1/3 text-gray-500">Điện thoại</div>
                  <div className="w-2/3 font-medium">0123456789</div>
                </div>
                <div className="flex">
                  <div className="w-1/3 text-gray-500">Địa chỉ</div>
                  <div className="w-2/3 font-medium">Hà Nội, Việt Nam</div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }