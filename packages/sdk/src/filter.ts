/**
 * OData-style filter expression builder for VergeOS API queries.
 *
 * Provides both a fluent API (`Filter` class) and a functional shorthand (`buildFilter()`).
 *
 * @example Fluent API
 * ```typescript
 * const filter = new Filter()
 *   .eq('status', 'running')
 *   .like('name', 'web*')
 *   .build();
 * // → "status eq 'running' and name like 'web%'"
 * ```
 *
 * @example Functional shorthand
 * ```typescript
 * const filter = buildFilter({
 *   status: 'running',
 *   name: 'web*',
 *   cpu_cores: { gt: 2 },
 * });
 * // → "status eq 'running' and name like 'web%' and cpu_cores gt 2"
 * ```
 *
 * @module
 */

/** Supported filter operator names. */
type FilterOperator = "eq" | "ne" | "gt" | "ge" | "lt" | "le" | "like" | "in";

/** A primitive value that can appear in a filter expression. */
type FilterValue = string | number | boolean | null;

/** Operator object for the `buildFilter` functional shorthand. */
type OperatorObject = {
  [K in Exclude<FilterOperator, "like" | "in">]?: FilterValue;
};

/** Value types accepted by `buildFilter`. */
type BuildFilterValue = FilterValue | FilterValue[] | OperatorObject;

/**
 * Formats a single value for use in a filter expression.
 *
 * - Strings are single-quoted with `'` escaped to `''`
 * - Numbers and booleans are raw
 * - `null` becomes the literal `null`
 */
