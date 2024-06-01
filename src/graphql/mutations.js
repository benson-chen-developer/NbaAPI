/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBotGame = /* GraphQL */ `
  mutation CreateBotGame(
    $input: CreateBotGameInput!
    $condition: ModelBotGameConditionInput
  ) {
    createBotGame(input: $input, condition: $condition) {
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
        allStarPoints
        hallOfFamePoints
        coins
        wins
        loss
        teamShards
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
export const updateBotGame = /* GraphQL */ `
  mutation UpdateBotGame(
    $input: UpdateBotGameInput!
    $condition: ModelBotGameConditionInput
  ) {
    updateBotGame(input: $input, condition: $condition) {
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
        allStarPoints
        hallOfFamePoints
        coins
        wins
        loss
        teamShards
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
export const deleteBotGame = /* GraphQL */ `
  mutation DeleteBotGame(
    $input: DeleteBotGameInput!
    $condition: ModelBotGameConditionInput
  ) {
    deleteBotGame(input: $input, condition: $condition) {
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
        allStarPoints
        hallOfFamePoints
        coins
        wins
        loss
        teamShards
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
export const createTeamData = /* GraphQL */ `
  mutation CreateTeamData(
    $input: CreateTeamDataInput!
    $condition: ModelTeamDataConditionInput
  ) {
    createTeamData(input: $input, condition: $condition) {
      id
      name
      players
      abbreviated
      mainColor
      secondColor
      textColor
      imgUrl
      city
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateTeamData = /* GraphQL */ `
  mutation UpdateTeamData(
    $input: UpdateTeamDataInput!
    $condition: ModelTeamDataConditionInput
  ) {
    updateTeamData(input: $input, condition: $condition) {
      id
      name
      players
      abbreviated
      mainColor
      secondColor
      textColor
      imgUrl
      city
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteTeamData = /* GraphQL */ `
  mutation DeleteTeamData(
    $input: DeleteTeamDataInput!
    $condition: ModelTeamDataConditionInput
  ) {
    deleteTeamData(input: $input, condition: $condition) {
      id
      name
      players
      abbreviated
      mainColor
      secondColor
      textColor
      imgUrl
      city
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
      LiveGames {
        nextToken
        __typename
      }
      maxLiveGames
      mainTeam
      allStarPoints
      hallOfFamePoints
      coins
      wins
      loss
      teamShards
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
      LiveGames {
        nextToken
        __typename
      }
      maxLiveGames
      mainTeam
      allStarPoints
      hallOfFamePoints
      coins
      wins
      loss
      teamShards
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
      LiveGames {
        nextToken
        __typename
      }
      maxLiveGames
      mainTeam
      allStarPoints
      hallOfFamePoints
      coins
      wins
      loss
      teamShards
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
      apiLink
      player1Team
      player2Team
      player2LastActionNumber
      player1LastActionNumber
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
      matrix
      homeTeam
      awayTeam
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
      apiLink
      player1Team
      player2Team
      player2LastActionNumber
      player1LastActionNumber
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
      matrix
      homeTeam
      awayTeam
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
      apiLink
      player1Team
      player2Team
      player2LastActionNumber
      player1LastActionNumber
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
      matrix
      homeTeam
      awayTeam
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
        maxLiveGames
        mainTeam
        allStarPoints
        hallOfFamePoints
        coins
        wins
        loss
        teamShards
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
        matrix
        homeTeam
        awayTeam
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
        maxLiveGames
        mainTeam
        allStarPoints
        hallOfFamePoints
        coins
        wins
        loss
        teamShards
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
        matrix
        homeTeam
        awayTeam
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
        maxLiveGames
        mainTeam
        allStarPoints
        hallOfFamePoints
        coins
        wins
        loss
        teamShards
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
        matrix
        homeTeam
        awayTeam
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
