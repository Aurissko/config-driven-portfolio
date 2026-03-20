import React, { useState, useEffect } from 'react';
import SectionHeading from '../common/SectionHeading';
import { User, CheckCircle2, MessageSquare, ExternalLink, Linkedin, Send, LogOut, X, Edit2 } from 'lucide-react';
import { references as staticReferences } from '../../utils/dataLoader';

export default function References() {
  const [user, setUser] = useState(null);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [liveReferences, setLiveReferences] = useState([]);

  // Check for existing login session on mount
  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )linkedin_user=([^;]*)/);
    if (match) {
      try {
        const cookieData = JSON.parse(decodeURIComponent(match[1]));
        setUser(cookieData.payload || cookieData); // Fallback allows old unsigned cookies to log out gracefully
      } catch (e) {
        console.error("Failed to parse user cookie", e);
      }
    }

    // Auto-open modal if returning from LinkedIn auth
    if (window.location.search.includes('action=leave-reference')) {
      setIsModalOpen(true);
      // Clean the URL without triggering a page reload
      const newUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, '', newUrl);
    }

    // Fetch live references from the D1 Database
    fetch('/api/references')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setLiveReferences(data);
      })
      .catch(err => console.error("Failed to load live references", err));
  }, []);

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/linkedin/login', { headers: { 'Accept': 'application/json' } });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (e) {
      console.error("Failed to initiate login", e);
    }
  };

  const handleLogout = () => {
    document.cookie = "linkedin_user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    setUser(null);
    setStatus('idle');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/references', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment })
      });
      if (res.ok) {
        const data = await res.json();
        setStatus(data.approved ? 'success_approved' : 'success_pending');
        setComment('');
        
        if (data.approved) {
          // Instantly add the new comment to the UI without refreshing the page only if approved
          const newRef = {
            name: user.name,
            picture: user.picture,
            comment: comment.trim(),
            role: "Verified Member",
          };
          // Filter out any previous comments by this user so they don't visually stack up!
          setLiveReferences(prev => [newRef, ...prev.filter(r => r.name !== user.name)]);
        }

        // Auto-close modal after success message
        setTimeout(() => {
          setIsModalOpen(false);
          setStatus('idle');
        }, 3500); // Give them an extra second to read the pending message
      } else throw new Error();
    } catch (e) {
      setStatus('error');
    }
  };

  // Combine the hardcoded JSON references with the dynamic database references
  const displayReferences = [...liveReferences, ...staticReferences];

  return (
    <section id="references">
      <SectionHeading title="Peer Feedback" />
      
      {/* Button to open the Modal */}
      <div className="flex justify-start mb-8 -mt-2">
        <button
          onClick={() => {
            if (user) {
              const existingRef = displayReferences.find(r => r.name === user.name);
              setComment(existingRef ? existingRef.comment : '');
            } else {
              setComment('');
            }
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600/10 hover:bg-blue-600/20 text-blue-700 dark:text-blue-400 font-medium rounded-lg transition-colors border border-blue-600/20 text-sm"
        >
          <MessageSquare className="w-4 h-4" />
          Leave a Recommendation
        </button>
      </div>

      {displayReferences && displayReferences.length > 0 && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayReferences.map((ref, idx) => (
          <div 
            key={idx} 
            className="group flex flex-col bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          >
            {/* GitHub-style PR Comment Header */}
            <div className="flex items-start sm:items-center justify-between px-4 py-3 bg-slate-100/60 dark:bg-slate-800/50 border-b border-black/5 dark:border-white/10 flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-white dark:bg-slate-700 rounded-full shadow-sm border border-slate-200 dark:border-slate-600 flex-shrink-0 overflow-hidden flex items-center justify-center w-8 h-8">
                  {ref.picture ? (
                    <img src={ref.picture} alt={ref.name} className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <User className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  )}
                </div>
                <div className="font-mono text-sm tracking-tight">
                  <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-semibold">
                    {ref.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {ref.role || "Verified"} {ref.company ? `@ ${ref.company}` : "via LinkedIn"}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {user && user.name === ref.name && (
                  <button
                    onClick={() => {
                      setComment(ref.comment);
                      setIsModalOpen(true);
                    }}
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-md hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors shadow-sm w-full sm:w-auto flex-shrink-0"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                )}
                {ref.linkedInUrl && (
                  <a href={ref.linkedInUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm w-full sm:w-auto flex-shrink-0">
                    <ExternalLink className="w-3 h-3" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
            
            {/* Interactive Comment Body */}
            <div 
              className={`p-5 font-sans text-sm leading-relaxed relative flex-grow transition-colors ${user && user.name === ref.name ? 'cursor-pointer hover:bg-blue-50/50 dark:hover:bg-blue-900/10 text-slate-700 dark:text-slate-200' : 'bg-white/20 dark:bg-slate-900/20 text-slate-600 dark:text-slate-300'}`}
              onClick={() => {
                if (user && user.name === ref.name) {
                  setComment(ref.comment);
                  setIsModalOpen(true);
                }
              }}
              title={user && user.name === ref.name ? "Click to edit your recommendation" : ""}
            >
              <MessageSquare className="absolute top-4 left-4 w-8 h-8 text-slate-200 dark:text-slate-700 opacity-30 z-0 pointer-events-none" />
              <p className="relative z-10 italic">"{ref.comment}"</p>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Leave a Reference Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl relative animate-fade-in-up max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-6 md:p-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                {user && displayReferences.some(r => r.name === user.name) ? 'Edit Recommendation' : 'Leave a Recommendation'}
              </h3>
              
              {!user ? (
                <div className="text-center py-6">
                  <p className="text-slate-600 dark:text-slate-400 mb-6">Connect with LinkedIn to verify your identity and leave a recommendation.</p>
                  <button onClick={handleLogin} className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a66c2] hover:bg-[#004182] text-white font-medium rounded-lg transition-colors shadow-sm">
                    <Linkedin className="w-5 h-5" />
                    Sign in with LinkedIn
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                      {user.picture ? (
                        <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white text-sm">{user.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{user.email}</div>
                      </div>
                    </div>
                    <button type="button" onClick={handleLogout} className="text-xs flex items-center gap-1 text-slate-500 hover:text-red-500 transition-colors">
                      <LogOut className="w-3 h-3" /> Logout
                    </button>
                  </div>
                  
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your recommendation here..."
                    className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-[120px] transition-all"
                    disabled={status === 'submitting' || status.startsWith('success')}
                  />
                  
                  {status === 'success_approved' && <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/50 rounded-lg text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Submitted successfully!</div>}
                  {status === 'success_pending' && <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800/50 rounded-lg text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Submitted! It will appear once approved by the admin.</div>}
                  {status === 'error' && <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/50 rounded-lg text-sm">Something went wrong. Please try again.</div>}

                  <div className="flex justify-end mt-2">
                    <button type="submit" disabled={status === 'submitting' || status.startsWith('success') || !comment.trim()} className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all shadow-sm">
                      {status === 'submitting' ? 'Submitting...' : (user && displayReferences.some(r => r.name === user.name) ? 'Update' : 'Submit')}
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}