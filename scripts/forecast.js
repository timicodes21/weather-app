const key = 'NNX9gt9LuuoIyXFOPTGgCKFnxKFMB5XT'

// get city information
const getCity = async (city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`

    const response = await fetch(base+query);
    const data = await response.json();
    if(data.length === 0){
        throw new Error('Location does not exist');
    }
    console.log(data[0]);
    return data[0];
};

// get weather information
const getWeather = async (id) => {

    const base = `http://dataservice.accuweather.com/currentconditions/v1/`
    const query = `${id}?apikey=${key}`
     
    const response = await fetch(base+query);
    const data = await response.json();
    console.log(data[0]);
    return data[0];
};




