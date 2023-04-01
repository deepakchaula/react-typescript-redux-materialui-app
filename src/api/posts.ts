import axios from "axios";
import { Post } from "../models/post";

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return response.data;
};
