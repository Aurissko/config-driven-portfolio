import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Trash2, ShieldAlert, Linkedin, LogOut, Menu, X, MessageSquare } from 'lucide-react';

export default function AdminReferences() {
  const [references, setReferences] = useState([]);
  const [authStatus, setAuthStatus] = useState('loading'); // 'loading', 'authenticated', 'unauthenticated', 'forbidden'
  const [activeTab, setActiveTab] = useState('references');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchReferences = async () => {
    try {
      const res = await fetch('/api/references?admin=true');
      
      if (res.status === 401) {
        // Check if a cookie exists. If yes, it's the wrong email. If no, they need to log in.
        const hasCookie = document.cookie.includes('linkedin_user=');
        setAuthStatus(hasCookie ? 'forbidden' : 'unauthenticated');
        return;
      }
      
      if (res.ok) {
        const data = await res.json();
        setReferences(data);
        setAuthStatus('authenticated');
      }
    } catch (e) {
      console.error('Failed to fetch references', e);
      setAuthStatus('unauthenticated');
    }
  };

  useEffect(() => {
    fetchReferences();
  }, []);

  const handleUpdate = async (id, approved, action = 'update') => {
    try {
      const res = await fetch('/api/references', {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, approved, action })
      });
      if (res.ok) {
        fetchReferences(); // Refresh the list
      }
    } catch (e) {
      console.error("Failed to update reference", e);
    }
  };

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
    window.location.href = '/'; // Kick them back to the homepage
  };

  if (authStatus === 'loading') {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 text-center text-slate-400">
        Checking authorization...
      </div>
    );
  }

  if (authStatus === 'unauthenticated') {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <ShieldAlert className="text-blue-500" /> Admin Access
        </h2>
        <div className="text-center py-6">
          <p className="text-slate-400 mb-6">
            You must be logged in via LinkedIn to access the admin dashboard.
          </p>
          <button onClick={handleLogin} className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a66c2] hover:bg-[#004182] text-white font-medium rounded-lg transition-colors shadow-sm">
            <Linkedin className="w-5 h-5" />
            Sign in with LinkedIn
          </button>
        </div>
      </div>
    );
  }

  if (authStatus === 'forbidden') {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <ShieldAlert className="text-red-500" /> Access Denied
        </h2>
        <div className="text-center py-6">
          <p className="text-slate-400 mb-6">
            Your LinkedIn account is not authorized as an administrator.
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={handleLogout} className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors shadow-sm">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
            <a href="/" className="inline-flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm">
              Return
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col md:flex-row w-full min-h-screen bg-slate-50 dark:bg-slate-950 absolute inset-0 z-50">
      {/* Mobile menu overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Navigation Sidebar */}
      <aside className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} flex flex-col shadow-2xl md:shadow-none`}>
        <div className="p-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="text-blue-500 w-6 h-6" /> Admin Panel
          </h2>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button
            onClick={() => { setActiveTab('references'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'references' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 font-medium' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'}`}
          >
            <MessageSquare className="w-5 h-5" /> 
            References
          </button>
          
          {/* Placeholder for future features */}
          <div className="px-4 py-3 text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold mt-4">
            Coming Soon
          </div>
          <div className="px-4 py-2 text-sm text-slate-400 dark:text-slate-600 flex items-center gap-3 opacity-50 cursor-not-allowed">
            <div className="w-5 h-5 border border-dashed border-slate-400 dark:border-slate-600 rounded flex-shrink-0"></div> Config Editor
          </div>
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors font-medium">
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header Menu */}
        <header className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 flex items-center gap-3 sticky top-0 z-30 shadow-sm">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="font-bold text-slate-900 dark:text-white capitalize">{activeTab}</h1>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 w-full relative">
          {activeTab === 'references' && (
            <div className="max-w-5xl mx-auto animate-fade-in-up pb-20">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Reference Approvals</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage, approve, or delete peer feedback and testimonials.</p>
              </div>
              
              <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-2xl">
                <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
                  <thead className="bg-slate-50 dark:bg-slate-950/80 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-4 font-medium">User</th>
                      <th className="p-4 font-medium">Comment</th>
                      <th className="p-4 font-medium">Date</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800/50">
                    {references.map(ref => (
                      <tr key={ref.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="p-4 align-top sm:align-middle">
                          <div className="flex items-center gap-3">
                            {ref.picture ? <img src={ref.picture} alt={ref.name} className="w-9 h-9 rounded-full object-cover shadow-sm" /> : <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500">?</div>}
                            <div>
                              <div className="font-medium text-slate-900 dark:text-slate-200">{ref.name}</div>
                              <div className="text-xs text-slate-500">{ref.email || 'No email'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 max-w-xs md:max-w-md align-top sm:align-middle">
                          <p className="line-clamp-3 text-slate-600 dark:text-slate-400 leading-relaxed" title={ref.comment}>{ref.comment}</p>
                        </td>
                        <td className="p-4 whitespace-nowrap text-xs text-slate-500 align-top sm:align-middle">
                          {new Date(ref.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-4 align-top sm:align-middle">
                          {ref.approved ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-500/20">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-right align-top sm:align-middle">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleUpdate(ref.id, !ref.approved)}
                              className={`p-2 rounded-lg transition-colors border shadow-sm ${ref.approved ? 'text-yellow-600 dark:text-yellow-500 border-yellow-200 dark:border-yellow-500/20 hover:bg-yellow-50 dark:hover:bg-yellow-500/10' : 'text-green-600 dark:text-green-500 border-green-200 dark:border-green-500/20 hover:bg-green-50 dark:hover:bg-green-500/10'}`}
                              title={ref.approved ? "Revoke Approval" : "Approve"}
                            >
                              {ref.approved ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                            </button>
                            <button 
                              onClick={() => { if(window.confirm('Are you sure you want to completely delete this reference?')) handleUpdate(ref.id, false, 'delete') }}
                              className="p-2 rounded-lg text-red-600 dark:text-red-500 border border-red-200 dark:border-red-500/20 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors shadow-sm"
                              title="Delete Permanently"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {references.length === 0 && (
                  <div className="p-12 text-center text-slate-500">
                    No references found in the database.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}