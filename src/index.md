---
name: 'main'
---

# Hello World!

```typescript
type DesignTokenRecord = {
  [key: string]: string | number | string[] | number[] | DesignTokenRecord;
};

type DesignTokenOptions = {
  allowDashCase?: boolean;
  preserveCase?: boolean;
  prefix?: string;
  tokens: DesignTokenRecord;
};
```
