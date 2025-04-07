let pokemonsTotales;
let pokemons = [];
const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

// Función para obtener los datos de varios Pokémon
async function getMultiplePokemons(Dificultad) {
  const numPokemons =
    Dificultad === "easy" ? 12 : Dificultad === "normal" ? 24 : 48;

  const numVidas = Dificultad === "easy" ? 8 : Dificultad === "normal" ? 6 : 3;

  const numPreguntas =
    Dificultad === "easy" ? 8 : Dificultad === "normal" ? 6 : 4;

  //limpiamos el array
  pokemons = [];
  // Hacemos un bucle para obtener los datos de los Pokémon
  for (let i = 1; i <= numPokemons; i++) {
    //Creamos una formula para sacar un pokemon aleatorio cada vez
    let randomPokemon = Math.floor(Math.random() * (1000 - 0 + 1));
    try {
      // Construimos la URL para cada Pokémon por su número en la Pokédex
      const response = await fetch(`${apiUrl}${randomPokemon}/`);
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }

      // Convertimos la respuesta en JSON
      const data = await response.json();

      // Añadimos la informacion al array de pokemos
      pokemons.push(data);

      // Mostramos los datos en consola
      //console.log(data); // Muestra todos los datos del Pokémon
    } catch (error) {
      console.error("Error:", error);
    }
  }
  //Llamamos a la funcion para iniciar la interfaz del juego una vez se han seleccionado los pokemons
  initgame();
}

function initgame() {
  //buscamos la referencia del container y la almacenamos en una variable
  const container = document.getElementById("container");

  //pintamos la row dentro del container
  container.innerHTML = `
     <div id="row" class="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-6 g-4 justify-content-center"> </div>
      `;

  //buscamos la referencia de la row y la almacenamos en una variable
  const row = document.getElementById("row");

  //Pintamos todos los pokemoms dentro de row
  for (let i = 0; i < pokemons.length; i++) {
    row.innerHTML += `


    <div class="col d-flex justify-content-center" mb-4>
      <div class="card p-3 shadow-lg" style="width: 18rem;">
       <div class="d-flex justify-content-center">
        <img src="${pokemons[i].sprites.front_default}" class="card-img-top img-fluid w-75" alt="${pokemons[i].name}">
        </div>
        <div class="card-body text-center">
          <h5 class="card-card-title">${pokemons[i].name}</h5>
        </div>
      </div>
    </div>
    `;
  }
}

//Funcion que activa la validacion de formularios con bootstrap
(() => {
  "use strict";
  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          const dificultad = form.querySelector("select").value;
          event.preventDefault(); // Evita envío si necesitas llamar tu función primero
          getMultiplePokemons(dificultad); // tu función
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
