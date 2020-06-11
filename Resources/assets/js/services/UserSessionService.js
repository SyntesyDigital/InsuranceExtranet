export default class UserSessionService {

    constructor(session) {
        this.session = session;
    }

    getRole() {
        return this.session.role;
    }

    hasRole(role) {
        return this.session.role == role;
    }

    hasPermission(identifier) {
        return this.session.permissions
                .filter(permission => identifier == permission.identifier).length > 0 ? true : false;
    }

}


