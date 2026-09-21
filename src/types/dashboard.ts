import type { GroupMember } from "./groupmember";
export interface UserDashboardDTO {
    id: number,
    username: string
}

export interface GroupDashboard {
    id: number,
    name: string,
    members: GroupMember[]
}


export interface DashboardData {
    userDashboardDTO: UserDashboardDTO,
    permissions : Permission[],
    groups: GroupDashboard[]

}

export type Permission =
    | "ROLE_ADMINISTRADOR"
    | "ROLE_USUARIO";