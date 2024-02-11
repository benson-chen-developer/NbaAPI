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
      todayGames
      score
      userId
      playersArray
      name
      liveGames
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
        todayGames
        score
        userId
        playersArray
        name
        liveGames
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
      matrix
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
        matrix
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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
