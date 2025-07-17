
CREATE TABLE Invoices (
  id SERIAL PRIMARY KEY,
  subscription_id INTEGER NOT NULL REFERENCES Subscriptions(id),
  amount NUMERIC(10, 2) NOT NULL,
  issue_date TIMESTAMP NOT NULL,
  due_date TIMESTAMP NOT NULL,
  payment_status VARCHAR(255) NOT NULL CHECK (payment_status IN ('pending', 'paid')),
  period_start_date TIMESTAMP NOT NULL,
  period_end_date TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
