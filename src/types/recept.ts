export interface ReceptDto {
  id: number;
  name: string;
  description: string;
  fromAge: number;
  toAge: number;
  prepTime: string;
  cookTime: string;
  difficulty: string;

  ingredients: {
    id: number;
    name: string;
    quantity: string;
  }[];
}
