import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  BoldIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3,
  ImageIcon,
  ItalicIcon,
  LinkIcon,
  ListOrderedIcon,
  Quote,
  StrikethroughIcon,
} from "lucide-react";

type ToolBarProps = {
  content: string;
  setContent: (content: string) => void;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
};

export function ToolBar({ content, setContent, textAreaRef }: ToolBarProps) {
  const insertMarkdown = (syntax: string, wrap: boolean = true) => {
    if (!textAreaRef.current) return;
    const textarea = textAreaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const beforeText = content.substring(0, start);
    const afterText = content.substring(end);

    if (wrap) {
      setContent(beforeText + `${syntax}${selectedText}${syntax}` + afterText);
    } else {
      setContent(beforeText + `${syntax}${selectedText}` + afterText);
    }
  };
  const insertLink = () => {
    const url = prompt("Enter the link URL");
    if (url) {
      setContent(content + `[${window.getSelection()?.toString()}](${url})`);
    }
  };

  return (
    <div className="flex items-center bg-background border-b border-input px-4 py-2 gap-2 md:flex-wrap md:justify-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => insertMarkdown("**")}
            >
              <BoldIcon className="h-4 w-4" />
              <span className="sr-only">Bold</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Bold</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => insertMarkdown("_")}
            >
              <ItalicIcon className="h-4 w-4" />
              <span className="sr-only">Italic</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Italic</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => insertMarkdown("~~")}
            >
              <StrikethroughIcon className="h-4 w-4" />
              <span className="sr-only">Strikethrough</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Strikethrough</TooltipContent>
        </Tooltip>
        <Separator
          orientation="vertical"
          className="mx-1 h-6 hidden md:block"
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => insertMarkdown("# ", false)}
            >
              <Heading1Icon className="h-4 w-4" />
              <span className="sr-only">Heading 1</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Heading 1</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => insertMarkdown("## ", false)}
            >
              <Heading2Icon className="h-4 w-4" />
              <span className="sr-only">Heading 2</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Heading 2</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => insertMarkdown("### ", false)}
            >
              <Heading3 className="h-4 w-4" />
              <span className="sr-only">Heading 3</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Heading 3</TooltipContent>
        </Tooltip>
        <Separator
          orientation="vertical"
          className="mx-1 h-6 hidden md:block"
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => insertMarkdown("- ", false)}
            >
              <ListOrderedIcon className="h-4 w-4" />
              <span className="sr-only">Unordered List</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Unordered List</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => insertMarkdown("1. ", false)}
            >
              <ListOrderedIcon className="h-4 w-4" />
              <span className="sr-only">Ordered List</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Ordered List</TooltipContent>
        </Tooltip>
        <Separator
          orientation="vertical"
          className="mx-1 h-6 hidden md:block"
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={insertLink}>
              <LinkIcon className="h-4 w-4" />
              <span className="sr-only">Link</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Link</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => insertMarkdown("![alt text](url)", false)}
            >
              <ImageIcon className="h-4 w-4" />
              <span className="sr-only">Image</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Image</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => insertMarkdown("```\n", false)}
            >
              <CodeIcon />
              <span className="sr-only">Code</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Code</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => insertMarkdown("> ", false)}
            >
              <Quote />
              <span className="sr-only">Blockquote</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Blockquote</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
