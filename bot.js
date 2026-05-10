require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const BOT_TOKEN = process.env.BOT_TOKEN;

const YOUR_USER_ID = "1065431492416778332";

const tasks = [
  { day: 1,  title: "Brainstorm your brand name",         desc: "Write down 10 name ideas. Think short, catchy, and YOU. Check if the name is available on Instagram/TikTok." },
  { day: 2,  title: "Define your vibe & niche",           desc: "Streetwear? Y2K? Sports? Minimalist? Nail your style so everything feels consistent." },
  { day: 3,  title: "Make a mood board",                  desc: "Use Pinterest or Canva. Collect colors, fonts, and photos that match your brand feel." },
  { day: 4,  title: "Choose your colors & fonts",         desc: "Pick 2–3 brand colors and 1–2 fonts. Keep it simple — these will go on everything." },
  { day: 5,  title: "Sketch your logo",                   desc: "Draw ideas by hand first, then use Canva or Looka for free. Keep it clean and readable at small sizes." },
  { day: 6,  title: "Write your brand story",             desc: "Why are you starting this? Who is it for? 2–3 sentences is enough. Authenticity is your superpower." },
  { day: 7,  title: "Lock in your identity",              desc: "Review everything so far. Share with a friend or parent for feedback. Make final tweaks." },
  { day: 8,  title: "Brainstorm design ideas",            desc: "Write down every idea — slogans, images, symbols, feelings. Don't judge yet, just fill a whole page." },
  { day: 9,  title: "Pick one theme or style",            desc: "Choose a direction — minimal text, bold graphics, nature, abstract, cartoon. One theme makes your brand look put-together." },
  { day: 10, title: "Find design inspiration",            desc: "Look at brands you like on Instagram or Pinterest. Save designs that catch your eye and figure out WHY you like them." },
  { day: 11, title: "Sketch your designs by hand",        desc: "Grab paper and a pen. Draw rough versions of your ideas. Even messy sketches help you figure out what looks good before going digital." },
  { day: 12, title: "Go digital with a free app",         desc: "Use Canva (easiest, works in browser), Adobe Express, or PixelLab on your phone. Start turning your sketches into real designs." },
  { day: 13, title: "Save your design the right way",     desc: "Save as PNG with a transparent background at 300 DPI. In Canva: Download → PNG → check 'Transparent background.'" },
  { day: 14, title: "Preview it on a shirt mockup",       desc: "Go to Placeit.net — upload your PNG and see it on a real shirt photo. Catch any issues before ordering." },
  { day: 15, title: "Set up your Printful account",       desc: "Create a free account at printful.com. Browse their blank shirts — Bella + Canvas tees are great quality." },
  { day: 16, title: "Upload your design to Printful",     desc: "Choose a product → upload your PNG → adjust the placement on the shirt preview → double-check everything looks right." },
  { day: 17, title: "Order your sample",                  desc: "Place your sample order! Printful gives 20% off samples. A basic tee usually costs $15–$25 including shipping." },
  { day: 18, title: "Wait & plan while it ships",         desc: "While your sample ships, write product descriptions for your item. Focus on how it feels and who it's for." },
  { day: 19, title: "Plan your product photos",           desc: "Think about how you'll shoot your sample when it arrives. Natural light, clean background. You wearing it beats a mannequin every time." },
  { day: 20, title: "Check your sample",                  desc: "Your sample should be arriving around now! Check: color accuracy, print size, placement, and fabric feel. Then wash it once — that's the real test." },
  { day: 21, title: "Decide if the quality is good",      desc: "Happy with it? Great — you're ready to sell. Not happy? Tweak your design file and order another sample. This is normal!" },
  { day: 22, title: "Take photos in your sample",         desc: "Put it on and take photos! Use natural light near a window. Your sample photo is your best marketing content." },
  { day: 23, title: "Build your online store",            desc: "Big Cartel is free for up to 5 products. Create your account, add your brand colors and logo, and set up your product." },
  { day: 24, title: "Set your price",                     desc: "Formula: product cost + profit margin = your price. Most brands aim for 2–3× the cost. If it costs $20 to make, charge $45–$60." },
  { day: 25, title: "Create your social accounts",        desc: "Set up Instagram and TikTok with your brand name. Write a catchy bio and add your store link." },
  { day: 26, title: "Plan your first 7 posts",            desc: "Mix behind-the-scenes, product shots, and your story. Use trending sounds on TikTok. Schedule them out so you're not scrambling." },
  { day: 27, title: "Build hype with a countdown",        desc: "Post teaser content before your launch. 'Something is dropping soon…' builds excitement and gets people ready to buy." },
  { day: 28, title: "Do your launch checklist",           desc: "Double-check: store works, payments are set up, links are correct, photos look good. Get everything ready." },
  { day: 29, title: "Launch day!",                        desc: "Post everywhere, tell your friends, make a TikTok about it. You built something real — celebrate it!" },
  { day: 30, title: "Reflect & set your next goals",      desc: "Write down what you learned, what you're proud of, and 3 goals for the next 3 months. You did it. What's next?" },
];

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
  partials: ["CHANNEL", "MESSAGE"]
});

