const axios = require("axios");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");
const {france} = require("../framework/france");

france({
  nomCom: "stickersearch",
  categorie: 'Search',
  reaction: "🍁"
},
async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg, nomAuteurMessage } = commandeOptions;

  if (!arg[0]) {
    repondre("where is the request ? !");
    return;
  }

  const gifSearchTerm = arg.join(" ");
  const tenorApiKey = "AIzaSyCyouca1_KKy4W_MG1xsPzuku5oa8W358c"; // Remplacez par votre clé d'API Tenor

  try { for ( i = 0 ; i < 5 ; i++) {
    const gif = await axios.get(
      `https://tenor.googleapis.com/v2/search?q=${gifSearchTerm}&key=${tenorApiKey}&client_key=my_project&limit=8&media_filter=gif`
    );

    const gifUrl = gif.data.results[i].media_formats.gif.url;

    
   

    // Assurez-vous de remplacer les valeurs manquantes dans la création du sticker
    const packname = nomAuteurMessage; // Remplacez par le nom de votre pack de stickers

    const stickerMess = new Sticker(gifUrl, {
      pack: packname,
      author: 'ECHO-MD',
      type: StickerTypes.FULL,
      categories: ["🤩", "🎉"],
      id: "12345",
      quality: 60,
      background: "transparent",
    });
    const stickerBuffer2 = await stickerMess.toBuffer();
    zk.sendMessage(dest, { sticker: stickerBuffer2 }, { quoted: ms }); }
  } catch (error) {
    console.error("Error while searching for stickers :", error);
    repondre("Error while searching for stickers.");
  }
});
