import { Editor } from "@tiptap/react";

interface CommandOptions {
  color?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  openInNewTab?: boolean;
  href?: string;
  linkText?: string;
  imageSrc?: string;
}

export class EditorCommandManager {
  private editor: Editor;
  constructor(editor: Editor) {
    this.editor = editor;
  }

  private COMMANDS: Record<string, (options?: CommandOptions) => void> = {
    bold: () => this.editor.chain().focus().toggleBold().run(),
    italic: () => this.editor.chain().focus().toggleItalic().run(),
    strike: () => this.editor.chain().focus().toggleStrike().run(),
    underline: () => this.editor.chain().focus().toggleUnderline().run(),
    highlight: (options) =>
      this.editor
        .chain()
        .focus()
        .toggleHighlight({ color: options?.color || "" })
        .run(),
    left: () => this.editor.chain().focus().setTextAlign("left").run(),
    right: () => this.editor.chain().focus().setTextAlign("right").run(),
    center: () => this.editor.chain().focus().setTextAlign("center").run(),
    justify: () => this.editor.chain().focus().setTextAlign("justify").run(),
    heading: (options) =>
      this.editor
        .chain()
        .focus()
        .toggleHeading({ level: options?.level || 1 })
        .run(),
    paragraph: () => this.editor.chain().focus().setParagraph().run(),
    bulletList: () => this.editor.chain().focus().toggleBulletList().run(),
    orderedList: () => this.editor.chain().focus().toggleOrderedList().run(),
    blockquote: () => this.editor.chain().focus().toggleBlockquote().run(),
    codeBlock: () =>
      this.editor
        .chain()
        .focus()
        .toggleCodeBlock({ language: "typescript" })
        .run(),
    link: (options) => {
      if (options?.linkText && options?.href) {
        if (options.openInNewTab) {
          this.editor
            .chain()
            .focus()
            .setContent(options.linkText)
            .setTextSelection({
              from: this.editor.state.selection.from,
              to: this.editor.state.selection.from + options.linkText.length,
            })
            .setLink({ href: options.href })
            .run();
        } else {
          this.editor
            .chain()
            .focus()
            .insertContent(options.linkText)
            .setTextSelection({
              from: this.editor.state.selection.from,
              to: this.editor.state.selection.from + options.linkText.length,
            })
            .extendMarkRange("link")
            .setLink({ href: options.href, target: "_blank" })
            .run();
        }
      }
    },
    image: (options) => {
      if (options?.imageSrc)
        this.editor.chain().focus().setImage({ src: options?.imageSrc }).run();
    },
  };

  executeCommand(name: string, options?: CommandOptions) {
    const command = this.COMMANDS[name];
    if (!command) {
      console.warn(`Command ${name} is not supported.`);
      return;
    }
    command(options);
  }

  isActive(props: any, options?: any) {
    return this.editor?.isActive(props, options);
  }

  getActiveLinkDetails() {
    const from = this.editor.state.selection.from;
    const to = this.editor.state.selection.to;
    if (this.isActive("link"))
      return {
        href: this.editor.getAttributes("link").href,
        text:
          this.editor.state.doc.textBetween(0, from, "") ||
          this.editor.state.doc.textBetween(from, to, ""),
      };
  }

  getActiveFormattingName() {
    if (this.isActive("heading", { level: 1 })) return "Heading 1";
    if (this.isActive("heading", { level: 2 })) return "Heading 2";
    if (this.isActive("heading", { level: 3 })) return "Heading 3";
    if (this.isActive("heading", { level: 4 })) return "Heading 4";
    if (this.isActive("heading", { level: 5 })) return "Heading 5";
    if (this.isActive("heading", { level: 6 })) return "Heading 6";
    if (this.isActive("paragraph")) return "Paragraph";
    return "Text Levels";
  }

  getActiveAlignment() {
    if (this.isActive({ textAlign: "left" })) return "left";
    if (this.isActive({ textAlign: "right" })) return "right";
    if (this.isActive({ textAlign: "center" })) return "center";
    if (this.isActive({ textAlign: "justify" })) return "justify";
  }
}
