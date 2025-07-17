
CREATE TABLE Subscriptions (
  id SERIAL PRIMARY KEY,
  plan_id INTEGER NOT NULL REFERENCES Plans(id),
  user_id INTEGER NOT NULL REFERENCES Users(id),
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP,
  status VARCHAR(255) NOT NULL CHECK (status IN ('active', 'cancelled', 'trial', 'past_due')),
  auto_renew BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
