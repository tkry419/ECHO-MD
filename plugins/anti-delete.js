const { cmd } = require('../echo');
const { setAntideleteStatus, getAntideleteStatus } = require('../data/Antidelete');

cmd({
    pattern: "antidelete",
    alias: ["antidel"],
    desc: "Turn Antidelete on/off",
    category: "owner",
    react: "🛡️"
},
async(conn, mek, m, { args, isOwner, reply, from }) => {
    if (!isOwner) return reply("*This command is only for the owner 😎*");
    const mode = args[0]?.toLowerCase();

    if (mode === 'on' || mode === 'enable') {
        await setAntideleteStatus(from, true);
        await reply("*👑 ANTI-DELETE ACTIVATED 👑*");
    } else if (mode === 'off' || mode === 'disable') {
        await setAntideleteStatus(from, false);
        await reply("*👑 ANTI-DELETE DEACTIVATED 👑*");
    } else {
        const current = await getAntideleteStatus(from);
        await reply(`*Current Anti-Delete Status: ${current? "ON" : "OFF"}*\n\n*To enable: antidelete on*\n*To disable: antidelete off*`);
    }
});
