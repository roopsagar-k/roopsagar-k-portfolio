import { EditorCommandManager } from "@/services/EditorCommandManager";
import { ToolTip } from "../ToolTip";
import { Button } from "@/components/ui/button";
import { MessageSquareQuote } from "lucide-react";

export const Blockquote = ({
  commandManager,
}: {
  commandManager: EditorCommandManager;
}) => {
  return (
    <ToolTip content="BlockQuote">
      <Button
        onClick={() => commandManager.executeCommand("blockquote")}
        size={"icon"}
        variant={commandManager.isActive("blockquote") ? "secondary" : "ghost"}
      >
        <MessageSquareQuote className="h-4 w-4" />
      </Button>
    </ToolTip>
  );
};
