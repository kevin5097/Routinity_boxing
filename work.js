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
  "줄넘기 3분 × 5세트 (워밍업 및 심박수 올리기)",
  "인터벌 러닝 3세트 (30초 전력 질주 / 30초 아령 쉐도우 총 10번)",
  "복싱 - 새도우 복싱 3분 × 3라운드 (폼 점검, 풋워크, 콤보 연습)",
  "복싱 - 샌드백 3분 × 5라운드 (파워와 스피드, 정확성 강화)",
  "복싱 - 스파링 or 미트",
  "하체 - 점프 스쿼트 3세트 × 12회",
  "하체 - 덤벨 20KG 스텝업 4세트 × 12회",
  "하체 - 케틀벨 스윙 16KG 4세트 × 15회",
  "코어 - 리버스 크런치 3세트 × 15회 (복부 하부 강화)",
  "코어 - 플랭크 3세트 × 1분 유지 (복부 및 체간 안정성)",
  "코어 - 바이시클 크런치 3세트 × 20회 (복부 측면 및 전면 근육)",
  "배틀로프 15초 전력질주 × 5세트 (상체 및 심폐 능력 강화)"
];

const workCheck2 = [
  "줄넘기 3분 × 5세트 (워밍업 및 심박수 올리기)",
  "ZONE2 러닝 30~40분 ",
  "복싱 - 새도우 복싱 3분 × 3라운드 (폼 점검, 풋워크, 콤보 연습)",
  "복싱 - 샌드백 3분 × 5라운드 (파워와 스피드, 정확성 강화)",
  "복싱 - 스파링 or 미트",
  "상체 - 푸쉬업 3세트 × 15회 (상체 근력 및 체간 안정)",
  "상체 - 숄더 프레스 3세트 × 12회 (어깨 강화)",
  "상체 - 풀 or 어시스티드 풀업 3세트 × 10회",
  "코어 - 사이드 플랭크 3세트 × 30초 (복부 측면 강화)"
];

renderList("work-list", workCheck);
renderList("work-list2", workCheck2);
