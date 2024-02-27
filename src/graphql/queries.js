/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPlayers = /* GraphQL */ `
  query GetPlayers($id: ID!) {
    getPlayers(id: $id) {
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
export const listPlayers = /* GraphQL */ `
  query ListPlayers(
    $filter: ModelPlayersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlayers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      score
      userId
      playersArray
      name
      liveGames {
        nextToken
        __typename
      }
      xp
      teamDepth
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      player1Id
      player2Id
      started
      player1Ready
      player2Ready
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
export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        player1Id
        player2Id
        started
        player1Ready
        player2Ready
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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUserGame = /* GraphQL */ `
  query GetUserGame($id: ID!) {
    getUserGame(id: $id) {
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
        player1Ready
        player2Ready
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
export const listUserGames = /* GraphQL */ `
  query ListUserGames(
    $filter: ModelUserGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        gameId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const userGamesByUserId = /* GraphQL */ `
  query UserGamesByUserId(
    $userId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userGamesByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        gameId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const userGamesByGameId = /* GraphQL */ `
  query UserGamesByGameId(
    $gameId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userGamesByGameId(
      gameId: $gameId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        gameId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
