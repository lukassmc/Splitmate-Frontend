import type {DashboardData} from "../types/dashboard";


const API_URL = "http://localhost:8080";

export const getDashboardData = async (): Promise <DashboardData> => {

    const token = localStorage.getItem('JWTtoken');

    const response = await fetch(`${API_URL}/api/dashboard/`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok){
        throw new Error(`Error fetching dashboard data: ${response.statusText}`);
    }

    return await response.json();


}