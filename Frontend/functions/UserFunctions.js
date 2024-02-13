import { generateClient } from 'aws-amplify/api';
import { createUser, updateUser } from '../../src/graphql/mutations';
import { getGame, listGames, listUsers } from '../../src/graphql/queries';

const client = generateClient();

export const createUserFunction = async (userId, email) => { 
    const newUser = await client.graphql({
        query: createUser,
        variables: {
            input: {
                email: email,
                userId: userId,
                "todayGames": [],
                "score": 0,
                "currentGames": []
            }
        }
    });

    return newUser;
}

export const getCurrentUserWithAuth = async (userId) => {
    const result = await client.graphql({
        query: listUsers,
        variables: {
            filter: {
              userId: { eq: userId }
            }
        }
    });

    // console.log("userFunction user", result.data.listUsers.items)
    return result.data.listUsers.items[0];
}

export const getCurrentUserLiveGames = async (liveGames) => {
    let retArr = [];

    for (const game of liveGames) {
        // console.log("UserFunctions 1 Game:", JSON.parse(game));
        const id = JSON.parse(game).id;

        const result = await client.graphql({
            query: listGames,
            variables: {
                filter: { id: { eq: id } }
            }
        });
        // console.log("UserFunctions 1 Game:", result);
        retArr.push(result.data.listGames.items[0]);
    }

    return retArr;
}