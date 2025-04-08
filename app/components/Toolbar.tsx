import { Editor } from "@tiptap/react";

const Toolbar = ({ editor }: { editor: Editor }) => {
  const buttons = [
    {
      label: "Bold",
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    {
      label: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
    },
    {
      label: "H1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive("heading", { level: 1 }),
    },
    {
      label: "H2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
    },
    {
      label: "Paragraph",
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: editor.isActive("paragraph"),
    },
    {
      label: "Bullet List",
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      label: "Numbered List",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("numberedList"),
    },
    {
      label: "Image",
      action: () => addImage(),
      isActive: editor.isActive("image"),
    },
    {
      label: "U",
      action: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive("underline"),
    },
    {
      label: "</>",
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: editor.isActive("code"),
    },
    {
      label: '"',
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive("blockquote"),
    },
    {
      label: "S",
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
    },
    {
      label: "-",
      action: () => editor.chain().focus().setHorizontalRule().run(),
      isActive: editor.isActive("horizontalRule"),
    },
    {
      label: "Clear",
      action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
      isActive: () => false,
    },
  ];

  const addImage = () => {
    const url = prompt("Url of the image:") as string;
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="space-x-4 space-y-3">
      {/* Toolbar */}
      {buttons.map((btn) => (
        <button
          key={btn.label}
          onClick={btn.action}
          className={`px-2 py-1 rounded-md text-md  ${
            btn.isActive ? "bg-gray-400/30" : "hover:bg-gray-400/10"
          }`}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
};

export default Toolbar;
