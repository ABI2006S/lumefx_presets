"use client";
import React, { useState, useEffect, useRef } from 'react';

interface AdminEditableProps {
    exactPath: string; // e.g. /assets/previews/presets/preset-preview.jpg
    children: React.ReactNode;
}

export default function AdminEditableAsset({ exactPath, children }: AdminEditableProps) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [refreshKey, setRefreshKey] = useState(Date.now());
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Only render the edit capabilities if the lumefx_admin token evaluates to true on load
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsAdmin(localStorage.getItem('lumefx_admin') === 'true');
        }
    }, []);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);

        const formData = new FormData();
        // Feed the hardcoded credentials to the API automatically purely to satisfy the backend
        formData.append('username', 'johan');
        formData.append('password', 'johan@1606200607');
        formData.append('file', file);
        formData.append('exactPath', exactPath);

        try {
            const res = await fetch('/api/stealth-upload', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();

            if (data.success) {
                // Force a re-render of the wrapped child to fetch the updated image source over the network
                setRefreshKey(Date.now());
                alert('Success! Image replaced in code.');
            } else {
                alert('Upload Error: ' + data.error);
            }
        } catch (error) {
            alert('Upload failed. Check server connection.');
        } finally {
            setIsUploading(false);
        }
    };

    if (!isAdmin) {
        return <>{children}</>;
    }

    return (
        <div
            style={{ position: 'relative', width: '100%', height: '100%', cursor: 'pointer' }}
            title={`Replace file: ${exactPath}`}
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept="image/*,video/*"
            />

            {/* The actual component content (like Next.js Image or Video) */}
            <div key={refreshKey} style={{ width: '100%', height: '100%' }}>
                {children}
            </div>

            {/* The Secret Editable Overlay */}
            <div
                onClick={() => fileInputRef.current?.click()}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: isUploading ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.2s',
                    zIndex: 50
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                onMouseLeave={e => e.currentTarget.style.opacity = '0'}
            >
                <div style={{
                    background: '#00ffcc',
                    color: '#000',
                    padding: '10px 20px',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    {isUploading ? 'UPLOADING...' : (
                        <>
                            <span>✏️</span> EDIT ASSET
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
