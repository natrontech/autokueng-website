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
    image: string;
}

enum FuelType {
    Diesel = "Diesel",
    Benzin = "Benzin",
}

enum GearboxType {
    Automatik = "Automatik",
    Schaltgetriebe = "Schaltgetriebe",
}

interface VehicleInterface extends Record {
    name: string;
    description: string;
    km: number;
    price: number;
    images: string[];
    ps: number;
    fuel: FuelType;
    gearbox: GearboxType;
    date: Date;
    mfk: Date;
}

interface ServiceInterface extends Record {
    title: string;
    content: string;
    image: string;
}

interface ImageInterface extends Record {
    original: string;
    thumbnail?: string;
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
