const APIURL = "https://api.themoviedb.org/3/movie/popular?api_key=7b3bcca6acbd6ce1ce0f3336bd79d904&language=en-US&page=1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w500";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?api_key=7b3bcca6acbd6ce1ce0f3336bd79d904&language=en-US&page=1";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const search_res = document.getElementById("search_res");
const total_records = document.getElementById("total_records");

// initially get fav movies
getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    if (respData.results.length == 0) {
        search_res.innerHTML = "No Results Founds";
        total_records.innerHTML = '';
    }else{
        total_records.innerHTML = "Total Records "+respData.total_results
    }
    
    console.log(respData);

    showMovies(respData.results);
}

function showMovies(movies) {
    // clear main
    main.innerHTML = "";
    movies.forEach((movie, index) => {
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        if (movie.poster_path != null) {
            poster_path = IMGPATH + movie.poster_path;
        } else {
            poster_path = 'https://image.tmdb.org/t/p/w500';
        }

        movieEl.innerHTML = `
            <img
                src="${poster_path}"
                alt="${movie.title}"
            />
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <span class="${getClassByRate(
                    movie.vote_average
        )}">${movie.vote_average}</span>
            </div>
            <div class="single-info">
            <span>${movie.release_date}</span>
        `;

        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);
        search.value = searchTerm;
        search_res.innerHTML = "Search Result for "+searchTerm;
    } else {
        getMovies(APIURL);
    }

});