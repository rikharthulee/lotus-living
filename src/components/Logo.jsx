import Image from "next/image";
import mainLogo from "../../public/logo.png";
import whiteLogo from "../../public/whitelogo.png";

export function Logo({ className = "" }) {
  return (
    <Image
      src={mainLogo}
      alt="Lotus Living logo"
      className={className}
      priority
    />
  );
}

export function WhiteLogo({ className = "" }) {
  return (
    <Image
      src={whiteLogo}
      alt="Lotus Living logo (white)"
      className={className}
      priority
    />
  );
}
