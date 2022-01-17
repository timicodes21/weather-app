const body = document.querySelector('body');
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const error = document.querySelector('.error');
const city = cityForm.city.value.trim();


const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return { cityDets, weather }
}

const updateUI = (data) => {

    // const cityDets = data.cityDets;
    // const weather = data.weather;

    // destructure properties
    const { cityDets, weather } = data;
    const link = `https://www.google.com/maps/@6.5568768,3.3456128,12z`;

    console.log(link);

    body.style.height = '170vh';
    // update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}, ${cityDets.Country.LocalizedName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>  
        <a href= ${link} class="btn text-danger p-2 map border-1 border-white rounded mb-2">Check out location</a>
    `;

    // update night and day/ icon images

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src', iconSrc);

    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg'

    time.setAttribute('src', timeSrc);

    // remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
        error.classList.remove('d-none')
    }
}

cityForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the ui with new city
    updateCity(city).then(data => {
        updateUI(data);
        error.classList.add('d-none')
    }).catch(err => {
        error.classList.remove('d-none');
        card.classList.add('d-none')
        error.innerHTML = `<h5 class="text-danger text-center">Oops! Can't get your location</h5>`;
        body.style.height = '100vh'
    })

    // set local storage 
    localStorage.setItem('city', city);

});

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city')).then(data => {
        updateUI(data);
        error.classList.add('d-none')
    }).catch(err => {
        error.classList.remove('d-none');
        card.classList.add('d-none')
        error.innerHTML = `<h5 class="text-danger text-center">Oops! Can't get your location</h5>`;
        body.style.height = '100vh'
    })
};





