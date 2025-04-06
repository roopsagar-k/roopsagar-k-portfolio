import { EditorCommandManager } from "@/services/EditorCommandManager";
import { ToolTip } from "../ToolTip";
import { Button } from "@/components/ui/button";
import { CodeXml } from "lucide-react";

export const CodeBlock = ({
  commandManager,
}: {
  commandManager: EditorCommandManager;
}) => {
  return (
    <ToolTip content="CodeBlock">
      <Button
        onClick={() => commandManager.executeCommand("codeBlock")}
        size={"icon"}
        variant={commandManager.isActive("codeBlock") ? "secondary" : "ghost"}
      >
        <CodeXml className="h-4 w-4" />
      </Button>
    </ToolTip>
  );
};
