import httpInstance from "../httpInstance";

export const getMovieRecommendations = async (id:any) => {
    let res: any;
    const endpoint = `${id}/recommendations?&api_key=${process.env.REACT_APP_MDB_AI_API_KEY}&language=en-US`;
    await httpInstance
    .get(endpoint)
    .then((response) => {
        res = response;
        console.log(res, 'RECOMMENDATIONS')
    })
    .catch((err) => {
        res = err.response
    });
    return res;
}