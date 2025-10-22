
import type { Material, User } from '../types';

// Mock data simulating the database
const mockMaterials: Material[] = [
    // Course 1
    { id: 1, tag: 'chem1', type: 'text', caption: 'Лекция 1: Основы неорганической химии. Атомы и молекулы.', course: 1, group_lang: 'ru' },
    { id: 2, tag: 'chem1', type: 'photo', file_id: 'https://picsum.photos/800/400?random=1', file_name: 'Периодическая таблица', caption: 'Современная периодическая таблица элементов.', course: 1, group_lang: null },
    { id: 3, tag: 'bio1', type: 'document', file_name: 'Методичка по цитологии.pdf', caption: 'Практическое руководство к изучению клетки.', course: 1, group_lang: 'ru' },
    { id: 4, tag: 'anat1', type: 'text', caption: 'Анатомия костей черепа. Подробное описание всех 23 костей.', course: 1, group_lang: 'tj' },
    { id: 5, tag: 'anat1', type: 'photo', file_id: 'https://picsum.photos/800/500?random=2', file_name: 'Скелет человека', caption: 'Общая схема скелета.', course: 1, group_lang: null },
    { id: 6, tag: 'phys1', type: 'video', file_name: 'Физика: Законы Ньютона', caption: 'Видео-лекция по основам классической механики в медицине.', course: 1, group_lang: 'ru' },
    
    // Course 2
    { id: 7, tag: 'anat2', type: 'text', caption: 'Анатомия ЦНС. Спинной мозг.', course: 2, group_lang: 'ru' },
    { id: 8, tag: 'gisto2', type: 'photo', file_id: 'https://picsum.photos/800/600?random=3', file_name: 'Мышечная ткань под микроскопом', caption: 'Гистологический препарат.', course: 2, group_lang: null },
    { id: 9, tag: 'phys2', type: 'document', file_name: 'Физиология дыхания.docx', caption: 'Материалы к семинару.', course: 2, group_lang: 'ru' },
    { id: 10, tag: 'biohim2', type: 'text', caption: 'Биохимия: Цикл Кребса.', course: 2, group_lang: 'tj' },

    // Course 3
    { id: 11, tag: 'microb3', type: 'text', caption: 'Микробиология: Классификация бактерий.', course: 3, group_lang: 'ru' },
    { id: 12, tag: 'patfiz3', type: 'text', caption: 'Патофизиология воспаления. Ключевые медиаторы.', course: 3, group_lang: 'ru' },
    { id: 13, tag: 'farmak3', type: 'document', file_name: 'Фармакология НПВС.pdf', caption: 'Классификация и механизмы действия.', course: 3, group_lang: 'tj' },

    // General Materials
    { id: 14, tag: 'lecture', type: 'text', caption: 'Лекция по общей гигиене.', course: 1, group_lang: 'ru' },
    { id: 15, tag: 'lecture', type: 'text', caption: 'Лекция по нормальной физиологии.', course: 2, group_lang: 'ru' },
    { id: 16, tag: 'practice', type: 'document', file_name: 'Практика по биохимии.pdf', caption: 'Задачи для 2-го курса.', course: 2, group_lang: 'ru' },
    { id: 17, tag: 'video', type: 'video', file_name: 'Операция аппендэктомии', caption: 'Учебное видео для 3-го курса.', course: 3, group_lang: null },
    { id: 18, tag: 'video', type: 'video', file_name: 'Базовая СЛР', caption: 'Видео для всех курсов.', course: null, group_lang: null },
    
    // Summaries (Итог)
    { id: 19, tag: 'summary1.1', type: 'text', caption: 'Итог 1.1: Ключевые темы по Анатомии за 1 семестр.', course: 1, group_lang: 'ru' },
    { id: 20, tag: 'summary1.2', type: 'document', file_name: 'Итог 1.2 - Химия.pdf', caption: 'Все формулы и реакции.', course: 1, group_lang: 'ru' },
    { id: 21, tag: 'summary2.1', type: 'text', caption: 'Итог 2.1: Гистология. Все препараты.', course: 2, group_lang: 'ru' },
    { id: 22, tag: 'summary2.1', type: 'text', caption: 'Итоги 2.1: Гистология (тч.)', course: 2, group_lang: 'tj' },
    { id: 23, tag: 'summary3.4', type: 'photo', file_id: 'https://picsum.photos/800/450?random=4', file_name: 'Схема по Фармакологии', caption: 'Основные группы препаратов.', course: 3, group_lang: null },
];

/**
 * Simulates fetching materials from the database by filtering the mock data.
 * @param tag The tag to filter materials by.
 * @param user The current user, used for course and group filtering.
 * @returns A filtered array of materials.
 */
export const getMaterialsByTag = (tag: string, user: User): Material[] => {
    console.log(`Filtering for tag: ${tag}, user course: ${user.course}, user group: ${user.group}`);
    
    return mockMaterials.filter(material => {
        if (material.tag !== tag) {
            return false;
        }
        
        // Check course compatibility
        // Material is available if its course is null (for all courses) or matches the user's course.
        // For exam materials, it should be course-specific. For general, it's more flexible.
        // The bot logic implies: show for your course. Let's stick to that.
        const courseMatch = material.course === null || material.course === user.course;

        // Check group compatibility
        // Material is available if its group is null (for both groups) or matches the user's group.
        const groupMatch = material.group_lang === null || material.group_lang === user.group;

        return courseMatch && groupMatch;
    });
};
