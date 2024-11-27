
const { MessageType } = require('@adiwajshing/baileys');

let handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Masukkan jumlah legendary yang ingin ditambahkan pada pengguna. Contoh: .addlegendary @user 10';
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
    throw 'Tag pengguna yang ingin ditambahkan legendarynya Contoh: .addlegendary @user 10';
  }

  let pointsToAdd = parseInt(text.split(' ')[1]);
  if (isNaN(pointsToAdd)) {
    throw 'Jumlah legendary yang dimasukkan harus berupa angka. Contoh: .addlegendary @user 10';
  }

  let users = global.db.data.users;
  if (!users[mentionedJid]) {
    users[mentionedJid] = {
      legendary: 0,
      exp: 0,
      lastclaim: 0
    };
  }

  users[mentionedJid].legendary += pointsToAdd;

  conn.reply(m.chat, `Berhasil menambahkan ${pointsToAdd} legendary untuk @${mentionedJid.split('@')[0]}.`, m, {
    mentions: [mentionedJid]
  });
};

handler.help = ['addlegendary @user <jumlah legendary>'];
handler.tags = ['xp'];
handler.command = /^addlegendary$/i;
handler.owner = true;

module.exports = handler;