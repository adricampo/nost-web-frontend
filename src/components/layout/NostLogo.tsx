import Link from 'next/link';
import Image from 'next/image';

export default function NostLogo() {
  return (
    <Link href="/" className="hover:opacity-70 transition-opacity block">
      <Image
        src="/logo.svg"
        alt="Nost"
        width={104}
        height={52}
        priority
      />
    </Link>
  );
}
