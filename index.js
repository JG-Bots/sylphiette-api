const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const axios = require('axios');
const cheerio = require('cheerio');
var fetch = require('node-fetch');

const app = express();
const dataFile = path.join(__dirname, 'public/users.json'); // Arquivo para salvar dados localmente

// Configurações do Express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

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

// Função para ler dados do arquivo JSON
function readData() {
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify([])); // Cria o arquivo vazio se não existir
  }
  const data = fs.readFileSync(dataFile);
  const users = JSON.parse(data);

  // Garantir que todos os usuários tenham a propriedade saldoUsado
  users.forEach(user => {
    if (user.saldoUsado === undefined) {
      user.saldoUsado = 0; // Inicializa saldoUsado se não existir
    }
    if (user.total === undefined) {
      user.total = 0; // Inicializa total de ações se não existir
    }
  });

  return users;
}

// Função para salvar dados no arquivo JSON
function saveData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

// Middleware para carregar usuários na memória
let users = readData();

// Função para gerar a chave API
function gerarApiKey() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let apiKey = '';
  for (let i = 0; i < 5; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    apiKey += caracteres[indice];
  }
  return apiKey;
}

// Função para diminuir saldo e registrar saldo usado
async function diminuirSaldo(username) {
  const user = users.find(u => u.username === username);
  if (user) {
    if (user.saldo > 0) {
      user.saldo--;         // Diminui o saldo
      user.saldoUsado++;    // Aumenta o contador de saldo usado
      user.total++;         // Incrementa a quantidade de ações realizadas
      saveData(users);      // Salva os dados no arquivo
      return true;
    }
  }
  return false;
}

// Função para adicionar saldo
async function adicionarSaldo(username) {
  const user = users.find(u => u.username === username);
  if (user) {
    user.saldo += 1;       // Adiciona 1 ao saldo
    saveData(users);
    return true;
  }
  return false;
}

// Rota inicial
app.get('/', async (req, res) => {
  const user = req.session.user;
  if (!user) {
    return res.redirect('/login');
  }

  try {
    // Buscar informações do usuário logado
    const userDb = users.find(u => u.username === user.username);

    // Contar a quantidade total de usuários
    const quantidadeRegistrados = users.length;

    // Ordenar os usuários pelo saldo em ordem decrescente
    const topUsers = [...users].sort((a, b) => b.saldo - a.saldo).slice(0, 5);

    // Garantir que o saldo usado também seja exibido corretamente
    return res.render('dashboard', {
      user,               // Usuário logado (sessão)
      userDb,             // Dados do usuário no "banco de dados"
      saldo: user.saldo,
      saldoUsado: userDb.saldoUsado, // Passando saldo usado explicitamente
      topUsers,           // Top usuários por saldo
      quantidade: quantidadeRegistrados, // Total de usuários registrados
      apiKey: user.apiKey // Passando a chave de API do usuário
    });
  } catch (error) {
    console.error('Erro ao processar a rota:', error);
    return res.status(500).send('Erro interno ao processar a rota.');
  }
});

// Rota de login
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    req.session.user = user;
    res.redirect('/');
  } else {
    res.status(401).send('Usuário ou senha incorretos.');
  }
});

// Rota de registro
app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  const { username, password, email } = req.body;

  if (users.find(u => u.username === username)) {
    return res.status(409).send('Nome de usuário já existe.');
  }

  const newUser = {
    username,
    password,
    email,
    saldo: 400,           // Saldo inicial
    saldoUsado: 0,        // Inicializa o saldo usado
    total: 0,             // Contador de ações realizadas
    apiKey: gerarApiKey() // Gerando a chave API aleatória
  };

  users.push(newUser);
  saveData(users); // Salva os dados no arquivo JSON
  req.session.user = newUser;
  res.redirect('/');
});

// Rota de logout
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

app.get('/valor', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/valor.ejs'));
});

