export type Food = {
  name: string;
  image: string;
  foodId: string;
  categoryId: string;
};

export type RotateType = {
  rotateId: 'a' | 'b' | 'c' | 'd' | 'e' | 'f';
};

export type FoodCard = {
  data: Food;
  rotateType: RotateType;
};
