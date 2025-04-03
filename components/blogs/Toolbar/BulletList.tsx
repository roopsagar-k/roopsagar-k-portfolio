import { EditorCommandManager } from "@/services/EditorCommandManager";
import { List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToolTip } from "../ToolTip";

export const BulletList = ({
  commandManager,
}: {
  commandManager: EditorCommandManager;
}) => {
  return (
    <ToolTip content="BulletList">
      <Button
        onClick={() => commandManager.executeCommand("bulletList")}
        size={"icon"}
        variant={commandManager.isActive("bulletList") ? "secondary" : "ghost"}
      >
        <List className="h-4 w-4" />
      </Button>
    </ToolTip>
  );
};
