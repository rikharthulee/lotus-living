import Link from 'next/link';
import Logo from './Logo';

export default function NavBar() {
  return (
    <nav>
      <Link href="/">
        <Logo />
      </Link>
      <ul>
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
