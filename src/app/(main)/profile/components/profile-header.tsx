import Image from "next/image";

export default function ProfileHeader() {
  return (
    <div className="flex flex-col sm:flex-row items-center px-4 sm:px-6 relative -mt-16 sm:-mt-20 text-center sm:text-left">
      {/* Avatar */}
      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white">
        <Image
          src="https://avatar.iran.liara.run/public/1"
          alt="Avatar"
          width={128}
          height={128}
          className="w-full h-full object-cover"
          priority
        />
      </div>
      <div className="mt-4 sm:mt-18 sm:ml-4">
        <h1 className="text-xl sm:text-2xl font-bold">Trịnh Trần Phương Tuấn (J97)</h1>
        <p className="text-gray-500 text-sm sm:text-base">Lập trình viên & Nhà sáng tạo nội dung</p>
      </div>
    </div>
  );
}
