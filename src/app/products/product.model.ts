export interface Product {
  _id?: string;
  name: string;
  type: string;
  description: string;
  ingredient1?: string;
  ingredient2?: string;
  ingredient3?: string;
  ingredients?: string[];
  likes?: number;
}
