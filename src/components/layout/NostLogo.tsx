import Link from 'next/link';

export default function NostLogo() {
  return (
    <Link
      href="/"
      className="text-[#13136B] font-light text-[56px] leading-none hover:opacity-70 transition-opacity"
      style={{ fontFamily: 'var(--font-cormorant), serif' }}
    >
      Nost
    </Link>
  );
}
