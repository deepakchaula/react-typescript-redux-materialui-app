export type Category = {
  id: number;
  name: string;
  subcategories: Subcategory[];
};

export type Subcategory = {
  id: number;
  name: string;
  postIds: number[];
};
