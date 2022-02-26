export type Recipe = {
  recipeId: number;
  recipeTitle: string;
  recipeUrl: string;
  foodImageUrl: string;
  mediumImageUrl: string;
  smallImageUrl: string;
  pickup: number;
  shop: number;
  nickname: string;
  recipeDescription: string;
  recipeMaterial: string[];
  recipeIndication: string;
  recipeCost: string;
  recipePublishday: string;
  rank: string;
};

export type RecipeRanking = {
  result: Recipe[];
};
