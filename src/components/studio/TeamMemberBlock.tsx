import Image from 'next/image';
import { getStrapiImageUrl } from '@/lib/strapi';
import type { TeamMember } from '@/lib/types';

interface Props {
  member: TeamMember;
  reverse?: boolean;
}

export default function TeamMemberBlock({ member, reverse = false }: Props) {
  const photoUrl = member.photo ? getStrapiImageUrl(member.photo.url) : null;

  return (
    <div className={`flex gap-10 items-start ${reverse ? 'flex-row-reverse' : 'flex-row'}`}>
      {photoUrl && (
        <div className="relative w-[260px] flex-shrink-0 aspect-[3/4] overflow-hidden">
          <Image
            src={photoUrl}
            alt={member.name}
            fill
            sizes="260px"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-col gap-4 py-4">
        <h3
          className="text-[#13136B] text-[25px] font-light"
          style={{ fontFamily: 'var(--font-cormorant), serif' }}
        >
          {member.name}
        </h3>
        <p
          className="text-[#13136B] text-[26px] leading-[33px] font-light"
          style={{ fontFamily: 'var(--font-cormorant), serif' }}
        >
          {member.bio}
        </p>
      </div>
    </div>
  );
}
