### Prisma ORM | ER Diagram
Note: Paste in `dbdiagram.io`

```
Table Users {
  id serial [pk]
  name varchar [not null]
  email varchar [not null]
  password varchar [not null]
  biography varchar [not null]
  picture_url varchar [not null]
  is_active boolean [not null, default: true]
  created_at datetime [default: "now()"]
  updated_at datetime [default: "updated()"]
}

Table Plans {
  id serial [pk]
  name varchar [not null]
  description text [not null]
  monthly_price numeric [not null]
  periodicity_days integer [not null]
  is_active boolean [not null, default: "true"]
  created_at datetime [default: "now()"]
  updated_at datetime [default: "updated()"]
}

Table Subscriptions {
  id serial [pk]
  plan_id integer [ref: > Plans.id]
  user_id integer [ref: > Users.id]
  start_date datetime [not null]
  end_date datetime
  status varchar [not null, note: "active, cancelled, trial, past_due"]
  auto_renew boolean [not null, default: "true"]
  created_at datetime [default: "now()"]
  updated_at datetime [default: "updated()"]
}

Table Invoices {
  id serial [pk]
  subscription_id integer [ref: > Subscriptions.id]
  amount numeric [not null]
  issue_date datetime [not null]
  due_date datetime [not null]
  payment_status varchar [not null, note: "pending, paid"]
  period_start_date datetime [not null]
  period_end_date datetime [not null]
  created_at datetime [default: "now()"]
  updated_at datetime [default: "updated()"]
}

Table Payments {
  id serial [pk]
  invoice_id integer [ref: > Invoices.id]
  amount_paid numeric [not null]
  payment_date datetime [not null]
  payment_method varchar [not null, note: "credit card, debit card, cash, bank transfer"]
  created_at datetime [default: "now()"]
  updated_at datetime [default: "updated()"]
}
```