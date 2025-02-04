import { Divider } from "antd"
import Link from "next/link";


export function Footer() {
    return (
        <footer className="mx-auto py-10 mt-10">
            <Divider className="dark:bg-slate-100" />
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                {/* Section for pages */}
                <div>
                    <h3 className="text-lg font-bold mb-4">Khám phá thêm</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/home" className="hover:underline">
                                Trang chủ
                            </Link>
                        </li>
                        <li>
                            <Link href="/projects" className="hover:underline">
                                Dự án
                            </Link>
                        </li>
                        <li>
                            <Link href="/changelog" className="hover:underline">
                                Thay đổi
                            </Link>
                        </li>
                        {/* You can add more pages like About, Contact, etc */}
                    </ul>
                </div>

                {/* Section for support */}
                <div>
                    <h3 className="text-lg font-bold mb-4">Ủng hộ công việc của tôi</h3>
                    <p className="mb-4">Nếu bạn yêu thích những bài viết và câu nói hay, bạn có thể ủng hộ tôi để tôi có thể tiếp tục chia sẻ những nội dung giá trị.</p>
                    <Link href="/donate" className="text-blue-500 hover:underline">Ủng hộ tôi</Link>
                </div>

                {/* Section for social media */}
                <div>
                    <h3 className="text-lg font-bold mb-4">Kết nối</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link href="https://www.instagram.com" className="hover:underline">
                                Instagram
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.twitter.com" className="hover:underline">
                                Twitter
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.linkedin.com" className="hover:underline">
                                LinkedIn
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="text-center mt-6 text-sm text-gray-500 dark:text-gray-300">
                <p>&copy; 2025 Blog. Mọi quyền được bảo lưu.</p>
            </div>
        </footer>
    )
}