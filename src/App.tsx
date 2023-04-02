import React from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import { getCategories } from "./utils/categories";
import axios from "axios";
import { Post } from "./models/post";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
const CategoryTree = React.lazy(() => import("./components/CategoryTree"));
// const SubcategoryNews = React.lazy(() => import("./components/CategoryTree"));

function App() {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const navigate = useNavigate();

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

  const backToRoot = () => {
    navigate("/");
  }

  type SubcategoryNewsProps = {
    posts: Post[];
  }

  const SubcategoryNews: React.FC<SubcategoryNewsProps> = ({ posts }) => {
    return (
      <div className='main-wrapper'>
        {posts.map((post) => (
          <Card sx={{ maxWidth: 345, m: 1 }} key={post.id} >
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.body}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={backToRoot}>
                Read later
              </Button>
            </CardActions>
          </Card>
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
