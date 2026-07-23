# Context Record Format

Context records live at `.pi-flow/CONTEXT.md`, or at a location named by `.pi-flow/CONTEXT-MAP.md` for a multi-context repository.

## Structure

```md
# Ordering

Receives customer orders and tracks their lifecycle through fulfillment.

## Language

**Order**:
A request by a Customer for one or more Items to be fulfilled.
_Avoid_: Purchase, transaction

**Invoice**:
A request for payment sent to a Customer after delivery.
_Avoid_: Bill, payment request

**Customer**:
A person or organization that places Orders.
_Avoid_: Client, buyer, account
```

## Rules

- Be opinionated: choose one term for a concept and put interchangeable alternatives under `_Avoid_`.
- Keep each definition to one or two sentences. Define what the concept is, not how code implements it.
- Record only concepts specific to this domain context, not general programming concepts.
- Group terms under subheadings once natural clusters emerge; keep a flat list when they do not.

## Multiple contexts

For a genuine multi-context repository, `.pi-flow/CONTEXT-MAP.md` identifies context records and their relationships:

```md
# Context Map

## Contexts

- [Ordering](../src/ordering/.pi-flow/CONTEXT.md) — receives and tracks customer orders
- [Billing](../src/billing/.pi-flow/CONTEXT.md) — generates invoices and processes payments
- [Fulfillment](../src/fulfillment/.pi-flow/CONTEXT.md) — manages picking and shipment

## Relationships

- **Ordering → Fulfillment**: Ordering emits `OrderPlaced`; Fulfillment consumes it to begin picking.
- **Fulfillment → Billing**: Fulfillment emits `ShipmentDispatched`; Billing consumes it to generate an Invoice.
- **Ordering ↔ Billing**: share `CustomerId` and `Money`.
```

Read the map before editing a context record. If the current topic could belong to more than one context, resolve ownership before recording the term.