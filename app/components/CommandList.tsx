"use client";
import { useEffect, useRef } from "react";
import { useFloating, autoUpdate, offset } from "@floating-ui/react";
import { Editor } from "@tiptap/core";

type CommandItem = {
  title: string;
  command: (editor: Editor) => void;
};

type Props = {
  editor: Editor;
  items: CommandItem[];
  command: (item: CommandItem) => void;
};

const CommandList = ({ items, command, editor }: Props) => {
  const { refs, floatingStyles } = useFloating({
    middleware: [offset(5)],
    placement: "bottom-start",
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!refs.reference.current || !containerRef.current) return;

    return autoUpdate(refs.reference.current, containerRef.current, () => {
      refs.floating.current?.style.setProperty(
        "top",
        `${(refs.reference.current as HTMLElement).offsetTop + 30}px`
      );
    });
  }, [refs]);

  return (
    <div
      ref={refs.setFloating}
      style={floatingStyles}
      className="z-50 bg-white shadow-md border p-2 absolute"
    >
      {items.map((item, idx) => (
        <button
          key={idx}
          onClick={() => command(item)}
          className="block w-full text-left px-2 py-1 rounded-md hover:bg-gray-200/40"
        >
          {item.title}
        </button>
      ))}
    </div>
  );
};

export default CommandList;
