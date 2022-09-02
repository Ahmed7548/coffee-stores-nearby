import { NextApiHandler } from "next";
import CoffeeStore from "../../../models/Coffee-store";
import dbConnect from "../../../utils/connect-to-db";
import { ApiError } from "next/dist/server/api-utils";

const upvote: NextApiHandler<
	{ message: string } | { votes: number; id: string }
> = async (req, res) => {
	const { id } = req.query;

	// awaits the connection to the data base 
	await dbConnect();
	try {
		switch (req.method) {
			case "PATCH": {
				let votes = req.body.votes;	
				
				if(typeof votes !=="string" && typeof votes !== "number") throw new ApiError(400 , "the votes must be a number")
				
				if (typeof votes === "string") votes = parseInt(votes)


				// if the vote is not a nummber 
					if (isNaN(votes)) {
						throw new ApiError(400, "wrong data type");
					}
					// update the votes if existed and upsert the store if not 
					const update = await CoffeeStore.updateOne(
						{ forSquareId: id },
						{
							$inc: {
								votes: +votes,
							},
						},
						{
							upsert: true,
						}
				);
				

					if (update.modifiedCount === 0 && update.upsertedCount === 0) {
						throw new ApiError(409,"could add upvotes")
					}
					res.status(200).json({ message: "votes  updated successfully" });
				break;
			}
			case "GET": {
				const data = await CoffeeStore.findOne({ forSquareId: id });
				// if no data returned return a 404 
				if (!data) {
					throw new ApiError(404, "There is no store with that id.");
				}
				
				res.status(200).json({ votes: data.votes, id: data.forSquareId });
				break;
			}
			default: {
				throw new ApiError(500, "Something went wrong");
			}
		}

	} catch (err) {
		if (err instanceof ApiError) {
			res.status(err.statusCode).json({ message: err.message });
			return;
		}
		res.status(500).end();
	}
};

export default upvote;
