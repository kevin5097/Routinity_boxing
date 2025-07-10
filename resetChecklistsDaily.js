// 매일 자정 기준으로 체크리스트 자동 초기화
function resetDailyChecklists() {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const lastReset = localStorage.getItem("lastResetDate");

    if (lastReset !== today) {
        localStorage.clear(); // 모든 체크리스트 초기화
        localStorage.setItem("lastResetDate", today);
    }
}
resetDailyChecklists();
