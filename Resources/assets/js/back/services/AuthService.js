class AuthService {
    constructor(user) {
        this.user = user;
    }

    hasPermissions(identifiers) {
        this.user.roles.map(function(role){
            return role.permissions.map(function(permission) {
            });
        });
    }
}


