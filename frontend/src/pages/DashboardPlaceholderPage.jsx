import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FormaLogo } from '../components/ui/FormaLogo'
import { Button } from '../components/ui/Button'
import { ShieldCheck, LogOut, Clock, Mail, Sparkles } from 'lucide-react'

export const DashboardPlaceholderPage = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U'

  return (
    <div className="min-h-screen w-full bg-[#09090b] text-[#fbf9f5] flex flex-col">
      {/* Top Navigation */}
      <header className="w-full border-b border-[rgba(244,240,232,0.08)] bg-[#0c0c10]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <FormaLogo size="md" showTagline />

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#14141a] border border-[rgba(244,240,232,0.06)]">
            <div className="w-6 h-6 rounded-full bg-[#ff6326] text-white flex items-center justify-center text-xs font-bold font-mono">
              {initials}
            </div>
            <span className="text-xs text-[#dcd7ce] font-medium">{user?.email}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-[#9c978e] hover:text-white"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign out</span>
          </Button>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 sm:p-10 flex flex-col gap-8 justify-center">
        {/* Welcome Card */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-[#121217] via-[#101014] to-[#0c0c10] border border-[rgba(244,240,232,0.1)] shadow-2xl relative overflow-hidden text-left">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff6326]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-[#ff6326] bg-[#ff6326]/10 border border-[#ff6326]/20 w-fit">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Authentication Module Active</span>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#fbf9f5] font-['Space_Grotesk']">
                Welcome, {user?.name || 'Creator'}.
              </h1>
              <p className="text-sm text-[#9c978e] leading-relaxed max-w-2xl">
                Your account authentication session is active, protected by Argon2id cryptographic hashing and secure HttpOnly SameSite cookies.
              </p>
            </div>

            {/* User Meta Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-lg bg-[#0b0b0e] border border-[rgba(244,240,232,0.06)] flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#ff6326]" />
                <div className="flex flex-col">
                  <span className="text-[11px] text-[#635f58] uppercase tracking-wider font-semibold">Email</span>
                  <span className="text-xs text-[#fbf9f5] font-medium truncate max-w-[170px]">{user?.email}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#0b0b0e] border border-[rgba(244,240,232,0.06)] flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <div className="flex flex-col">
                  <span className="text-[11px] text-[#635f58] uppercase tracking-wider font-semibold">Status</span>
                  <span className="text-xs text-emerald-400 font-medium">Verified &amp; Active</span>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#0b0b0e] border border-[rgba(244,240,232,0.06)] flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#dcd7ce]" />
                <div className="flex flex-col">
                  <span className="text-[11px] text-[#635f58] uppercase tracking-wider font-semibold">Session</span>
                  <span className="text-xs text-[#dcd7ce] font-medium">Server Managed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phase Scope Notice Card */}
        <div className="p-6 rounded-xl bg-[#0f0f14] border border-[rgba(244,240,232,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-[#ff6326]/10 border border-[#ff6326]/30 flex items-center justify-center text-[#ff6326] flex-shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold text-[#fbf9f5]">Workspace In Development</h3>
              <p className="text-xs text-[#9c978e] leading-relaxed max-w-xl">
                The primary FORMA AI website generator, visual canvas editor, and prompt synthesis engine will be deployed in the next project milestone.
              </p>
            </div>
          </div>

          <Button variant="secondary" size="sm" onClick={handleLogout} className="flex-shrink-0 text-xs">
            Sign out
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[rgba(244,240,232,0.06)] py-6 text-center text-xs text-[#635f58]">
        FORMA &bull; Give thought its form. &bull; Secure Authentication Module
      </footer>
    </div>
  )
}
