import { db } from "./clientApp";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import slugify from "slugify";

export const addBlogToFirestore = async (
  content: string,
  title: string,
  user: string,
  publish: boolean = false
): Promise<void> => {
  try {
    const blogsCollectionRef = collection(db, "blogs"); // Reference to your blogs collection

    const docRef = await addDoc(blogsCollectionRef, {
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

    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
