const form = document.getElementById("search-form");

form.addEventListener("submit",async (e)=>{
    e.preventDefault(); // stops page reload
    let search = e.target.children[0].value;
    let result = await axios.get(`https://www.omdbapi.com/?s=${search}&apikey=ab11e1e2`)
    localStorage.setItem("movies", JSON.stringify(movies));
    createCard()
    
})
const container = document.getElementById("container")

function createCard(){
    let movies = JSON.parse(localStorage.getItem("movies"))
    container.innerHTML = "";
    movies.forEach(movie => {
        const div = document.createElement("div")
        const image = document.createElement("img")
        image.src = movie.Poster;
        image.class = "movie-banner"
        div.innerHTML = `<h2>${movie.Title}</h2> <span>${movie.Year}</span>`
        div.prepend(image);
        container.append(div)
        localStorage.setItem
    })
}
if(localStorage.getItem("movies")){
createCard();
}