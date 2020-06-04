
function getPermissionValueFromRole(permissionId, rolePermissions) {
    if (rolePermissions === undefined)
        return false;

    if (rolePermissions.indexOf(permissionId) != -1) {
        //if permission exist in rolePermissions 
        return true;
    }

    return false;
}
/**
 * Function to convert groups from GQL to React
 */
export function processGroups(groups, permissions, rolePermissions) {
    var processedGroups = [];

    var permissionsByGroup = {};
    for (var key in permissions) {
        var permission = permissions[key];

        if (permissionsByGroup[permission.group.id] === undefined) {
            permissionsByGroup[permission.group.id] = [];
        }

        permissionsByGroup[permission.group.id].push({
            id: permission.id,
            identifier: permission.identifier,
            name: permission.name,
            value: getPermissionValueFromRole(permission.id, rolePermissions),
            group: permission.group.id
        });

    }

    for (var key in groups) {
        var group = groups[key];

        var groupPermissions = permissionsByGroup[group.id] !== undefined
            ? permissionsByGroup[group.id]
            : [];

        processedGroups.push({
            id: group.id,
            name: group.name,
            identifier: group.identifier,
            order: group.order,
            permissions: groupPermissions
        });
    }

    return processedGroups;

}

/**
 * Function to process the role the first load. 
 * 
 * @param {} role 
 * @param {*} groups 
 * @param {*} permissions 
 */
export function processRole(role, groups, permissions) {

    //create array with role permisions to check value
    var rolePermissions = [];
    for (var key in role.permissions) {
        rolePermissions.push(role.permissions[key].id);
    }

    var processedGroups = processGroups(groups, permissions, rolePermissions);

    //console.log("processRole (groups,permissions,processedGroups)",groups,permissions,processedGroups);

    return {
        id: role.id,
        name: role.name,
        identifier: role.identifier,
        icon: role.icon,
        default: role.default,
        groups: processedGroups
    }

}

/**
 * Process role from the api. Merge permissions and values.
*/
export function processRoleAfterUpdate(apiRole, role) {

    //put all permission id in array
    var rolePermissions = [];
    for (var key in apiRole.permissions) {
        rolePermissions.push(apiRole.permissions[key].id);
    }

    for (var i in role.groups) {
        for (var j in role.groups[i].permissions) {
            var permission = role.groups[i].permissions[j];
            role.groups[i].permissions[j].value = getPermissionValueFromRole(
                permission.id,
                rolePermissions
            );
        }
    }

    return {
        id: apiRole.id,
        name: apiRole.name,
        identifier: apiRole.identifier,
        icon: apiRole.icon,
        default: apiRole.default,
        groups: role.groups
    }

}

/**
 * Returns an array with permission id
 */
export function getRolePermission(role) {
    var permissions = [];

    for (var i in role.groups) {
        for (var j in role.groups[i].permissions) {
            var currentPermission = role.groups[i].permissions[j];
            if (currentPermission.value) {
                permissions.push(currentPermission.id);
            }
        }
    }

    return permissions;
}