const emojis = [
  "😄",
  "😃",
  "😀",
  "😊",
  "☺",
  "😉",
  "😍",
  "😘",
  "😚",
  "😗",
  "😙",
  "😜",
  "😝",
  "😛",
  "😳",
  "😁",
  "😔",
  "😌",
  "😒",
  "😞",
  "😣",
  "😢",
  "😂",
  "😭",
  "😪",
  "😥",
  "😰",
  "😅",
  "😓",
  "😩",
  "😫",
  "😨",
  "😱",
  "😠",
  "😡",
  "😤",
  "😖",
  "😆",
  "😋",
  "😷",
  "😎",
  "😴",
  "😵",
  "😲",
  "😟",
  "😦",
  "😧",
  "😈",
  "👿",
  "😮",
  "😬",
  "😐",
  "😕",
  "😯",
  "😶",
  "😇",
  "😏",
  "😑",
  "👲",
  "👳",
  "👮",
  "👷",
  "💂",
  "👶",
  "👦",
  "👧",
  "👨",
  "👩",
  "👴",
  "👵",
  "👱",
  "👼",
  "👸",
  "😺",
  "😸",
  "😻",
  "😽",
  "😼",
  "🙀",
  "😿",
  "😹",
  "😾",
  "👹",
  "👺",
  "🙈",
  "🙉",
  "🙊",
  "💀",
  "👽",
  "💩",
  "🔥",
  "✨",
  "🌟",
  "💫",
  "💥",
  "💢",
  "💦",
  "💧",
  "💤",
  "💨",
  "👂",
  "👀",
  "👃",
  "👅",
  "👄",
  "👍",
  "👎",
  "👌",
  "👊",
  "✊",
  "✌",
  "👋",
  "✋",
  "👐",
  "👆",
  "👇",
  "👉",
  "👈",
  "🙌",
  "🙏",
  "☝",
  "👏",
  "💪",
  "🚶",
  "🏃",
  "💃",
  "👫",
  "👪",
  "👬",
  "👭",
  "💏",
  "💑",
  "👯",
  "🙆",
  "🙅",
  "💁",
  "🙋",
  "💆",
  "💇",
  "💅",
  "👰",
  "🙎",
  "🙍",
  "🙇",
  "🎩",
  "👑",
  "👒",
  "👟",
  "👞",
  "👡",
  "👠",
  "👢",
  "👕",
  "👔",
  "👚",
  "👗",
  "🎽",
  "👖",
  "👘",
  "👙",
  "💼",
  "👜",
  "👝",
  "👛",
  "👓",
  "🎀",
  "🌂",
  "💄",
  "💛",
  "💙",
  "💜",
  "💚",
  "❤",
  "💔",
  "💗",
  "💓",
  "💕",
  "💖",
  "💞",
  "💘",
  "💌",
  "💋",
  "💍",
  "💎",
  "👤",
  "👥",
  "💬",
  "👣",
  "💭",
  "🐶",
  "🐺",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🐸",
  "🐯",
  "🐨",
  "🐻",
  "🐷",
  "🐽",
  "🐮",
  "🐗",
  "🐵",
  "🐒",
  "🐴",
  "🐑",
  "🐘",
  "🐼",
  "🐧",
  "🐦",
  "🐤",
  "🐥",
  "🐣",
  "🐔",
  "🐍",
  "🐢",
  "🐛",
  "🐝",
  "🐜",
  "🐞",
  "🐌",
  "🐙",
  "🐚",
  "🐠",
  "🐟",
  "🐬",
  "🐳",
  "🐋",
  "🐄",
  "🐏",
  "🐀",
  "🐃",
  "🐅",
  "🐇",
  "🐉",
  "🐎",
  "🐐",
  "🐓",
  "🐕",
  "🐖",
  "🐁",
  "🐂",
  "🐲",
  "🐡",
  "🐊",
  "🐫",
  "🐪",
  "🐆",
  "🐈",
  "🐩",
  "🐾",
  "💐",
  "🌸",
  "🌷",
  "🍀",
  "🌹",
  "🌻",
  "🌺",
  "🍁",
  "🍃",
  "🍂",
  "🌿",
  "🌾",
  "🍄",
  "🌵",
  "🌴",
  "🌲",
  "🌳",
  "🌰",
  "🌱",
  "🌼",
  "🌐",
  "🌞",
  "🌝",
  "🌚",
  "🌑",
  "🌒",
  "🌓",
  "🌔",
  "🌕",
  "🌖",
  "🌗",
  "🌘",
  "🌜",
  "🌛",
  "🌙",
  "🌍",
  "🌎",
  "🌏",
  "🌋",
  "🌌",
  "🌠",
  "⭐",
  "☀",
  "⛅",
  "☁",
  "⚡",
  "☔",
  "❄",
  "⛄",
  "🌀",
  "🌁",
  "🌈",
  "🌊",
  "🎍",
  "💝",
  "🎎",
  "🎒",
  "🎓",
  "🎏",
  "🎆",
  "🎇",
  "🎐",
  "🎑",
  "🎃",
  "👻",
  "🎅",
  "🎄",
  "🎁",
  "🎋",
  "🎉",
  "🎊",
  "🎈",
  "🎌",
  "🔮",
  "🎥",
  "📷",
  "📹",
  "📼",
  "💿",
  "📀",
  "💽",
  "💾",
  "💻",
  "📱",
  "☎",
  "📞",
  "📟",
  "📠",
  "📡",
  "📺",
  "📻",
  "🔊",
  "🔉",
  "🔈",
  "🔇",
  "🔔",
  "🔕",
  "📢",
  "📣",
  "⏳",
  "⌛",
  "⏰",
  "⌚",
  "🔓",
  "🔒",
  "🔏",
  "🔐",
  "🔑",
  "🔎",
  "💡",
  "🔦",
  "🔆",
  "🔅",
  "🔌",
  "🔋",
  "🔍",
  "🛁",
  "🛀",
  "🚿",
  "🚽",
  "🔧",
  "🔩",
  "🔨",
  "🚪",
  "🚬",
  "💣",
  "🔫",
  "🔪",
  "💊",
  "💉",
  "💰",
  "💴",
  "💵",
  "💷",
  "💶",
  "💳",
  "💸",
  "📲",
  "📧",
  "📥",
  "📤",
  "✉",
  "📩",
  "📨",
  "📯",
  "📫",
  "📪",
  "📬",
  "📭",
  "📮",
  "📦",
  "📝",
  "📄",
  "📃",
  "📑",
  "📊",
  "📈",
  "📉",
  "📜",
  "📋",
  "📅",
  "📆",
  "📇",
  "📁",
  "📂",
  "✂",
  "📌",
  "📎",
  "✒",
  "✏",
  "📏",
  "📐",
  "📕",
  "📗",
  "📘",
  "📙",
  "📓",
  "📔",
  "📒",
  "📚",
  "📖",
  "🔖",
  "📛",
  "🔬",
  "🔭",
  "📰",
  "🎨",
  "🎬",
  "🎤",
  "🎧",
  "🎼",
  "🎵",
  "🎶",
  "🎹",
  "🎻",
  "🎺",
  "🎷",
  "🎸",
  "👾",
  "🎮",
  "🃏",
  "🎴",
  "🀄",
  "🎲",
  "🎯",
  "🏈",
  "🏀",
  "⚽",
  "⚾",
  "🎾",
  "🎱",
  "🏉",
  "🎳",
  "⛳",
  "🚵",
  "🚴",
  "🏁",
  "🏇",
  "🏆",
  "🎿",
  "🏂",
  "🏊",
  "🏄",
  "🎣",
  "☕",
  "🍵",
  "🍶",
  "🍼",
  "🍺",
  "🍻",
  "🍸",
  "🍹",
  "🍷",
  "🍴",
  "🍕",
  "🍔",
  "🍟",
  "🍗",
  "🍖",
  "🍝",
  "🍛",
  "🍤",
  "🍱",
  "🍣",
  "🍥",
  "🍙",
  "🍘",
  "🍚",
  "🍜",
  "🍲",
  "🍢",
  "🍡",
  "🍳",
  "🍞",
  "🍩",
  "🍮",
  "🍦",
  "🍨",
  "🍧",
  "🎂",
  "🍰",
  "🍪",
  "🍫",
  "🍬",
  "🍭",
  "🍯",
  "🍎",
  "🍏",
  "🍊",
  "🍋",
  "🍒",
  "🍇",
  "🍉",
  "🍓",
  "🍑",
  "🍈",
  "🍌",
  "🍐",
  "🍍",
  "🍠",
  "🍆",
  "🍅",
  "🌽",
  "🏠",
  "🏡",
  "🏫",
  "🏢",
  "🏣",
  "🏥",
  "🏦",
  "🏪",
  "🏩",
  "🏨",
  "💒",
  "⛪",
  "🏬",
  "🏤",
  "🌇",
  "🌆",
  "🏯",
  "🏰",
  "⛺",
  "🏭",
  "🗼",
  "🗾",
  "🗻",
  "🌄",
  "🌅",
  "🌃",
  "🗽",
  "🌉",
  "🎠",
  "🎡",
  "⛲",
  "🎢",
  "🚢",
  "⛵",
  "🚤",
  "🚣",
  "⚓",
  "🚀",
  "✈",
  "💺",
  "🚁",
  "🚂",
  "🚊",
  "🚉",
  "🚞",
  "🚆",
  "🚄",
  "🚅",
  "🚈",
  "🚇",
  "🚝",
  "🚋",
  "🚃",
  "🚎",
  "🚌",
  "🚍",
  "🚙",
  "🚘",
  "🚗",
  "🚕",
  "🚖",
  "🚛",
  "🚚",
  "🚨",
  "🚓",
  "🚔",
  "🚒",
  "🚑",
  "🚐",
  "🚲",
  "🚡",
  "🚟",
  "🚠",
  "🚜",
  "💈",
  "🚏",
  "🎫",
  "🚦",
  "🚥",
  "⚠",
  "🚧",
  "🔰",
  "⛽",
  "🏮",
  "🎰",
  "♨",
  "🗿",
  "🎪",
  "🎭",
  "📍",
  "🚩",
  "⬆",
  "⬇",
  "⬅",
  "➡",
  "🔠",
  "🔡",
  "🔤",
  "↗",
  "↖",
  "↘",
  "↙",
  "↔",
  "↕",
  "🔄",
  "◀",
  "▶",
  "🔼",
  "🔽",
  "↩",
  "↪",
  "ℹ",
  "⏪",
  "⏩",
  "⏫",
  "⏬",
  "⤵",
  "⤴",
  "🆗",
  "🔀",
  "🔁",
  "🔂",
  "🆕",
  "🆙",
  "🆒",
  "🆓",
  "🆖",
  "📶",
  "🎦",
  "🈁",
  "🈯",
  "🈳",
  "🈵",
  "🈴",
  "🈲",
  "🉐",
  "🈹",
  "🈺",
  "🈶",
  "🈚",
  "🚻",
  "🚹",
  "🚺",
  "🚼",
  "🚾",
  "🚰",
  "🚮",
  "🅿",
  "♿",
  "🚭",
  "🈷",
  "🈸",
  "🈂",
  "Ⓜ",
  "🛂",
  "🛄",
  "🛅",
  "🛃",
  "🉑",
  "㊙",
  "㊗",
  "🆑",
  "🆘",
  "🆔",
  "🚫",
  "🔞",
  "📵",
  "🚯",
  "🚱",
  "🚳",
  "🚷",
  "🚸",
  "⛔",
  "✳",
  "❇",
  "❎",
  "✅",
  "✴",
  "💟",
  "🆚",
  "📳",
  "📴",
  "🅰",
  "🅱",
  "🆎",
  "🅾",
  "💠",
  "➿",
  "♻",
  "♈",
  "♉",
  "♊",
  "♋",
  "♌",
  "♍",
  "♎",
  "♏",
  "♐",
  "♑",
  "♒",
  "♓",
  "⛎",
  "🔯",
  "🏧",
  "💹",
  "💲",
  "💱",
  "©",
  "®",
  "™",
  "〽",
  "〰",
  "🔝",
  "🔚",
  "🔙",
  "🔛",
  "🔜",
  "❌",
  "⭕",
  "❗",
  "❓",
  "❕",
  "❔",
  "🔃",
  "🕛",
  "🕧",
  "🕐",
  "🕜",
  "🕑",
  "🕝",
  "🕒",
  "🕞",
  "🕓",
  "🕟",
  "🕔",
  "🕠",
  "🕕",
  "🕖",
  "🕗",
  "🕘",
  "🕙",
  "🕚",
  "🕡",
  "🕢",
  "🕣",
  "🕤",
  "🕥",
  "🕦",
  "✖",
  "➕",
  "➖",
  "➗",
  "♠",
  "♥",
  "♣",
  "♦",
  "💮",
  "💯",
  "✔",
  "☑",
  "🔘",
  "🔗",
  "➰",
  "🔱",
  "🔲",
  "🔳",
  "◼",
  "◻",
  "◾",
  "◽",
  "▪",
  "▫",
  "🔺",
  "⬜",
  "⬛",
  "⚫",
  "⚪",
  "🔴",
  "🔵",
  "🔻",
  "🔶",
  "🔷",
  "🔸",
  "🔹",
];
export default emojis;
