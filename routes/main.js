__path = process.cwd()

///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
           ///MODULOS E CONTS\\\
///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
const express = require('express');
const router = express.Router();

///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
              ///HTMLS DA API\\\
///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
router.get('/', (req, res) => {
    res.sendFile(__path + '/views/index.html')
})
router.get('/api', (req, res) => {
    res.sendFile(__path + '/views/index.html')
})
router.get('/valor', (req, res) => {
    res.sendFile(__path + '/views/valor.html')
})

///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
   ///UMA CONFIGURAÇÃOSINHA NE KSK\\\
///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
router.get('/config', (req, res) => {
config = {
status: true,
result: {
    prefix : '/',
    nomebot: 'RestApi',
    nomedono: 'jerfinho',
    youtube : 'JG-Bots'
   }
}
res.json(config)
})

///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
         ///FIM DE TUDO KAKAKAK\\\
///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
module.exports = router