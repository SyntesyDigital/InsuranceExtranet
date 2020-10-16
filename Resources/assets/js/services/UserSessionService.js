export default class UserSessionService {

    constructor(session) {
        this.session = session;
        if(this.session !== undefined && this.isTest()){
            console.log("UserSession :: ",this.session);
        }
    }

    getApiToken() {
        return this.session.api_token;
    }

    getSessionId() {
        return this.session.session_id;
    }

    getUser() {
        return this.session;
    }

    getAPIRole() {
        return this.session.veos_role;
    }

    getAPIPermissions() {
        return this.session.veos_permissions;
    }

    isTest() {
        return this.session.test;
    }

    /*
        Return all allowed pages, to be used to filter menu and buttons.
    */
    getAllowedPages() {
        return this.session.allowed_pages;
    }

    

    /**
     * Check if slug is allowed by this user.
     * @param {*} slug 
     */
    isAllowedSlug(slug) {

        if(this.session.allowed_pages == null || this.session.allowed_pages === undefined)
            return true;

        if(this.session.allowed_pages[slug] !== undefined){
            return this.session.allowed_pages[slug];
        }

        return true;
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


