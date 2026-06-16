const { cmd } = require('../echo');
const axios = require('axios');

cmd({
  pattern: "fb",
  react: "☺️",
  alias: ["facebook", "fbdl"],
  category: "download",
  filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return reply("*Want to download a Facebook video? 🤔*\n*Copy the video link and use the command like this:*\n\n*.fb <facebook video link>*\n\n*Your Facebook video will be downloaded and sent here 😍♥️*");

    const apiUrl = `https://movanest.xyz/v2/fbdown?url=${encodeURIComponent(q)}`;
    const res = await axios.get(apiUrl);
    const data = res.data;

    // 🔎 API status check
    if (data.status !== true) {
      return reply("*API ERROR 😢*");
    }

    // 🔎 Results check
    if (!Array.isArray(data.results) || data.results.length === 0) {
      return reply("*Facebook video not found 🥺*");
    }

    const result = data.results[0];

    // 🎥 Quality selection
    const videoUrl = result.hdQualityLink
      ? result.hdQualityLink
      : result.normalQualityLink;

    if (!videoUrl) {
      return reply("*Please provide a valid Facebook video link ☺️*");
    }

    // 📝 Caption from API data
    const caption = `*👑 FB VIDEO 👑*
*👑 DURATION: ${result.duration}*
*👑 CREATOR: ${data.creator}*
*👑 BY: ECHO-MD 👑*`;

    await conn.sendMessage(
      from,
      {
        video: { url: videoUrl },
        mimetype: "video/mp4",
        caption: caption
      },
      { quoted: mek }
    );

  } catch (err) {
    console.log(err);
    reply("*❌ An error occurred, please try again*");
  }
});
