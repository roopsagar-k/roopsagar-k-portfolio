"use client";

import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Highlighter,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Editor } from "@tiptap/react";
import { EditorCommandManager } from "@/services/EditorCommandManager";
import { ChevronDown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const buttons = [
  { name: "bold", icon: <Bold className="h-4 w-4" />, tooltip: "Bold" },
  { name: "italic", icon: <Italic className="h-4 w-4" />, tooltip: "Italic" },
  {
    name: "underline",
    icon: <Underline className="h-4 w-4" />,
    tooltip: "Underline",
  },
  {
    name: "strike",
    icon: <Strikethrough className="h-4 w-4" />,
    tooltip: "Strikethrough",
  },
  {
    name: "highlight",
    icon: <Highlighter className="h-4 w-4" />,
    tooltip: "Highlight",
  },
];

export const TextFormattingButtons = ({
  commandManager,
}: {
  commandManager: EditorCommandManager;
}) => {
  return (
    <TooltipProvider>
      <div className="flex items-center space-x-1 rounded-md p-1 shadow-sm">
        {buttons.map(({ name, icon, tooltip }) => (
          <ToolBarButton
            key={name}
            commandManager={commandManager}
            icon={icon}
            name={name}
            tooltip={tooltip}
          />
        ))}
      </div>
    </TooltipProvider>
  );
};

const ToolBarButton = ({
  icon,
  name,
  tooltip,
  commandManager,
}: {
  icon: React.ReactNode;
  name: string;
  tooltip: string;
  commandManager: EditorCommandManager;
}) => {
  const isActive = commandManager.isActive(name);
  const [hightLightColor, setHighLightColor] = useState("#FFFF00");

  useEffect(() => {
    if (name === "highlight" && isActive)
      commandManager.executeCommand("highlight", { color: hightLightColor });
  }, [hightLightColor]);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    commandManager.executeCommand(name, { color: hightLightColor });
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {name === "highlight" ? (
          <div
            className="flex gap-1 items-center rounded-md bg-background shadow-sm border-b-2"
            style={{
              borderBottomColor: hightLightColor || "#FFFF00",
            }}
          >
            <Button
              id={name}
              variant={isActive ? "secondary" : "ghost"}
              size="icon"
              onClick={handleButtonClick}
            >
              {icon}
            </Button>
            <ColorPicker
              color={hightLightColor}
              onColorChange={setHighLightColor}
            />
          </div>
        ) : (
          <Button
            id={name}
            variant={isActive ? "secondary" : "ghost"}
            size="icon"
            onClick={handleButtonClick}
          >
            {icon}
          </Button>
        )}
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
};

const ColorPicker = ({
  color,
  onColorChange,
}: {
  color: string;
  onColorChange: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const highlightColors = [
    { name: "Yellow", value: "#FFFF00" },
    { name: "Light Blue", value: "#00FFFF" },
    { name: "Light Green", value: "#90EE90" },
    { name: "Light Pink", value: "#FFB6C1" },
    { name: "Light Orange", value: "#FFD700" },
    { name: "Lavender", value: "#E6E6FA" },
    { name: "Peach", value: "#FFDAB9" },
    { name: "Light Coral", value: "#F08080" },
    { name: "Khaki", value: "#F0E68C" },
    { name: "Pale Green", value: "#98FB98" },
    { name: "Pale Turquoise", value: "#AFEEEE" },
    { name: "Pale Violet Red", value: "#DB7093" },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-0" asChild>
        <Button variant="ghost" size="sm" className="h-8 w-6 p-0 -ml-2">
          <ChevronDown className="h-3 w-3 p-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <div className="flex items-center justify-between px-2 py-1.5">
          <span className="text-sm font-medium">Default</span>
          <div
            className="w-6 h-6 rounded-sm border border-input cursor-pointer"
            style={{ backgroundColor: "#FFFF00" }}
            onClick={() => onColorChange("")}
          />
        </div>
        <DropdownMenuSeparator />
        <div className="grid grid-cols-4 gap-2 p-2">
          {highlightColors.map((color, idx) => (
            <div
              key={color.value}
              className="w-10 h-10 rounded-sm border border-input cursor-pointer"
              style={{ backgroundColor: color.value }}
              onClick={() => onColorChange(idx === 0 ? "" : color.value)}
              title={color.name}
            />
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
