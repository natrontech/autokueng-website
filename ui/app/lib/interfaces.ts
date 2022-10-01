import { Record } from 'pocketbase';

interface NewsType extends Record {
    title: string;
    content: string;
    image: string;
    category: string;
}

interface MemberType extends Record {
    name: string;
    role: string;
    quote: string;
    image: string;
}

interface VehicleType extends Record {
    name: string;
    description: string;
    km: number;
    price: number;
    image: string;
}

export type {
    NewsType,
    MemberType,
    VehicleType
};
