"use client";
import React, { useState, useRef, useEffect } from 'react';

export default function StealthPortal() {
    const [stage, setStage] = useState<'404' | 'login'>('404');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const clickCount = useRef(0);
    const clickTimer = useRef<NodeJS.Timeout | null>(null);

    // Completely masquerade as a real Next.js 404 page for any snoops
    useEffect(() => {
        if (stage === '404') {
            document.title = "404: This page could not be found";
        }
    }, [stage]);

    // Tricky Secret Trigger: Click the 404 text 5 times rapidly
    const handleSecretTrigger = () => {
        clickCount.current += 1;

        if (clickTimer.current) clearTimeout(clickTimer.current);

        clickTimer.current = setTimeout(() => {
            clickCount.current = 0;
        }, 1500);

        if (clickCount.current >= 5) {
            setStage('login');
            clickCount.current = 0;
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Client-side quick filter (the real security block is inside the API route)
        if (username === 'johan' && password === 'johan@1606200607') {
            localStorage.setItem('lumefx_admin', 'true');
            window.location.href = '/';
        } else {
            setLoginError('Intruder Alert: Invalid credentials logged.');
        }
    };

    // 1. THE TRICKY 404 SCREEN
    if (stage === '404') {
        return (
            <div style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', margin: 0 }}>
                <div onClick={handleSecretTrigger} style={{ padding: '40px', cursor: 'default', userSelect: 'none' }}>
                    <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: '400', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                        <span style={{ borderRight: '1px solid #333', paddingRight: '20px', marginRight: '20px', fontWeight: '500' }}>404</span>
                        This page could not be found.
                    </h1>
                </div>
            </div>
        );
    }

    // 2. THE HIDDEN LOGIN SCREEN
    if (stage === 'login') {
        return (
            <div style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', margin: 0 }}>
                <form onSubmit={handleLogin} style={{ background: '#111', padding: '40px', borderRadius: '12px', border: '1px solid #222', width: '380px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.8)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <h2 style={{ color: '#fff', margin: 0, fontFamily: 'monospace', fontSize: '20px' }}>Admin.Auth_</h2>
                        <div style={{ width: '10px', height: '10px', background: '#ff3333', borderRadius: '50%', boxShadow: '0 0 10px #ff3333' }}></div>
                    </div>

                    {loginError && <p style={{ color: '#ff3333', fontSize: '13px', margin: 0, fontFamily: 'monospace' }}>{loginError}</p>}

                    <input type="text" placeholder="Access ID" value={username} onChange={e => setUsername(e.target.value)} style={{ padding: '14px', background: '#000', border: '1px solid #222', color: '#fff', borderRadius: '6px', fontFamily: 'monospace', outline: 'none' }} required />
                    <input type="password" placeholder="Passcode" value={password} onChange={e => setPassword(e.target.value)} style={{ padding: '14px', background: '#000', border: '1px solid #222', color: '#fff', borderRadius: '6px', fontFamily: 'monospace', outline: 'none' }} required />

                    <button type="submit" style={{ padding: '14px', background: '#fff', color: '#000', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px', transition: 'all 0.2s', fontFamily: 'system-ui' }}>
                        VERIFY CREDENTIALS
                    </button>
                </form>
            </div>
        );
    }

    // 3. THE ADMIN DASHBOARD
    return null;
}
