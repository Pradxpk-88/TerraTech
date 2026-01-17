import React, { useState, useEffect } from 'react';
import api from '../services/api';
import EquipmentCard from '../components/equipment/EquipmentCard';
import { Search, Filter, Tractor } from 'lucide-react';

const RentalsPage = () => {
    const [equipment, setEquipment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({ category: '', location: '' });

    useEffect(() => {
        fetchEquipment();
    }, [filters]);

    const fetchEquipment = async () => {
        try {
            setLoading(true);
            // Construct query params
            const params = new URLSearchParams();
            if (filters.category) params.append('category', filters.category);

            const { data } = await api.get(`/equipment?${params.toString()}`);
            setEquipment(data.data);
        } catch (err) {
            console.error(err);
            // Fallback mock data for demo purposes if backend fails
            setEquipment([
                {
                    id: 1,
                    name: 'John Deere 5105',
                    category: 'Tractor',
                    rental_price_per_day: '1200',
                    operational_location: 'Coimbatore, TN',
                    description: '40HP Tractor suitable for all general farming purpose. Comes with Rotavator attachment.'
                },
                {
                    id: 2,
                    name: 'DJI Agras T10 Drone',
                    category: 'Drone',
                    rental_price_per_day: '2500',
                    operational_location: 'Erode, TN',
                    description: 'Precision spraying drone. 10L payload tank. Covers 15 acres per hour.'
                },
                {
                    id: 3,
                    name: 'Kubota Harvester',
                    category: 'Harvester',
                    rental_price_per_day: '4000',
                    operational_location: 'Salem, TN',
                    description: 'Combine harvester for paddy and corn. Operator included.'
                }
            ]);
            setError('Could not connect to server. Showing demo data.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            {/* Header Section */}
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Equipment Rentals</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Find and rent the best machinery for your farm</p>
                </div>

                {/* Search/Filter Bar */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={20} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
                        <input
                            type="text"
                            placeholder="Search equipment..."
                            style={{
                                padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                                border: '1px solid var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                minWidth: '250px'
                            }}
                        />
                    </div>
                    <button className="btn btn-outline" style={{ gap: '0.5rem' }}>
                        <Filter size={18} /> Filters
                    </button>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div style={{ backgroundColor: '#FFF7ED', color: '#C2410C', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid #FFEDD5' }}>
                    ⚠️ {error}
                </div>
            )}

            {/* Categories */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {['All', 'Tractor', 'Harvester', 'Drone', 'Tiller', 'Trailer'].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilters(prev => ({ ...prev, category: cat === 'All' ? '' : cat }))}
                        className={filters.category === cat || (cat === 'All' && !filters.category) ? 'btn btn-primary' : 'btn btn-outline'}
                        style={{ padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap' }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem' }}>Loading equipment...</div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {equipment.map(item => (
                        <EquipmentCard key={item.id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default RentalsPage;
