import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

    if (cart.length === 0) {
        return (
            <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
                <div style={{ marginBottom: '2rem', color: 'var(--color-text-secondary)' }}>
                    <ShoppingBag size={80} style={{ margin: '0 auto', opacity: 0.2 }} />
                </div>
                <h2>Your cart is empty</h2>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
                    It looks like you haven't added any items to your cart yet.
                </p>
                <Link to="/" className="btn btn-primary">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link to="/" style={{ color: 'var(--color-text-secondary)' }}><ArrowLeft size={24} /></Link>
                <h1 style={{ margin: 0 }}>Shopping Cart</h1>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', alignItems: 'start' }}>
                {/* Cart Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {cart.map((item) => (
                        <div key={`${item.type}-${item.id}`} className="card" style={{ display: 'flex', padding: '1rem', gap: '1.5rem', alignItems: 'center' }}>
                            <div style={{ width: '100px', height: '100px', backgroundColor: '#f3f4f6', borderRadius: '8px', overflow: 'hidden' }}>
                                <img src={item.image || item.image_url || 'https://via.placeholder.com/100'} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 600, textTransform: 'uppercase' }}>{item.type}</div>
                                <h3 style={{ margin: '0.25rem 0 0.5rem 0', fontSize: '1.1rem' }}>{item.name}</h3>
                                <div style={{ fontWeight: 600, color: 'var(--color-text)' }}>{item.price}</div>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: '#f9fafb', padding: '0.5rem', borderRadius: '8px' }}>
                                <button 
                                    onClick={() => updateQuantity(item.id, item.type, item.quantity - 1)}
                                    style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--color-text)' }}
                                >
                                    <Minus size={18} />
                                </button>
                                <span style={{ fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                <button 
                                    onClick={() => updateQuantity(item.id, item.type, item.quantity + 1)}
                                    style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--color-text)' }}
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                            
                            <button 
                                onClick={() => removeFromCart(item.id, item.type)}
                                style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#EF4444', padding: '0.5rem' }}
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                    
                    <button 
                        onClick={clearCart}
                        style={{ alignSelf: 'flex-start', border: 'none', background: 'none', color: '#EF4444', fontSize: '0.9rem', cursor: 'pointer', marginTop: '1rem' }}
                    >
                        Clear Shopping Cart
                    </button>
                </div>

                {/* Summary */}
                <div className="card" style={{ padding: '2rem', position: 'sticky', top: '2rem' }}>
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Order Summary</h2>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
                            <span>Subtotal</span>
                            <span>₹{cartTotal.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
                            <span>Delivery Fee</span>
                            <span style={{ color: '#10B981' }}>FREE</span>
                        </div>
                        <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '0.5rem 0' }}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 700 }}>
                            <span>Total</span>
                            <span>₹{cartTotal.toFixed(2)}</span>
                        </div>
                    </div>
                    
                    <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>
                        Proceed to Checkout
                    </button>
                    
                    <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                        Secure Payment Powered by TerraTech
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
