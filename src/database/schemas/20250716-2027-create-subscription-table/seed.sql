
INSERT INTO Subscriptions (plan_id, user_id, start_date, end_date, status, auto_renew) VALUES
-- Active subscriptions
(1, 1, '2024-01-15 10:00:00', NULL, 'active', TRUE),   -- Juan Perez, Basic Plan, active, auto-renew
(2, 2, '2024-02-01 11:30:00', NULL, 'active', TRUE),   -- Maria Gomez, Standard Plan, active, auto-renew
(3, 3, '2024-03-10 09:00:00', NULL, 'active', FALSE),  -- Carlos Ruiz, Premium Plan, active, no auto-renew
(1, 4, '2024-04-05 14:00:00', NULL, 'active', TRUE),   -- Ana Lopez, Basic Plan, active, auto-renew
(2, 5, '2024-05-20 16:00:00', NULL, 'active', FALSE),  -- Pedro Martinez, Standard Plan, active, no auto-renew

-- Trial subscriptions
(6, 6, '2025-07-10 08:00:00', '2025-07-17 08:00:00', 'trial', FALSE), -- Laura Sanchez, Free Trial, ends soon
(6, 7, '2025-07-15 13:00:00', '2025-07-22 13:00:00', 'trial', TRUE),  -- Diego Fernandez, Free Trial, auto-renews (to a paid plan, if logic exists)

-- Cancelled subscriptions
(3, 8, '2023-11-01 10:00:00', '2024-11-01 10:00:00', 'cancelled', FALSE), -- Sofia Diaz, Premium Plan, cancelled after a year
(4, 9, '2024-01-01 00:00:00', '2025-01-01 00:00:00', 'cancelled', FALSE), -- Gabriel Torres, Annual Basic, cancelled

-- Past Due subscriptions
(1, 10, '2024-06-01 09:00:00', NULL, 'past_due', TRUE); -- Valeria Morales, Basic Plan, past due
