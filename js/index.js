let pokemonsTotales;
let pokemons = [];
let numVidas;
let numPreguntas;
const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

// Función para obtener los datos de varios Pokémon
async function getMultiplePokemons(Dificultad) {
  const numPokemons =
    Dificultad === "easy" ? 12 : Dificultad === "normal" ? 24 : 48;

  numVidas = Dificultad === "easy" ? 8 : Dificultad === "normal" ? 6 : 3;

  numPreguntas = Dificultad === "easy" ? 8 : Dificultad === "normal" ? 6 : 4;

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

  //Reseteamos el container

  container.innerHTML = ``;

  //pintamos la row dentro del container junto con la interfaz y el modal de reseteo
  container.innerHTML += `

  <!-- Pop up -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-center w-100 " id="staticBackdropLabel">Instrucciones</h5>

          </div>
          <div class="modal-body text-center">
            Hola! esto es un placeholder elige entre 3 niveles de dificultad, segun el nivel que elijas va a variar el
            numero de vidas, pokemons a elegir tiempo y numero de preguntas disponibles </div>

          <form class="needs-validation" novalidate>
            <select class="form-select" aria-label="Default select example" required>
              <option selected disabled value>Elige un nivel de dificultad</option>
              <option value="easy">Fácil</option>
              <option value="normal">Normal</option>
              <option value="hard">Difícil</option>
            </select>
            <div class="invalid-feedback">
              porfavor elige una dificultad
            </div>
            <div class="modal-footer d-flex justify-content-center">

              <button type="submit" class="btn btn-primary">Submit</button>

            </div>

          </form>

        </div>
      </div>
    </div>

    
  <div class="col-12 d-flex flex-row justify-content-center align-items-center gap-3 mb-5">
      <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Reset</button>
      <div class="d-flex gap-3">
        <p class="mb-0 text-light">Vidas: <span id="vidas">${numVidas}</span></p>
        <p class="mb-0 text-light">Preguntas: <span id="preguntas">${numPreguntas}</span></p>
      </div>
    </div>

    <form class="row row-cols-lg-auto g-3 align-items-center needs-validation mb-5" novalidate>
      <div class="col-12">
        <div class="input-group has-validation">
          <input type="text" class="form-control" id="Pregunta" placeholder="Pregunta algo" required>
          <div class="invalid-feedback">
            Por favor haz una pregunta
          </div>
        </div>
      </div>

      <div class="col-12">
        <button type="submit" class="btn btn-secondary">Submit</button>
      </div>
    </form>

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
document.addEventListener("submit", function (event) {
  const form = event.target;
  if (!form.classList.contains("needs-validation")) return;

  event.preventDefault();
  event.stopPropagation();

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  const dificultad = form.querySelector("select").value;
  getMultiplePokemons(dificultad);

  // Cerrar el modal si está dentro de uno
  const modalElement = form.closest(".modal");
  if (modalElement) {
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  }

  form.classList.add("was-validated");
});
