export default class UserSessionService {

    constructor(session) {
        this.session = session;
    }

    getUser() {
        return this.session;
    }

    /*
        Return all allowed pages, to be used to filter menu and buttons.
    */
    getAllowedPages() {
        var payload = JSON.parse(this.session.payload);
        return payload.allowed_pages;
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


