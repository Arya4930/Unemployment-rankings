# 📊 WhatsApp Chat Analytics

A comprehensive tool to analyze your WhatsApp chat exports and visualize the data through an interactive web dashboard.

## 🚀 Features

- **Message Statistics**: Total messages, words, and user activity
- **User Rankings**: Top users by message count and word usage
- **Word Analysis**: Most frequently used words globally and per user
- **Interactive Dashboard**: Modern web interface with charts and tables
- **Export Data**: Generates JSON files for further analysis

## 📋 Prerequisites

- Node.js (version 14 or higher)
- A WhatsApp chat export file

## 🛠️ Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

## 📱 Getting Your WhatsApp Chat Export

### On Android:
1. Open WhatsApp
2. Go to the chat you want to analyze
3. Tap the three dots (⋮) → More → Export chat
4. Choose "Without Media" for faster processing
5. Save the file as `_chat.txt` in the project directory

### On iPhone:
1. Open WhatsApp
2. Go to the chat you want to analyze
3. Tap the contact/group name at the top
4. Scroll down and tap "Export Chat"
5. Choose "Without Media"
6. Save the file as `_chat.txt` in the project directory

## 🔧 Usage

### Step 1: Analyze Your Chat Data

Run the analysis script to process your WhatsApp export:

```bash
node index.js
```

This will:
- Read your `_chat.txt` file
- Process all messages and calculate statistics
- Generate chart images in the `charts/` folder
- Create `user_stats.json` and `global_word_usage.json` files
- Display comprehensive statistics in the terminal

### Step 2: View the Interactive Dashboard

After running the analysis, you need to serve the HTML file locally to view the dashboard:

#### Option A: Using Python (Recommended)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Option B: Using Node.js
```bash
npx http-server
```

#### Option C: Using PHP
```bash
php -S localhost:8000
```

Then open your browser and navigate to:
```
http://localhost:8000
```

## 📊 Dashboard Features

The web dashboard includes:

- **📈 Summary Statistics**: Total users, messages, words, and averages
- **👥 User Activity Chart**: Bar chart showing message distribution
- **💬 Word Usage Chart**: Most frequently used words
- **🏆 Leaderboard Table**: Detailed user rankings with top words

## ⚙️ Configuration

You can modify the analysis parameters in `index.js`:

```javascript
const CONFIG = {
    chatFile: '_chat.txt',           // Chat export filename
    topWordsCount: 10,               // Number of top words to show
    topUserWordsCount: 5,            // Top words per user
    topUserCount: 10,                // Number of top users
    minWordLength: 0,                // Minimum word length
    stopWords: stopWords()           // Common words to exclude
};
```

## 📁 File Structure

```
whatsapp-analytics/
├── index.js                 # Main analysis script
├── stopwords.js             # Common words to exclude
├── charts.js                # Chart generation utilities
├── index.html               # Dashboard web page
├── _chat.txt                # Your WhatsApp export (you provide this)
├── user_stats.json          # Generated user statistics
├── global_word_usage.json   # Generated word usage data
└── charts/                  # Generated chart images
    ├── top-users.png
    └── top-words.png
```

## 🔍 Sample Output

After running the analysis, you'll see terminal output like:

```
🎉 WhatsApp Chat Analysis Complete!

============================================================
📈 OVERALL STATISTICS
============================================================
📱 Total Messages: 15,432
💬 Total Words: 145,678
👥 Active Users: 8
📊 Average Words per Message: 9.4

👑 TOP USERS BY MESSAGE COUNT
============================================================
  1. alice_dev
     📊 1,247 messages (8.1%)
     💬 12,450 words total
     📝 9.98 avg words/message
     📏 45 words in longest message
     🔥 Most used word: "function" (89x)
```

## 🚨 Privacy & Security

- **Your data stays local**: All processing happens on your machine
- **No data is sent anywhere**: The tool works completely offline
- **Clean your data**: Remove sensitive information from `_chat.txt` before analysis if needed

## 🐛 Troubleshooting

### "File not found" error
- Ensure your WhatsApp export is named `_chat.txt`
- Check that the file is in the same directory as `index.js`

### "Permission denied" when serving files
- Try a different port: `python -m http.server 3000`
- Check if another application is using port 8000

### Charts not displaying
- Ensure you've run `node index.js` first to generate the data files
- Check that `user_stats.json` and `global_word_usage.json` exist

### Browser shows "Cannot load local resource"
- You must use a local server (Python, Node.js, etc.)
- Opening `index.html` directly in the browser won't work due to CORS restrictions

## 📝 Notes

- The tool automatically filters out system messages (joins, leaves, media omitted, etc.)
- URLs and mentions are cleaned from messages before word analysis
- Stop words (common words like "the", "and", "is") are excluded from analysis
- All processing is case-insensitive

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve this tool!

## 📄 License

This project is open source and available under the MIT License.