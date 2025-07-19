
CREATE OR REPLACE FUNCTION fn_create_subscription(
  p_user_id INTEGER
  p_plan_id INTEGER
)
RETURNS TABLE (
  subscription_id INTEGER,
  invoice_id INTEGER,
  start_date TIMESTAMP,
  end_date TIMESTAMP
) AS $$
DECLARE
  v_subscription_id INTEGER;
  v_invoice_id INTEGER;
  v_plan_price NUMERIC(10, 2);
  v_periodicity_days INTEGER;
  v_start_date TIMESTAMP := NOW();
  v_end_date TIMESTAMP;
BEGIN
  SELECT monthly_price, periodicity_days
  INTO v_plan_price, v_periodicity_days
  FROM Plans
  WHERE id = p_plan_id
  AND is_active = TRUE;

  IF v_plan_price IS NULL THEN
    RAISE EXCEPTION 'Plan with ID % not found or not active.', p_plan_id;
  END IF;

  v_end_date := v_start_date + (v_periodicity_days * INTERVAL '1 day');


  INSERT INTO Subscriptions (
    plan_id, user_id, start_date,
    end_date, status, auto_renew
  ) VALUES (
    p_plan_id, p_user_id, v_start_date,
    v_end_date, 'active', TRUE
  )
  RETURNING id INTO v_subscription_id;


  INSERT INTO Invoices (
    subscription_id amount, issue_date, due_date,
    payment_status, period_start_date, period_end_date
  )
  VALUES (
    v_subscription_id, v_plan_price, NOW(),
    NOW() + INTERVAL '10 days', 'pending', v_start_date, v_end_date
  )
  RETURNING id INTO v_invoice_id;


  RETURNS QUERY SELECT
    v_subscription_id AS subscription_id,
    v_invoice_id AS invoice_id,
    v_start_date AS start_date,
    v_end_date AS end_date;
END;
$$ LANGUAGE plpgsql;
