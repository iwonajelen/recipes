import { connectToDatabase } from "../../../../util/mongodb";
import { ObjectID } from 'mongodb';

export default async (req, res) => {
    const { db } = await connectToDatabase();

    const {
      query: { uid, id },
    } = req

    if (req.method === 'PUT') {
        if(req.body && req.body.title) {
            const recipe = await db
              .collection("recipes")
              .updateOne({"_id": new ObjectID(id)}, 
                { $set: {
                    title: req.body.title,
                    description: req.body.description || "",
                    url: req.body.url,
                    ingredients: req.body.ingredients || [],
                } });
          
            const recipeResponse = await db
                .collection("recipes")
                .findOne({"_id": new ObjectID(id)});

            res.status(201).send(recipeResponse);
        } else {
            res.status(400).send();
        }
    } else if (req.method === 'DELETE')  {
      const recipe = await db
        .collection("recipes")
        .deleteOne({"_id": new ObjectID(id), "createdBy": uid });
    
        res.status(201).json(recipe);
    } else if (req.method === 'GET')  {
        const recipe = await db
          .collection("recipes")
          .findOne({"_id": new ObjectID(id)});

          const users = [...recipe.users].map(userId => new ObjectID(userId));

          if(!!users && users.length > 0) {
            const usernames = await db
            .collection("users")
            .find({_id: { $in: users }})
            .toArray();

            recipe.users = [...usernames].map(user => user.name);
          }
      
        res.status(200).json(recipe);
    } else {
        res.status(400).send();
    }
  }
  