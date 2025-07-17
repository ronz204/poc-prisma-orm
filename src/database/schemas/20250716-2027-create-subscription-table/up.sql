
CREATE TABLE Subscriptions (
  id SERIAL PRIMARY KEY,
  plan_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP,
  status VARCHAR(255) NOT NULL CHECK (status IN ('active', 'cancelled', 'trial', 'past_due')),
  auto_renew BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

  CONSTRAINT fk_subscription_plan
    FOREIGN KEY (plan_id)
    REFERENCES Plans(id)
    ON DELETE RESTRICT ON UPDATE CASCADE,

  CONSTRAINT fk_subscription_user
    FOREIGN KEY (user_id)
    REFERENCES Users(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);
