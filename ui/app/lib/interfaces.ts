import { Record } from 'pocketbase';

interface News extends Record {
    title: string;
    content: string;
    image: string;
    category: string;
}

interface Member extends Record {
    name: string;
    role: string;
    quote: string;
    image: string;
}

interface Vehicle extends Record {
    name: string;
    description: string;
    km: number;
    price: number;
    image: string;
}

export type {
    News,
    Member,
    Vehicle
};
