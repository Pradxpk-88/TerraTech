import React from 'react';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

const EquipmentCard = ({ item }) => {
    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '0', overflow: 'hidden' }}>
            {/* Image / Placeholder */}
            <div style={{
                height: '200px',
                backgroundColor: '#e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
            }}>
                {item.images && item.images.length > 0 ? (
                    <img src={item.images[0]} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <span style={{ color: '#94a3b8', fontWeight: 500 }}>No Image Available</span>
                )}

                <div style={{
                    position: 'absolute',
                    top: '0.75rem',
                    right: '0.75rem',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--color-primary-dark)'
                }}>
                    {item.category}
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: 'auto' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{item.name}</h3>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', marginBottom: '1rem', fontSize: '0.875rem' }}>
                        <MapPin size={16} />
                        <span>{item.operational_location || 'Location not specified'}</span>
                    </div>

                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '1rem' }}>
                        {item.description || 'No description provided for this equipment.'}
                    </p>
                </div>

                {/* Price & Action */}
                <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Day Rate</div>
                        <div style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '1.125rem' }}>
                            ₹{item.rental_price_per_day}/day
                        </div>
                    </div>
                    <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                        Rent <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EquipmentCard;
