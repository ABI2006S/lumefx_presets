import React, { useState } from 'react';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onContinue: (formData: { name: string; email: string; dream: string; state: string; }) => void;
}

export default function CheckoutModal({ isOpen, onClose, onContinue }: CheckoutModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        dream: 'Content Creator',
        state: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onContinue(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content animate-fade-in">
                <button className="modal-close" onClick={onClose}>&times;</button>

                <div className="modal-header">
                    <h3>Almost there!</h3>
                    <p>Complete your details to access the bundle.</p>
                </div>

                <form onSubmit={handleSubmit} className="checkout-form">
                    <div className="form-group">
                        <label htmlFor="name">Name <span className="required">*</span></label>
                        <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email <span className="required">*</span></label>
                        <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dream">Dream to Become <span className="required">*</span></label>
                        <select id="dream" name="dream" value={formData.dream} onChange={handleChange} required>
                            <option value="Content Creator">Content Creator</option>
                            <option value="Video Editor">Video Editor</option>
                            <option value="Filmmaker">Filmmaker</option>
                            <option value="YouTuber">YouTuber</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="state">State <span className="required">*</span></label>
                        <input type="text" id="state" name="state" required value={formData.state} onChange={handleChange} placeholder="e.g. Maharashtra" />
                    </div>

                    <button type="submit" className="btn-primary modal-btn">
                        Continue to Secure Checkout
                    </button>
                </form>
            </div>
        </div>
    );
}
