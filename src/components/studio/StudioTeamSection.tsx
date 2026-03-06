import Image from 'next/image';
import { getStrapiImageUrl } from '@/lib/strapi';
import type { StrapiImage, TeamMember } from '@/lib/types';

interface Props {
  introImage2?: StrapiImage;
  teamMembers: TeamMember[];
}

export default function StudioTeamSection({ introImage2, teamMembers }: Props) {
  return (
    <div className="grid px-9 mb-36" style={{ gridTemplateColumns: '50% 1fr' }}>
      {introImage2 ? (
        <div style={{ paddingRight: 80 }}>
          <div
            className="relative overflow-hidden"
            style={{ aspectRatio: '3/4' }}
          >
            <Image
              src={getStrapiImageUrl(introImage2.url)}
              alt={introImage2.alternativeText || 'Studio team'}
              fill
              sizes="40vw"
              className="object-cover"
            />
          </div>
        </div>
      ) : (
        <div />
      )}

      {teamMembers.length > 0 && (
        <div
          className="flex flex-col gap-10"
          style={{ paddingTop: 'calc(26.67vw - 81px)' }}
        >
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="grid"
              style={{ gridTemplateColumns: '200px 1fr', gap: '2rem' }}
            >
              <span className="text-[20px] leading-[33px] font-light">
                {member.name}
              </span>
              <p className="text-[21px] leading-[33px] font-light whitespace-pre-line font-apercu">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
