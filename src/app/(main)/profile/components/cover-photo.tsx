import Image from "next/image";

export default function CoverPhoto() {
  return (
    <div className="w-full h-60 sm:h-72 relative">
      <Image
        src="https://picsum.photos/200"
        alt="Cover"
        fill
        style={{objectFit: "cover"}}
        priority
      />
    </div>
  );
}
