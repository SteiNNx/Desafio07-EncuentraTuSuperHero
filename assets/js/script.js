/** Variables */
const ACCESS_TOKE = 10226244828616938;
const BASE_URL = 'https://superheroapi.com/api';
const LOCAL_CORS = 'https://cors-anywhere.herokuapp.com/';

/** IMPORTANTE: 
 * ya que me daba problemas de cors local y en github pages
 * Uso la herramienta cors-anywhere para saltarse el unico problema
 * es que hay que navegar a la pagina y darle click a "Request temporary access to the demo server"
 * @link https://cors-anywhere.herokuapp.com/corsdemo
 */

/**            !!!Eliminar LOCAL_CORS!!! */
const API_URL = `${LOCAL_CORS}${BASE_URL}/${ACCESS_TOKE}`;

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

    const removeDisplayNone = id_element => document.getElementById(id_element).classList.remove('d-none');
    const addDisplayNone = id_element => document.getElementById(id_element).classList.add('d-none');

    const setCard = valueSuperHero => {
        document.getElementById('resultado-superhero').classList.remove('d-none');
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

        const statsSuperHero = Object.entries(valueSuperHero.powerstats)
            .map((value) => {
                return {
                    y: value[1],
                    label: value[0]
                }
            });

        const faltanDatos = statsSuperHero.some((value) => value.y == 'null');
        if (!faltanDatos) {
            let chart = new CanvasJS.Chart("graph_container", {
                theme: "light2",
                exportEnabled: false,
                animationEnabled: true,
                title: {
                    text: `Estadísticas de Poder para ${valueSuperHero.name}`,
                    fontFamily: "Roboto",
                    fontWeight: "700",
                },

                data: [{
                    type: "pie",
                    startAngle: 25,
                    toolTipContent: "<b>{label}</b>: {y}%",
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabelFontFamily: "Roboto",
                    indexLabelFontWeight: "500",
                    indexLabelFontSize: 16,
                    indexLabel: "{label} ({y})",
                    dataPoints: statsSuperHero,
                }]
            });
            chart.render();
        } else {
            document.getElementById('graph_container').innerHTML = '<p>Datos insuficientes...</p>'
        }
    }


    $("#btn-buscar-superhero").click((event) => {
        event.preventDefault();

        /** Inicio Efecto Loading */
        removeDisplayNone('buscar-loading');
        addDisplayNone('buscar-label');

        /** Limpio label help */
        setHelp('');

        /** Obtengo value del input search */
        const inputValue = obtenerValueInput();

        $.ajax({
            url: `${API_URL}/${inputValue}`,
        })
            .done((success) => {
                if (success.response == 'success') {
                    setCard(success);
                    setGraph(success);
                } else {
                    setHelp('Error Api SuperHero!');
                }
            })
            .fail((error) => {
                console.error(error);
            })
            .always(() => {
                /** Termino Efecto Loading */
                addDisplayNone('buscar-loading');
                removeDisplayNone('buscar-label');
            });
    });

});