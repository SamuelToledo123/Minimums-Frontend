export interface ReceptDto {
  id: number;
  name: string;
  description: string;
  fromAge: number;
  toAge: number;

  ingredients: {
    id: number;
    name: string;
    quantity: string;
  }[];
}
