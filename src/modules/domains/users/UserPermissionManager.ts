

export class UserPermissionManager {

    private user_permissions: string[] ;

    constructor(user_permissions: string[]) {
        this.user_permissions = user_permissions ;
    }


    canUserAccess(permissions: string) : boolean {
  
    return !!this.user_permissions.find(v => v === permissions) ;

    }

    async syncPermission(permissions: string[]): Promise<void> {
    this.user_permissions = permissions;
    
    }

    async getUserPermissions(): Promise<string[]>{
        return this.user_permissions
    }

}