
export interface GroupMember {
    id: number,
    username: string,
    role: GroupRole
}

export type GroupRole = "ADMIN" | "MEMBER";