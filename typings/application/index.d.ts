
interface VueConstructor {
    /**Axios HTTP client */
    $http: Axios.AxiosStatic;

    /**
     * Check if user belongs to an application role
     * @param role single role or array of roles
     * @returns True/False
     */
    $UserInRoles(role: string | string[]): boolean;

    /**Executes box widgets (Collapse/Remove) */
    $boxWidget(): void;
}