// Rota para gerar Nick
app.get('/others/fazernick', async (req, res, next) => {
  const texto = req.query.texto;
  
  // Verifica se o parâmetro "texto" foi fornecido
  if (!texto) {
    return res.json({ status: false, criador: 'criador', mensagem: "Coloque o parametro: texto" });
  }
  
  const apikey = req.query.apikey;
  
  // Verifica se a API Key foi fornecida
  if (!apikey) {
    return res.json({ status: false, mensagem: 'API Key é obrigatória' });
  }

  // Busca o usuário pela API Key
  const user = users.find(u => u.apiKey === apikey);
  
  // Se o usuário não for encontrado com a API Key
  if (!user) {
    return res.json({ status: false, mensagem: 'API Key inválida ou não encontrada' });
  }

  // Verificar se o saldo do usuário é suficiente para gerar o Nick
  const saldoSuficiente = await diminuirSaldo(user.username);

  // Se o saldo não for suficiente
  if (!saldoSuficiente) {
    return res.json({ status: false, mensagem: 'Saldo insuficiente' });
  }

  try {
    // Fazer a requisição para gerar os nicks usando a API externa
    const { data } = await axios.get(`https://qaz.wtf/u/convert.cgi?text=${texto}`);
    const $ = cheerio.load(data);
    const hasil = [];
    
    // Extrair os nicks gerados da página
    $('table > tbody > tr').each(function (a, b) {
      hasil.push($(b).find('td:nth-child(2)').text().trim());
    });
    
    // Preparar o resultado com os nicks gerados
    let resultado = {};
    for (let i = 0; i < hasil.length; i++) {
      resultado[`nicks${i + 1}`] = hasil[i];
    }

    // Retorna a resposta com o status e o saldo restante/consumido
    return res.json({
      status: true,
      criador: 'criador',
      saldoRestante: user.saldo,
      saldoUsado: user.saldoUsado,
      resultado: resultado
    });
  } catch (error) {
    // Se houver erro na requisição ou no processo de geração do Nick
    next(error);
  }
});

app.get('/canva/ping', async (req, res, next) => {
  const texto = req.query.texto;
  
  // Verifica se o parâmetro "texto" foi fornecido
  if (!texto) {
    return res.json({ status: false, criador: 'criador', mensagem: "Coloque o parametro: texto" });
  }
  
  const apikey = req.query.apikey;
  
  // Verifica se a API Key foi fornecida
  if (!apikey) {
    return res.json({ status: false, mensagem: 'API Key é obrigatória' });
  }

  // Busca o usuário pela API Key
  const user = users.find(u => u.apiKey === apikey);
  
  // Se o usuário não for encontrado com a API Key
  if (!user) {
    return res.json({ status: false, mensagem: 'API Key inválida ou não encontrada' });
  }

  // Verificar se o saldo do usuário é suficiente para gerar o Nick
  const saldoSuficiente = await diminuirSaldo(user.username);

  // Se o saldo não for suficiente
  if (!saldoSuficiente) {
    return res.json({ status: false, mensagem: 'Saldo insuficiente' });
  }

  try {

let welcomee = (`https://eruakorl.sirv.com/Bot%20dudinha/ping.jpeg?text.0.text=VELOCIDADE%20DO%20BOT&text.0.position.gravity=north&text.0.position.y=15%25&text.0.size=40&text.0.font.family=Teko&text.0.font.weight=800&text.0.background.opacity=100&text.0.outline.blur=100&text.1.text=${texto}&text.1.position.gravity=center&text.1.size=30&text.1.color=ffffff&text.1.font.family=Teko&text.1.font.weight=800&text.1.background.opacity=100&text.1.outline.blur=100`)
let buffer = await getBuffer(welcomee)
res.type('png')
res.send(buffer)

  } catch (error) {
    // Se houver erro na requisição ou no processo de geração do Nick
    next(error);
  }
});

app.get('/pesquisas/pinterest', async (req, res, next) => {
  const { texto, apikey } = req.query;

  // Verifica se o parâmetro "texto" foi fornecido
  if (!texto) {
    return res.json({ 
      status: false, 
      criador: 'criador', 
      mensagem: "Coloque o parâmetro: texto" 
    });
  }

  // Verifica se a API Key foi fornecida
  if (!apikey) {
    return res.json({ 
      status: false, 
      mensagem: 'API Key é obrigatória' 
    });
  }

  // Busca o usuário pela API Key
  const user = users.find(u => u.apiKey === apikey);

  // Se o usuário não for encontrado com a API Key
  if (!user) {
    return res.json({ 
      status: false, 
      mensagem: 'API Key inválida ou não encontrada' 
    });
  }

  // Verifica se o saldo do usuário é suficiente
  const saldoSuficiente = await diminuirSaldo(user.username);

  if (!saldoSuficiente) {
    return res.json({ 
      status: false, 
      mensagem: 'Saldo insuficiente' 
    });
  }

  try {
    // Faz a requisição para o Pinterest
    const response = await axios.get(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${encodeURIComponent(texto)}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${encodeURIComponent(texto)}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`);
    const results = response.data.resource_response.data.results;

    if (!results || results.length === 0) {
      return res.json({ 
        status: false, 
        mensagem: 'Nenhum resultado encontrado no Pinterest' 
      });
    }

    // Seleciona um resultado aleatório
    const random = results[Math.floor(Math.random() * results.length)];

    // Busca a imagem em formato de buffer
    const buffer = await getBuffer(random.images.orig.url);

    // Retorna a imagem no formato JPG
    res.type('jpg');
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.json({ 
      status: false, 
      mensagem: 'Erro ao buscar dados no Pinterest',
      erro: error.message
    });
  }
});

// Inicializa o servidor
app.listen(3000, () => {
  console.log("Servidor rodando: http://localhost:3000");
});

module.exports = app;