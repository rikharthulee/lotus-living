import Image from 'next/image';
import logo from '../../public/logo.png';

export default function Logo({ className = "" }) {
  return <Image src={logo} alt="Lotus Living logo" className={className} priority />;
}
