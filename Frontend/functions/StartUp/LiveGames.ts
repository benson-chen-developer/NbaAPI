import { generateClient } from "aws-amplify/api";
import { listGames } from "../../../src/graphql/queries";
import { Game } from "../../Global/Types/GameTypes";

const client = generateClient();

export const GetLiveGames = async (userId: string): Promise<Game[]> => {
    try {
        // We grab all the games in which the userId is in it
        const games = await client.graphql({
            query: listGames,
            variables: { 
                or: [
                    { player1Id: { eq: userId } },
                    { player2Id: { eq: userId } }
                ] 
            }
        });
      
        return games.data.listGames.items;
    } catch (error) {
        console.error("Error fetching live games:", error);
        throw new Error(error);
    }
  };