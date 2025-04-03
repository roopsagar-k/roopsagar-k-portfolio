import { EditorCommandManager } from "@/services/EditorCommandManager";
import { ToolTip } from "../ToolTip";
import { Button } from "@/components/ui/button";
import { ListOrdered } from "lucide-react";

export const OrderList = ({
  commandManager,
}: {
  commandManager: EditorCommandManager;
}) => {
  return (
    <ToolTip content="OrderedList">
      <Button
        onClick={() => commandManager.executeCommand("orderedList")}
        size={"icon"}
        variant={commandManager.isActive("orderedList") ? "secondary" : "ghost"}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
    </ToolTip>
  );
};
