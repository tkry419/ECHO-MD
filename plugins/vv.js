const { cmd } = require('../echo')

cmd({
    pattern: "vv",
    alias: ["viewonce", "view", "open"],
    react: "🥺",
    desc: "Retrieve view-once media (Owner only)",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, isCreator, reply }) => {
    try {
        if (!isCreator)
            return reply("*This command is only for the bot owner 😎*")

        if (!m.quoted)
            return reply(
                "*🥺 Reply to a view-once photo / video / audio*\n\n" +
                "*Then type:* `.vv`\n\n" +
                "*Then watch the magic 😎*"
            )

        // 🔥 VIEW ONCE FIX
        let quoted = m.quoted
        let msg = quoted.message

        if (msg?.viewOnceMessageV2) {
            msg = msg.viewOnceMessageV2.message
        } else if (msg?.viewOnceMessageV2Extension) {
            msg = msg.viewOnceMessageV2Extension.message
        } else if (msg?.viewOnceMessage) {
            msg = msg.viewOnceMessage.message // for older versions
        }

        const type = Object.keys(msg)[0]
        const buffer = await quoted.download()

        let content = {}

        if (type === "imageMessage") {
            content = {
                image: buffer,
                caption: quoted.text || ""
            }
        }
        else if (type === "videoMessage") {
            content = {
                video: buffer,
                caption: quoted.text || ""
            }
        }
        else if (type === "audioMessage") {
            content = {
                audio: buffer,
                mimetype: "audio/mp4",
                ptt: false
            }
        }
        else {
            return reply("*❌ This view-once media type is not supported 🥺*")
        }

        await conn.sendMessage(from, content, { quoted: mek })

    } catch (e) {
        console.log("VV ERROR:", e)
        reply("*❌ Error opening view-once media 🥺*")
    }
})
