export default class UserSessionService {

    constructor(session) {
        this.session = session;
        if(this.session !== undefined && this.isTest()){
            console.log("UserSession :: ",this.session);
        }
    }

    getUser() {
        return this.session;
    }

    isTest() {
        return this.session.test;
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


