**FN-001: Create Subscription Function** `fn_create_subscription`

**Description:** This function handles setting up a new subscription for a given user and plan. It automatically calculates the end date for the first period and generates the initial invoice.


**FN-002: Cancel Subscription Function** `fn_cancel_subscription`

**Description:** This allows us to end an existing subscription. It updates the subscription's status to 'canceled' and adjusts its end date if necessary.


**FN-003: Create Subscription Function** `fn_record_payment`

**Description:** This records that an invoice has been paid. It updates the invoice's status to 'paid' and, if the subscription was suspended due to non-payment, it reactivates it.