const formatValue = (value: FilterValue): string => {
  if (value === null) return "null";
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") return String(value);
  // String — quote and escape single quotes
  const escaped = String(value).replace(/'/g, "''");
  return `'${escaped}'`;
};

/**
 * Converts user-friendly wildcards to SQL/OData LIKE wildcards.
 *
 * - `*` → `%` (match any characters)
 * - `?` → `_` (match single character)
 */
const convertWildcards = (pattern: string): string =>
  pattern.replace(/\*/g, "%").replace(/\?/g, "_");

/**
 * Fluent filter expression builder for VergeOS API queries.
 *
 * Conditions are implicitly joined with `and`. Use `.or()` for explicit `or` conjunction.
 *
 * @example
 * ```typescript
 * const filter = new Filter()
 *   .eq('status', 'running')
 *   .gt('cpu_cores', 2)
 *   .build();
 * // → "status eq 'running' and cpu_cores gt 2"
 * ```
 */
class Filter {
  /** Accumulated filter expression parts. */
  private readonly _parts: string[] = [];

  /**
   * Auto-insert `and` conjunction between conditions when needed.
   * This makes chaining natural — no need to manually add `and` between every call.
   */
  private _autoAnd(): void {
    if (this._parts.length > 0) {
      const last = this._parts[this._parts.length - 1];
      if (last !== "and" && last !== "or") {
        this._parts.push("and");
      }
    }
  }

  /**
   * Add a condition with the given operator.
   */
  private _add(
    field: string,
    op: FilterOperator,
    formattedValue: string,
  ): this {
    this._parts.push(`${field} ${op} ${formattedValue}`);
    return this;
  }

  /** Add an equals condition: `field eq value`. */
  eq(field: string, value: FilterValue): this {
    this._autoAnd();
    return this._add(field, "eq", formatValue(value));
  }

  /** Add a not-equals condition: `field ne value`. */
  ne(field: string, value: FilterValue): this {
    this._autoAnd();
    return this._add(field, "ne", formatValue(value));
  }

  /** Add a greater-than condition: `field gt value`. */
  gt(field: string, value: FilterValue): this {
    this._autoAnd();
    return this._add(field, "gt", formatValue(value));
  }

  /** Add a greater-than-or-equal condition: `field ge value`. */
  ge(field: string, value: FilterValue): this {
    this._autoAnd();
    return this._add(field, "ge", formatValue(value));
  }

  /** Add a less-than condition: `field lt value`. */
  lt(field: string, value: FilterValue): this {
    this._autoAnd();
    return this._add(field, "lt", formatValue(value));
  }

  /** Add a less-than-or-equal condition: `field le value`. */
  le(field: string, value: FilterValue): this {
    this._autoAnd();
    return this._add(field, "le", formatValue(value));
  }

  /**
   * Add a LIKE pattern condition: `field like 'pattern'`.
   *
   * User-friendly wildcards are converted automatically:
   * - `*` → `%` (match any characters)
   * - `?` → `_` (match single character)
   */
  like(field: string, pattern: string): this {
    this._autoAnd();
    const converted = convertWildcards(pattern);
    const escaped = converted.replace(/'/g, "''");
    return this._add(field, "like", `'${escaped}'`);
  }

  /**
   * Add an IN condition: `field in ('val1', 'val2', ...)`.
   *
   * @param field - The field name
   * @param values - Array of values to match against
   */
  in(field: string, values: FilterValue[]): this {
    this._autoAnd();
    const formatted = values.map(formatValue).join(", ");
    return this._add(field, "in", `(${formatted})`);
  }

  /**
   * Add an explicit `or` conjunction.
   *
   * By default, conditions are joined with `and`. Use this to switch to `or`.
   *
   * @example
   * ```typescript
   * new Filter().eq('status', 'running').or().eq('status', 'stopped').build()
   * // → "status eq 'running' or status eq 'stopped'"
   * ```
   */
  or(): this {
    this._parts.push("or");
    return this;
  }

  /**
   * Build the filter expression string.
   *
   * @returns The complete filter string, or empty string if no conditions were added.
   */
  build(): string {
    return this._parts.join(" ");
  }
}

/** Recognized operator keys for operator objects in `buildFilter`. */
const OPERATOR_KEYS = new Set<string>(["eq", "ne", "gt", "ge", "lt", "le"]);

/**
 * Check if a value is an operator object like `{ gt: 2 }` or `{ ge: 1, le: 10 }`.
 */
const isOperatorObject = (value: unknown): value is OperatorObject => {
  if (value === null || typeof value !== "object" || Array.isArray(value))
    return false;
  const keys = Object.keys(value);
  return keys.length > 0 && keys.every((k) => OPERATOR_KEYS.has(k));
};

/**
 * Build a filter string from a plain object using convention-based detection.
 *
 * Supports three value patterns:
 * - **Simple equality**: `{ status: 'running' }` → `"status eq 'running'"`
 * - **Wildcard strings**: `{ name: 'web*' }` → `"name like 'web%'"` (auto-detects `*` and `?`)
 * - **Arrays**: `{ status: ['running', 'stopped'] }` → `"status in ('running', 'stopped')"`
 * - **Operator objects**: `{ cpu_cores: { gt: 2 } }` → `"cpu_cores gt 2"`
 *
 * Multiple fields are joined with `and`. Null values are skipped.
 *
 * @param conditions - Object mapping field names to filter values
 * @returns OData filter string
 *
 * @example
 * ```typescript
 * buildFilter({
 *   status: 'running',
 *   name: 'web*',
 *   cpu_cores: { gt: 2 },
 *   ram: { ge: 4096, le: 65536 },
 * });
 * // → "status eq 'running' and name like 'web%' and cpu_cores gt 2 and ram ge 4096 and ram le 65536"
 * ```
 */
const buildFilter = (conditions: Record<string, BuildFilterValue>): string => {
  const parts: string[] = [];

  for (const [field, value] of Object.entries(conditions)) {
    // Skip null values
    if (value === null) continue;

    if (Array.isArray(value)) {
      // IN query
      const formatted = value.map(formatValue).join(", ");
      parts.push(`${field} in (${formatted})`);
    } else if (isOperatorObject(value)) {
      // Operator object: { gt: 2 } or { ge: 1, le: 10 }
      for (const [op, opValue] of Object.entries(value)) {
        if (opValue !== undefined) {
          parts.push(`${field} ${op} ${formatValue(opValue as FilterValue)}`);
        }
      }
    } else if (
      typeof value === "string" &&
      (value.includes("*") || value.includes("?"))
    ) {
      // LIKE with wildcard conversion
      const pattern = convertWildcards(value);
      const escaped = pattern.replace(/'/g, "''");
      parts.push(`${field} like '${escaped}'`);
    } else {
      // Simple equality
      parts.push(`${field} eq ${formatValue(value)}`);
    }
  }

  return parts.join(" and ");
};

export { Filter, buildFilter };
export type { FilterValue, BuildFilterValue, OperatorObject };
