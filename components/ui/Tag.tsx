interface TagProps {
  label: string;
}

export default function Tag({ label }: TagProps) {
  return (
    <span className="inline-block rounded-full border border-white/20 px-3 py-1 text-xs text-white/50 tracking-wide">
      {label}
    </span>
  );
}
