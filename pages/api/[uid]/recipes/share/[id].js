import { connectToDatabase } from "../../../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const {
    query: { id, uid },
  } = req;

  if (req.method === 'POST') {
    if(req.body && req.body.username) {
      const recipe = await db
        .collection("recipes")
        .findOne({"_id": new ObjectID(id)});

        const users = [...recipe.users, req.body.username];

        const recipeResult = await db
          .collection("recipes")
          .updateOne({"_id": new ObjectID(id)}, 
            { $set: {
                users: users
            } });
      
        res.status(200).json(recipeResult.ops);
    } else {
        res.status(400).send();
    }
  } else {
    res.status(400).send();
  }
};