export type ProductCategory = {
  id: string;
  name: string;
  parentId?: string | null;
  children?: ProductCategory[];
  products?: Product[];
  parent? : ProductCategory
};
export type ProductCategoryIncludes = {
  id: string;
  name: string;
  parentId?: string | null;
  children?: ProductCategory[];
  products?: Product[];
  parent? : ProductCategory
};
export type Product = {
  id: string;
  name: string;
  description?: string | null;
  categoryId: string;
  category?: ProductCategory;
  likedByUsers?: User[];
  images?: Image[];
  variants?: ProductVariant[];
  comments?: ProductComment[];
};

export type ProductVariant = {
  id: string;
  productId: string;
  product?: Product;
  price: number;
  quantity: number;
  sku?: string | null;
  image?: string | null;
  size?: string | null;
  color: string;
  attributes?: VariantAttribute[];
};

export type VariantAttribute = {
  id: string;
  variantId: string;
  variant?: ProductVariant;
  key: string;
  value: string;
};

export type Image = {
  id: string;
  image: string;
  productId?: string | null;
  Product?: Product;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  telNumber: string;
  role: string;
  likedProducts?: Product[];
  comments?: ProductComment[];
};

export type ProductComment = {
  id: string;
  productId: string;
  product?: Product;
  userId: string;
  user?: User;
  text: string;
  status: number;
  openToComment: boolean;
  parentId?: string | null;
  parent?: ProductComment;
  replies?: ProductComment[];
  createdAt: string;
  updatedAt: string;
};
