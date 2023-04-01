import React from 'react';
import './App.css';
import Header from "./components/Header";
import CategoryTree from "./components/CategoryTree";
import { getCategories } from "./utils/categories";
import axios from "axios";
import { Post } from "./models/post";

function App() {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchPostsAsync = async () => {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(response.data);
      setLoading(false);
    };
    fetchPostsAsync();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const categories = getCategories(posts);

  return (
    <div className="App">
      <Header />
      <CategoryTree categories={categories} />
    </div>
  );
}

export default App;
