import { useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import {getGroupDetail} from "../../services/groupService";
import type {GroupDetail} from "../../types/groupDetail";


const GroupDetail = () => {

    const {id } =useParams<{id: string }>();


    const [group, setGroup] = useState<GroupDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(()=>{
        const cargarGroupDetail = async ()=> {
            if (!id) return;

            try{
                const data = await getGroupDetail(Number(id));
                setGroup(data);
                console.log(data);
            }catch(error){
                console.log(error);
            }finally{
                setLoading(false);
            }
        }
        cargarGroupDetail();
    }, [id]);
    

    if (loading){
        return <div>Cargando grupo...</div>
    }

    if (!group) {
        return <p>No se pudo cargar el grupo.</p>;
    }


    return (<div className="group-detail">

    <button>
        ← Volver al dashboard
    </button>

    <header>
        <h1>{group.name}</h1>

        <p>{group.members.length} miembros</p>
    </header>

    <section>
        <h2>Miembros</h2>
        {group.members.map((member) => (
            <div key={member.id}>
                <span>{member.username} </span>
                
                <span> {member.role}</span>
            </div>

        ))}
    </section>

    <section>
    <h2>Mi Balance</h2>

    <div>
        <span>{group.balances.username}</span><br/>
        <span>Pagó: {group.balances.totalPaid}</span><br/>
        <span>Le corresponde: {group.balances.totalOwed}</span><br/>

        {group.balances.balance > 0
            ? <span>Le deben: {group.balances.balance}</span>
            : group.balances.balance < 0
                ? <span>Debe: {Math.abs(group.balances.balance)}</span>
                : <span>Está equilibrado</span>
        }
    </div>
</section>
<section>
    <h2>Mis pendientes</h2>

    {group.pendingSplits.map((split) => (
        <div key={split.id}>

            {split.member === group.balances.username && (
                <div>
                    <span>{split.description}</span><br />
                    <span>Monto: {split.amount}</span><br />
                    <span>Pagado por: {split.paidBy}</span><br />
                    <span>Debo: {split.amount}</span>
                </div>
            )}

            {split.paidBy === group.balances.username && (
                <div>
                    <span>{split.description}</span><br />
                    <span>Monto: {split.amount}</span><br />
                    <span>Me debe: {split.member}</span>
                </div>
            )}

        </div>
    ))}
</section>

</div>)
    
}

export default GroupDetail;