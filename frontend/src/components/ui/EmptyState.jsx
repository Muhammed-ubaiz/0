export default function EmptyState({ icon: Icon, title, text, children }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center">
      <span className="grid size-16 place-items-center rounded-full bg-mist text-blue">
        <Icon size={26} />
      </span>
      <h2 className="mt-5 text-2xl font-bold">{title}</h2>
      <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{text}</p>
      {children && <div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div>}
    </div>
  );
}
