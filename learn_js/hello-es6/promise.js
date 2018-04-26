fetch(
  'https://raw.githubusercontent.com/bpesquet/thejsway/master/resources/languages.txt'
)
  .then(response => response.text())
  .then(text => {
    console.log(text)
  })
  .catch(err => {
    console.log(err)
  })

fetch(
  'https://raw.githubusercontent.com/bpesquet/thejsway/master/resources/movies.json'
)
  .then(response => response.json())
  .then(movies => {
    movies.forEach(movie => {
      console.log(movie.title)
    })
  })
  .catch(err => {
    console.error(err.message)
  })