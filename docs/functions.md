**FN-001: Create Subscription Function** `fn_create_subscription`

**Description:** This function handles setting up a new subscription for a given user and plan. It automatically calculates the end date for the first period and generates the initial invoice.


**FN-002: Cancel Subscription Function** `fn_cancel_subscription`

**Description:** This allows us to end an existing subscription. It updates the subscription's status to 'canceled' and adjusts its end date if necessary.
