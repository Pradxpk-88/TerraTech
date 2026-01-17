import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, User, ShoppingBag, Sprout } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header style={{
            backgroundColor: 'var(--color-bg-secondary)',
            borderBottom: '1px solid var(--color-border)',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '4rem'
            }}>
                {/* Logo */}
                <Link to="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: 'var(--color-primary)'
                }}>
                    <Sprout size={32} />
                    <span>TerraTech</span>
                </Link>

                {/* Desktop Navigation */}
                <nav style={{ display: 'flex', gap: '2rem' }} className="desktop-nav">
                    <Link to="/rentals" style={{ fontWeight: 500 }}>Rentals</Link>
                    <Link to="/store" style={{ fontWeight: 500 }}>Farm Store</Link>
                    <Link to="/services" style={{ fontWeight: 500 }}>Services</Link>
                </nav>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button className="btn btn-outline" style={{ padding: '0.5rem' }}>
                        <ShoppingBag size={20} />
                    </button>

                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontWeight: 500 }}>{user.full_name || user.phone_number}</span>
                            <button onClick={logout} className="btn btn-outline" style={{ fontSize: '0.875rem', padding: '0.25rem 0.75rem' }}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                            <User size={20} />
                            <span style={{ marginLeft: '0.5rem' }}>Login</span>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
