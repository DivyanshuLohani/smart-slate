export interface BlogPost {
  content: string;
  id: string;
  published_at: Date | null; // Allow for unpublished drafts
  draft: boolean;
  title: string;
  slug: string; // URL-friendly string for the blog post
  cover_image: string | null; // URL to the cover image
  created_at: Date;
  edited_at: Date;
  tags: string[]; // Array of tags associated with the blog post
  user: string; // User ID of the author
  likes: number; // Number of likes the blog post has received
}
