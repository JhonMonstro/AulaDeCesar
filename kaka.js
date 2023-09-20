const express = require("express")
const fs = require("fs")
const app = express()
app.use(express.json())


app.post('/api', (req,res) => { // cria um arquivo com o nome do email do body, e converte para json
    const salvar = JSON.stringify(req.body)
    fs.writeFile(`${req.body.email}.json`, salvar, (err) =>{
        if(err){
            res.send({message: 'err'})
        }
        res.send({mensagem: "seus dados foram salvos!"})
    })
    })

app.get('/api/:email', (req, res) => {
    fs.readFile(`${req.params.email}.json`, (err, data) => {
        const dados = JSON.parse(data)
        res.send({message:"seus dados", dados})
    })
})

app.put('/api/:email', (req, res) => {
    const salvar = JSON.stringify(req.body)
        fs.writeFileSync(`${req.params.email}.json`, salvar, {flag: 'w'})
        res.send({mensagem: "seus dados foram salvos!"})
    })

app.delete('/api/:email', (req, res) => {
    fs.unlinkSync(req.params.email)
    res.send({message: "Conta deletada com sucesso!"})
})

app.use((req, res) => {
    res.send({err: 'error 404', message: "Rota Inválida!"})
})

app.listen(8080, () =>{
console.log("Funnfou")
})