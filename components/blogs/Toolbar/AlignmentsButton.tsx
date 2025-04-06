"use client";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  AlignJustify,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EditorCommandManager } from "@/services/EditorCommandManager";
import { Editor } from "@tiptap/react";
import TextAlign from "@tiptap/extension-text-align";

export const AlignmentButton = ({ commandManager }: { commandManager: EditorCommandManager }) => {

  const alignments = {
    left: {
      name: "left",
      icon: <AlignLeft className="w-4 h-4" />,
    },
    center: {
      name: "center",
      icon: <AlignCenter className="w-4 h-4" />,
    },
    right: {
      name: "right",
      icon: <AlignRight className="w-4 h-4" />,
    },
    justify: {
      name: "justify",
      icon: <AlignJustify className="w-4 h-4" />,
    },
  };

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: { name: string; icon: React.ReactNode }
  ) => {
      e.preventDefault();
      commandManager.executeCommand(value.name)
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          size="sm"
          variant="ghost"
          className="hover:cursor-pointer flex items-center justify-center gap-1 px-2"
        >
          {alignments[commandManager.getActiveAlignment() || "left"].icon}
          <ChevronDown className="w-3 h-3 ml-1" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-max p-2">
        {Object.values(alignments).map((value, idx) => (
          <Button
            size="sm"
            variant={commandManager.isActive({ textAlign: value.name}) ? "secondary" : "ghost"}
            className="hover:cursor-pointer gap-1 px-2"
            onClick={(e) => handleClick(e, value)}
            key={idx}
          >
            {value.icon}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};
