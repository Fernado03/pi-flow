# Good and Bad Tests

## Good tests

**Integration-style:** test through real interfaces, not mocks of internal parts.

```typescript
test("user can checkout with valid cart", async () => {
  const cart = createCart();
  cart.add(product);
  const result = await checkout(cart, paymentMethod);
  expect(result.status).toBe("confirmed");
});
```

Good tests:

- Prove behavior users and callers care about.
- Use a public API.
- Survive internal refactors.
- Describe what happens, not how it happens.
- Make one logical claim per test.

## Bad tests

**Implementation-detail tests** couple coverage to internals.

```typescript
test("checkout calls paymentService.process", async () => {
  const mockPayment = jest.mock(paymentService);
  await checkout(cart, payment);
  expect(mockPayment.process).toHaveBeenCalledWith(cart.total);
});
```

Red flags include mocking internal collaborators, testing private methods, asserting call order or count, names that describe implementation, and verification through side channels.

```typescript
// Bad: bypasses the interface to verify
await createUser({ name: "Alice" });
const row = await db.query("SELECT * FROM users WHERE name = ?", ["Alice"]);
expect(row).toBeDefined();

// Good: verifies through the interface
const user = await createUser({ name: "Alice" });
const retrieved = await getUser(user.id);
expect(retrieved.name).toBe("Alice");
```

**Tautological tests** recompute the expected value the same way production code does, so they pass by construction.

```typescript
// Bad
const items = [{ price: 10 }, { price: 5 }];
expect(calculateTotal(items)).toBe(items.reduce((sum, item) => sum + item.price, 0));

// Good
expect(calculateTotal([{ price: 10 }, { price: 5 }])).toBe(15);
```
