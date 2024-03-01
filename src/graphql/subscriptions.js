/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      email
      score
      userId
      playersArray
      name
      xp
      teamDepth
      LiveGames {
        nextToken
        __typename
      }
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
      score
      userId
      playersArray
      name
      xp
      teamDepth
      LiveGames {
        nextToken
        __typename
      }
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
      score
      userId
      playersArray
      name
      xp
      teamDepth
      LiveGames {
        nextToken
        __typename
      }
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateUserGame = /* GraphQL */ `
  subscription OnCreateUserGame($filter: ModelSubscriptionUserGameFilterInput) {
    onCreateUserGame(filter: $filter) {
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
export const onUpdateUserGame = /* GraphQL */ `
  subscription OnUpdateUserGame($filter: ModelSubscriptionUserGameFilterInput) {
    onUpdateUserGame(filter: $filter) {
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
export const onDeleteUserGame = /* GraphQL */ `
  subscription OnDeleteUserGame($filter: ModelSubscriptionUserGameFilterInput) {
    onDeleteUserGame(filter: $filter) {
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
