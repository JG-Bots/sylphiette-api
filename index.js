///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
           ///MODULOS E CONTS\\\
///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
const express = require('express')
const cors = require('cors')
const secure = require('ssl-express-www')
const PORT = process.env.PORT || 8080 || 5000 || 3000
const { color } = require('./lib/color.js')

///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
   ///PUXADOR DE ARQUIV INPORTANTE!\\\
///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
const mainrouter = require('./routes/main')
const apirouter = require('./routes/api')

///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
     ///INICIAR DA API NÃO APAGUE\\\
///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
const app = express()
app.enable('trust proxy');
app.set("json spaces",2)
app.use(cors())
app.use(secure)
app.use(express.static("public"))

app.use('/', mainrouter)
app.use('/api', apirouter)

///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
///O ABRIDOR OU SEILA DA PORTA KAKAK\\\
///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
app.listen(PORT, () => {
console.log(color("Servidor rodando na porta " + PORT,'green'))
})

///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
               ///CABOOOO ;-; \\\
///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
module.exports = app