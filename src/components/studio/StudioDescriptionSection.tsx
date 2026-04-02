interface Props {
  descriptionP1?: string;
  descriptionP2?: string;
}

export default function StudioDescriptionSection({
  descriptionP1,
  descriptionP2
}: Props) {
  if (!descriptionP1 && !descriptionP2) return null;

  return (
    <div className="grid px-9 mt-12 mb-12 grid-cols-1 lg:grid-cols-[50%_1fr]">
      <div className="hidden lg:block" />
      <div className="flex flex-col gap-7">
        {descriptionP1 && (
          <p className="text-[21px] leading-[33px] font-light">
            {descriptionP1}
          </p>
        )}
        {descriptionP2 && (
          <p className="text-[21px] leading-[33px] font-light">
            {descriptionP2}
          </p>
        )}
      </div>
    </div>
  );
}
