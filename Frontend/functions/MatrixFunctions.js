import { BoardSquare } from "../../Classes/BoardSquare"

export const generateMatrix2 = () => {
    let matrix = [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null]
    ]

    const scoringOptions = pickRandomOptions(6,
        [
            "PTS", "PTS+AST", "PTS+REB+AST", "PTS+REB",
            "PTS", "PTS", "PTS", "PTS+AST", "PTS+REB", "PTS+REB+AST"
        ]
    )
    matrix = fillUpMatrix(matrix, scoringOptions)

    const defenseOptions = pickRandomOptions(5,
        [
            "REB", "REB", "BLK+STL",
            "BLK", "STL", "BLK+STL",
            // "Defense", "Defense", "Shots Missed"
        ]
    )
    matrix = fillUpMatrix(matrix, defenseOptions);

    const otherOptions = pickRandomOptions(5,
        [
            "FGM", "3PA",
            "FGM", "FGA", "3PM",
            "AST", "AST", "FGA"
        ]
    )
    matrix = fillUpMatrix(matrix, otherOptions);

    const fakeTeam1 = {}
    fakeTeam1['PTS'] = 23;
    fakeTeam1['FGM'] = 46.9;
    fakeTeam1['FGA'] = 93;
    fakeTeam1['3PA'] = 36.3;
    fakeTeam1['3PM'] = 13.9;
    fakeTeam1['FTM'] = 16.9;
    fakeTeam1['FTA'] = 20.9;
    fakeTeam1['REB'] = 46.9;
    fakeTeam1['AST'] = 36.9;
    fakeTeam1['STL'] = 7.7;
    fakeTeam1['BLK'] = 6;
    fakeTeam1['TO'] = 12.9;
    fakeTeam1['PF'] = 22.9;

    matrix = fillMatrixWithStats(fakeTeam1, fakeTeam1, matrix);
    
    // console.log("MatrixFunctions ", matrix)

    return matrix;
}

/*
    Should go through the matrix and turn each tile into an object with
    both teams' averages in those tiles

    returns the matrix
*/
const fillMatrixWithStats = (team1Averages, team2Averages, matrix) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {

            const options = matrix[i][j].split('+');
            let costOfOptionsTeam1 = 0.0;
            options.forEach(item => costOfOptionsTeam1 += team1Averages[item])
            let costOfOptionsTeam2 = 0.0;
            options.forEach(item => costOfOptionsTeam2 += team2Averages[item])

            matrix[i][j] = new BoardSquare(
                matrix[i][j], 0, costOfOptionsTeam1, 0, costOfOptionsTeam2
            )
        }
    }

    return matrix;
}

/* 
    Pick "num" random options form the array no repeats 

    returns array
*/
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