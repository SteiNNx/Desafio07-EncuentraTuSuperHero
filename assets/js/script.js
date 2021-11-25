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

    const setCard = valueSuperHero => {
        document.getElementById('card-avatar').src = valueSuperHero.image.url;
        document.getElementById('card-title').innerText = `Nombre: ${valueSuperHero.name}`;
        document.getElementById('card-text').innerText = `Conexiones: ${valueSuperHero.connections['group-affiliation']}`;
        document.getElementById('li-publicado').innerHTML = `Publicado por: ${valueSuperHero.biography.publisher}`;
        document.getElementById('li-ocupacion').innerHTML = `Ocupación: ${valueSuperHero.work.occupation}`;
        document.getElementById('li-primera-aparicion').innerHTML = `Primera Aparicion: ${valueSuperHero.biography['first-appearance']}`;
        document.getElementById('li-altura').innerHTML = `Altura: ${valueSuperHero.appearance.height.join(' - ')}`;
        document.getElementById('li-peso').innerHTML = `Altura: ${valueSuperHero.appearance.weight.join(' - ')}`;
        document.getElementById('li-alianzas').innerHTML = `Alianzas: ${valueSuperHero.biography.aliases.join(', ')}`;
    }

    const setGraph = valueSuperHero => {

    }



    $("#btn-buscar-superhero").click((event) => {
        event.preventDefault();
        setHelp('');
        const inputValue = obtenerValueInput();
        $.ajax({
            url: `${API_URL}/${inputValue}`,
        })
            .done((success) => {
                setCard(success);
            })
            .fail((error) => {
                console.error(error);
            });
    });

});