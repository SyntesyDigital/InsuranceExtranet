export default class AuthService {

    constructor(session) {
        this.session = session;
    }

    getRole() {
        return this.session.role;
    }

    hasPermission(identifier) {
        
    }
    // hasPermissions(identifiers) {
    //     this.user.roles.map(function(role){
    //         return role.permissions.map(function(permission) {
    //         });
    //     });
    // }
}


