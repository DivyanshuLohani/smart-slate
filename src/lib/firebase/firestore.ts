import { db } from "./clientApp";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { BlogPost } from "../types";
import { getAuthenticatedAppForUser } from "./serverApp";

export const addBlogToFirestore = async (blogPost: BlogPost): Promise<void> => {
  const { currentUser } = await getAuthenticatedAppForUser();
  if (!currentUser) return;
  try {
    const blogsCollectionRef = collection(db, "blogs"); // Reference to your blogs collection

    const docRef = await addDoc(blogsCollectionRef, {
      ...blogPost,
      user: currentUser.uid,
      created_at: serverTimestamp(), // Use Firestore server timestamp
      edited_at: null,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
