import Api from "../config/Api";
import { User, Record } from 'pocketbase';

export const parseUserAvatarUrl = (userObj: User) => {
    return Api.getUri() + "/api/files/" + userObj?.profile?.["@collectionId"] + "/" + userObj?.profile?.id + "/" + userObj?.profile?.avatar;
}

export const parseImageUrl = (record: Record) => {
    return Api.getUri() + "/api/files/" + record?.["@collectionId"] + "/" + record?.id + "/" + record?.image;
}

export const parseImageUrlSpecific = (record: Record, image: string) => {
    return Api.getUri() + "/api/files/" + record?.["@collectionId"] + "/" + record?.id + "/" + image;
}
