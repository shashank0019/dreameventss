-- Seed Categories
INSERT INTO categories (id, name, description, created_at, updated_at)
VALUES 
(1, 'Weddings', 'Elegant custom designs, backdrop drapes, and luxury floral decors for weddings.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Birthdays', 'Colorful themed balloon decorations, table styling, and setups for all ages.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Corporate Events', 'Sleek, professional stage setups, photo walls, and registration area stylings.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Other Events', 'Bespoke decoration designs and styling setups for custom celebrations.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (name) DO NOTHING;

-- Seed Services (Updated with highly relevant visual images matching each label)
INSERT INTO services (id, title, description, image_url, public_id, created_at, updated_at)
VALUES
(1, 'Weddings', 'Elegant custom backdrop designs, floral walls, and luxury table styling for wedding celebrations.', 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80', 'dummy_wedding_service', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Birthdays', 'Vibrant themed balloon arches, photo backdrops, cake tables, and setups for all ages.', 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80', 'dummy_birthday_service', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Other Events', 'Bespoke decoration designs, lighting, and visual styling tailored for any custom party or event.', 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80', 'dummy_other_service', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  public_id = EXCLUDED.public_id,
  updated_at = CURRENT_TIMESTAMP;

-- Seed Testimonials
INSERT INTO testimonials (id, client_name, review_text, rating, event_type, client_image_url, client_image_public_id, created_at, updated_at)
VALUES
(1, 'Sophia Loren', 'Dream Events made our wedding look like a fairytale! The floral backdrop was jaw-dropping.', 5, 'Wedding Decoration', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', 'dummy_sophia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Marcus Brody', 'Flawless execution for our corporate gala. The stage design was exactly what we envisioned.', 5, 'Corporate Gala', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', 'dummy_marcus', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

-- Seed Contact Info
INSERT INTO contact_info (id, email, phone, address, instagram_url, facebook_url, whatsapp_number, google_maps_embed_url, created_at, updated_at)
VALUES
(1, 'bookings@dreamevents.com', '+1 (555) 123-4567', '456 Luxury Way, Design District, NY 10013', 'https://instagram.com/dreamevents', 'https://facebook.com/dreamevents', '+15551234567', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.617540455486!2d-73.98785312342345!3d40.74844047138307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

-- Seed Packages
INSERT INTO packages (id, name, description, price, tier, status, category_id, created_at, updated_at)
VALUES
(1, 'Silver Elegance Wedding', 'Includes custom backdrop, fairy lights styling, up to 10 standard table centerpieces, and basic arch design.', 1500.00, 'SILVER', 'ACTIVE', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Gold Luxury Wedding', 'Premium package: Full stage drapery, premium fresh flower installations, 15 luxury centerpieces, and custom photo booth corner.', 3500.00, 'GOLD', 'ACTIVE', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Themed Kids Balloon Party', 'Includes 1 large organic balloon arch, customized birthday signage, cake table decoration, and themed backdrop.', 800.00, 'BRONZE', 'ACTIVE', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

-- Synchronize sequences for IDENTITY columns
SELECT setval('categories_id_seq', COALESCE((SELECT MAX(id) FROM categories), 1));
SELECT setval('services_id_seq', COALESCE((SELECT MAX(id) FROM services), 1));
SELECT setval('testimonials_id_seq', COALESCE((SELECT MAX(id) FROM testimonials), 1));
SELECT setval('contact_info_id_seq', COALESCE((SELECT MAX(id) FROM contact_info), 1));
SELECT setval('packages_id_seq', COALESCE((SELECT MAX(id) FROM packages), 1));
