export const fetchBoxScore = async (api) => {
    try {
        const response = await fetch(api);
        const data = await response.json();

        console.log("GameLiveFunction, data Res")
        console.log(JSON.stringify(data.game, null, 2));

        return data;
    } catch (error) {
        console.error("(GameLiveFunction) Error fetching box score:", error);
        throw error; 
    }
}
