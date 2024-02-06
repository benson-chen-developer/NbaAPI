import { generateClient } from 'aws-amplify/api';
import { createUser, updateUser } from '../../src/graphql/mutations';
import { listUsers } from '../../src/graphql/queries';

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