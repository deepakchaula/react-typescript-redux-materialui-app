import { Category, Subcategory } from "../models/category";
import { Post } from "../models/post";

const groupBy = (array: any[], key: string) =>
  array.reduce((result, item) => ({
    ...result,
    [item[key]]: [...(result[item[key]] || []), item],
  }), {});

export const getCategories = (posts: Post[]): Category[] => {
  const categories: Category[] = [];
  const subcategories: Subcategory[] = [];
  const groupedPosts = groupBy(posts, "userId");
  
  for (const userId in groupedPosts) {
    const userPosts = groupedPosts[userId];
    const categoryName = `Category ${parseInt(userId) + 1}`;
    const category = categories.find((c) => c.name === categoryName);
    if (!category) {
      categories.push({
        id: parseInt(userId) + 1,
        name: categoryName,
        subcategories: [],
      });
    }
    const subcategoryName = `Subcategory ${parseInt(userId) + 1}_${subcategories.length + 1}`;
    const subcategory = {
      id: subcategories.length + 1,
      name: subcategoryName,
      postIds: userPosts.map((p: any) => p.id),
    };
    subcategories.push(subcategory);
    const categoryId = categories.findIndex((c) => c.name === categoryName) + 1;
    categories[categoryId - 1].subcategories.push(subcategory);
  }
  
  return categories;
};
