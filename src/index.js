// Variables
const pokemonNumber = document.querySelector(".pokemon-number");
const pokemonName = document.querySelector(".pokemon-name");
const pokemonImg = document.querySelector(".pokemon-img");

const form = document.querySelector(".form");
const input = document.querySelector(".input-search");

const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

let pokemonId = 1;

// Functions
const fetchPokemon = async (pokemon) => {
    try {
        const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
        const data = await APIResponse.json();
        return data;

    } catch (error) {
        console.log("Pokemon não encontrado!");
    }
}

const renderPokemon = async (pokemon) => {

    pokemonNumber.textContent = "";
    pokemonName.textContent = "Carregando...";

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonNumber.textContent = data.id;
        pokemonName.textContent = data.name;
        pokemonImg.style.display = "block";
        pokemonImg.setAttribute("src", data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]);
        pokemonId = data.id;
    }
    else {
        pokemonNumber.textContent = "";
        pokemonName.textContent = "Não Encontrado :c";
        pokemonImg.style.display = "none";
    }

    input.value = "";
}

// Events
form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderPokemon((input.value).toLowerCase());
})

btnPrev.addEventListener("click", () => {
    if (pokemonId > 1) {
        pokemonId -= 1;
        renderPokemon(pokemonId);
    }
})

btnNext.addEventListener("click", () => {
    pokemonId += 1;
    renderPokemon(pokemonId);
})

renderPokemon(pokemonId);