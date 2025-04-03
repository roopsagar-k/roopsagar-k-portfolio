"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { Highlight } from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Paragraph from "@tiptap/extension-paragraph";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { ToolBar } from "./Toolbar/ToolBar";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Heading from "@tiptap/extension-heading";
import { cn } from "@/lib/utils";
import { common, createLowlight } from "lowlight";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import Typography from "@tiptap/extension-typography";
import Image from "@tiptap/extension-image";
import "highlight.js/styles/atom-one-dark.css";
import { useState } from "react";
import { Button } from "../ui/button";
import { Node } from "@tiptap/core";
import { Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Editor = () => {
  const { toast } = useToast();
  const lowlight = createLowlight(common);
  lowlight.register("javascript", js);
  lowlight.register("typescript", ts);
  const initialContent = "";
  const [htmlContent, setHTMLContent] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    console.log("yoo ji paunchgaya")
    if (!htmlContent.trim()) {
      toast({
        title: "Empty content",
        description: "Please write something before publishing.",
        variant: "destructive",
      });
      return;
    }

    setIsPublishing(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast({
        title: "Success!",
        description: "Your post has been published.",
      });
      console.log(htmlContent);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish your post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const CustomParagraph = Node.create({
    name: "paragraph",
    group: "block",
    content: "inline*",

    parseHTML() {
      return [{ tag: "p" }];
    },

    renderHTML({ HTMLAttributes }) {
      return ["p", HTMLAttributes, 0];
    },

    addAttributes() {
      return {
        class: {
          default: null,
          parseHTML: (element) => element.getAttribute("class") || null,
          renderHTML: (attributes) => {
            return attributes.class ? { class: attributes.class } : {};
          },
        },
      };
    },

    addKeyboardShortcuts() {
      return {
        Enter: ({ editor }) => {
          if (editor.isActive("paragraph", { class: "excerpt" })) {
            editor
              .chain()
              .focus()
              .splitBlock()
              .setNode("paragraph", { class: null })
              .run();
            return true;
          }
          return false;
        },
      };
    },
  });

  const editor = useEditor({
    extensions: [
      CustomParagraph,
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        bold: {
          HTMLAttributes: {
            class: "font-bold",
          },
        },
        italic: {
          HTMLAttributes: {
            class: "italic",
          },
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        blockquote: {
          HTMLAttributes: {
            class:
              "italic text-base text-white bg-secondary border-l-4 border-primary p-4 my-4 rounded-md relative",
          },
        },
      }),
      Image.configure({
        allowBase64: true,
        inline: true,
        HTMLAttributes: {
          class: "my-4",
        },
      }),
      Typography,
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "typescript",
        HTMLAttributes: {
          class: "bg-secondary p-4 rounded-md my-4",
        },
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
        HTMLAttributes: (attrs: any) => ({
          class: attrs.level === 1 ? "editor-title" : "",
        }),
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: "https",
        HTMLAttributes: {
          class: "text-primary",
        },
      }),
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: {
          class: "text-black",
        },
      }),
      Paragraph.configure({
        HTMLAttributes: {
          class: "editor-paragraph",
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing your thoughts here… ✍️✨",
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    editorProps: {
      attributes: {
        class: cn(
          "focus:outline-none",
          "[&_h1]:text-4xl [&_h1]:font-bold [&_h1]:mb-6 [&_h1]:mt-8",
          "[&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:mb-5 [&_h2]:mt-7",
          "[&_h3]:text-2xl [&_h3]:font-medium [&_h3]:mb-4 [&_h3]:mt-6",
          "[&_h4]:text-xl [&_h4]:font-normal [&_h4]:mb-3 [&_h4]:mt-5",
          "[&_h5]:text-lg [&_h5]:font-light [&_h5]:mb-2 [&_h5]:mt-4",
          "[&_h6]:text-base [&_h6]:font-thin [&_h6]:mb-1 [&_h6]:mt-3",
          "[&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4"
        ),
      },
    },
    autofocus: true,
    content: initialContent,
    editable: true,
    onUpdate: ({ editor }) => {
      setHTMLContent(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="fixed top-4 bg-primary/30 backdrop-blur-md z-[10000] -pt-2 rounded-md">
        <ToolBar editor={editor!} />
      </div>
      <EditorContent
        className="w-[700px] bg-background/25 min-h-screen my-4 rounded-md mt-20 pb-24"
        editor={editor}
      />
      <div className="fixed bottom-8 right-8">
        <Button
          size="lg"
          className="shadow-lg hover:shadow-primary/25 transition-all duration-300 gap-2"
          onClick={async () => await handlePublish()}
          disabled={isPublishing}
        >
          {isPublishing ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
          {isPublishing ? "Publishing..." : "Publish"}
        </Button>
      </div>
    </div>
  );
};
