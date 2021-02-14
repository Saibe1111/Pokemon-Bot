module.exports = () =>{


  axios.post('/user', {
    id: 'Fred',
    username: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

}
