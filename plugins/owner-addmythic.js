
const { MessageType } = require('@adiwajshing/baileys');

let handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Masukkan jumlah mythic yang ingin ditambahkan pada pengguna. Contoh: .addmythic @user 10';
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
    throw 'Tag pengguna yang ingin ditambahkan mythicnya Contoh: .addmythic @user 10';
  }

  let pointsToAdd = parseInt(text.split(' ')[1]);
  if (isNaN(pointsToAdd)) {
    throw 'Jumlah mythic yang dimasukkan harus berupa angka. Contoh: .addmythic @user 10';
  }

  let users = global.db.data.users;
  if (!users[mentionedJid]) {
    users[mentionedJid] = {
      mythic: 0,
      exp: 0,
      lastclaim: 0
    };
  }

  users[mentionedJid].mythic += pointsToAdd;

  conn.reply(m.chat, `Berhasil menambahkan ${pointsToAdd} mythic untuk @${mentionedJid.split('@')[0]}.`, m, {
    mentions: [mentionedJid]
  });
};

handler.help = ['addmythic @user <jumlah mythic>'];
handler.tags = ['xp'];
handler.command = /^addmythic$/i;
handler.owner = true;

module.exports = handler;