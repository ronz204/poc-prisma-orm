**TRG-001: Subscription End Date Trigger** `trg_set_subscription_end_date`

**Description:** This automatically activates whenever a subscription is created or modified. Its task is to ensure the subscription's 'expected end date' is correctly calculated based on the start date and the plan's periodicity.

**TRG-002: Invoice Due Date Trigger** `trg_update_invoice_due_date`

**Description:** This automatically activates when a new invoice is created. It sets the invoice's due date, for example, 15 days after its issue date.