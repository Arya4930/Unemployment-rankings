# 💀 Unemployment Rankings

**The ultimate brainrot analyzer for your WhatsApp group chats** 🧠💀

Find out who's the biggest yapper in your friend group and rank the unemployment levels based on chat activity. No cap! 📈

## 🔥 What This Slop Does

- **Yapping Statistics**: See who's been touching grass the least with total messages and word counts
- **Unemployment Rankings**: Rank your friends by how terminally online they are
- **Brainrot Analysis**: Most used words (probably "sigma", "ohio", or "skibidi")
- **Interactive Dashboard**: Clean UI that doesn't look like it was made in 2010

## 📋 What You Need (Bare Minimum)

- Node.js (if you don't have this, you're not ready for the grind)
- Your WhatsApp chat export (the evidence)
- Basic ability to follow instructions (optional)

## 🛠️ Installation (Actually Easy)

1. Download this absolute unit of a project
2. Install the good stuff:
   ```bash
   npm install
   ```

## 📱 Getting Your Chat Export (The Receipts)

### On Android (Galaxy Brain Move):
1. Open WhatsApp (duh)
2. Go to the group chat where the yappers live
3. Tap those three dots (⋮) → More → Export chat
4. Choose "Without Media" (we don't need your cringe memes)
5. Export it and Save it as `_chat.txt` in this folder

### On iPhone (Mid Choice But OK):
1. Open WhatsApp
2. Find your most unhinged group chat
3. Tap the group name at the top
4. Scroll down → "Export Chat"
5. Pick "Without Media" 
6. Export it and Save as `_chat.txt` where this README lives

## 🎯 How To Use This Beast

### Step 1: Analyze The Yappers

Run this bad boy to crunch the numbers:

```bash
node index.js
```

This script will:
- Read your `_chat.txt` and judge everyone
- Calculate who needs to touch grass the most
- Generate some fire charts in the `charts/` folder
- Create JSON files with all the tea ☕
- Roast everyone in the terminal output

### Step 2: View The Unemployment Dashboard

After the analysis finishes cooking, serve up that HTML:

#### Python Gang (Sigma Choice):
```bash
# Python 3 (based)
python -m http.server 8000

# Python 2 (cringe but works)
python -m SimpleHTTPServer 8000
```

#### Node.js Bros:
```bash
npx http-server
```

#### PHP Users (Questionable Life Choices):
```bash
php -S localhost:8000
```

Then open your browser and witness the carnage:
```
http://localhost:8000
```

## 📊 Dashboard Features (Actually Good)

Your unemployment dashboard includes:

- **📈 Yapping Statistics**: Who needs to log off immediately
- **👥 Unemployment Chart**: Visual representation of who's chronically online
- **💬 Brainrot Words**: See what vocabulary your friends are destroying
- **🏆 Hall of Shame**: Detailed rankings with receipts

## ⚙️ Fine-Tuning The Roast Machine

Customize the dragging in `index.js`:

```javascript
const CONFIG = {
    chatFile: '_chat.txt',           // Your evidence file
    topWordsCount: 10,               // How many cringe words to expose
    topUserWordsCount: 5,            // Favorite words per yapper
    topUserCount: 10,                // How many unemployed friends to rank
    minWordLength: 0,                // Filter out "fr" and "W"
    stopWords: stopWords()           // Basic words that don't count
};
```

## 📁 What's In This Folder

```
unemployment-rankings/
├── index.js                 # The main character (analysis script)
├── stopwords.js             # Words too basic to count
├── charts.js                # Makes the pretty pictures
├── index.html               # The dashboard (actually clean)
├── _chat.txt                # Your group's digital footprint
├── user_stats.json          # The receipts (generated)
├── global_word_usage.json   # Brainrot dictionary (generated)
└── charts/                  # Visual evidence
    ├── top-users.png
    └── top-words.png
```

## 🔍 Sample Output (Prepare For Carnage)

After running the script, expect terminal output like:

```
🎉 Unemployment Analysis Complete! Time to touch grass!

============================================================
📈 YAPPING STATISTICS
============================================================
📱 Total Messages: 15,432 (y'all need hobbies)
💬 Total Words: 145,678 (literal essays)
👥 Unemployed Friends: 8
📊 Average Words per Message: 9.4 (novels fr)

👑 TOP YAPPERS (HALL OF SHAME)
============================================================
  1. alex_the_sigma
     📊 1,247 messages (8.1%) - bro never sleeps
     💬 12,450 words total
     📝 9.98 avg words/message (writing dissertations)
     📏 45 words in longest message (actual paragraph)
     🔥 Most used word: "sigma" (89x) - down bad
```

## 🚨 Privacy Stuff (We're Not Sus)

- **Your data stays put**: Everything happens on your computer, no cap
- **No snitching**: Nothing gets sent to the internet
- **Clean your receipts**: Delete sensitive stuff from `_chat.txt` if you're paranoid

## 🐛 When Things Go Wrong (Skill Issue?)

### "File not found" L
- Make sure your chat export is actually named `_chat.txt`
- Put it in the same folder as this README (reading comprehension check)

### Can't serve the dashboard
- Try a different port: `python -m http.server 3000`
- Something else might be using port 8000 (common L)

### Charts looking sus
- Did you run `node index.js` first? (basic requirements)
- Check if the JSON files actually exist (file explorer tutorial needed?)

### Browser showing "Cannot load" error
- You NEED a local server, opening the HTML directly is a noob move
- CORS will block you faster than your ex

## 📝 Additional Notes (Actually Important)

- Automatically filters out system messages (joins, leaves, "media omitted")
- Cleans URLs and @ mentions before analysis (we're not doxxing anyone)
- Ignores basic words like "the", "and", "is" (we want the good stuff)
- Case doesn't matter (we're not grammar nazis)

## 🤝 Want to Contribute?

Submit your improvements or roast our code. All feedback welcome (even if it's mid).

## 📄 License

This project is open source under MIT License. Use it, modify it, whatever. Just don't sell it as an NFT.
