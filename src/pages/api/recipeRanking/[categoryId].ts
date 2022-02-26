import type { NextApiRequest, NextApiResponse } from 'next';
import { RecipeRanking } from '@/types/typeRecipeRanking';

export default async function recipeRankingApi(
  req: NextApiRequest,
  res: NextApiResponse<RecipeRanking>
) {
  const categoryId = req.query.categoryId as string;

  const recipeRankingResponse = await fetch(
    'https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426',
    {
      method: 'post',
      body: JSON.stringify({
        applicationId: process.env.NEXT_PUBLIC_RAKUTEN_RECIPE_ID,
        categoryId,
      }),
      headers: { 'Content-Type': 'application/json' },
    }
  );
  const recipeRankingData = await recipeRankingResponse.json();

  res.status(200).json(recipeRankingData);
}
