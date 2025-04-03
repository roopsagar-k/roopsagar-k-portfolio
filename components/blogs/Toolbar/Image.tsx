import { EditorCommandManager } from "@/services/EditorCommandManager";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Image } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ToolTip } from "../ToolTip";
import { ChangeEventHandler, useState } from "react";
import { Input } from "@/components/ui/input";

export const ImageButton = ({
  commandManager,
}: {
  commandManager: EditorCommandManager;
}) => {
  const [optionSelected, setOptionSelected] = useState<string>("option-one");
  const [imageSrc, setImageSrc] = useState<string>("");
  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc((event?.target?.result) as string);
      };
      reader.readAsDataURL(file);
    }
  };
    const handleClick = () => {
        commandManager.executeCommand("image", { imageSrc: imageSrc })
        setImageSrc("")
    }
  return (
    <Dialog>
      <DialogTrigger>
        <ToolTip content="Image">
          <Button size={"icon"} variant={commandManager.isActive("image") ? "secondary" : "ghost"}>
            <Image />
          </Button>
        </ToolTip>
      </DialogTrigger>
      <DialogContent>
        <RadioGroup onValueChange={setOptionSelected} defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one">Upload image</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two">Paste url</Label>
          </div>
        </RadioGroup>
        {optionSelected === "option-one" ? (
          <Input accept="image/*" disabled={optionSelected !== "option-one"} onChange={onImageUpload} type="file" />
        ) : (
          <Input
            value={imageSrc}
            onChange={(e) => setImageSrc(e.target.value)}
            type="text"
            placeholder="Paste the link here"
          />
        )}
        <DialogFooter>
          <Button onClick={() => handleClick()} disabled={!imageSrc}>Add image</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
