import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import CommandList from "@/app/components/CommandList";

export const SlashCommand = Extension.create({
  name: "slash-command",

  addOptions() {
    return {
      suggestion: {
        char: "/",
        startOfLine: true,

        items: () => [
          {
            title: "Heading 1",
            command: (editor: any) =>
              editor.chain().focus().toggleHeading({ level: 1 }).run(),
          },
          {
            title: "Heading 2",
            command: (editor: any) =>
              editor.chain().focus().toggleHeading({ level: 2 }).run(),
          },
          {
            title: "Bullet List",
            command: (editor: any) =>
              editor.chain().focus().toggleBulletList().run(),
          },
        ],

        render: () => {
          let component: any;
          let popup: any;

          return {
            onStart: (props: any) => {
              component = document.createElement("div");
              document.body.appendChild(component);

              popup = tippy("body", {
                getReferenceClientRect: props.clientRect,
                appendTo: () => document.body,
                content: "",
                showOnCreate: true,
                interactive: true,
                trigger: "manual",
              });

              popup[0].setContent(
                CommandList({
                  editor: props.editor,
                  items: props.items,
                  command: (item) => {
                    props.command(item);
                    popup[0].destroy();
                  },
                })
              );
            },
            onUpdate(props: any) {
              popup[0].setContent(
                CommandList({
                  editor: props.editor,
                  items: props.items,
                  command: (item) => {
                    props.command(item);
                    popup[0].destroy();
                  },
                })
              );
            },
            onExit() {
              popup[0].destroy();
              component.remove();
            },
          };
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});
