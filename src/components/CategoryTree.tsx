import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Category, Subcategory } from "../models/category";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import axios from "axios";
import { Post } from "../models/post";

type Props = {
  categories: Category[];
};

const CategoryTree: React.FC<Props> = ({ categories }) => (
  <List>
    {categories.map((category) => (
      <ListItem key={category.id} button component={RouterLink} to={`/category/${category.id}`}>
        <ListItemText primary={category.name} />
        {category.subcategories.map((subcategory) => (
          <List key={subcategory.id} component="div" disablePadding>
            <ListItem button component={RouterLink} to={`/subcategory/${subcategory.id}`}>
              <ListItemText primary={subcategory.name} />
            </ListItem>
          </List>
        ))}
      </ListItem>
    ))}
  </List>
);

type SubcategoryProps = {
  subcategory: Subcategory;
};

export const SubcategoryNews: React.FC<SubcategoryProps> = ({ subcategory }) => {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  
  React.useEffect(() => {
    const fetchPostsAsync = async () => {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(response.data.filter((p: any) => subcategory.postIds.includes(p.id)));
      setLoading(false);
    };
    fetchPostsAsync();
  }, [subcategory.postIds]);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      {posts.map((post) => (
        <Card key={post.id}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {post.title}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {post.userId}
            </Typography>
            <Typography variant="body2" component="p">
              {post.body}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Read Later</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default CategoryTree;
