import User, { getOnlineUsers, removeUserFromOnlineList, userObject } from "./user";


// userObjects is a dictionary of  uuid: User objects


function bestMatch(CurrentUuid: string, userObjects: userObject):userObject | null{
    let bestUser: userObject | null = null;
    let bestElo = Infinity;
    const user: User = userObjects[CurrentUuid];
    Object.entries(userObjects).forEach(([uuid, value]: [string, User]) => {
        if (value !== user) {
            const difference = Math.abs(user.elo - value.elo);
            // however if elo difference is +- 500 we would want the user to wait for another match.
            if (difference < bestElo && difference < 500) {
                bestElo = difference;
                bestUser = {
                    uuid: value
                };
            }
        }
    })

    return bestUser;
}
// if bestuser is null, then there is no match for the user. timeout. 

// use best match to matchmake between two users. (delete the users from the online list)
// return the best match and start a socket connection between the two users.

export function matchmake(uuid: string, userObjects: userObject): userObject | null {
    // user defined as a uuid:user ojbect pair
    const currentUser = userObjects[uuid];
    const bestUser = bestMatch(uuid, userObjects); 
    if (bestUser) {
        // delete both users from the online list.
        const key = Object.keys(bestUser)[0];
        // removeUserFromOnlineList(key);
        // removeUserFromOnlineList(uuid);
        return bestUser;
    }
    return null;
}
