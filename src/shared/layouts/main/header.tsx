import { ModeToggle } from "@/components/toggle-theme"
import Link from "next/link";

export function Header() {
  return (
    <header className=" py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <span className="text-2xl font-bold">AT BLOG</span>
        </div>

        <nav className="hidden md:flex">
          <ul className="flex space-x-6 items-center">
            <li>
              <ModeToggle />
            </li>
            <li>
              <Link href="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
