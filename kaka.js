const express = require("express")
const fs= require("fs")
const app = express()
app.use(express.urlencoded({extended:true}))


app.set('view engine', 'ejs')

app.get('/', function(req, res) {
res.render('form')
})
app.post('/home', function(req,res){
const salvar = JSON.stringify(req.body)
fs.writeFileSync(`${req.body.email}.json`, salvar, (err) =>{
if(err){
console.log(err);
}
} )
res.render('form1')

})
app.get('/lista', function(req, res) {
fs.readdir(__dirname, (err,files)=>{
var dados = files.filter(file => file.includes('@') && file.includes('.json'))
res.render('lista', {dados: dados})

})
})
app.get('/dados/:email', (req,res)=>{
var dados = req.params
var dadosfinais = JSON.parse(fs.readFileSync(dados.email))
console.log(dadosfinais);
res.render("usuario", {dados: dadosfinais})
})
app.get('/apagar/:email', (req,res)=>{
var dados = req.params
if (fs.existsSync(dados.email)){
fs.rmSync(dados.email)
}
res.redirect('/lista')
})


app.listen(8080, () =>{
console.log("Funnfou")
})