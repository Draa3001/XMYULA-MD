
const { MessageType } = require('@adiwajshing/baileys');

let handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Masukkan jumlah bank yang ingin ditambahkan pada pengguna. Contoh: .addbank @user 10';
  }
    
 	conn.chatRead(m.chat)
	conn.sendMessage(m.chat, {
		react: {
			text: '🕒',
			key: m.key,
		}
	})

  let mentionedJid = m.mentionedJid[0];
  if (!mentionedJid) {
    throw 'Tag pengguna yang ingin ditambahkan banknya Contoh: .addbank @user 10';
  }

  let pointsToAdd = parseInt(text.split(' ')[1]);
  if (isNaN(pointsToAdd)) {
    throw 'Jumlah bank yang dimasukkan harus berupa angka. Contoh: .addbank @user 10';
  }

  let users = global.db.data.users;
  if (!users[mentionedJid]) {
    users[mentionedJid] = {
      bank: 0,
      exp: 0,
      lastclaim: 0
    };
  }

  users[mentionedJid].bank += pointsToAdd;

  conn.reply(m.chat, `Berhasil menambahkan ${pointsToAdd} bank untuk @${mentionedJid.split('@')[0]}.`, m, {
    mentions: [mentionedJid]
  });
};

handler.help = ['addbank @user <jumlah bank>'];
handler.tags = ['xp'];
handler.command = /^addbank$/i;
handler.owner = true;

module.exports = handler;
