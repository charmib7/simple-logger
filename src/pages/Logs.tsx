import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

interface LogEntry {
  id: string;
  message: string;
  charCount: number;
  createdAt: any;
}

export default function Logs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    const q = query(collection(db, "submissions"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as LogEntry[];
      setLogs(data);
    });
    return () => unsubscribe();
  }, []);

  // Function to delete a specific log
  const handleDelete = async (id: string) => {
    // Optional: Ask for confirmation so you don't delete by accident
    if (window.confirm("Are you sure you want to delete this log?")) {
      try {
        await deleteDoc(doc(db, "submissions", id));
      } catch (e) {
        console.error("Error deleting document: ", e);
      }
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 underline decoration-blue-500">Stored Logs</h1>
      <div className="grid grid-cols-1 gap-6">
        {logs.length === 0 ? (
          <p className="text-center text-gray-400 py-20 text-xl">No logs found in the database.</p>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col gap-3 relative group">
              <div className="flex justify-between items-center text-sm text-gray-400 border-b pb-2">
                <div className="flex gap-4">
                  <span>{log.createdAt?.toDate().toLocaleString() || "Processing..."}</span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">
                    {log.charCount} Characters
                  </span>
                </div>
                
                {/* Delete Button */}
                <button 
                  onClick={() => handleDelete(log.id)}
                  className="text-red-400 hover:text-red-600 font-bold transition-colors"
                >
                  Delete
                </button>
              </div>
              <p className="text-gray-800 text-lg italic">"{log.message}"</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}