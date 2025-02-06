import Link from "next/link";

export function AboutPage() {
    return (
        <div>
            <h1>About</h1>
            <Link href={'/home'}>Link to home</Link>
        </div>
    );
}