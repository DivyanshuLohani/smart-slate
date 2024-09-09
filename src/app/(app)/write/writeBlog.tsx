"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import ReactMarkdown from "react-markdown";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { ToolBar } from "@/components/component/tool-bar";
import generateBlogPost from "@/lib/generateBlog";
import { addBlogToFirestore } from "@/lib/firebase/firestore";
import { useAuthContext } from "@/context/AuthContext";

export default function BlogWritingPage() {
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const textArea = useRef<HTMLTextAreaElement>(null);
  const { theme } = useTheme();

  const handlePromptChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAiPrompt(event.target.value);
  };

  const handleSave = async (draft: boolean = true) => {
    if (!user) return;
    await addBlogToFirestore(content, title, user.uid, !draft);
  };

  const handleGenerateContent = async () => {
    setIsGenerating(true);
    setIsDialogOpen(false);
    const { content, title } = await generateBlogPost(aiPrompt);
    setContent(content);
    setTitle(title);
    setIsGenerating(false);
    setAiPrompt("");
  };

  return (
    <div className="px-4 py-3">
      <Tabs defaultValue="write" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <Card>
          <CardHeader>
            <CardTitle>
              <Input
                className="border-none focus:ring-0 text-3xl font-bold focus-visible:ring-0"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter Title..."
              />
            </CardTitle>
          </CardHeader>
          <TabsContent value="write">
            <CardContent className="p-4" data-color-mode={theme}>
              <ToolBar
                content={content}
                setContent={setContent}
                textAreaRef={textArea}
              />
              <Textarea
                ref={textArea}
                value={content}
                onChange={(value) => setContent(value.target.value)}
                className="min-h-[400px] mb-4"
                placeholder="Write your blog post in Markdown format..."
                disabled={isGenerating}
              />
              <div className="flex justify-between items-center">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button disabled={isGenerating}>Generate with AI</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Generate AI Content</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="prompt" className="text-right">
                          Prompt
                        </Label>
                        <Textarea
                          id="prompt"
                          value={aiPrompt}
                          onChange={handlePromptChange}
                          className="col-span-3"
                          placeholder="Enter a prompt for AI generation..."
                        />
                      </div>
                    </div>
                    <Button
                      onClick={handleGenerateContent}
                      disabled={isGenerating || !aiPrompt.trim()}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        "Generate"
                      )}
                    </Button>
                  </DialogContent>
                </Dialog>
                <span className="text-sm text-muted-foreground">
                  {content.length} characters
                </span>
              </div>
            </CardContent>
          </TabsContent>
          <TabsContent value="preview">
            <Card>
              <CardContent className="prose dark:prose-invert max-w-none p-4">
                <ReactMarkdown>{content}</ReactMarkdown>
              </CardContent>
              <CardFooter>
                <div className="flex gap-3 items-center">
                  <Button
                    disabled={isGenerating}
                    onClick={() => handleSave(true)}
                  >
                    Save Draft
                  </Button>
                  <Button
                    disabled={isGenerating}
                    onClick={() => handleSave(false)}
                  >
                    Publish
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
}
