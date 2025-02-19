import Image from "next/image";

export default function CoverPhoto() {
  return (
    <div className="w-full h-60 sm:h-72 bg-gray-300 relative">
      <Image
        src="/assets/profile-cover.jpg"
        alt="Cover"
        layout="fill"
        objectFit="cover"
        priority
      />
    </div>
  );
}
