"use client";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import Toolbar from "./Toolbar";
import Image from "@tiptap/extension-image";
import { Underline } from "@tiptap/extension-underline";
import { Code } from "@tiptap/extension-code";
import { Strike } from "@tiptap/extension-strike";
import { Blockquote } from "@tiptap/extension-blockquote";
import { HorizontalRule } from "@tiptap/extension-horizontal-rule";

const TipTap = () => {
  const [savedContent, setSavedContent] = useState("");

  const editor: Editor | null = useEditor({
    extensions: [
      StarterKit,
      Image,
      Underline,
      Code,
      Strike,
      Blockquote,
      HorizontalRule,
    ],
    content: "enter text...",
  });

  if (!editor) return null;

  const handleSave = () => {
    // getText()
    // const text = editor.getText();
    // console.log(text);
    // setSavedContent(text);
    // getHTML()
    // const html = editor.getHTML();
    // console.log("Editor content:", html);
    // setSavedContent(html);
    // getJSON()
    const json = editor.getJSON();
    console.log("Editor content:", json.content);
    setSavedContent(JSON.stringify(json.content));
  };

  return (
    <div className="p-4 border rounded-md space-y-4 min-w-96 max-w-[500px]">
      {/* Toolbar */}
      <Toolbar editor={editor} />

      {/* Editor Area */}
      <EditorContent
        editor={editor}
        className="min-h-[300px] p-4 border rounded-md "
      />

      {/* Save button */}
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-indigo-600 text-wgite text-md font-bold rounded-md active:scale-[0.98] hover:bg-indigo-700"
      >
        Save
      </button>

      {/* Saved Content */}
      {savedContent && (
        <div className="px-3 py-2 border rounded-md mt-4">
          <h2 className="text-lg">Saved Content (Html)</h2>
          <hr className="my-2" />
          {/* <div dangerouslySetInnerHTML={{ __html: savedContent }} /> */}
          <p>{savedContent}</p>
        </div>
      )}
    </div>
  );
};

export default TipTap;
