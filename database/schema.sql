-- Agricultural Platform Database Schema
-- Supports 19+ Modules including Rental, E-commerce, AI Prediction, and Add-ons

-- 1. USERS & AUTHENTICATION
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    password_hash VARCHAR(255), -- For fallback, primarily OTP used
    role VARCHAR(20) DEFAULT 'farmer', -- farmer, vendor, admin, expert, agent
    language_preference VARCHAR(10) DEFAULT 'en',
    profile_image_url TEXT,
    location_lat DECIMAL(10, 8),
    location_lng DECIMAL(11, 8),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE farmer_profiles (
    user_id INTEGER PRIMARY KEY REFERENCES users(id),
    land_size_acres DECIMAL(5, 2),
    primary_crop_types TEXT[], -- Array of crops grown
    soil_type VARCHAR(50),
    irrigation_source VARCHAR(50)
);

CREATE TABLE vendor_profiles (
    user_id INTEGER PRIMARY KEY REFERENCES users(id),
    business_name VARCHAR(100),
    gst_number VARCHAR(20),
    verified BOOLEAN DEFAULT FALSE
);

-- 2. EQUIPMENT RENTAL MARKETPLACE
CREATE TABLE equipment (
    id SERIAL PRIMARY KEY,
    vendor_id INTEGER REFERENCES users(id),
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL, -- Tractor, Harvester, Drone, etc.
    description TEXT,
    rental_price_per_hour DECIMAL(10, 2),
    rental_price_per_day DECIMAL(10, 2),
    images TEXT[],
    is_available BOOLEAN DEFAULT TRUE,
    operational_location VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE equipment_bookings (
    id SERIAL PRIMARY KEY,
    equipment_id INTEGER REFERENCES equipment(id),
    farmer_id INTEGER REFERENCES users(id),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, active, completed, cancelled
    delivery_type VARCHAR(20), -- pickup, delivery
    payment_status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. FARM SUPPLIES STORE
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    vendor_id INTEGER REFERENCES users(id),
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL, -- Seeds, Fertilizers, Pesticides
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    images TEXT[],
    usage_instructions TEXT,
    suitable_crops TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE supply_orders (
    id SERIAL PRIMARY KEY,
    farmer_id INTEGER REFERENCES users(id),
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'processing',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES supply_orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price_at_booking DECIMAL(10, 2) NOT NULL
);

-- 4. AI CROP DISEASE PREDICTION
CREATE TABLE disease_predictions (
    id SERIAL PRIMARY KEY,
    farmer_id INTEGER REFERENCES users(id),
    image_url TEXT NOT NULL,
    predicted_disease VARCHAR(100),
    confidence_score DECIMAL(5, 2),
    severity_level VARCHAR(20),
    recommended_treatment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. PRODUCE MANAGE (FARM-TO-MARKET)
CREATE TABLE produce_listings (
    id SERIAL PRIMARY KEY,
    farmer_id INTEGER REFERENCES users(id),
    crop_name VARCHAR(50) NOT NULL,
    variety VARCHAR(50),
    quantity_kg DECIMAL(10, 2) NOT NULL,
    price_per_kg DECIMAL(10, 2),
    harvest_date DATE,
    description TEXT,
    images TEXT[],
    status VARCHAR(20) DEFAULT 'active', -- active, sold, expired
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. DYNAMIC PRICE ALERTS
CREATE TABLE price_alerts (
    id SERIAL PRIMARY KEY,
    farmer_id INTEGER REFERENCES users(id),
    crop_name VARCHAR(50) NOT NULL,
    target_price DECIMAL(10, 2),
    mandi_location VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. BULK & GROUP BUYING
CREATE TABLE buying_groups (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER REFERENCES users(id),
    name VARCHAR(100),
    location VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE group_members (
    group_id INTEGER REFERENCES buying_groups(id),
    farmer_id INTEGER REFERENCES users(id),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (group_id, farmer_id)
);

CREATE TABLE group_orders (
    id SERIAL PRIMARY KEY,
    group_id INTEGER REFERENCES buying_groups(id),
    product_id INTEGER REFERENCES products(id),
    target_quantity INTEGER,
    current_quantity INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'open',
    deadline TIMESTAMP
);

-- 11. FARM EXPENSE & YIELD TRACKER
CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    farmer_id INTEGER REFERENCES users(id),
    category VARCHAR(50) NOT NULL, -- Rent, Seeds, Labor, etc.
    amount DECIMAL(10, 2) NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    notes TEXT
);

CREATE TABLE crop_yields (
    id SERIAL PRIMARY KEY,
    farmer_id INTEGER REFERENCES users(id),
    crop_name VARCHAR(50),
    area_sown_acres DECIMAL(5, 2),
    harvested_amount_kg DECIMAL(10, 2),
    season_year VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 12. WEATHER ALERTS (Log)
CREATE TABLE weather_alerts (
    id SERIAL PRIMARY KEY,
    location_key VARCHAR(100),
    alert_type VARCHAR(50), -- Rain, Frost, Heatwave
    severity VARCHAR(20),
    message TEXT,
    valid_from TIMESTAMP,
    valid_until TIMESTAMP
);

-- 13. EXPERT CONNECT
CREATE TABLE experts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    specialization VARCHAR(100),
    experience_years INTEGER,
    consultation_fee DECIMAL(10, 2),
    rating DECIMAL(3, 2) DEFAULT 0.0
);

CREATE TABLE consultations (
    id SERIAL PRIMARY KEY,
    expert_id INTEGER REFERENCES experts(id),
    farmer_id INTEGER REFERENCES users(id),
    scheduled_at TIMESTAMP,
    status VARCHAR(20) DEFAULT 'scheduled',
    payment_status VARCHAR(20) DEFAULT 'pending',
    notes TEXT
);

-- 14. COMMUNITY & REVIEWS
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    reviewer_id INTEGER REFERENCES users(id),
    target_type VARCHAR(20), -- equipment, product, expert
    target_id INTEGER,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE discussions (
    id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES users(id),
    title VARCHAR(200),
    content TEXT,
    tags TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 15. INSURANCE
CREATE TABLE insurance_policies (
    id SERIAL PRIMARY KEY,
    booking_id INTEGER REFERENCES equipment_bookings(id),
    policy_provider VARCHAR(100),
    premium_amount DECIMAL(10, 2),
    coverage_amount DECIMAL(10, 2),
    status VARCHAR(20) DEFAULT 'active'
);

CREATE TABLE insurance_claims (
    id SERIAL PRIMARY KEY,
    policy_id INTEGER REFERENCES insurance_policies(id),
    farmer_id INTEGER REFERENCES users(id),
    incident_date DATE,
    description TEXT,
    evidence_images TEXT[],
    claim_amount DECIMAL(10, 2),
    status VARCHAR(20) DEFAULT 'submitted',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 17. GOVERNMENT SCHEMES
CREATE TABLE schemes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    eligibility_criteria JSONB, -- Flexible JSON for diverse criteria
    benefits TEXT,
    official_link TEXT,
    deadline DATE
);

CREATE TABLE scheme_applications (
    id SERIAL PRIMARY KEY,
    scheme_id INTEGER REFERENCES schemes(id),
    farmer_id INTEGER REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'draft',
    documents_submitted JSONB,
    applied_at TIMESTAMP
);

-- 18. SUBSCRIPTIONS
CREATE TABLE subscription_plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    type VARCHAR(50), -- seasonal_kit, monthly_fertilizer
    price DECIMAL(10, 2),
    duration_months INTEGER,
    features TEXT[]
);

CREATE TABLE user_subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    plan_id INTEGER REFERENCES subscription_plans(id),
    start_date DATE DEFAULT CURRENT_DATE,
    end_date DATE,
    status VARCHAR(20) DEFAULT 'active'
);

-- 19. REPAIR & MAINTENANCE
CREATE TABLE repair_requests (
    id SERIAL PRIMARY KEY,
    farmer_id INTEGER REFERENCES users(id),
    equipment_model VARCHAR(100),
    issue_description TEXT,
    images TEXT[],
    technician_id INTEGER REFERENCES users(id), -- If technician is a user type
    scheduled_at TIMESTAMP,
    status VARCHAR(20) DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
