const apiKey = 'a9be7f048aeba27495e79cde2a6c22f1';

function translateWeatherDescription(description) {
    const translations = {
        'clear sky': 'céu limpo',
        'few clouds': 'poucas nuvens',
        'scattered clouds': 'nuvens dispersas',
        'broken clouds': 'nublado',
        'shower rain': 'garoa',
        'rain': 'chuva',
        'thunderstorm': 'trovoada',
        'snow': 'neve',
        'mist': 'névoa'
    };
    return translations[description.toLowerCase()] || description;
}

function getWeatherByCoords(lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Não está funcionando: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            const weatherElement = document.getElementById('weather');
            const translatedDescription = translateWeatherDescription(data.weather[0].description);
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
            weatherElement.innerHTML = `
                <img src="${iconUrl}" alt="${translatedDescription}">
                <h2>${data.name}</h2>
                <p>Temperatura: ${data.main.temp} °C</p>
                <p>Tempo: ${translatedDescription}</p>
                <p>Umidade: ${data.main.humidity} %</p>
                <p>Velocidade do Vento: ${data.wind.speed} m/s</p>
            `;
        })
        .catch(err => {
            console.error('Problema na operação', err);
        });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherByCoords(lat, lon);
        }, err => {
            console.error('Erro ao pegar a localização', err);
        });
    } else {
        console.error('Geolocalização não suportada pelo navegador');
    }
}

// Chamar função para obter a localização + temperatura
getLocation();


// Salvar a preferência do usuário
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script carregado!');

    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const darkMode = localStorage.getItem('dark-mode');

    console.log('Modo atual:', darkMode);

    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        toggleSwitch.checked = true;
    } else {
        document.body.classList.remove('dark-mode');
        toggleSwitch.checked = false;
    }

    toggleSwitch.addEventListener('change', function(event) {
        if (event.target.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('dark-mode', 'enabled');
            console.log('Modo escuro ativado.');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('dark-mode', 'disabled');
            console.log('Modo escuro desativado.');
        }
    });
});



