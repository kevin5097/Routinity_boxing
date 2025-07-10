// floydMayweatherRoutine.js

const floydMayweatherRoutine = {
  quote: {
    text: "노력. 헌신.",
    author: "Floyd Mayweather Jr."
  },

  dailySchedule: [
    { time: "13:00", activity: "기상 및 식사" },
    { time: "14:00", activity: "스트레칭 및 회복 운동" },
    { time: "16:00", activity: "첫 번째 훈련 (웨이트, 스피드 훈련)" },
    { time: "18:00", activity: "식사 및 낮잠" },
    { time: "22:00", activity: "복싱 훈련 시작 (스파링, 미트, 백작업)" },
    { time: "01:00", activity: "야간 러닝 (8~10km)" },
    { time: "03:00", activity: "샤워 및 휴식 후 취침" }
  ],

  boxingRoutine: [
    { item: "야간 러닝", detail: "매일 새벽 1~2시 사이, 도로에서 8~10km 러닝" },
    { item: "줄넘기", detail: "20~30분 (리듬, 하체 민첩성, 지구력)" },
    { item: "섀도 복싱", detail: "4~6라운드 (움직임 반복, 반사신경 훈련)" },
    { item: "미트 훈련", detail: "5라운드 이상 (스피드, 정확도, 리듬)" },
    { item: "헤비백", detail: "6~8라운드 (파워 + 스태미나)" },
    { item: "스피드백", detail: "5라운드 이상 (속도, 리듬)" },
    { item: "스파링", detail: "10~12라운드 (대개 본 경기 페이스로)" }
  ],

  strengthConditioning: [
    { exercise: "푸쉬업", reps: "300~500회", sets: "매일" },
    { exercise: "싯업", reps: "1000회 이상", sets: "매일 (10세트 이상)" },
    { exercise: "웨이트", reps: "가벼운 중량 + 고반복", sets: "상체 중심" },
    { exercise: "복부 펀치 내성 훈련", reps: "10분 이상", sets: "메디신볼 or 트레이너 복부 가격" }
  ],

  mentalTraining: [
    "경기 영상 반복 분석 (자신 + 상대 선수)",
    "절대 금주/금연 및 클럽 출입 X",
    "훈련 시간 엄수 (자기 루틴 중심의 철저함)",
    "상대 약점을 메모하고 전략 구상"
  ],

  sampleDiet: {
    breakfast: ["계란 흰자", "통밀 토스트", "과일"],
    lunch: ["닭가슴살", "현미", "야채 샐러드"],
    dinner: ["연어 또는 스테이크", "고구마", "아보카도"],
    supplements: ["생수만 섭취", "비타민제, 프로틴 쉐이크"]
  },

  routineHighlights: [
    { feature: "야행성 루틴", description: "새벽에 러닝 + 밤에 훈련 (시차 적응도 훈련)" },
    { feature: "초고강도 복근 루틴", description: "하루 1000회 이상 복근 반복 훈련" },
    { feature: "기술 훈련 중심", description: "'힛 앤 낫 힛'을 위한 섀도, 미트 반복" },
    { feature: "절제된 라이프스타일", description: "철저한 자기관리 + 클린 식단" },
    { feature: "스파링 강도", description: "경기 수준의 페이스로 최대 12라운드 진행" }
  ]
};

export default floydMayweatherRoutine;
