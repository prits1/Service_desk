import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export default function AdminPanel() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const snapshot = await getDocs(collection(db, "tickets"));
      setTickets(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchTickets();
  }, []);

  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, "tickets", id), { status });
    setTickets(tickets.map(ticket => ticket.id === id ? { ...ticket, status } : ticket));
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      {tickets.map(ticket => (
        <div key={ticket.id}>
          <p>{ticket.description} - {ticket.status}</p>
          <button onClick={() => updateStatus(ticket.id, "In Progress")}>In Progress</button>
          <button onClick={() => updateStatus(ticket.id, "Resolved")}>Resolved</button>
        </div>
      ))}
    </div>
  );
}

