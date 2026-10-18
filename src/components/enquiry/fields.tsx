import type { ComponentProps, ReactNode } from "react";

const control =
  "block w-full rounded-md border bg-paper px-4 py-3 text-base text-ink placeholder:text-muted/70 transition-colors " +
  "hover:border-ink/60 focus-visible:border-cobalt focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-cobalt";

const borderFor = (error?: string) => (error ? "border-danger" : "border-line-strong");

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-2 text-sm font-medium text-danger">
      <span aria-hidden className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white">
        !
      </span>
      <span>{message}</span>
    </p>
  );
}

interface FieldShellProps {
  id: string;
  label: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}

function FieldShell({ id, label, optional, hint, error, children }: FieldShellProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-3 font-medium">
        <span>{label}</span>
        {optional && <span className="text-sm font-normal text-muted">Optional</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="-mt-1 mb-2 text-sm text-muted">
          {hint}
        </p>
      )}
      {children}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

const describedBy = (id: string, hint?: string, error?: string) =>
  [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;

interface TextFieldProps extends Omit<ComponentProps<"input">, "id" | "className"> {
  id: string;
  label: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  /** Mark invalid without an inline message (e.g. when a group-level message applies). */
  invalid?: boolean;
}

export function TextField({ id, label, optional, hint, error, invalid, ...props }: TextFieldProps) {
  return (
    <FieldShell {...{ id, label, optional, hint, error }}>
      <input
        id={id}
        name={id}
        aria-invalid={error || invalid ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={`${control} min-h-12 ${borderFor(error || (invalid ? "invalid" : undefined))}`}
        {...props}
      />
    </FieldShell>
  );
}

interface ChoiceChipsProps {
  name: string;
  legend: string;
  value: string;
  options: readonly { value: string; label: string }[];
  onChange: (value: string) => void;
  error?: string;
}

/** Single-choice chips built on native radios (arrow keys, labels and screen readers work as usual). */
export function ChoiceChips({ name, legend, value, options, onChange, error }: ChoiceChipsProps) {
  const errorId = `${name}-error`;
  return (
    <fieldset aria-describedby={error ? errorId : undefined} aria-invalid={error ? true : undefined}>
      <legend className="mb-3 font-medium">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.value} className="relative cursor-pointer">
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="peer sr-only"
            />
            <span
              className={`inline-flex min-h-11 items-center gap-2 rounded-full border bg-ivory px-4 text-[0.9375rem] transition-[background-color,border-color,color] duration-200 hover:border-cobalt peer-checked:border-cobalt peer-checked:bg-cobalt peer-checked:text-ivory peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cobalt ${borderFor(error)}`}
            >
              {o.label}
            </span>
          </label>
        ))}
      </div>
      <FieldError id={errorId} message={error} />
    </fieldset>
  );
}

interface CheckboxProps extends Omit<ComponentProps<"input">, "id" | "className" | "type"> {
  id: string;
  error?: string;
  children: ReactNode;
}

export function Checkbox({ id, error, children, ...props }: CheckboxProps) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          name={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-1 size-5 shrink-0 cursor-pointer accent-cobalt"
          {...props}
        />
        <label htmlFor={id} className="cursor-pointer text-[0.9375rem] text-ink-soft">
          {children}
        </label>
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}
