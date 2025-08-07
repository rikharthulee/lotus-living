import Link from "next/link";
import { WhiteLogo } from "./Logo";

export default function NavBar() {
  return (
    <nav className="bg-softgreen text-white p-4 flex items-center justify-between font-heading">
      <Link href="/">
        <WhiteLogo className="h-8 w-auto" />
      </Link>
      <ul className="font-body flex gap-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/login">Log-In</Link>
        </li>
        <li>
          <Link href="/listings">Listings</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}
