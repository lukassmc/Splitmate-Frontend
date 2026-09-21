import type {GroupDetail} from "../types/groupDetail";

const API_URL = "http://localhost:8080";

export const getGroupDetail = async (id : number ): Promise<GroupDetail> => {

    const token = localStorage.getItem('JWTtoken');
    console.log(`${API_URL}/api/group/${id}`);
    const response = await fetch(`${API_URL}/api/groups/${id}`, {
        
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }

    });

    if (!response.ok){
        throw new Error(`Error fetching group detail: ${response.statusText}`);

    }

    return await response.json();
}

