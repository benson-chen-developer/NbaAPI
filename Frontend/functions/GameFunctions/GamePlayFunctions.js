import { generateClient } from 'aws-amplify/api';
import { updateUser } from '../../../src/graphql/mutations';

const client = generateClient();

export const generateMatrix = (team1, team2) => {
    let noStatMatrix = generateTiles();

    const fakeTeam1 = {}
    fakeTeam1['PTS'] = 23;
    fakeTeam1['FGM'] = 46.9;
    fakeTeam1['FGA'] = 93;
    fakeTeam1['3PA'] = 36.3;
    fakeTeam1['3PM'] = 13.9;
    fakeTeam1['FTM'] = 16.9;
    fakeTeam1['FTA'] = 20.9;
    fakeTeam1['FTM'] = 46.9;
    fakeTeam1['REB'] = 46.9;
    fakeTeam1['AST'] = 36.9;
    fakeTeam1['STL'] = 7.7;
    fakeTeam1['BLK'] = 6;
    fakeTeam1['TO'] = 12.9;
    fakeTeam1['PF'] = 22.9;

    let withStatsMatrix = fillMatrixWithStats(fakeTeam1, fakeTeam1, noStatMatrix);

    return withStatsMatrix;
}

const generateTiles = () => {

    let matrix = [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
    ]
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    /* 1) 4 Scoring Tiles in each row */
    let scoringOptions = [
        "PTS", "PTS+AST", "PTS+AST+REB", "PTS+REB",
        "PTS",   
    ]
        /* Randomly assigning the scoringOptions to one random index in each row */
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                if (matrix[i][j] === null) {
                    const randomOption = Math.floor(Math.random() * scoringOptions.length);
                    const randomIndex = Math.floor(Math.random() * 4);
                    matrix[i][randomIndex] = scoringOptions[randomOption];
                    scoringOptions.splice(randomOption, 1); 
                    break; 
                }
            }
        }

    // printMatrix(1, matrix);

    /* 2) 2 Scoring Tiles in random spots */
    let secondScoringOptions = [
        "PTS", "PTS", "PTS+AST", "PTS+REB", "PTS+AST+REB"
    ];
        /* Get the 2 rows that will get another random scoring tile */
        let nums = [0, 1, 2, 3];
        const firstRowIndex = Math.floor(Math.random() * nums.length);
        nums.splice(firstRowIndex, 1);
        const secondRowIndex = Math.floor(Math.random() * nums.length);
    
        /* We fill in the first random scoring option */
        let secondScoringOptionsIndex = getRandomIndex(secondScoringOptions);
        while(matrix[firstRowIndex][secondScoringOptionsIndex])
            secondScoringOptionsIndex = getRandomIndex(secondScoringOptions);

        let randomOption = getRandomValue(secondScoringOptions);
        secondScoringOptions = removeFromArray(randomOption, secondScoringOptions)
        matrix[firstRowIndex][secondScoringOptionsIndex] = randomOption;
            
        /* Repeat */
        secondScoringOptionsIndex = getRandomIndex(secondScoringOptions);
        while(matrix[secondRowIndex][secondScoringOptionsIndex] !== null)
            secondScoringOptionsIndex = getRandomIndex(secondScoringOptions);
        
        randomOption = getRandomValue(secondScoringOptions);
        secondScoringOptions = removeFromArray(randomOption, secondScoringOptions)
        matrix[secondRowIndex][secondScoringOptionsIndex] = randomOption;

    // printMatrix(2, matrix);

    /* 3) 4 Defense. Each row gets 1 */
    const defenseOptions = pickRandomOptions(4, [
        "REB", "REB",
        "BLK", "STL", "BLK+STL",
        // "Defense", "Defense", "Shots Missed"
    ]);
    matrix = fillUpMatrix(matrix, defenseOptions);
    // printMatrix(3, matrix);

    /* 6 Offense */
    const offenseOptions = pickRandomOptions(6, [
        "FGM", "3PA",
        "FGM", "FGA", "3PM",
        "AST", "AST", "FGA"
    ]);
    matrix = fillUpMatrix(matrix, offenseOptions);
    // printMatrix(4, matrix);

    return matrix;
}

const fillMatrixWithStats = (team1Averages, team2Averages, matrix) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {

            const options = matrix[i][j].split('+');
            let costOfOptionsTeam1 = 0.0;
            options.forEach(item => costOfOptionsTeam1 += team1Averages[item])
            let costOfOptionsTeam2 = 0.0;
            options.forEach(item => costOfOptionsTeam2 += team2Averages[item])

            matrix[i][j] = {
                name: matrix[i][j],
                team1: costOfOptionsTeam1,
                team1Progress: 0,
                team2: costOfOptionsTeam2,
                team2Progess: 0
            }
        }
    }

    return matrix;
}





/* Functions */

const getRandomValue = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}
const getRandomIndex = (array) => {
    return Math.floor(Math.random() * array.length);
}
const removeFromArray = (obj, array) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === obj) {
            array.splice(i, 1);
            return array;
        }
    }
}

const printMatrix = (num, matrix) => {
    console.log("GamePlayFunctions ", num)

    matrix.forEach(row => {
        const rowStr = row.map(el => el === null ? 'null' : el).join(' '); // Replace null with 'null'
        console.log(rowStr);
    });

    console.log("")
}

/* Pick num random options form the array no repeats */
const pickRandomOptions = (num, options) => {
    // Shuffle the array using Fisher-Yates algorithm
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }

    // Return the first `num` elements
    return options.slice(0, num);
};

/* Take any amount of arrays and spreads it out in the matrix */
const fillUpMatrix = (matrix, array) => {
    // Flatten the matrix into a single array of positions with null values
    const nullPositions = [];
    matrix.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
            if (value === null) {
                nullPositions.push({ rowIndex, colIndex });
            }
        });
    });

    // Shuffle the array of positions
    for (let i = nullPositions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nullPositions[i], nullPositions[j]] = [nullPositions[j], nullPositions[i]];
    }

    // Fill the matrix with values from the array
    nullPositions.slice(0, array.length).forEach((position, index) => {
        const { rowIndex, colIndex } = position;
        matrix[rowIndex][colIndex] = array[index];
    });

    return matrix;
};