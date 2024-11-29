let handler = async (m, { conn, command, text, args }) => {
    if (!text) throw 'Berapa Level?'
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw 'Tag??'
    let users = global.db.data.users
    users[who].level += ['quantity']
    conn.reply(m.chat, 'Sukses', m)
}
handler.help = ['addlevel']
handler.tags = ['owner']
handler.command = /^addlevel(user)?$/i
handler.rowner = true

export default handler
