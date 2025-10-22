
export interface User {
    course: number;
    group: string;
    fullName: string;
    registeredAt: string;
}

export interface Material {
    id: number;
    tag: string;
    type: 'text' | 'photo' | 'video' | 'document';
    file_id?: string; // For photos, it will be a URL. For others, a placeholder.
    file_name?: string;
    caption?: string;
    course?: number | null;
    group_lang?: string | null;
}

export interface Subject {
    tag: string;
    name: string;
}
