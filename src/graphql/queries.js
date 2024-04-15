/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBotGame = /* GraphQL */ `
  query GetBotGame($id: ID!) {
    getBotGame(id: $id) {
      id
      playerId
      teams
      playerTeam
      timeoutArray
      User {
        id
        email
        score
        userId
        playersArray
        name
        xp
        maxLiveGames
        mainTeam
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      botGameUserId
      __typename
    }
  }
`;
export const listBotGames = /* GraphQL */ `
  query ListBotGames(
    $filter: ModelBotGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBotGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        playerId
        teams
        playerTeam
        timeoutArray
        createdAt
        updatedAt
        botGameUserId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getTeamData = /* GraphQL */ `
  query GetTeamData($id: ID!) {
    getTeamData(id: $id) {
      id
      name
      players
      abbreviated
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTeamData = /* GraphQL */ `
  query ListTeamData(
    $filter: ModelTeamDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeamData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        players
        abbreviated
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
      xp
      LiveGames {
        nextToken
        __typename
      }
      maxLiveGames
      mainTeam
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
        maxLiveGames
        mainTeam
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
      apiLink
      player1Team
      player2Team
      player2LastActionNumber
      player1LastActionNumber
      matrixRow1
      matrixRow2
      matrixRow3
      matrixRow4
      teams
      player2Depth
      player1Depth
      timeStart
      ended
      started
      users {
        nextToken
        __typename
      }
      player1CheckedIn
      player2CheckedIn
      timeoutArray
      player1SelectedTiles
      player2SelectedTiles
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
        apiLink
        player1Team
        player2Team
        player2LastActionNumber
        player1LastActionNumber
        matrixRow1
        matrixRow2
        matrixRow3
        matrixRow4
        teams
        player2Depth
        player1Depth
        timeStart
        ended
        started
        player1CheckedIn
        player2CheckedIn
        timeoutArray
        player1SelectedTiles
        player2SelectedTiles
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
        maxLiveGames
        mainTeam
        createdAt
        updatedAt
        __typename
      }
      game {
        id
        player1Id
        player2Id
        apiLink
        player1Team
        player2Team
        player2LastActionNumber
        player1LastActionNumber
        matrixRow1
        matrixRow2
        matrixRow3
        matrixRow4
        teams
        player2Depth
        player1Depth
        timeStart
        ended
        started
        player1CheckedIn
        player2CheckedIn
        timeoutArray
        player1SelectedTiles
        player2SelectedTiles
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
