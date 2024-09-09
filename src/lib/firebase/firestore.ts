import { db } from "./clientApp";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { redirect } from "next/navigation";
import slugify from "slugify";

export const addBlogToFirestore = async (
  content: string,
  title: string,
  user: string,
  publish: boolean = false
): Promise<void> => {
  try {
    const blogsCollectionRef = collection(db, "blogs"); // Reference to your blogs collection

    await addDoc(blogsCollectionRef, {
      content,
      title,
      user,
      published_at: publish ? serverTimestamp() : null,
      draft: !publish,
      slug: slugify(title),
      created_at: serverTimestamp(),
      edited_at: null,
      likes: 0,
    });

    return redirect("/dasboard/posts/");
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export async function getRecentBlogs(user: string) {
  const blogsCollectionRef = collection(db, "blogs");
  const querySnapshot = await getDocs(blogsCollectionRef);
  const blogs = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return blogs.filter((blog) => blog.user === user);
}

export async function getBlog(slug: string) {
  const blogsCollectionRef = collection(db, "blogs");
  const querySnapshot = await getDocs(blogsCollectionRef);
  const blogs = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return blogs.find((blog) => blog.slug === slug);
}

export async function getPublishedBlogs() {
  const blogsCollectionRef = collection(db, "blogs");
  const querySnapshot = await getDocs(blogsCollectionRef);
  const blogs = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return blogs.filter((blog) => blog.published_at !== null);
}
