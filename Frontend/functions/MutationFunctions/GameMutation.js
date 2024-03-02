import { generateClient } from 'aws-amplify/api';
import { updateGame } from '../../../src/graphql/mutations';

/*
    input = {"ended": true}
*/
export const UpdateGame = async (input, text = "no text") => {
    // console.log("GameMutation", input)
    
    try {
        const client = generateClient();

        const updatedGame = await client.graphql({
            query: updateGame,
            variables: {
                input: {...input}
            }
        });

        return updatedGame.data.updateGame;
    } catch (error) {
        console.error('Error Updating Game at', text, error);

        throw error;
    }
}
