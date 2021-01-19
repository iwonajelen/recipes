import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  
  const {
    query: { uid },
  } = req;
  
  if (req.method === 'POST') {
    const body = req.body;

    if(!body.title) {
      res.status(400).send();
    }

    const recipe = {
      title: body.title,
      description: body.description || "",
      url: body.url || "",
      ingredients: body.ingredients || [],
      createdBy: uid,
      users: []
    }

    const recipeResult = await db
      .collection("recipes")
      .insertOne(recipe);
  
    res.status(201).json(recipeResult.ops);
  } else if(req.method === "GET") {
    const recipes = await db
      .collection("recipes")
      .find({ $or: [ { createdBy: uid }, { users: uid } ] })
      .toArray();
  
    res.status(200).json(recipes);
  } else {
    res.status(400).send();
  }
};