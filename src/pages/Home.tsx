import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Home() {
  const [text, setText] = useState('');

  const handleSubmit = async () => {
    // 1. Logic check: button won't fire unless length is > 10
    if (text.length <= 10) return;

    try {
      await addDoc(collection(db, "submissions"), {
        message: text,
        charCount: text.length,
        createdAt: serverTimestamp(),
      });

      // 2. Clear the text entry box immediately after success
      setText(''); 
      
      // 3. Removed the alert() browser notification per your request
      console.log("Data saved successfully"); 
      
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="w-full h-[70vh] flex flex-col justify-center items-center">
      <div className="w-full max-w-5xl px-4">
        <h1 className="text-5xl font-extrabold mb-4 text-slate-800">New Entry</h1>
        <p className="text-slate-500 mb-6 text-lg">Type 11 or more characters to enable the submit button.</p>
        
        <textarea 
          className="w-full h-80 p-6 text-2xl border-2 border-slate-200 rounded-3xl shadow-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all resize-none"
          placeholder="Start typing..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        
        <div className="mt-8 flex justify-end">
          {/* 1. Blue when active, grey when disabled. 
            The 'disabled' attribute handles the unclickable state.
          */}
          <button 
            onClick={handleSubmit}
            disabled={text.length <= 10}
            className={`px-12 py-5 rounded-2xl font-bold text-white text-xl shadow-lg transition-all active:scale-95 
              ${text.length > 10 
                ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer shadow-blue-200' 
                : 'bg-slate-300 cursor-not-allowed shadow-none'
              }`}
          >
            Submit Message
          </button>
        </div>
      </div>
    </div>
  );
}