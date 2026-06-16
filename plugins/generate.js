const { cmd, commands } = require('../echo');
const config = require('../config');
const os = require('os');

// =================================================================
// 🏓 PING COMMAND (Speedtest Style)
// =================================================================
cmd({
    pattern: "uptime",
    alias: ["speed", "ping"],
    desc: "Check latency and system resources",
    category: "general",
    react: "👑"
},
async(conn, mek, m, { from, reply, myquoted }) => {
    try {
        const start = Date.now();
        
        // 1. Waiting message
        const msg = await conn.sendMessage(from, { text: '*TESTING....*' }, { quoted: myquoted });
        
        const end = Date.now();
        const latency = end - start;
        
        // 2. Memory (RAM) calculation
        const totalMem = (os.totalmem() / 1024 / 1024).toFixed(0);
        const freeMem = (os.freemem() / 1024).toFixed(0);
        const usedMem = (totalMem - freeMem).toFixed(0);

        // 3. Final styled message
        const pingMsg = `
*👑 ECHO-MD STATUS 👑* ⚡

*LATENCY: ${latency}ms*

*👑 RAM: ${usedMem}MB / ${totalMem}MB*
`;

        // 4. Edit message (Visual effect)
        await conn.sendMessage(from, { text: pingMsg, edit: msg.key });

    } catch (e) {
        reply("Error: " + e.message);
    }
});

// =================================================================
// 👑 OWNER COMMAND (Contact Card)
// =================================================================
cmd({
    pattern: "owner",
    desc: "Contact the creator",
    category: "general",
    react: "👑"
},
async(conn, mek, m, { from, myquoted }) => {
    const ownerNumber = config.OWNER_NUMBER;
    
    // Create vCard (Contact card)
    const vcard = 'BEGIN:VCARD\n' +
                  'VERSION:3.0\n' +
                  'FN:ECHO-MD (Owner)\n' +
                  'ORG:ECHO-MD Corp;\n' +
                  `TEL;type=CELL;type=VOICE;waid=${ownerNumber}:${ownerNumber}\n` +
                  'END:VCARD';

    await conn.sendMessage(from, {
        contacts: {
            displayName: 'ECHO-MD',
            contacts: [{ vcard }]
        }
    }, { quoted: myquoted });
});
