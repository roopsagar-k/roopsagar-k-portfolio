"use client";
import { TextFormattingButtons } from "./TextFormattingButtons";
import { Editor } from "@tiptap/react";
import { AlignmentButton } from "./AlignmentsButton";
import { EditorCommandManager } from "@/services/EditorCommandManager";
import { TextLevelsButton } from "./TextLevels";
import { BulletList } from "./BulletList";
import { OrderList } from "./OrderList";
import { Blockquote } from "./BlockQuote";
import { CodeBlock } from "./CodeBlock";
import { Link } from "./Link";
import { ImageButton } from "./Image";
import { Button } from "@/components/ui/button";
import { Quote } from "lucide-react";
import { useState } from "react";

export const ToolBar = ({ editor }: { editor: Editor }) => {
  const commandManager = new EditorCommandManager(editor);
  const setExcerpt = () => {
    const isExcerpt = editor?.isActive("paragraph", { class: "excerpt" });

    editor
      ?.chain()
      .focus()
      .setNode("paragraph", { class: isExcerpt ? null : "excerpt" }) // Toggle class
      .run();
  };

  return (
    <div className="flex gap-1 items-center justify-center w-full">
      <TextFormattingButtons commandManager={commandManager} />
      <TextLevelsButton commandManager={commandManager} />
      <AlignmentButton commandManager={commandManager} />
      <BulletList commandManager={commandManager} />
      <OrderList commandManager={commandManager} />
      <Blockquote commandManager={commandManager} />
      <CodeBlock commandManager={commandManager} />
      <Link commandManger={commandManager} />
      <ImageButton commandManager={commandManager} />
      <Button
        size="icon"
        onClick={setExcerpt}
        variant={
          editor?.isActive("paragraph", { class: "excerpt" })
            ? "secondary"
            : "ghost"
        }
      >
        <Quote />
      </Button>
    </div>
  );
};
