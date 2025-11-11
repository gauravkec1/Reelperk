-- Sample Data for Testing
-- Run this after migrations

-- Sample Restaurant
INSERT INTO restaurants (id, name, address, phone, email, check_in_latitude, check_in_longitude, check_in_radius, is_active)
VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'ReelPerk Café', '123 Main Street, City', '+91-9876543210', 'cafe@reelperk.in', 28.6139, 77.2090, 100, true)
ON CONFLICT DO NOTHING;

-- Sample Owner User
INSERT INTO users (id, name, email, phone, password, role, restaurant_id, is_active)
VALUES 
('660e8400-e29b-41d4-a716-446655440000', 'John Owner', 'owner@reelperk.in', '+91-9876543210', '$2a$10$rOzJqZqZqZqZqZqZqZqZqOqZqZqZqZqZqZqZqZqZqZqZqZqZqZq', 'owner', '550e8400-e29b-41d4-a716-446655440000', true)
ON CONFLICT DO NOTHING;

-- Sample Employee
INSERT INTO employees (id, restaurant_id, name, email, phone, role, salary, is_active)
VALUES 
('770e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', 'Jane Staff', 'staff@reelperk.in', '+91-9876543211', 'waiter', 25000, true)
ON CONFLICT DO NOTHING;

-- Sample Menu Items
INSERT INTO menu_items (id, restaurant_id, name, description, price, category, is_available)
VALUES 
('880e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', 'Cappuccino', 'Rich espresso with steamed milk', 150, 'Beverages', true),
('990e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', 'Chocolate Cake', 'Decadent chocolate cake', 200, 'Desserts', true)
ON CONFLICT DO NOTHING;

