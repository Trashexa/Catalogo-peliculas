const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const BUSCAR_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main = document.getElementById('main');
const form = document.getElementById('form');
const buscar = document.getElementById('buscar');

getMovies(API_URL);

async function getMovies(url) {
	const res = await fetch (url);
	const data = await res.json();

	mostrarPeliculas(data.results);
}

function mostrarPeliculas(peliculas){
	main.innerHTML = '';

	peliculas.forEach((pelicula) =>{
		const { title, poster_path, vote_average, overview } = pelicula;

		const pelicula1 = document.createElement('div');
		pelicula1.classList.add('pelicula');

		pelicula1.innerHTML= `
			<img src="${IMG_PATH + poster_path}" alt="${title}">
			<div class="pelicula-info">
			<h3>${title}</h3>
			<span class"${getClassByRate(vote_average)}">${vote_average}</span>
			</div>
			<div class="overview">
			<h3>Overview</h3>
			${overview}
			</div>
		`;
		main.appendChild(pelicula1);
	})
}

function getClassByRate(vote){
	if(vote >=8) {
		return 'green';
	}
	else if (vote >= 5) {
		return 'orange';
	}
	else{
		return 'red'
	}
}

form.addEventListener('submit', (e)=> {
	e.preventDefault()

	const buscarTerm = buscar.value;

	if (buscarTerm && buscarTerm !== '') {
		getMovies(BUSCAR_API + buscarTerm);
		buscar.value= '';
	}
	else{
		window.location.reload();
	}
})