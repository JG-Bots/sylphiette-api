///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
    ///INICIO DA API E DE TUDO KSKSK\\\
///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\

__path = process.cwd()

///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
           ///MODULOS E CONTS\\\
///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
const fs = require('fs');
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const axios = require("axios");
const cheerio = require("cheerio");
const router  = express.Router();
const { fetchJson } = require(__path + '/lib/fetcher.js')
///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
           ///NICKS DO CRIADOR\\\
///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
const criadorList = ["JG-Bots"];
const criador = criadorList[Math.floor(Math.random() * criadorList.length)];

///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
   ///ARQUIVOS DE SCRAPING OU SEI LA\\\
///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\const { PlayLinkMP3, PlayLinkMP4, PlayAudio, PlayVideo, ytSearch } = require("./../database/youtube");

const { ttp } = require(__path + '/lib/scrapper.js');

///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
           ///RESPOSTAS DA API\\\
///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
resposta = {
semkey: {
      status: false,
      criador: `${criador}`,
      code: 406,
      mensagem: `Erro apikey esta errada. Não tem apikey? Chame e compre sua chave por apenas 15 R$ wa.me/558594034292`,
},
error: {
    status: false,
    criador: `${criador}`,
    mensagem: 'talvez esteja sendo consertado'
    }
}

///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
 ///LISTA DAS APIKEYS VC PODE ADD MS\\\
///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
const listkey = ["ale1", "ale2", "ale3", "ale4", "ale5", "ale6", "ale7", "ale8", "ale9", "ale10","ale11", "ale12", "ale13", "ale14", "ale15", "ale16", "ale17", "ale18", "ale19", "ale20", "ale21", "ale22", "ale23", "ale24", "ale25", "ale26", "ale27", "ale28", "ale29", "ale30", "ale31", "ale32", "ale33", "ale34", "ale35", "ale36", "ale37", "ale38", "ale39", "ale40", "ale41", "ale42", "ale43", "ale44", "ale45", "ale46", "ale47", "ale48", "ale49", "ale50"];

///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
      ///LISTA DAS APIKEYS PREMIUM\\\
///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
const keyprem = ["VIP-1"];

///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
 ///AUGUMAS CONSTS PRA API FUNCIONA\\\
///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
async function getBuffer(url) {
he = await fetch(url).then(c => c.buffer())
 return he
}
async function Kibar(url) {
he = await fetch(url).then(c => c.json())
 return he
}
function MathRandom(nans) {
he = nans[Math.floor(Math.random() * nans.length)]
 return he
}

///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
            ///CHECAR APIKEY\\\
///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
router.get('/cekapikey', async(req, res, next) => {
const apikey = req.query.apikey;
if(!apikey) return res.json(resposta.semkey)
if(listkey.includes(apikey)) {
res.json({
  status: 'ApiKey ATIVA',
  criador: `${criador}`,
  apikey: `${apikey}`,
  limite: 999,
})
} else {
res.json(resposta.semkey)
}
})

///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
            ///ADICIONAR APIKEY\\\
///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
router.get("/apikeyadd", async (req, res, next) => {
  const key = req.query.key;
  if(listkey.includes(key)) {
    res.json({
      message: 'apikey está registrado'
    });
  } else {
    listkey.push(key);
    res.json({
      message: `registado com sucesso ${key} para banco de dados`
    });
  }
});

///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
             ///DELETAR APIKEY\\\
///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
router.get("/apikeydel", async (req, res, next) => {
	const apikey = req.query.apikey;
	if(listkey.includes(apikey)){
		res.json({
			message: 'apikey não existia antes'
			})
			} else {
	listkey.splice(apikey, 1)
	res.json({
		message: 'apikey excluído com sucesso' 
});
 }
});

///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
            ///API'S DE YOUTUBE\\\
///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
router.get('/youtube/playmp3', async (req, res, next) => {
q = req.query.q
var apikey = req.query.apikey
if(!apikey) return res.json(resposta.semkey)
if(listkey.includes(apikey)){
PlayAudio(q).then((resultado) => {
res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: resultado
})
}).catch(e => {
res.json({
msg: `erro no servidor interno`
})
})
} else {
res.json(resposta.semkey)
}
})

router.get('/youtube/playmp4', async (req, res, next) => {
q = req.query.q
var apikey = req.query.apikey
if(!apikey) return res.json(resposta.semkey)
if(listkey.includes(apikey)){
PlayVideo(q).then((resultado) => {
res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: resultado
})
}).catch(e => {
res.json({
msg: `erro no servidor interno`
})
})
} else {
res.json(resposta.semkey)
}
})

router.get('/youtube/mp3', async (req, res, next) => {
link = req.query.link
var apikey = req.query.apikey
if(!apikey) return res.json(resposta.semkey)
if(listkey.includes(apikey)){
PlayLinkMP3(link).then((resultado) => {
res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: resultado
})
}).catch(e => {
res.json({
msg: `erro no servidor interno`
})
})
} else {
res.json(resposta.semkey)
}
})

router.get('/youtube/mp4', async (req, res, next) => {
link = req.query.link
var apikey = req.query.apikey
if(!apikey) return res.json(resposta.semkey)
if(listkey.includes(apikey)){
PlayLinkMP4(link).then((resultado) => {
res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: resultado
})
}).catch(e => {
res.json({
msg: `erro no servidor interno`
})
})
} else {
res.json(resposta.semkey)
}
})

