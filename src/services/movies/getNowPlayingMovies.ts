import httpInstance from "../httpInstance";

export const getNowPlayingMovies = async () => {
    let res: any;
    const endpoint = `now_playing?api_key=${process.env.REACT_APP_MDB_AI_API_KEY}&language=en-US`;
    await httpInstance
    .get(endpoint)
    .then((response) => {
        res = response;
    })
    .catch((err) => {
        res = err.response
    });
    return res;
}