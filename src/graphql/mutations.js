/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPlayers = /* GraphQL */ `
  mutation CreatePlayers(
    $input: CreatePlayersInput!
    $condition: ModelPlayersConditionInput
  ) {
    createPlayers(input: $input, condition: $condition) {
      id
      name
      shards
      team
      position
      ppg
      apg
      rpg
      updatedToday
      picture
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updatePlayers = /* GraphQL */ `
  mutation UpdatePlayers(
    $input: UpdatePlayersInput!
    $condition: ModelPlayersConditionInput
  ) {
    updatePlayers(input: $input, condition: $condition) {
      id
      name
      shards
      team
      position
      ppg
      apg
      rpg
      updatedToday
      picture
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deletePlayers = /* GraphQL */ `
  mutation DeletePlayers(
    $input: DeletePlayersInput!
    $condition: ModelPlayersConditionInput
  ) {
    deletePlayers(input: $input, condition: $condition) {
      id
      name
      shards
      team
      position
      ppg
      apg
      rpg
      updatedToday
      picture
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      email
      todayGames
      score
      userId
      playersArray
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      email
      todayGames
      score
      userId
      playersArray
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      email
      todayGames
      score
      userId
      playersArray
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createMatrix = /* GraphQL */ `
  mutation CreateMatrix(
    $input: CreateMatrixInput!
    $condition: ModelMatrixConditionInput
  ) {
    createMatrix(input: $input, condition: $condition) {
      id
      player1Id
      player2Id
      Matrix
      started
      player1Ready
      player2Ready
      team1
      team2
      player1Cards
      player2Cards
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateMatrix = /* GraphQL */ `
  mutation UpdateMatrix(
    $input: UpdateMatrixInput!
    $condition: ModelMatrixConditionInput
  ) {
    updateMatrix(input: $input, condition: $condition) {
      id
      player1Id
      player2Id
      Matrix
      started
      player1Ready
      player2Ready
      team1
      team2
      player1Cards
      player2Cards
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteMatrix = /* GraphQL */ `
  mutation DeleteMatrix(
    $input: DeleteMatrixInput!
    $condition: ModelMatrixConditionInput
  ) {
    deleteMatrix(input: $input, condition: $condition) {
      id
      player1Id
      player2Id
      Matrix
      started
      player1Ready
      player2Ready
      team1
      team2
      player1Cards
      player2Cards
      createdAt
      updatedAt
      __typename
    }
  }
`;
