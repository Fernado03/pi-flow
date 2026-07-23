# When to Mock

Mock only at **system boundaries**:

- External APIs such as payment or email.
- Databases when a test database is not appropriate.
- Time and randomness.
- The file system when appropriate.

Do not mock code you own, internal collaborators, or anything controlled by the same system.

## Designing for mockability

At a real boundary, pass the dependency in rather than constructing it inside the behavior under test:

```typescript
// Easy to mock
function processPayment(order, paymentClient) {
  return paymentClient.charge(order.total);
}

// Hard to mock
function processPayment(order) {
  const client = new StripeClient(process.env.STRIPE_KEY);
  return client.charge(order.total);
}
```

Prefer specific SDK-style operations to a generic fetch wrapper with conditional mock behavior:

```typescript
// Each function has one independently mockable contract
const api = {
  getUser: (id) => fetch(`/users/${id}`),
  getOrders: (userId) => fetch(`/users/${userId}/orders`),
  createOrder: (data) => fetch('/orders', { method: 'POST', body: data }),
};
```

Specific operations keep setup simple, make exercised endpoints visible, and preserve type contracts per endpoint.
