function getClosestDates(dates) {
    const today = new Date();
    return dates
        .filter(d => !isNaN(new Date(d)) && new Date(d) <= today)
        .sort((a, b) => new Date(b) - new Date(a))
        .slice(0, 2); // last 2
}

async function loadData() {
    const res = await fetch('available_dates.json');
    const allDates = await res.json();
    const [latest, previous] = getClosestDates(allDates);

    if (!latest) {
        document.body.innerHTML = '<h2>No available data</h2>';
        return;
    }

    const latestStats = await fetch(`data/${latest}/user_stats.json`).then(res => res.json());
    const previousStats = previous ? await fetch(`data/${previous}/user_stats.json`).then(res => res.json()) : [];

    const prevRanks = {};
    previousStats.forEach(user => {
        prevRanks[user.user] = user.rank;
    });

    document.querySelector("h2").textContent = `Top Yapper (Updated ${latest})`;

    const tbody = document.querySelector("#userTable tbody");
    latestStats.forEach(user => {
        const oldRank = prevRanks[user.user];
        let change = '–'; // neutral
        if (oldRank) {
            const diff = oldRank - user.rank;
            if (diff > 0) change = `↑ ${diff}`;
            else if (diff < 0) change = `↓ ${-diff}`;
        }

        const tr = document.createElement("tr");
        tr.innerHTML = `
                <td>${user.rank} <span class="rank-change">${change}</span></td>
                <td>${user.user}</td>
                <td>${user.messageCount}</td>
                <td>${user.totalWords}</td>
                <td>${user.avgWordsPerMessage}</td>
                <td>
                    ${user.topWords.map(w => `<span class="badge">${w.word} (${w.count})</span>`).join(" ")}
                </td>
            `;
        tbody.appendChild(tr);
    });

    document.querySelector('.chart-grid').innerHTML = `
            <div class="chart-card" onclick="expandChart('./charts/top-users-${latest}.png')">
                <h3>Top Yappers</h3>
                <img src="./charts/top-users-${latest}.png" alt="Top Users Chart" />
            </div>
            <div class="chart-card" onclick="expandChart('./charts/top-words-${latest}.png')">
                <h3>Top Slop</h3>
                <img src="./charts/top-words-${latest}.png" alt="Top Words Chart" />
            </div>
        `;

    document.querySelectorAll('.rank-change').forEach(el => {
        if (el.textContent.includes('↑')) {
            el.classList.add('up');
        } else if (el.textContent.includes('↓')) {
            el.classList.add('down');
        }
    });
}

function expandChart(src) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    modalImg.src = src;
    modal.classList.add('show');
}

function closeModal() {
    document.getElementById('modal').classList.remove('show');
}

loadData();