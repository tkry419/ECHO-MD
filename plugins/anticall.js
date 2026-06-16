const { cmd } = require('../echo');
const config = require('../config');

cmd({
    pattern: "anti-call",
    react: "👑",
    alias: ["anticall"],
    desc: "Enable or disable anti-call to auto reject incoming calls",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("*This command is only for the owner 😎*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.ANTI_CALL = "true";
        return reply("*👑 ANTI-CALL ACTIVATED 👑*");
    } else if (status === "off") {
        config.ANTI_CALL = "false";
        return reply("*👑 ANTI-CALL DEACTIVATED 👑*");
    } else {
        return reply(`*Current Status: ${config.ANTI_CALL}*\n\n*To enable, type:*\n*anti-call on*\n\n*To disable, type:*\n*anti-call off*`);
    }
});
