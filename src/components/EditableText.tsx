import { useState, useRef, useEffect } from "react";

interface EditableTextProps {
  value: string;
  onChange: (val: string) => void;
  className?: string;
  multiline?: boolean;
  as?: keyof React.JSX.IntrinsicElements;
  editMode: boolean;
}

export default function EditableText({
  value,
  onChange,
  className = "",
  multiline = false,
  as: Tag = "span",
  editMode,
}: EditableTextProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const ref = useRef<HTMLTextAreaElement & HTMLInputElement>(null);

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
      ref.current.select();
    }
  }, [editing]);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const commit = () => {
    setEditing(false);
    if (draft.trim()) onChange(draft);
    else setDraft(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) { e.preventDefault(); commit(); }
    if (e.key === "Escape") { setDraft(value); setEditing(false); }
  };

  if (!editMode) {
    return <Tag className={className}>{value}</Tag>;
  }

  if (editing) {
    const sharedClass =
      "bg-olive/10 border border-olive/60 outline-none text-inherit font-inherit leading-inherit resize-none rounded-sm px-1 w-full";

    return multiline ? (
      <textarea
        ref={ref as React.RefObject<HTMLTextAreaElement>}
        value={draft}
        rows={3}
        onChange={e => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={handleKeyDown}
        className={`${className} ${sharedClass}`}
      />
    ) : (
      <input
        ref={ref as React.RefObject<HTMLInputElement>}
        type="text"
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={handleKeyDown}
        className={`${className} ${sharedClass}`}
      />
    );
  }

  return (
    <Tag
      className={`${className} cursor-text hover:outline hover:outline-1 hover:outline-olive/40 hover:outline-offset-2 rounded-sm transition-all`}
      onClick={() => setEditing(true)}
      title="Нажмите для редактирования"
    >
      {value}
    </Tag>
  );
}
