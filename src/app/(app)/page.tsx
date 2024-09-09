"use client";
import { Button } from "@/components/ui/button";
import { getPublishedBlogs } from "@/lib/firebase/firestore";
import { BlogPost } from "@/lib/types";
import { Heart, MessageCircle, Bookmark } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function BlogHome() {
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getPublishedBlogs().then((blogs) => {
      setArticles(blogs);
      setIsLoading(false);
    });
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/4 lg:pr-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-lg shadow mb-8 overflow-hidden"
            >
              {article.cover_image && (
                <Image
                  src={article.cover_image}
                  alt={article.title}
                  width={800}
                  height={400}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl md:text-2xl font-bold mb-2">
                  {article.title}
                </h2>
                {/* <div className="flex items-center mb-4">
                  <Image
                    src={article.avatar}
                    alt={article.author.name}
                    width={40}
                    height={40}
                    className="rounded-full mr-2"
                  />
                  <span className="text-gray-600 text-sm md:text-base">
                    {article.author.name}
                  </span>
                </div> */}
                {/* <p className="text-gray-700 mb-4 text-sm md:text-base">
                  {article.description}
                </p> */}
                {/* <div className="flex flex-wrap mb-4">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-xs md:text-sm mr-2 mb-2"
                    >
                      #{tag}
                    </span>
                  ))}
                </div> */}
                <div className="flex items-center text-gray-600">
                  <Button variant="ghost" size="sm" className="mr-4">
                    <Heart className="w-4 h-4 md:w-5 md:h-5 mr-1" />
                    <span className="text-xs md:text-sm">{article.likes}</span>
                  </Button>

                  <Button variant="ghost" size="sm">
                    <Bookmark className="w-4 h-4 md:w-5 md:h-5" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <aside className="w-full lg:w-1/4">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="font-bold text-lg mb-4">Popular Tags</h3>
            <div className="flex flex-wrap">
              {[
                "javascript",
                "react",
                "webdev",
                "beginners",
                "programming",
              ].map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-xs md:text-sm mr-2 mb-2"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-lg mb-4">Featured Authors</h3>
            <ul className="space-y-4">
              {["Alice Cooper", "Bob Dylan", "Charlie Parker"].map((author) => (
                <li key={author} className="flex items-center">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt={author}
                    width={40}
                    height={40}
                    className="rounded-full mr-2"
                  />
                  <span className="text-sm md:text-base">{author}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}
