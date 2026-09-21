import { useEffect, useState } from "react";
import type { DashboardData } from "../../types/dashboard";
import { getDashboardData } from "../../services/dashboardService";
import { Link } from "react-router-dom";

const Dashboard = () => {

    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

    useEffect(() => {
        const cargarDashboard = async () => {

            try {
                const data = await getDashboardData();
                setDashboardData(data);
                console.log(data);

            }catch(error){
                console.log(error);
            }

        } 
        
        cargarDashboard();
    }, []);

    if (!dashboardData) {
        return <div>Cargando...</div>;
    }


    return (
        <div>

            {/* HEADER */}
            <header className="topbar">

                <div className="logo-wrap">
                    <div className="logo-mark">
                        <div className="lb lb1"></div>
                        <div className="lb lb2"></div>
                        <div className="lb lb3"></div>
                    </div>

                    <span className="wordmark">
                        Split<span>Mate</span>
                    </span>
                </div>

                <div className="topbar-right">

                    {/* Mostrar solamente si el usuario es administrador */}
                    {dashboardData.permissions.includes("ROLE_ADMINISTRADOR") && (
                        <button className="btn btn-ghost btn-sm">
                            Administración
                        </button>
                    )}
                    

                    {/* Acá va el username */}
                    <span className="topbar-user">
                        Username {dashboardData.userDashboardDTO.username}
                    </span>

                    <button className="btn btn-ghost btn-sm">
                        Salir
                    </button>

                </div>

            </header>


            {/* CONTENIDO PRINCIPAL */}
            <main className="main-content">

                <div className="page-header">

                    <div>
                        <h1 className="page-title">
                            Mis grupos
                        </h1>

                        <p className="page-sub">
                            Grupos en los que participás
                        </p>
                        

                    </div>

                    <div className="header-actions">

                        <button className="btn btn-ghost">
                            Unirme con código
                        </button>

                        <button className="btn btn-primary">
                            + Nuevo grupo
                        </button>

                    </div>

                </div>


                {/* SIN GRUPOS */}

                {/* 
                    Si groups.length === 0
                    mostrar este bloque
                */}

                {dashboardData.groups.length === 0 && (<div className="empty-state-big">

                    <div className="empty-icon">
                        ⬡
                    </div>

                    <h3>
                        Todavía no estás en ningún grupo
                    </h3>

                    <p>
                        Creá uno nuevo o unite con un código de invitación.
                    </p>

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            justifyContent: "center",
                            marginTop: "16px"
                        }}
                    >

                        <button className="btn btn-ghost">
                            Tengo un código
                        </button>

                        <button className="btn btn-primary">
                            Crear grupo
                        </button>

                    </div>

                </div>)}
                


                {/* LISTA DE GRUPOS */}

                <div className="groups-grid">

                    {/* 
                        Acá tenés que hacer el .map()

                        groups.map((group) => (...))
                    */}
                    {dashboardData.groups.map((group) => (<div className="group-card">

                        <div className="group-card-stripe"></div>

                        <div className="group-card-body">

                            {/* Nombre */}
                            <div className="group-card-name">
                                Nombre del grupo: {group.name}
                            </div>

                            <div className="group-card-meta">

                                {/* Cantidad de miembros */}

                                <span>
                                    {group.members.length} miembros 
                                </span>

                                <span>·</span>


                            </div>

                            <div className="group-card-footer">

                                <span className="badge badge-indigo">
                                    <Link to={`/group/${group.id}`}>  
                                    Ver grupo →
                                    </Link>
                                </span>

                            </div>

                        </div>

                    </div>))}

                    

                </div>

            </main>

        </div>
    );
};

export default Dashboard;