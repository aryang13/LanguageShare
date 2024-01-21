
export type userObject = {
    [uuid: string]: User;
}


const onlineUsers:userObject = {};

export default class User {
    name: string;
    email: string;
    language: string;
    uuid: string;
    eloMap: { [key: string]: number };
    elo: number;

    constructor(uuid: string, language: string) {
        this.uuid = uuid;
        this.language = language;
        this.name = ""; // call from db (or have an endpoint to set)
        this.email = ""; // call from db (or have an ednpoint to set)
        this.eloMap = {
            "English": 1000,
            "Spanish": 1000,
            "French": 1000,
        };
        this.elo = this.language ? this.getEloForLanguage(this.language) : -1;
    }

    getEloForLanguage(language: keyof typeof this.eloMap) {
        return this.eloMap[language];
    }

    setEloForLanguage(language: keyof typeof this.eloMap, elo: number) {
        this.eloMap[language] = elo;
        this.elo = elo;
    }

}


export function addUserToOnlineList(uuid: string, language: string) {
    onlineUsers[uuid] = new User(uuid, language);
}

export function removeUserFromOnlineList(uuid: string) {
    if (onlineUsers[uuid]) {
        const disconnectedName = onlineUsers[uuid].name;
        removeUserFromOnlineList(uuid);
        return disconnectedName;
    }
    return null;
}

export function getOnlineUsers() {
    return onlineUsers;
}


