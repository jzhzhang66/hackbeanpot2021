const people = [
    {"id": "123", "name": "Julie Wang"},
    {"id": "234", "name": "Adrianna Liu"},
    {"id": "234", "name": "Carissa Mok"}
  ]
  
module.exports = (app) => {

    app.get('/api/people', async function (req, res) {
        res.send(people)
      });

    app.get('/api/people/:id', async function (req, res) {
        const person = people.filter(p => p.id == req.params.id)
        res.send(person)
      });
    
}
