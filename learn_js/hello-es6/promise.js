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