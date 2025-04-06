"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { Highlight } from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Paragraph from "@tiptap/extension-paragraph";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { ToolBar } from "./blogs/Toolbar/ToolBar";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Heading from "@tiptap/extension-heading";
import { cn } from "@/lib/utils";
import { common, createLowlight } from "lowlight";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import Typography from "@tiptap/extension-typography";
import Image from "@tiptap/extension-image";
import "highlight.js/styles/atom-one-dark.css";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Node } from "@tiptap/core";
import { Send, Loader2, X, Trash2 } from "lucide-react";
import { parseBlogContent } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import deleteBlog from "@/actions/deleteBlog";
import { Checkbox } from "./ui/checkbox";
import updateBlog from "@/actions/updateBlog";

export const UpdateEditor = ({
  html,
  slug,
  featured,
}: {
  html: string;
  slug: string;
  featured: boolean;
}) => {
  const { toast } = useToast();
  const lowlight = createLowlight(common);
  lowlight.register("javascript", js);
  lowlight.register("typescript", ts);
  const [htmlContent, setHTMLContent] = useState(html);
  const [isUpdating, setIsUpdating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [thumbnailType, setThumbnailType] = useState<"url" | "file">("url");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [isFeatured, setIsFeatured] = useState(featured);
  const router = useRouter();

  useEffect(() => {
    if (html) {
      console.log("htmlfrom updated editor", html, featured);
      setHTMLContent(html);
    }
    setIsFeatured(featured);
  }, [html, featured]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnailFile(e.target.files[0]);
    }
  };

  const handleDelete = async () => {
    const res = await deleteBlog(slug);
    if (res.success) {
      toast({
        title: "Blog Deleted",
        description: "Your blog has been deleted successfully.",
        action: <Button onClick={() => router.push("/")}>Go to Home</Button>,
      });
    }
    router.push("/blogs");
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    const {
          title: newTitle,
          excerpt,
          sanitizedHTML,
          tableOfContents,
        } = parseBlogContent(htmlContent);

    console.log("html content", htmlContent);
    console.log("new title", newTitle);
    console.log("slug", slug);

    const formData = new FormData();

    formData.append("html", sanitizedHTML);
    formData.append("title", newTitle as string);
    formData.append("excerpt", excerpt as string);
    formData.append("tableOfContents", JSON.stringify(tableOfContents));
    formData.append("slug", slug);
    formData.append("thumbnailType", thumbnailType);
    formData.append("isFeatured", isFeatured.toString());

    if (thumbnailUrl === "" && thumbnailFile === null) {
      formData.append("thumbnailUpdate", "false");
    } else {
      formData.append("thumbnailUpdate", "true");
    }
    if (thumbnailType === "url") {
      formData.append("thumbnailUrl", thumbnailUrl);
    } else {
      if (thumbnailFile) {
        formData.append("thumbnailFile", thumbnailFile);
      }
    }

    const res = await updateBlog(formData);

    if (res.success) {
      toast({
        title: "Blog Updated",
        description: "Your blog has been updated successfully.",
        action: (
          <Button onClick={() => router.push(`/blogs/${res.data.newSlug}`)}>
            View Blog
          </Button>
        ),
      });
      setDialogOpen(false);
    } else {
      toast({
        title: "Error",
        description: "There was an error updating your blog.",
        variant: "destructive",
      });
    }

    setIsUpdating(false);
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

  const editor = useEditor(
    {
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
      content: html,
      editable: true,
      onUpdate: ({ editor }) => {
        setHTMLContent(editor.getHTML());
      },
    },
    [html]
  );

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
              Publish changes
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Update Blog Post</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
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
                <Label
                  htmlFor="featured"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Feature this post on your profile
                </Label>
              </div>
            </div>

            <div className="flex gap-2 justify-between mt-4">
              <Button
                variant="destructive"
                onClick={handleDelete}
                className="flex-1 gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete Blog
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={isUpdating}
                className="flex-1 gap-2"
              >
                {isUpdating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Update Blog
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
