const { cmd } = require('../echo');
const yts = require('yt-search');

cmd({
    pattern: "yts",
    alias: ["ytsearch"],
    react: "🔎",
    desc: "Search videos on YouTube",
    category: "search",
    use: ".yts <video name>",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) {
            return reply(
                "*🔍 Please provide a video name to search.*\n\n" +
                "*Usage:*\n.yts <video name>\n\n" +
                "*Example:*\n.yts Shape of You"
            );
        }

        const search = await yts(q);
        const videos = search.videos.slice(0, 10);

        if (videos.length === 0) {
            return reply("*❌ No videos found.*");
        }

        let text = "*📺 YOUTUBE SEARCH RESULTS 📺*\n\n";

        for (let i = 0; i < videos.length; i++) {
            const v = videos[i];

            text +=
`*${i + 1}. ${v.title}*
⏱️ Duration: ${v.timestamp}
👁️ Views: ${Number(v.views).toLocaleString()}
🔗 Link: ${v.url}

`;
        }

        text += "*👑 ECHO-MD-MINI WHATSAPP BOT 👑*";

        await conn.sendMessage(
            from,
            { text },
            { quoted: mek }
        );

    } catch (e) {
        console.error("YTS ERROR:", e);
        reply("*❌ An error occurred while searching YouTube.*");
    }
});
