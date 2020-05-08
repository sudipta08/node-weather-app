const getWeatherForecast = function () {
    const location = document.querySelector('input').value;
    const successMessage = document.querySelector('#success-message');
    const errorMessage = document.querySelector('#error-message');

    successMessage.textContent = 'Loading...';
    errorMessage.textContent = '';
    fetch('http://localhost:3000/weatherapi?address=' + location)
        .then((res) => {
            res.json().then((data) => {
                if(data.error){
                    successMessage.textContent = '';
                    errorMessage.textContent = data.error;
                }else{
                    successMessage.textContent = data.forecast;
                    errorMessage.textContent = '';
                }
            })
        })
        .catch((error) => {
            successMessage.textContent = '';
            errorMessage.textContent = error;
        });
};