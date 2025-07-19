
CREATE OR REPLACE FUNCTION fn_cancel_subscription(
  p_subscription_id INTEGER
)
RETURNS VOID AS $$
DECLARE
  v_current_status VARCHAR(255);
  v_subscription_exists BOOLEAN;
BEGIN
  SELECT TRUE, status
  INTO v_subscription_exists, v_current_status
  FROM Subscriptions
  WHERE id = p_subscription_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Subscription with ID % not found.', p_subscription_id;
  END IF;

  IF v_current_status = 'cancelled' THEN
    RAISE EXCEPTION 'Subscription with ID % is already cancelled. No action required.', p_subscription_id;
  END IF;

  UPDATE Subscriptions
  SET
    status = 'cancelled',
    end_date = NOW(),
    updated_at = NOW()
  WHERE
    id = p_subscription_id;

  IF FOUND THEN
    RAISE LOG 'Subscription with ID % successfully cancelled and updated.', p_subscription_id;
  ELSE
    RAISE LOG 'Update did not affect any row for ID %', p_subscription_id;
  END IF;
END;
$$ LANGUAGE plpgsql;
