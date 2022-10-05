import { Record } from 'pocketbase';

interface NewsInterface extends Record {
    title: string;
    content: string;
    image: string;
    category: string;
}

interface MemberInterface extends Record {
    name: string;
    role: string;
    quote: string;
    image: string;
}

interface VehicleInterface extends Record {
    name: string;
    description: string;
    km: number;
    price: number;
    image: string;
}

interface ServiceInterface extends Record {
    title: string;
    content: string;
    image: string;
}

interface ImageInterface extends Record {
    original: string;
    thumbnail: string;
}

interface LinkInterface extends Record {
    title: string
    description: string
    url: string
    image: string
}

export type {
    NewsInterface,
    MemberInterface,
    VehicleInterface,
    ServiceInterface,
    ImageInterface,
    LinkInterface
};
