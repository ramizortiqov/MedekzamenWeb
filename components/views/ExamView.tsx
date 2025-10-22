
import React, { useState, useMemo } from 'react';
import type { User, Material } from '../../types';
import { ALL_SUBJECTS_MAP, COURSE_SUBJECTS } from '../../constants';
import { getMaterialsByTag } from '../../services/materialService';
import MaterialCard from '../MaterialCard';
import { BackArrowIcon } from '../icons/ContentIcons';

interface ExamViewProps {
    user: User;
}

const ExamView: React.FC<ExamViewProps> = ({ user }) => {
    const [selectedCourse, setSelectedCourse] = useState<number>(user.course);
    const [selectedSubjectTag, setSelectedSubjectTag] = useState<string | null>(null);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const availableCourses = useMemo(() => {
        return Array.from({ length: user.course }, (_, i) => i + 1);
    }, [user.course]);

    const subjectsForCourse = useMemo(() => {
        return (COURSE_SUBJECTS[selectedCourse] || []).map(tag => ({
            tag,
            name: ALL_SUBJECTS_MAP[tag]
        }));
    }, [selectedCourse]);

    const handleSubjectSelect = (tag: string) => {
        setIsLoading(true);
        setSelectedSubjectTag(tag);
        setTimeout(() => { // Simulate network delay
            const fetchedMaterials = getMaterialsByTag(tag, user);
            setMaterials(fetchedMaterials);
            setIsLoading(false);
        }, 300);
    };

    if (selectedSubjectTag) {
        return (
            <div>
                <button 
                    onClick={() => { setSelectedSubjectTag(null); setMaterials([]); }}
                    className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold mb-4 hover:underline"
                >
                    <BackArrowIcon className="h-5 w-5" />
                    <span>Назад к выбору предмета</span>
                </button>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    {ALL_SUBJECTS_MAP[selectedSubjectTag]} ({selectedCourse}-й курс)
                </h2>
                {isLoading ? (
                    <p className="text-center text-gray-600 dark:text-gray-300">Загрузка материалов...</p>
                ) : materials.length > 0 ? (
                    materials.map(mat => <MaterialCard key={mat.id} material={mat} />)
                ) : (
                    <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg">
                        <p className="text-gray-600 dark:text-gray-300">📚</p>
                        <p className="text-gray-600 dark:text-gray-300">Материалы по этому предмету еще не добавлены.</p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Выберите курс</h2>
                <div className="flex flex-wrap gap-2">
                    {availableCourses.map(course => (
                        <button
                            key={course}
                            onClick={() => setSelectedCourse(course)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${selectedCourse === course ? 'bg-blue-600 text-white shadow-md' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                        >
                            {course}-й курс
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Выберите предмет</h2>
                {subjectsForCourse.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {subjectsForCourse.map(subject => (
                            <button
                                key={subject.tag}
                                onClick={() => handleSubjectSelect(subject.tag)}
                                className="p-5 text-left bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">{subject.name}</span>
                            </button>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 dark:text-gray-400">Нет предметов для этого курса.</p>
                )}
            </div>
        </div>
    );
};

export default ExamView;
