import httpInstance from "../httpInstance";

export const getMovieDetails = async (id:any) => {
    console.log('hola')
    let res: any;
    const endpoint = `${id}?api_key=${process.env.REACT_APP_MDB_AI_API_KEY}&language=en-US`;
    await httpInstance
    .get(endpoint)
    .then((response) => {
        console.log(response, 'res get')
        res = response.data;
        console.log(res, 'DETAILS')
    })
    .catch((err) => {
        res = err.response
    });
    return res;
}