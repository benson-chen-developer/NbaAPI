import { generateClient } from 'aws-amplify/api';
import { createUser, updateUser } from '../../src/graphql/mutations';
import { gamesByUserID, getGame, getUser, listGames, listUsers } from '../../src/graphql/queries';

const client = generateClient();

export const createUserFunction = async (userId, email) => { 
    const newUser = await client.graphql({
        query: createUser,
        variables: {
            input: {
                email: email,
                userId: userId,
                "score": 0,
                "currentGames": []
            }
        }
    });

    return newUser;
}

export const getCurrentUserWithAuth = async (user) => {
    const result = await client.graphql({
        query: getUser,
        variables: { id: '39485f21-c5c4-42bf-a224-ce1aa3db9f81' }
      });

    // console.log("userFunction user (getUser):", JSON.stringify(result.data.getUser, null, 2));
    return result.data.getUser
}

export const getLiveGames = async (user) => {
    const games = await client.graphql({
        query: gamesByUserID,
        variables: {userID: user.id}
    });

    const ret = games.data.gamesByUserID.items;
    // console.log("getLiveGames", ret)

    return ret;
}