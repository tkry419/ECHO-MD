const { france } = require('../framework/france');

france({ nomCom: 'quote', categorie: 'Group' }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, verifGroupe, arg } = commandeOptions;
  if (!verifGroupe) {
    repondre('This Command works in groups only!!!');
    return;
  }

  if (!arg[0]) {
    try {
      fetch('https://animechan.xyz/api/random')
        .then((response) => response.json())
        .then(async (quote) => {
          repondre(`*ECHO-MD Quotes*

🎬 Anime: ${quote.anime}
👤 Character: ${quote.character}
💬 Quote: ${quote.quote}

Powered by *ECHO-MD*`);
        });
    } catch (e) {
      repondre('Error while generating the quote : ' + e.message);
    }
  } else {
    const query = arg.join(' ');

    try {
      fetch('https://animechan.xyz/api/random/character?name=' + query)
        .then((response) => response.json())
        .then(async (quote) => {
          repondre(`ECHO-MD

🎬 Anime: ${quote.anime}
👤 Character: ${quote.character}
💬 Quote: ${quote.quote}

Powered by *ECHO-MD*`);
        });
    } catch (e) {
      repondre('Error while generating the quote : ' + e.message);
    }
  }
});