router.get('/youtube/pesquisar', async (req, res, next) => {
q = req.query.q
var apikey = req.query.apikey
if(!apikey) return res.json(resposta.semkey)
if(listkey.includes(apikey)){
ytSearch(q).then(result => {
res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: result
})
}).catch(e => {
res.json({
msg: `erro no servidor interno`
})
})
} else {
res.json(resposta.semkey)
}
})

///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
         ///OUTROS TIPOS DE API'S\\\
///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
router.get('/others/fazernick', async (req, res, next) => {
const texto = req.query.texto;
if (!texto) {
return res.json({ status: false, criador: 'criador', mensagem: "Coloque o parametro: texto" });
}
const apikey = req.query.apikey;
if (!apikey) {
return res.json(resposta.semkey);
}
if (listkey.includes(apikey)) {
try {
const { data } = await axios.get(`https://qaz.wtf/u/convert.cgi?text=${texto}`);
const $ = cheerio.load(data);
const hasil = [];
$('table > tbody > tr').each(function (a, b) {
hasil.push($(b).find('td:nth-child(2)').text().trim());
});
let resultado = {};
for (let i = 0; i < hasil.length; i++) {
resultado[`nicks${i + 1}`] = hasil[i];
}
res.json({
status: true,
    código: 999,
    criador: `${criador}`,
    resultado: resultado
});
} catch (error) {
next(error);
}
} else {
res.json(resposta.semkey);
}
});

router.get('/others/fazernick2', async (req, res, next) => {
texto = req.query.texto
if (!texto) return res.json({ status : false, criador : `criador`, mensagem : "Coloque o parametro: texto"})
var apikey = req.query.apikey;
if(!apikey) return res.json(resposta.semkey)
if(listkey.includes(apikey)){
axios.get(`https://qaz.wtf/u/convert.cgi?text=${texto}`)
.then(({ data }) => {
let $ = cheerio.load(data)
let hasil = []
$('table > tbody > tr').each(function (a, b) {
hasil.push({ resultado: $(b).find('td:nth-child(2)').text().trim() })
})
const resultado = hasil;
    res.json({
    criador: `${criador}`, 
    resultado
    })
})
} else {
res.json(resposta.semkey)
}
})

router.get('/consultas/geradordedados', async (req, res, next) => {
var apikey = req.query.apikey;
if(!apikey) return res.json(resposta.semkey)
if(keyprem.includes(apikey)){
var amv = JSON.parse(fs.readFileSync(__path + '/database/geradordedados.json'))
res
.status(200)
.json({
status: true,
código: 200,
criador: `${criador}`,
...amv[~~(Math.random() * amv.length)]
})
} else {
res.json(resposta.semkey)
}
})

 //[ - ///////// --- Api's NSFW --- ///////// - ]\\

router.get('/nsfw/loli', async (req, res, next) => {
var apikey = req.query.apikey;
if(!apikey) return res.json(resposta.semkey)
if(listkey.includes(apikey)){
json = JSON.parse(fs.readFileSync('lib/lolis.json').toString())
random = json[Math.floor(Math.random() * json.length)]
res.type('png')
res.send(await getBuffer(random))
} else {
res.json(resposta.semkey)
}
})

router.all('/nsfw/elisa-sanches', async (req, res) => {
apikey = req.query.apikey;
if(apikey !== key) return res.sendFile(keyinexistente)
json = JSON.parse(fs.readFileSync('database/nsfwelisa.json').toString())
random = json[Math.floor(Math.random() * json.length)]
res.type('png')
res.send(await getBuffer(random))
})

router.all('/nsfw/loli-masturbation', async (req, res) => {
apikey = req.query.apikey;
if(apikey !== key) return res.sendFile(keyinexistente)
json = JSON.parse(fs.readFileSync('database/masturbation.json').toString())
random = json[Math.floor(Math.random() * json.length)]
res.type('png')
res.send(await getBuffer(random))
})

router.all('/nsfw/loli-pussy', async (req, res) => {
apikey = req.query.apikey;
if(apikey !== key) return res.sendFile(keyinexistente)
json = JSON.parse(fs.readFileSync('database/pussy.json').toString())
random = json[Math.floor(Math.random() * json.length)]
res.type('png')
res.send(await getBuffer(random))
})

router.all('/nsfw/loli-gif', async (req, res) => {
apikey = req.query.apikey;
if(apikey !== key) return res.sendFile(keyinexistente)
json = JSON.parse(fs.readFileSync('database/hnt_gifs.json').toString())
random = json[Math.floor(Math.random() * json.length)]
res.type('gif')
res.send(await getBuffer(random))
})

router.all('/nsfw/loli-yuri', async (req, res) => {
apikey = req.query.apikey;
if(apikey !== key) return res.sendFile(keyinexistente)
json = JSON.parse(fs.readFileSync('database/yuri.json').toString())
random = json[Math.floor(Math.random() * json.length)]
res.type('png')
res.send(await getBuffer(random))
})

///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
       ///FIM DAS APIS E DE TUDO\\\
///⊰᯽⊱═══❖•ೋ° △ °ೋ•❖═══⊰᯽⊰\\\
module.exports = router