import httpInstance from "../httpInstance";

export const getMovieDetails = async (id:any) => {
    let res: any;
    const endpoint = `${id}?api_key=${process.env.REACT_APP_MDB_AI_API_KEY}&language=en-US`;
    await httpInstance
    .get(endpoint)
    .then((response) => {
        res = response.data;
        console.log(res, 'DETAILS')
    })
    .catch((err) => {
        res = err.response
    });
    return res;
}