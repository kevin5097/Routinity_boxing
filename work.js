function renderList(id, items) {
    const list = document.getElementById(id);
    if (!list) return;

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    items.forEach((item, index) => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const checkboxKey = `${today}-${id}-${index}`;
        const timeKey = `${checkboxKey}-time`;

        checkbox.id = checkboxKey;
        checkbox.checked = localStorage.getItem(checkboxKey) === "true";

        const timeSpan = document.createElement("span");
        timeSpan.style.marginLeft = "10px";
        const savedTime = localStorage.getItem(timeKey);
        if (savedTime) {
            timeSpan.textContent = `✔ ${savedTime}`;
        }

        checkbox.addEventListener("change", () => {
            localStorage.setItem(checkboxKey, checkbox.checked);
            const now = new Date();
            const timeString = now.toLocaleTimeString("ko-KR", {
                hour: '2-digit', minute: '2-digit'
            });

            if (checkbox.checked) {
                localStorage.setItem(timeKey, timeString);
                timeSpan.textContent = `✔ ${timeString}`;
            } else {
                localStorage.removeItem(timeKey);
                timeSpan.textContent = "";
            }

            saveHistory(today, id, index, item, checkbox.checked, timeString);
        });

        const label = document.createElement("label");
        label.htmlFor = checkbox.id;
        label.textContent = item;

        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(timeSpan);
        list.appendChild(li);
    });
}

// 체크 이력 저장
function saveHistory(date, listId, index, label, checked, time) {
    const historyKey = `history-${date}`;
    let history = JSON.parse(localStorage.getItem(historyKey)) || [];

    const existing = history.find(h => h.listId === listId && h.index === index);
    if (existing) {
        existing.checked = checked;
        existing.time = time;
    } else {
        history.push({ listId, index, label, checked, time });
    }

    localStorage.setItem(historyKey, JSON.stringify(history));
}

// 히스토리 보기
function showHistory() {
    const container = document.getElementById("history-container");
    container.innerHTML = "";

    const today = new Date();

    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateKey = date.toISOString().split('T')[0];
        const historyKey = `history-${dateKey}`;
        const history = JSON.parse(localStorage.getItem(historyKey));

        if (!history || history.length === 0) continue;

        const dateHeader = document.createElement("h4");
        dateHeader.textContent = `📆 ${dateKey}`;
        container.appendChild(dateHeader);

        const ul = document.createElement("ul");
        history.forEach(entry => {
            const li = document.createElement("li");
            li.textContent = `${entry.label} - ${entry.checked ? "✔" : "✘"} ${entry.time || ""}`;
            ul.appendChild(li);
        });

        container.appendChild(ul);
    }
}
window.showHistory = showHistory;

const workCheck = [
    "줄넘기 3분 × 4세트",
    "인터벌 러닝 15분 (30초 질주 / 30초 쉼)",
    "복싱 훈련 (샌드백 / 스파링 / 새도우 30~40분)",
    "하체 근력 (점프 스쿼트, 스텝업)",
    "코어: 리버스 크런치 / 플랭크 등 3세트",
    "배틀로프 15초 × 5세트",
    "마무리 Zone2 러닝 15분 (심박 140 ~ 5)",
    "마무리 걷기 또는 가벼운 사이클 15분"
];
const workCheck2 = [
    "줄넘기 3분 × 5세트",
    "복싱 훈련 (스파링 중심 5R)",
    "체간 안정 운동: 푸쉬업, 숄더 프레스 등 상체 보완",
    "마무리 걷기 또는 가벼운 사이클 15분"
];
const workCheck3 = [
    "축구 or 농구 2시간 ",
    "Zone2 러닝 또는 사이클 45분"
];
renderList("work-list", workCheck);
renderList("work-list2", workCheck2);
renderList("work-list3", workCheck3);
