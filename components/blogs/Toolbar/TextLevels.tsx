import { EditorCommandManager } from "@/services/EditorCommandManager";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Pilcrow,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

export const TextLevelsButton = ({
  commandManager,
}: {
  commandManager: EditorCommandManager;
}) => {
  const levels = [
    { name: "Heading 1", icon: <Heading1 className="w-4 h-4" /> },
    { name: "Heading 2", icon: <Heading2 className="w-4 h-4" /> },
    { name: "Heading 3", icon: <Heading3 className="w-4 h-4" /> },
    { name: "Heading 4", icon: <Heading4 className="w-4 h-4" /> },
    { name: "Heading 5", icon: <Heading5 className="w-4 h-4" /> },
    { name: "Heading 6", icon: <Heading6 className="w-4 h-4" /> },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="hover:cursor-pointer flex items-center justify-center gap-1 px-2"
        >
          {commandManager.getActiveFormattingName()}
          <ChevronDown className="w-3 h-3 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuItem
          onClick={() => commandManager.executeCommand("paragraph")}
          className={`p-2 hover:bg-secondary hover:cursor-pointer flex justify-between items-center`}
        >
          Paragraph
          <Pilcrow className="w-4 h-4" />
        </DropdownMenuItem>
        {levels.map((level, idx) => (
          <div key={idx}>
            <Separator />
            <DropdownMenuItem
              onClick={() =>
                commandManager.executeCommand("heading", {
                  level: (idx + 1) as 1 | 2 | 3 | 4 | 5 | 6,
                })
              }
              className={`p-2 hover:bg-secondary hover:cursor-pointer flex items-center justify-between ${
                commandManager.isActive("heading", { level: idx + 1 })
                  ? "bg-secondary"
                  : ""
              }`}
            >
              {level.name} {level.icon}
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
