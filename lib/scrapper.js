const cheerio = require('cheerio');
const axios = require('axios');
const request = require("request");

//===============================================// ( TTP DE SUPRAOFC )

function ttp(texto){
return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      url: `https://www.picturetopeople.org/p2p/text_effects_generator.p2p/transparent_text_effect`,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
        "Cookie": "_ga=GA1.2.1667267761.1655982457; _gid=GA1.2.77586860.1655982457; __gads=ID=c5a896288a559a38-224105aab0d30085:T=1655982456:RT=1655982456:S=ALNI_MbtHcmgQmVUZI-a2agP40JXqeRnyQ; __gpi=UID=000006149da5cba6:T=1655982456:RT=1655982456:S=ALNI_MY1RmQtva14GH-aAPr7-7vWpxWtmg; _gat_gtag_UA_6584688_1=1"
    },
    formData: {
      'TextToRender': texto,
      'FontSize': '100',
      'Margin': '30',
      'LayoutStyle': '0',
      'TextRotation': '0',
      'TextColor': 'DCDCDC',
      'TextTransparency': '0',
      'OutlineThickness': '6',
      'OutlineColor': '000000',
      'FontName': 'Lekton',
      'ResultType': 'view'
    }
};
request(options, async function(error, response, body) {
if (error) throw new Error(error)
const $ = cheerio.load(body)
const result = 'https://www.picturetopeople.org' + $('#idResultFile').attr('value')
resolve({ status: 200, result: result })
});
})
}

//=================================//

module.exports.ttp = ttp

//=================================//

//===============================================// ( TIKTOK DE JG-BOTS )

function tiktok(url) {
  return new Promise((resolve, reject) => {
    axios.get("https://downvideo.quora-wiki.com/tiktok-video-downloader#url=" + url)
    .then(data => {
      var get_token = cheerio.load(data.data);
      var token = get_token("#token").attr("value");
      var params = {
        url: url,
        token: token,
      };
      var options = {
        url: 'https://downvideo.quora-wiki.com/system/action.php',
        method: "post",
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
          "referer": "https://downvideo.quora-wiki.com/tiktok-video-downloader",
        },
        data: new URLSearchParams(Object.entries(params)),
      };
      axios.request(options)
      .then(data => {
        resolve({
          titulo: data.data.title,
          thumbnail: data.data.thumbnail,
          duracao: data.data.duration,
          resultado: data.data.medias          
        });
      })
      .catch(error => {
        reject(error);
        console.log(error)
      });
    })
    .catch(error => {
      console.log(error)
      reject(error);
    });
  });
}

//=================================//

module.exports.tiktok = tiktok;

//=================================//