let startDate = null;

function getStartDate() {
  if (startDate) return startDate;
  startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  return startDate;
}

function getCurrentDay() {
  const start = getStartDate();
  const now = new Date();
  const diffMs = now - start;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
  return Math.min(Math.max(diffDays, 1), 30);
}

function buildMessage(day) {
  const task = tasks[day - 1];
  const bars = "█".repeat(day) + "░".repeat(30 - day);
  return [
    `☀️ **Good morning! Day ${day}/30 of your clothing brand journey.**`,
    ``,
    `**Today's task: ${task.title}**`,
    `${task.desc}`,
    ``,
    `📅 Progress: \`${bars}\` ${day}/30`,
    ``,
    day < 30
      ? `Keep going — you're building something real. See you tomorrow! 👟`
      : `🎉 You've completed all 30 days! Time to reflect and set your next goals.`,
  ].join("\n");
}

async function sendDailyReminder() {
  try {
    const user = await client.users.fetch(YOUR_USER_ID);
    const day = getCurrentDay();
    await user.send(buildMessage(day));
    console.log(`Sent Day ${day} reminder to user.`);
  } catch (err) {
    console.error("Failed to send DM:", err.message);
  }
}

function msUntilNext8amET() {
  const now = new Date();
  const etOffset = -5 * 60;
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const etNow = new Date(utcMs + etOffset * 60000);

  const next8am = new Date(etNow);
  next8am.setHours(8, 0, 0, 0);
  if (etNow >= next8am) next8am.setDate(next8am.getDate() + 1);

  return next8am - etNow;
}

function scheduleDailyReminder() {
  const ms = msUntilNext8amET();
  const hours = Math.floor(ms / 3600000);
  const mins = Math.floor((ms % 3600000) / 60000);
  console.log(`Next reminder in ${hours}h ${mins}m (8:00 AM ET)`);

  setTimeout(() => {
    sendDailyReminder();
    setInterval(sendDailyReminder, 24 * 60 * 60 * 1000);
  }, ms);
}

client.once("ready", async () => {
  console.log(`Bot is online as ${client.user.tag}`);
  try {
    const user = await client.users.fetch(YOUR_USER_ID);
    await user.send("Test message — your bot is working!");
    console.log("Test DM sent!");
  } catch (err) {
    console.error("DM failed:", err.message);
  }
  scheduleDailyReminder();
});

client.on("messageCreate", async (message) => {
  if (message.author.id !== YOUR_USER_ID) return;
  if (!message.content.startsWith("!")) return;

  const cmd = message.content.trim().toLowerCase();

  if (cmd === "!today") {
    const day = getCurrentDay();
    await message.author.send(buildMessage(day));
  }

  if (cmd === "!progress") {
    const day = getCurrentDay();
    const completed = day - 1;
    await message.author.send(
      `📊 **Your progress so far**\n\nCompleted: **${completed}/30 days**\nCurrent day: **Day ${day}**\n\nType \`!today\` to see today's task or \`!day 5\` to see any specific day.`
    );
  }

  if (cmd.startsWith("!day ")) {
    const num = parseInt(cmd.split(" ")[1]);
    if (num >= 1 && num <= 30) {
      await message.author.send(buildMessage(num));
    } else {
      await message.author.send("Please enter a day between 1 and 30. Example: `!day 5`");
    }
  }

  if (cmd === "!help") {
    await message.author.send(
      `**Clothing Brand Bot Commands**\n\n\`!today\` — get today's task\n\`!progress\` — see how many days you've completed\n\`!day [number]\` — see any day's task (e.g. \`!day 12\`)\n\`!help\` — show this menu`
    );
  }
});

client.login(BOT_TOKEN);
