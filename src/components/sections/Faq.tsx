import { Plus } from "lucide-react";
import { faqs } from "@/content/faqs";

/** Native <details> accordion: keyboard and screen-reader accessible with zero JavaScript. */
export function Faq() {
  return (
    <div className="border-t border-line-strong">
      {faqs.map((item) => (
        <details key={item.question} className="group border-b border-line-strong">
          <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-6 py-5 text-lg font-medium tracking-tight hover:text-cobalt sm:text-xl">
            {item.question}
            <Plus aria-hidden className="faq-icon size-5 shrink-0 text-cobalt transition-transform duration-200 motion-reduce:transition-none" />
          </summary>
          <p className="max-w-2xl pb-6 text-ink-soft">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
