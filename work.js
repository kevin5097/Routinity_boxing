// ===========================
// 체크리스트 렌더링 함수
// ===========================
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
            const timeString = now.toLocaleTimeString("ko-KR", { hour: '2-digit', minute: '2-digit' });

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

// ===========================
// 체크 이력 저장
// ===========================
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

// ===========================
// 히스토리 보기
// ===========================
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

// ===========================
// 월~일 운동 루틴 체크리스트
// ===========================

const mondayRoutine = [
    "줄넘기 3분 × 5세트 (워밍업 및 심박수 올리기)",
    "벤치프레스 4세트 × 8~10",
    "덤벨 플라이 3세트 × 10~12",
    "풀업 / 랫풀다운 4세트 × 8~12",
    "덤벨 숄더프레스 3세트 × 10~12",
    "메디신 볼 토스 3세트 × 10",
    "행잉 레그 레이즈 3세트 × 12~15"
];

const tuesdayRoutine = [
    "점핑잭 + 가벼운 스쿼트 5분 (워밍업)",
    "바벨 스쿼트 / 레그프레스 4세트 × 8~10",
    "루마니안 데드리프트 3세트 × 8~12",
    "박스 점프 3세트 × 6~8",
    "런지 + 덤벨 3세트 × 10",
    "러시안 트위스트 3세트 × 15"
];

const wednesdayRoutine = [
    "줄넘기 3분 × 5세트",
    "케이블 로우 / 덤벨 로우 3세트 × 10~12",
    "딥스 / 트라이셉스 푸쉬다운 3세트 × 10~12",
    "버피 + 메디신 볼 콤보 3세트 × 10",
    "인터벌 러닝 15~20분 (30초 전력/60초 걷기)",
    "플랭크 3세트 × 60초"
];

const thursdayRoutine = [
    "드리블 + 점프 워밍업 5분",
    "5:5 풀코트 게임 30~40분",
    "샷 연습 + 드리블 훈련 20~25분",
    "줄넘기 3분 × 3세트",
    "메디신 볼 러시안 트위스트 3세트 × 15"
];

const fridayRoutine = [
    "줄넘기 3분 × 5세트",
    "슈퍼세트: 스쿼트 → 벤치 → 데드리프트 3세트 × 6~8",
    "박스 점프 / 버피 3세트 × 6~8",
    "덤벨 스내치 / 케틀벨 스윙 3세트 × 10",
    "행잉 레그 레이즈 + 플랭크 3세트 × 12~15 / 60초"
];

const sundayRoutine = [
    "드리블 + 점프 워밍업 5분",
    "5:5 풀코트 게임 30~40분",
    "스프린트 인터벌 10~15초 × 10회",
    "줄넘기 3분 × 3세트"
];

// ===========================
// 렌더링
// ===========================
renderList("monday-list", mondayRoutine);
renderList("tuesday-list", tuesdayRoutine);
renderList("wednesday-list", wednesdayRoutine);
renderList("thursday-list", thursdayRoutine);
renderList("friday-list", fridayRoutine);
renderList("sunday-list", sundayRoutine);
