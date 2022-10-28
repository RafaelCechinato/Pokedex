const name_pokemon = document.querySelector('.name_pokemon')
const id_pokemon = document.querySelector('.id_pokemon')
const img_pokemon = document.querySelector('.img_pokemon')
const form_search = document.querySelector('.form_search')
const input_search = document.querySelector('.input_search')
const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')

let lastPokemonSearch = 1;

const fetchPokemon = async (pokemon) => {
    const ApiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(ApiResponse.status === 200){
        const info = await ApiResponse.json();
        return info;
    }
    
}

const renderPokemon = async (pokemon) => {
    id_pokemon.innerHTML = ''
    name_pokemon.innerHTML = "Loading...";
    const info = await fetchPokemon(pokemon);
    if(info){
        lastPokemonSearch = info.id;
        id_pokemon.innerHTML = info.id;
        name_pokemon.innerHTML = info.name;
        img_pokemon.style.display = "block"
        img_pokemon.src = info["sprites"]['versions']['generation-v']['black-white']["animated"]['front_default'];
    }else{
        id_pokemon.innerHTML = "";
        name_pokemon.innerHTML = "Not Found";
        img_pokemon.style.display = "none"
    }
    input_search.value = "";
}

form_search.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input_search.value.toLowerCase());
})

btnPrev.addEventListener('click', () => {
    if(lastPokemonSearch > 1){
        lastPokemonSearch -= 1;
        renderPokemon(lastPokemonSearch)
    }
})

btnNext.addEventListener('click', () => {
    lastPokemonSearch += 1;
    renderPokemon(lastPokemonSearch)
})

renderPokemon(lastPokemonSearch.toLowerCase())