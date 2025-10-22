
export const GROUPS: { [key: string]: string } = {
    "ru": "🇷🇺 Русский",
    "tj": "🇹🇯 Таджикский"
};

export const COURSES: number[] = [1, 2, 3, 4, 5, 6];

export const MAX_COURSE_FOR_SUMMARY = 3;

export const ALL_SUBJECTS_MAP: { [key: string]: string } = {
    // 1-й КУРС
    "chem1": "🧪 Химия",
    "bio1": "🧬 Биология",
    "anat1": "💀 Анатомия",
    "phys1": "⚛️ Физика",
    
    // 2-й КУРС
    "anat2": "💀 Анатомия (2)",
    "gisto2": "🔬 Гистология",
    "phys2": "🏃 Физиология",
    "biohim2": "🧪 Биохимия",

    // 3-й КУРС
    "microb3": "🦠 Микроб",
    "patfiz3": "🤢 Патфиз",
    "topanat3": "🧠 Топанатомия",
    "farmak3": "💊 Фармак",
    "hirurgia3": "🔪 Хирургия",
    "prop_v3": "👴 Пропедевтика взр.",
    "prop_d3": "👶 Пропедевтика детск.",
};

export const COURSE_SUBJECTS: { [key: number]: string[] } = {
    1: ["chem1", "bio1", "anat1", "phys1"],
    2: ["anat2", "gisto2", "phys2", "biohim2"],
    3: ["microb3", "patfiz3", "topanat3", "farmak3", "hirurgia3", "prop_v3", "prop_d3"],
    4: [],
    5: [],
    6: [],
};
