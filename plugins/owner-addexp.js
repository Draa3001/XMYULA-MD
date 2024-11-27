
const { MessageType } = require('@adiwajshing/baileys');

let handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Masukkan jumlah exp yang ingin ditambahkan pada pengguna. Contoh: .addexp @user 10';
  }
    
 	conn.chatRead(m.chat)
	conn.sendMessage(m.chat, {
		react: {
			text: '',
			key: m.key,
		}
	})

  let mentionedJid = m.mentionedJid[0];
  if (!mentionedJid) {
    throw 'Tag pengguna yang ingin ditambahkan expnya Contoh: .addexp @user 10';
  }

  let pointsToAdd = parseInt(text.split(' ')[1]);
  if (isNaN(pointsToAdd)) {
    throw 'Jumlah exp yang dimasukkan harus berupa angka. Contoh: .addexp @user 10';
  }

  let users = global.db.data.users;
  if (!users[mentionedJid]) {
    users[mentionedJid] = {
      exp: 0,
      exp: 0,
      lastclaim: 0
    };
  }

  users[mentionedJid].exp += pointsToAdd;

  conn.reply(m.chat, `Berhasil menambahkan ${pointsToAdd} exp untuk @${mentionedJid.split('@')[0]}.`, m, {
    mentions: [mentionedJid]
  });
};

handler.help = ['addexp @user <jumlah exp>'];
handler.tags = ['xp'];
handler.command = /^addexp$/i;
handler.owner = true;

module.exports = handler;