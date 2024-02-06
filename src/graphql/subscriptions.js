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
      name
      playerGames
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
      name
      playerGames
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
      name
      playerGames
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateGame = /* GraphQL */ `
  subscription OnCreateGame($filter: ModelSubscriptionGameFilterInput) {
    onCreateGame(filter: $filter) {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateGame = /* GraphQL */ `
  subscription OnUpdateGame($filter: ModelSubscriptionGameFilterInput) {
    onUpdateGame(filter: $filter) {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteGame = /* GraphQL */ `
  subscription OnDeleteGame($filter: ModelSubscriptionGameFilterInput) {
    onDeleteGame(filter: $filter) {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
