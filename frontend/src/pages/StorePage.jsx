import React from 'react';

const fertilizers = [
  { id: 1, name: 'Urea 46% N', price: '$25.00', description: 'High-nitrogen fertilizer for optimal plant growth.', image: 'https://images.unsplash.com/photo-1627920769941-4cb503cc0904?auto=format&fit=crop&q=80&w=400', brand: 'AgriCorp' },
  { id: 2, name: 'DAP (Diammonium Phosphate)', price: '$35.00', description: 'Provides excellent phosphorus and nitrogen for enhanced root development.', image: 'https://images.unsplash.com/photo-1599879708781-6fcc78d65c07?auto=format&fit=crop&q=80&w=400', brand: 'EcoFarms' },
  { id: 3, name: 'Potassium Chloride (MOP)', price: '$30.00', description: 'Essential for improving root growth and drought resistance in crops.', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=400', brand: 'NutriPlant' },
  { id: 4, name: 'NPK 15-15-15', price: '$40.00', description: 'Balanced fertilizer for general purpose farming and soil health.', image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=400', brand: 'AgriCorp' },
  { id: 5, name: 'Organic Compost Pile', price: '$15.00', description: '100% natural organic compost for sustainable and eco-friendly farming.', image: 'https://images.unsplash.com/photo-1588661730043-4dc9b32cb7c6?auto=format&fit=crop&q=80&w=400', brand: 'GreenEarth' },
  { id: 6, name: 'Calcium Nitrate', price: '$28.00', description: 'Prevents blossom-end rot and improves overall fruit quality.', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=400', brand: 'SoilBoost' }
];

const StorePage = () => {
    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <h1 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>Farm Store: Fertilizers</h1>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', maxWidth: '600px', fontSize: '1.1rem' }}>
                Browse our selection of high-quality fertilizers to maximize your crop yield and maintain healthy soil.
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {fertilizers.map(product => (
                    <div key={product.id} style={{
                        backgroundColor: 'var(--color-bg-secondary)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                        border: '1px solid var(--color-border)',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                    }}
                    >
                        <div style={{
                            height: '220px',
                            backgroundColor: '#f3f4f6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden'
                        }}>
                             <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{product.name}</h3>
                                <span style={{ fontWeight: 'bold', color: 'var(--color-primary)', fontSize: '1.2rem' }}>{product.price}</span>
                            </div>
                            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem', display: 'inline-block', backgroundColor: 'var(--color-bg-tertiary, rgba(0,0,0,0.05))', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                                {product.brand}
                            </span>
                            <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', flex: 1, color: 'var(--color-text)' }}>{product.description}</p>
                            <button className="btn btn-primary" style={{ width: '100%', fontWeight: 'bold' }}>Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StorePage;
