export interface PersonEntity {
    prs_id: string | number;
    prs_name: string;
    prs_lastname: string;
    prs_phone: string;
    prs_address: string;
    prs_age: number;
}

export interface BodyPersonEntity {
    prs_name: string;
    prs_lastname: string;
    prs_phone: string;
    prs_address: string;
    prs_age: number;
}