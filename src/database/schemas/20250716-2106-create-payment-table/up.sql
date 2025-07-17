
CREATE TABLE Payments (
  id SERIAL PRIMARY KEY,
  invoice_id INTEGER NOT NULL REFERENCES Invoices(id),
  amount_paid NUMERIC(10, 2) NOT NULL,
  payment_date TIMESTAMP NOT NULL,
  payment_method VARCHAR(255) NOT NULL CHECK (payment_method IN ('credit_card', 'debit_card', 'cash', 'bank_transfer')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
