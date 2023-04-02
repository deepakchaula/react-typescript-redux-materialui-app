import React from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import { getCategories } from "./utils/categories";
import axios from "axios";
import { Post } from "./models/post";
import CircularProgress from '@mui/material/CircularProgress';
const CategoryTree = React.lazy(() => import("./components/CategoryTree"));
// const SubcategoryNews = React.lazy(() => import("./components/CategoryTree"));

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

  type SubcategoryNewsProps = {
    posts: Post[];
  }
  
  const SubcategoryNews: React.FC<SubcategoryNewsProps> = ({ posts }) => {
    return (
      <div>
        {posts.map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <React.Suspense fallback={<CircularProgress />} key="suspense">
        <Routes>
          <Route path="/" element={<CategoryTree categories={categories} />} />
          <Route path="/subcategory/:id" element={<SubcategoryNews posts={posts} />} />
        </Routes>
      </React.Suspense>
    </div>
  );
}

export default App;
