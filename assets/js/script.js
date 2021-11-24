/** Variables */
const ACCESS_TOKE = 10226244828616938;
const BASE_URL = 'https://superheroapi.com/api';
const API_URL = `https://cors-anywhere.herokuapp.com/${BASE_URL}/${ACCESS_TOKE}`;

$(document).ready(function () {

    const obtenerValueInput = _ => {
        const value = parseInt(document.getElementById('input_search').value);
        if (typeof value === 'NaN'
            || isNaN(value)) {
            setHelp('Porfavor, Ingrese N°');
            throw new Error("Porfavor, Ingrese N°. Stop script!!");
        }
        return value;
    }

    const setHelp = valueText => {
        document.getElementById('searchHelp').innerHTML = valueText;
    }

    $("#btn-buscar-superhero").click((event) => {
        event.preventDefault();
        setHelp('');
        const inputValue = obtenerValueInput();
        $.ajax({
            url: `${API_URL}/${inputValue}`,
        })
            .done((success) => {

            })
            .error((error) => {

            });
    });

});