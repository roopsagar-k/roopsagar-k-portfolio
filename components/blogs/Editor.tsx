"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { Highlight } from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Paragraph from "@tiptap/extension-paragraph";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { ToolBar } from "./Toolbar/ToolBar";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Heading from "@tiptap/extension-heading";
import { cn } from "@/lib/utils";
import { common, createLowlight } from "lowlight";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import Typography from "@tiptap/extension-typography";
import Image from "@tiptap/extension-image";
import "highlight.js/styles/atom-one-dark.css";
import { useState } from "react";
import { Button } from "../ui/button";
import { Node } from "@tiptap/core";
import { Send, Loader2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { parseBlogContent } from "@/lib/utils";
import createBlog from "@/actions/createBlog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

export const Editor = () => {
  const { toast } = useToast();
  const lowlight = createLowlight(common);
  lowlight.register("javascript", js);
  lowlight.register("typescript", ts);
  const initialContent = "";
  const [htmlContent, setHTMLContent] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Add new state variables for the form fields
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [thumbnailType, setThumbnailType] = useState<"url" | "file">("url");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [isFeatured, setIsFeatured] = useState(false);
  const router = useRouter();

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnailFile(e.target.files[0]);
    }
  };

  const handlePublish = async () => {
    if (!htmlContent.trim()) {
      toast({
        title: "Empty content",
        description: "Please write something before publishing.",
        variant: "destructive",
      });
      return;
    }

    const {
      title,
      excerpt,
      sanitizedHTML: html,
      tableOfContents,
    } = parseBlogContent(htmlContent);

    if (!title || !excerpt) {
      toast({
        title: "Error",
        description: "Title and Excerpt is required. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (!tags.length) {
      toast({
        title: "Error",
        description: "Please add at least one tag.",
        variant: "destructive",
      });
      return;
    }

    if (thumbnailType === "url" && !thumbnailUrl) {
      toast({
        title: "Error",
        description: "Please provide a thumbnail URL.",
        variant: "destructive",
      });
      return;
    }

    if (thumbnailType === "file" && !thumbnailFile) {
      toast({
        title: "Error",
        description: "Please upload a thumbnail image.",
        variant: "destructive",
      });
      return;
    }

    setIsPublishing(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("excerpt", excerpt);
      formData.append("thumbnailType", thumbnailType);

      if (thumbnailType === "url") {
        formData.append("thumbnailUrl", thumbnailUrl);
      } else if (thumbnailFile) {
        formData.append("thumbnailFile", thumbnailFile);
      }
      console.log("table of contents", tableOfContents);
      formData.append("isFeatured", isFeatured.toString());
      formData.append("tags", tags.join(","));
      formData.append("tableOfContents", JSON.stringify(tableOfContents));
      formData.append("html", html);

      const res = await createBlog(formData);
      if (res.success) {
        toast({
          title: "Success!",
          description: `Your post has been ${
            isFeatured ? "featured and " : ""
          }published.`,
        });
        router.push("/blogs");
      }
      console.log(htmlContent, { isFeatured });
      setDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish your post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const CustomParagraph = Node.create({
    name: "paragraph",
    group: "block",
    content: "inline*",

    parseHTML() {
      return [{ tag: "p" }];
    },

    renderHTML({ HTMLAttributes }) {
      return ["p", HTMLAttributes, 0];
    },

    addAttributes() {
      return {
        class: {
          default: null,
          parseHTML: (element) => element.getAttribute("class") || null,
          renderHTML: (attributes) => {
            return attributes.class ? { class: attributes.class } : {};
          },
        },
      };
    },

    addKeyboardShortcuts() {
      return {
        Enter: ({ editor }) => {
          if (editor.isActive("paragraph", { class: "excerpt" })) {
            editor
              .chain()
              .focus()
              .splitBlock()
              .setNode("paragraph", { class: null })
              .run();
            return true;
          }
          return false;
        },
      };
    },
  });

  const editor = useEditor({
    extensions: [
      CustomParagraph,
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        bold: {
          HTMLAttributes: {
            class: "font-bold",
          },
        },
        italic: {
          HTMLAttributes: {
            class: "italic",
          },
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        blockquote: {
          HTMLAttributes: {
            class:
              "italic text-base text-white bg-secondary border-l-4 border-primary p-4 my-4 rounded-md relative",
          },
        },
      }),
      Image.configure({
        allowBase64: true,
        inline: true,
        HTMLAttributes: {
          class: "my-4",
        },
      }),
      Typography,
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "typescript",
        HTMLAttributes: {
          class: "bg-secondary p-4 rounded-md my-4",
        },
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
        HTMLAttributes: (attrs: any) => ({
          class: attrs.level === 1 ? "editor-title" : "",
        }),
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: "https",
        HTMLAttributes: {
          class: "text-primary",
        },
      }),
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: {
          class: "text-black",
        },
      }),
      Paragraph.configure({
        HTMLAttributes: {
          class: "editor-paragraph",
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing your thoughts here… ✍️✨",
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    editorProps: {
      attributes: {
        class: cn(
          "focus:outline-none",
          "[&_h1]:text-4xl [&_h1]:font-bold [&_h1]:mb-6 [&_h1]:mt-8",
          "[&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:mb-5 [&_h2]:mt-7",
          "[&_h3]:text-2xl [&_h3]:font-medium [&_h3]:mb-4 [&_h3]:mt-6",
          "[&_h4]:text-xl [&_h4]:font-normal [&_h4]:mb-3 [&_h4]:mt-5",
          "[&_h5]:text-lg [&_h5]:font-light [&_h5]:mb-2 [&_h5]:mt-4",
          "[&_h6]:text-base [&_h6]:font-thin [&_h6]:mb-1 [&_h6]:mt-3",
          "[&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4"
        ),
      },
    },
    autofocus: true,
    content: initialContent,
    editable: true,
    onUpdate: ({ editor }) => {
      setHTMLContent(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="fixed top-4 bg-primary/30 backdrop-blur-md z-[10000] -pt-2 rounded-md">
        <ToolBar editor={editor!} />
      </div>
      <EditorContent
        className="w-[700px] bg-background/25 min-h-screen my-4 rounded-md mt-20 pb-24"
        editor={editor}
      />
      <div className="fixed bottom-8 right-8">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="shadow-lg hover:shadow-primary/25 transition-all duration-300 gap-2"
            >
              <Send className="h-5 w-5" />
              Publish
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Publish Post</DialogTitle>
              <DialogDescription>
                Complete the details below to publish your post.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              {/* Tags Input */}
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <div
                      key={tag}
                      className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md flex items-center gap-1"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="text-muted-foreground hover:text-destructive"
                        type="button"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <Input
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Type a tag and press Enter"
                />
              </div>

              {/* Thumbnail Input */}
              <div className="grid gap-2">
                <Label>Thumbnail</Label>
                <Tabs
                  defaultValue="url"
                  onValueChange={(value) =>
                    setThumbnailType(value as "url" | "file")
                  }
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="url">URL</TabsTrigger>
                    <TabsTrigger value="file">Upload</TabsTrigger>
                  </TabsList>
                  <TabsContent value="url" className="mt-2">
                    <Input
                      placeholder="Enter image URL"
                      value={thumbnailUrl}
                      onChange={(e) => setThumbnailUrl(e.target.value)}
                    />
                  </TabsContent>
                  <TabsContent value="file" className="mt-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    {thumbnailFile && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Selected: {thumbnailFile.name}
                      </p>
                    )}
                  </TabsContent>
                </Tabs>
              </div>

              {/* Featured Checkbox */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={isFeatured}
                  onCheckedChange={(checked) =>
                    setIsFeatured(checked as boolean)
                  }
                />
                <Label htmlFor="featured">
                  Feature this post on your profile
                </Label>
              </div>
            </div>

            <DialogFooter>
              <Button
                onClick={handlePublish}
                disabled={isPublishing}
                className="w-full"
              >
                {isPublishing ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : null}
                Publish Post
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
