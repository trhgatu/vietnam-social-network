import Image from "next/image"

const LogoTitle = () => {
    return (
        <div className="flex-1 flex items-center justify-center">
            <div className=" flex items-center">
                <Image src="/assets/logo/logo-red-black.svg" alt="Logo"
                    width={300}
                    height={300}
                />
                <div>
                    <h2 className="text-5xl font-semibold mt-2">
                        VietNam
                    </h2>
                    <h2 className="text-5xl font-semibold mt-2">
                        Social Network
                    </h2>
                </div>
            </div>
        </div>
    )
}
export default LogoTitle