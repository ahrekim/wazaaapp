export class Happenings {
    id: number;
    uuid: string;
    happening_type: string;
    happening_name: string;
    happening_information: string;
    happening_starts: string;
    happening_ends: string;
    happening_ends_org: string;
    street_address: string;
    zipcode: string;
    city: string;
    invites: Invites[];
    head_count: number;
    head_count_confirmed: number;
    latitude: number;
    longitude: number;
}
export class Invites {
    id: number;
    uuid: string;
    invitation_name: string;
    invitation_information: string;
    max_attendees: number;
    confirmed_attendees: number;
    happening: Happenings;
}
  