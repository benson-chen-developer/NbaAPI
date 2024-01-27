/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePlayers = /* GraphQL */ `
  subscription OnCreatePlayers($filter: ModelSubscriptionPlayersFilterInput) {
    onCreatePlayers(filter: $filter) {
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
export const onUpdatePlayers = /* GraphQL */ `
  subscription OnUpdatePlayers($filter: ModelSubscriptionPlayersFilterInput) {
    onUpdatePlayers(filter: $filter) {
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
export const onDeletePlayers = /* GraphQL */ `
  subscription OnDeletePlayers($filter: ModelSubscriptionPlayersFilterInput) {
    onDeletePlayers(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateMatrix = /* GraphQL */ `
  subscription OnCreateMatrix($filter: ModelSubscriptionMatrixFilterInput) {
    onCreateMatrix(filter: $filter) {
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
export const onUpdateMatrix = /* GraphQL */ `
  subscription OnUpdateMatrix($filter: ModelSubscriptionMatrixFilterInput) {
    onUpdateMatrix(filter: $filter) {
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
export const onDeleteMatrix = /* GraphQL */ `
  subscription OnDeleteMatrix($filter: ModelSubscriptionMatrixFilterInput) {
    onDeleteMatrix(filter: $filter) {
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
