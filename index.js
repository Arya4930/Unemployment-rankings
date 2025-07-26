import fs from 'fs';
import stopWords from './stopwords.js';
import { saveBarChart } from './charts.js';

const CONFIG = {
    chatFile: '_chat.txt',
    topWordsCount: 10,
    topUserWordsCount: 5,
    topUserCount: 10,
    minWordLength: 0,
    stopWords: stopWords()
};

function isSystemMessage(message) {
    const systemPatterns = [
        /^‎/,
        /requested to join/i,
        /joined from the community/i,
        /changed the group/i,
        /added/i,
        /removed/i,
        /left/i,
        /turned on/i,
        /turned off/i,
        /created group/i,
        /added this group/i,
        /security code changed/i,
        /end-to-end encrypted/i,
        /missed voice call/i,
        /missed video call/i,
        /<Media omitted>/i,
        /document omitted/i,
        /image omitted/i,
        /video omitted/i,
        /audio omitted/i,
        /sticker omitted/i,
        /gif omitted/i,
        /deleted this message/i
    ];

    return systemPatterns.some(pattern => pattern.test(message));
}

function cleanMessage(message) {
    return message
        .replace(/https?:\/\/[^\s]+/g, '')       // remove URLs
        .replace(/@\w+/g, '')                    // remove mentions
        .replace(/[^\p{L}\p{N}\p{Emoji_Presentation}\s'-]/gu, ' ') // allow letters, numbers, emojis, space, ', -
        .replace(/\s+/g, ' ')                    // normalize spacing
        .trim();
}

function extractWords(text) {
    const emojiRegex = /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu;

    return text
        .toLowerCase()
        .replace(emojiRegex, ' $1 ')  // Add space around emojis
        .split(/\s+/)
        .filter(word => word.length > 0)
        .map(word => word.replace(/^['-]+|['-]+$/g, ''));
}

function getTopWords(wordCount, limit) {
    return Object.entries(wordCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([word, count]) => ({ word, count }));
}

function displayResults(messageCounts, wordUsage, globalWordCount, userStats, totalMessages, totalWords) {
    console.log('🎉 WhatsApp Chat Analysis Complete!\n');
    console.log('='.repeat(60));

    console.log('📈 OVERALL STATISTICS');
    console.log('='.repeat(60));
    console.log(`📱 Total Messages: ${totalMessages.toLocaleString()}`);
    console.log(`💬 Total Words: ${totalWords.toLocaleString()}`);
    console.log(`👥 Active Users: ${Object.keys(messageCounts).length}`);
    console.log(`📊 Average Words per Message: ${Math.round((totalWords / totalMessages) * 10) / 10}\n`);

    console.log('👑 TOP USERS BY MESSAGE COUNT');
    console.log('='.repeat(60));
    const sortedUsers = Object.entries(messageCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, CONFIG.topUserCount);

    sortedUsers.forEach(([sender, count], index) => {
        const percentage = ((count / totalMessages) * 100).toFixed(1);
        const stats = userStats[sender];
        const topWord = getTopWords(wordUsage[sender], 1)[0];

        console.log(`${index + 1}.`.padStart(3) + ` ${sender}`);
        console.log(`     📊 ${count.toLocaleString()} messages (${percentage}%)`);
        console.log(`     💬 ${stats.totalWords.toLocaleString()} words total`);
        console.log(`     📝 ${stats.avgWordsPerMessage} avg words/message`);
        console.log(`     📏 ${stats.longestMessage} words in longest message`);
        if (topWord) {
            console.log(`     🔥 Most used word: "${topWord.word}" (${topWord.count}x)`);
        }
        console.log();
    });

    console.log('🌍 MOST USED WORDS GLOBALLY');
    console.log('='.repeat(60));
    const globalTopWords = getTopWords(globalWordCount, CONFIG.topWordsCount);
    globalTopWords.forEach((item, index) => {
        const percentage = ((item.count / totalWords) * 100).toFixed(2);
        console.log(`${(index + 1).toString().padStart(2)}. ${item.word.padEnd(15)} ${item.count.toString().padStart(6)}x (${percentage}%)`);
    });
    console.log();

    console.log('👤 TOP WORDS BY USER');
    console.log('='.repeat(60));
    sortedUsers.slice(0, 5).forEach(([sender]) => {
        console.log(`📝 ${sender}:`);
        const userTopWords = getTopWords(wordUsage[sender], CONFIG.topUserWordsCount);
        userTopWords.forEach((item, index) => {
            console.log(`   ${index + 1}. ${item.word} (${item.count}x)`);
        });
        console.log();
    });

    console.log('🎯 FUN FACTS');
    console.log('='.repeat(60));
    const mostActiveUser = sortedUsers[0];
    const mostTalkativeUser = Object.entries(userStats)
        .sort((a, b) => b[1].avgWordsPerMessage - a[1].avgWordsPerMessage)[0];
    const longestMessageUser = Object.entries(userStats)
        .sort((a, b) => b[1].longestMessage - a[1].longestMessage)[0];

    console.log(`🏆 Most Active: ${mostActiveUser[0]} (${mostActiveUser[1]} messages)`);
    console.log(`🗣️  Most Talkative: ${mostTalkativeUser[0]} (${mostTalkativeUser[1].avgWordsPerMessage} words/message avg)`);
    console.log(`📏 Longest Message: ${longestMessageUser[0]} (${longestMessageUser[1].longestMessage} words)`);
    console.log(`💯 Most Popular Word: "${globalTopWords[0]?.word}" (used ${globalTopWords[0]?.count} times)`);
}

async function analyzeChat() {
    try {
        if (!fs.existsSync(CONFIG.chatFile)) {
            console.error(`❌ Error: File '${CONFIG.chatFile}' not found!`);
            return;
        }

        console.log(`📱 Reading WhatsApp chat from: ${CONFIG.chatFile}\n`);
        const chatText = fs.readFileSync(CONFIG.chatFile, 'utf-8');

        const messageRegex = /^\[(\d{1,2}\/\d{1,2}\/\d{2,4}),?\s*(\d{1,2}:\d{2}:\d{2})\s*(AM|PM)?\]\s*(.+?): (.+)$/gm;

        const messageCounts = {};
        const wordUsage = {};
        const globalWordCount = {};
        const userStats = {};
        let totalMessages = 0;
        let totalWords = 0;

        let match;
        while ((match = messageRegex.exec(chatText)) !== null) {
            const [, date, time, ampm, sender, message] = match;

            if (isSystemMessage(message)) continue;

            const cleanedMessage = cleanMessage(message);
            if (!cleanedMessage) continue;

            if (!messageCounts[sender]) {
                messageCounts[sender] = 0;
                wordUsage[sender] = {};
                userStats[sender] = {
                    totalWords: 0,
                    avgWordsPerMessage: 0,
                    longestMessage: 0
                };
            }

            messageCounts[sender]++;
            totalMessages++;

            const words = extractWords(cleanedMessage);
            userStats[sender].totalWords += words.length;
            userStats[sender].longestMessage = Math.max(userStats[sender].longestMessage, words.length);
            totalWords += words.length;

            for (const word of words) {
                if (word.length >= CONFIG.minWordLength && !CONFIG.stopWords.has(word)) {
                    wordUsage[sender][word] = (wordUsage[sender][word] || 0) + 1;
                    globalWordCount[word] = (globalWordCount[word] || 0) + 1;
                }
            }
        }

        for (const sender in userStats) {
            userStats[sender].avgWordsPerMessage =
                Math.round((userStats[sender].totalWords / messageCounts[sender]) * 10) / 10;
        }

        displayResults(messageCounts, wordUsage, globalWordCount, userStats, totalMessages, totalWords);

        // Ensure charts folder exists
        if (!fs.existsSync('charts')) fs.mkdirSync('charts');

        // Save chart: Top users by message count
        const topUsers = Object.entries(messageCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, CONFIG.topUserCount);

        await saveBarChart(
            topUsers.map(([user]) => user),
            topUsers.map(([, count]) => count),
            'Top Users by Message Count',
            'top-users.png'
        );

        // Save chart: Most used global words
        const globalTopWords = Object.entries(globalWordCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, CONFIG.topWordsCount);

        await saveBarChart(
            globalTopWords.map(([word]) => word),
            globalTopWords.map(([, count]) => count),
            'Most Used Words Globally',
            'top-words.png'
        );

        const allUserStats = Object.entries(messageCounts)
            .sort((a, b) => b[1] - a[1]) // sort by message count
            .map(([user, messageCount], index) => ({
                rank: index + 1,
                user,
                messageCount,
                percentage: ((messageCount / totalMessages) * 100).toFixed(1) + '%',
                totalWords: userStats[user].totalWords,
                avgWordsPerMessage: userStats[user].avgWordsPerMessage,
                longestMessage: userStats[user].longestMessage,
                topWords: getTopWords(wordUsage[user], CONFIG.topUserWordsCount)
            }));

        fs.writeFileSync('user_stats.json', JSON.stringify(allUserStats, null, 2), 'utf-8');

        fs.writeFileSync('global_word_usage.json', JSON.stringify(globalTopWords, null, 2), 'utf-8');

    } catch (error) {
        console.error(`❌ Error analyzing chat: ${error.message}`);
    }
}

(async () => {
    await analyzeChat();
})();