import { EditorCommandManager } from "@/services/EditorCommandManager";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link2, Vault } from "lucide-react";
import { ToolTip } from "../ToolTip";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export const Link = ({
  commandManger,
}: {
  commandManger: EditorCommandManager;
}) => {
  const [url, setUrl] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [openInNewTab, setOpenInNewTab] = useState<boolean>(false);
  const [linkText, setLinkText] = useState<string>("");
  const [open, setOpen] = useState(false);

  const validateUrl = (value: string) => {
    const urlRegex =
      /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(:[0-9]{1,5})?(\/\S*)?$/;
    setIsValid(urlRegex.test(value));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setUrl(value);
    validateUrl(value);
  };

  const handleClick = () => {
    if (isValid)
      commandManger.executeCommand("Link", {
        openInNewTab: openInNewTab,
        linkText: linkText,
        href: url,
      });
    setOpen(false);
    setOpenInNewTab(false);
    setLinkText("");
    setUrl("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <ToolTip content="link">
          <Button
            variant={commandManger.isActive("link") ? "secondary" : "ghost"}
            size={"icon"}
          >
            <Link2 />
          </Button>
        </ToolTip>
      </DialogTrigger>
      <DialogContent>
        <Input
          value={
            commandManger.isActive("link")
              ? commandManger.getActiveLinkDetails()?.text
              : linkText
          }
          onChange={(e) => setLinkText(e.target.value)}
          type="text"
          className="mt-4"
          placeholder="Enter the text"
        />
        <Input
          value={
            commandManger.isActive("link")
              ? commandManger.getActiveLinkDetails()?.href
              : url
          }
          onChange={handleChange}
          type="text"
          placeholder="Paste the link"
          required
        />
        {!isValid && (
          <p className="text-destructive">Please enter a valid URL.</p>
        )}

        <label className="flex gap-4 text-slate-400 ml-2" htmlFor="newtab">
          Open in new tab
          <Checkbox
            id="newtab"
            checked={openInNewTab}
            onCheckedChange={() => setOpenInNewTab(!openInNewTab)}
            className="rounded-md active:ring-2 w-5 h-5 accent-primary"
            required
          />
        </label>
        <DialogFooter>
          <Button disabled={!url || !linkText} onClick={() => handleClick()}>
            Create Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
