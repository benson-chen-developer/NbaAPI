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
      score
      userId
      playersArray
      name
      xp
      teamDepth
      liveGames {
        nextToken
        __typename
      }
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
      score
      userId
      playersArray
      name
      xp
      teamDepth
      liveGames {
        nextToken
        __typename
      }
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
      score
      userId
      playersArray
      name
      xp
      teamDepth
      liveGames {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createGame = /* GraphQL */ `
  mutation CreateGame(
    $input: CreateGameInput!
    $condition: ModelGameConditionInput
  ) {
    createGame(input: $input, condition: $condition) {
      id
      player1Id
      player2Id
      started
      player1Cards
      player2Cards
      player1Team
      player2Team
      apiLink
      selectedTiles
      teams
      matrixRow1
      matrixRow2
      matrixRow3
      matrixRow4
      player1LastActionNumber
      player2LastActionNumber
      timeStart
      users {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateGame = /* GraphQL */ `
  mutation UpdateGame(
    $input: UpdateGameInput!
    $condition: ModelGameConditionInput
  ) {
    updateGame(input: $input, condition: $condition) {
      id
      player1Id
      player2Id
      started
      player1Cards
      player2Cards
      player1Team
      player2Team
      apiLink
      selectedTiles
      teams
      matrixRow1
      matrixRow2
      matrixRow3
      matrixRow4
      player1LastActionNumber
      player2LastActionNumber
      timeStart
      users {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteGame = /* GraphQL */ `
  mutation DeleteGame(
    $input: DeleteGameInput!
    $condition: ModelGameConditionInput
  ) {
    deleteGame(input: $input, condition: $condition) {
      id
      player1Id
      player2Id
      started
      player1Cards
      player2Cards
      player1Team
      player2Team
      apiLink
      selectedTiles
      teams
      matrixRow1
      matrixRow2
      matrixRow3
      matrixRow4
      player1LastActionNumber
      player2LastActionNumber
      timeStart
      users {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createUserGame = /* GraphQL */ `
  mutation CreateUserGame(
    $input: CreateUserGameInput!
    $condition: ModelUserGameConditionInput
  ) {
    createUserGame(input: $input, condition: $condition) {
      id
      userId
      gameId
      user {
        id
        email
        score
        userId
        playersArray
        name
        xp
        teamDepth
        createdAt
        updatedAt
        __typename
      }
      game {
        id
        player1Id
        player2Id
        started
        player1Cards
        player2Cards
        player1Team
        player2Team
        apiLink
        selectedTiles
        teams
        matrixRow1
        matrixRow2
        matrixRow3
        matrixRow4
        player1LastActionNumber
        player2LastActionNumber
        timeStart
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUserGame = /* GraphQL */ `
  mutation UpdateUserGame(
    $input: UpdateUserGameInput!
    $condition: ModelUserGameConditionInput
  ) {
    updateUserGame(input: $input, condition: $condition) {
      id
      userId
      gameId
      user {
        id
        email
        score
        userId
        playersArray
        name
        xp
        teamDepth
        createdAt
        updatedAt
        __typename
      }
      game {
        id
        player1Id
        player2Id
        started
        player1Cards
        player2Cards
        player1Team
        player2Team
        apiLink
        selectedTiles
        teams
        matrixRow1
        matrixRow2
        matrixRow3
        matrixRow4
        player1LastActionNumber
        player2LastActionNumber
        timeStart
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteUserGame = /* GraphQL */ `
  mutation DeleteUserGame(
    $input: DeleteUserGameInput!
    $condition: ModelUserGameConditionInput
  ) {
    deleteUserGame(input: $input, condition: $condition) {
      id
      userId
      gameId
      user {
        id
        email
        score
        userId
        playersArray
        name
        xp
        teamDepth
        createdAt
        updatedAt
        __typename
      }
      game {
        id
        player1Id
        player2Id
        started
        player1Cards
        player2Cards
        player1Team
        player2Team
        apiLink
        selectedTiles
        teams
        matrixRow1
        matrixRow2
        matrixRow3
        matrixRow4
        player1LastActionNumber
        player2LastActionNumber
        timeStart
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
