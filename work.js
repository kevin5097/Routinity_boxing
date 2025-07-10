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
  "줄넘기 3분 × 4세트 (워밍업 및 심박수 올리기)",
  "인터벌 러닝 15분 (30초 전력 질주 / 30초 걷기 또는 가벼운 조깅 반복)",
  "복싱 훈련 세부:",
  "  - 새도우 복싱 3~5분 × 3라운드 (폼 점검, 풋워크, 콤보 연습)",
  "  - 샌드백 3분 × 5라운드 (파워와 스피드, 정확성 강화)",
  "  - 스파링 3~5라운드 (상대와 실전 감각 및 방어 연습)",
  "  - 펀치 콤보 예시: 잽-크로스-훅, 잽-잽-크로스-어퍼컷",
  "하체 근력 운동 (점프 스쿼트 3세트 × 12회, 스텝업 3세트 × 10회 양쪽 다리 각각)",
  "코어 운동 세부:",
  "  - 리버스 크런치 3세트 × 15회 (복부 하부 강화)",
  "  - 플랭크 3세트 × 1분 유지 (복부 및 체간 안정성)",
  "  - 바이시클 크런치 3세트 × 20회 (복부 측면 및 전면 근육)",
  "  - 데드버그 3세트 × 12회 (허리 안정 및 복부 깊은 근육 활성화)",
  "  - 슈퍼맨 3세트 × 15회 (척추 기립근 강화)",
  "배틀로프 15초 전력질주 × 5세트 (상체 및 심폐 능력 강화)",
  "마무리 Zone2 러닝 15분 (심박수 140 ~ 150 유지)",
  "마무리 걷기 또는 가벼운 사이클 15분 (쿨다운 및 회복 촉진)"
];

const workCheck2 = [
  "줄넘기 3분 × 5세트 (워밍업 및 집중력 향상)",
  "복싱 훈련 세부:",
  "  - 스파링 5라운드 (3분 라운드, 1분 휴식, 실전 감각 강화)",
  "  - 새도우 복싱 3분 × 3라운드 (폼과 스피드 조절)",
  "  - 펀치 콤보 집중 연습 (잽-크로스, 훅-어퍼컷 등)",
  "체간 안정 운동 세부:",
  "  - 푸쉬업 3세트 × 15회 (상체 근력 및 체간 안정)",
  "  - 숄더 프레스 3세트 × 12회 (어깨 강화)",
  "  - 사이드 플랭크 3세트 × 30초 (복부 측면 강화)",
  "  - 버드독 3세트 × 12회 (균형 및 척추 안정)",
  "마무리 걷기 또는 가벼운 사이클 15분 (쿨다운 및 이완)"
];

renderList("work-list", workCheck);
renderList("work-list2", workCheck2);
