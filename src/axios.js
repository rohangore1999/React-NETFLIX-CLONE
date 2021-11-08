import axios from "axios";

/**base url to make request to the movie database **/
const instance = axios.create({
    baseURL:'https://api.themoviedb.org/3',
});

/** so whenever I pass: instance.get('/foo-bar') **/
// it will look like this: https://apithemoviedb.org/3/foo-bar

export default instance