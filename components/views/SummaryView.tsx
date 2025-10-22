
import React, { useState, useMemo } from 'react';
import type { User, Material } from '../../types';
import { MAX_COURSE_FOR_SUMMARY } from '../../constants';
import { getMaterialsByTag } from '../../services/materialService';
import MaterialCard from '../MaterialCard';
import { BackArrowIcon } from '../icons/ContentIcons';

interface SummaryViewProps {
    user: User;
}

const SummaryView: React.FC<SummaryViewProps> = ({ user }) => {
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
    const [selectedSection, setSelectedSection] = useState<number | null>(null);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const availableCourses = useMemo(() => {
        const maxCourse = Math.min(MAX_COURSE_FOR_SUMMARY, user.course);
        return Array.from({ length: maxCourse }, (_, i) => i + 1);
    }, [user.course]);

    const handleSectionSelect = (course: number, section: number) => {
        setIsLoading(true);
        setSelectedCourse(course);
        setSelectedSection(section);
        const tag = `summary${course}.${section}`;
        setTimeout(() => { // Simulate network delay
            const fetchedMaterials = getMaterialsByTag(tag, user);
            setMaterials(fetchedMaterials);
            setIsLoading(false);
        }, 300);
    };

    if (selectedCourse && selectedSection) {
        return (
            <div>
                 <button 
                    onClick={() => { setSelectedCourse(null); setSelectedSection(null); setMaterials([]); }}
                    className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold mb-4 hover:underline"
                >
                    <BackArrowIcon className="h-5 w-5" />
                    <span>Назад к выбору итога</span>
                </button>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    Итог {selectedCourse}.{selectedSection}
                </h2>
                {isLoading ? (
                    <p className="text-center text-gray-600 dark:text-gray-300">Загрузка материалов...</p>
                ) : materials.length > 0 ? (
                    materials.map(mat => <MaterialCard key={mat.id} material={mat} />)
                ) : (
                    <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg">
                        <p className="text-gray-600 dark:text-gray-300">📚</p>
                        <p className="text-gray-600 dark:text-gray-300">Материалы по этому итогу еще не добавлены.</p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div>
            {availableCourses.map(course => (
                <div key={course} className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Итог - {course} курс</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map(section => (
                            <button
                                key={section}
                                onClick={() => handleSectionSelect(course, section)}
                                className="p-5 text-center bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">Итог {course}.{section}</span>
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SummaryView;
