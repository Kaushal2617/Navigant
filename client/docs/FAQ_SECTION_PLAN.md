# FAQ Section – Detail Plan & Implementation Guide

This plan adds a **dedicated FAQ section** to the client, aligned with existing patterns (Tailwind, `#CA1411`, DotGrid, section structure). You can implement the code yourself using the snippets below.

---

## 1. Overview

| Item | Choice |
|------|--------|
| **New component** | `FAQSection` (section wrapper + accordion list) |
| **Reusable piece** | Accordion item logic inline in `FAQSection` (or extract `FaqAccordionItem` in `commons` later) |
| **Data** | Optional `faq?: FAQItem[]` on `ServiceData`; fallback to page-level or default list |
| **Placement** | New section in `TataTeleDetailPage` (e.g. after the inline Testimonials block, before “REMAINING SECTIONS”) |
| **Behaviour** | Accordion: one item open at a time (optional: allow multiple) |

**Note:** The current “FAQs” inside “Why Choose Us” in `TataTeleDetailPage` (lines 377–392) are static title+content cards. This plan introduces a **separate** FAQ section with real Q&A and expand/collapse.

---

## 2. Type Definitions

**File:** `client/src/components/services/serviceTypes.ts`

- Add a new interface and extend `ServiceData`:

```ts
// Add this interface (e.g. after Testimonial, before ServiceHighlight)

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// In ServiceData interface, add optional field:

export interface ServiceData {
  // ... existing fields ...
  testimonials?: Testimonial[];
  faq?: FAQItem[];   // <-- add this
  brandLogos?: BrandLogo[];
  // ...
}
```

---

## 3. File Structure

```
client/src/
├── components/
│   ├── commons/                    # optional later
│   │   └── FaqAccordionItem.tsx   # only if you want to reuse accordion item
│   └── services/
│       ├── serviceTypes.ts        # add FAQItem, ServiceData.faq
│       ├── FAQSection.tsx         # NEW: section + accordion list
│       └── TataTeleDetailPage.tsx # add FAQ section + data
```

---

## 4. Design Alignment (Tailwind / client style)

Match existing sections (e.g. Testimonials, Why Choose Us):

- **Section:** `py-12 md:py-16 lg:py-20`, `bg-gradient-to-br from-white via-gray-50/50 to-white`, `relative overflow-hidden`
- **Background:** DotGrid with same props as other sections (`dotSize={12}`, `gap={40}`, `baseColor="#E5E7EB"`, `activeColor="#CA1411"`, etc.)
- **Container:** `container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl` (or `max-w-4xl` for narrower FAQ list), `relative z-10`
- **Badge:** `inline-flex px-4 py-2 rounded-full bg-[#CA1411]/10 text-[#CA1411] text-sm font-semibold uppercase tracking-wide`
- **Title:** `text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight`
- **Subtitle (optional):** `text-lg text-gray-600`
- **Accordion item:** `rounded-2xl border border-gray-200 bg-white shadow-sm`, hover `hover:shadow-md`, transition; question uses `text-[#CA1411]` or `text-gray-900`, answer `text-gray-700`
- **Chevron:** Same as elsewhere (e.g. `stroke="currentColor"`), rotate when open

---

## 5. Step-by-Step Implementation

### Step 5.1 – Add types (`serviceTypes.ts`)

- Add `FAQItem` with `id`, `question`, `answer`.
- Add `faq?: FAQItem[]` to `ServiceData`.

---

### Step 5.2 – Create `FAQSection.tsx`

**File:** `client/src/components/services/FAQSection.tsx`

**Props:**

- `items: FAQItem[]` (required)
- `title?: string` (default e.g. `"Frequently Asked Questions"`)
- `subtitle?: string` (optional)
- `allowMultiple?: boolean` (default `false` = one open at a time)

**Behaviour:**

- One open at a time: clicking an item opens it and closes the previously open one.
- Optional: if `allowMultiple` is true, each click only toggles that item.

**Structure (conceptual):**

```tsx
import React, { useState } from 'react';
import type { FAQItem } from './serviceTypes';
import DotGrid from '../commons/DotGrid';

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
  allowMultiple?: boolean;
}

const FAQSection: React.FC<FAQSectionProps> = ({
  items,
  title = 'Frequently Asked Questions',
  subtitle,
  allowMultiple = false,
}) => {
  const [openId, setOpenId] = useState<string | null>(null);
  // If allowMultiple: const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
    // If allowMultiple: toggle id in openIds set
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-white via-gray-50/50 to-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <DotGrid
          dotSize={12}
          gap={40}
          baseColor="#E5E7EB"
          activeColor="#CA1411"
          proximity={120}
          speedTrigger={80}
          shockRadius={200}
          shockStrength={4}
          maxSpeed={4000}
          resistance={800}
          returnDuration={1.2}
          className="w-full h-full"
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex px-4 py-2 rounded-full bg-[#CA1411]/10 text-[#CA1411] text-sm font-semibold uppercase tracking-wide mb-4">
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            {title}
          </h2>
          {subtitle && <p className="mt-3 text-lg text-gray-600">{subtitle}</p>}
        </div>

        <div className="space-y-3">
          {items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 md:px-6 md:py-5 focus:outline-none focus-ring-2 focus:ring-[#CA1411]/20 focus:ring-inset"
                  aria-expanded={isOpen}
                >
                  <span className="text-base md:text-lg font-semibold text-gray-900 pr-2">
                    {item.question}
                  </span>
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-[#CA1411]/10 text-[#CA1411] transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-out"
                  style={{ maxHeight: isOpen ? '500px' : '0px' }}
                  aria-hidden={!isOpen}
                >
                  <div className="px-5 pb-5 md:px-6 md:pb-6 pt-0 border-t border-gray-100">
                    <p className="text-gray-700 leading-relaxed pt-4">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
```

- Use `max-w-4xl` for a readable FAQ column; adjust if you prefer full width.
- For multiple open: keep a `Set<string>` of open ids and use `openIds.has(item.id)` for `isOpen`; in `toggle` add/remove id from set.

---

### Step 5.3 – Add FAQ data

**Option A – In service data (recommended for TTBS):**

**File:** `client/src/components/services/serviceData/tataTeleServices.ts`

- Import type `FAQItem` if needed (or rely on `ServiceData`).
- Add a `faq` array to `tataTeleServicesData`, e.g.:

```ts
faq: [
  {
    id: 'what-is-ttbs',
    question: 'What is Tata Tele Business Services?',
    answer: 'Tata Tele Business Services (TTBS) is the digital solutions arm of Tata Teleservices Ltd., offering ICT services including connectivity, collaboration, cloud, security, IoT, and marketing solutions for enterprises.',
  },
  {
    id: 'coverage',
    question: 'Where does TTBS operate?',
    answer: 'TTBS has operations in over 60 cities across India and works with 1,500+ partners for wide enterprise reach.',
  },
  {
    id: 'industries',
    question: 'Which industries do you serve?',
    answer: 'We serve BFSI, IT/ITeS, manufacturing, services, education, healthcare, retail, and telecom/media & entertainment, among others.',
  },
  {
    id: 'contact',
    question: 'How can I get in touch for enterprise solutions?',
    answer: 'You can reach us via the Contact page or the Connect With Us form on this site. Our team will get back to you with tailored options.',
  },
],
```

**Option B – Page-level fallback in `TataTeleDetailPage`:**

- Define a constant array of `FAQItem` (same shape as above) and use it when `serviceData.faq` is missing or empty:

```ts
const defaultFaqItems: FAQItem[] = [
  { id: '...', question: '...', answer: '...' },
  // ...
];
const faqItems = serviceData.faq?.length ? serviceData.faq : defaultFaqItems;
```

---

### Step 5.4 – Integrate into `TataTeleDetailPage.tsx`

- Import the section (direct or lazy):

```ts
// At top with other lazy sections (optional – or normal import)
const FAQSection = lazyWithDelay(() => import('./FAQSection'));
```

- Derive FAQ list (if using fallback):

```ts
const faqList = serviceData.faq && serviceData.faq.length > 0
  ? serviceData.faq
  : defaultFaqItems; // or keep existing faqItems and map to { id, question, answer }
```

- Render the new section **after** the inline Testimonials block and **before** “REMAINING SECTIONS” (before `ServiceCategorySection`):

```tsx
{/* FAQ Section */}
{faqList.length > 0 && (
  <Suspense fallback={<ShimmerSection />}>
    <FAQSection
      items={faqList}
      title="Frequently Asked Questions"
      subtitle="Quick answers to common questions about our services."
    />
  </Suspense>
)}

{/* REMAINING SECTIONS (unchanged) */}
{serviceData.serviceCategories && ...
```

- If you use **lazy** import, keep the same `Suspense` + `ShimmerSection` pattern as for `ServiceCategorySection` and `ServiceDetailSection`.

---

## 6. Optional Enhancements

- **Allow multiple open:** Implement `allowMultiple` with `openIds: Set<string>` and toggle by id.
- **Reusable accordion item:** Move single-item UI into `components/commons/FaqAccordionItem.tsx`; accept `item`, `isOpen`, `onToggle`.
- **Animation:** Use CSS `max-height` + transition (as in snippet) or a small animation library if you already use one.
- **Analytics:** On toggle, fire an event or call a tracking function with `item.id` or `item.question`.
- **URL hash:** Sync open state with `#faq-{id}` so linking to a question works (read hash on mount, set open id; on toggle update hash).

---

## 7. Checklist

- [ ] Add `FAQItem` and `faq?: FAQItem[]` in `serviceTypes.ts`.
- [ ] Create `FAQSection.tsx` with DotGrid, badge, title, accordion list, one-open-at-a-time (or multiple).
- [ ] Add `faq` array to `tataTeleServices.ts` (and/or default list in page).
- [ ] In `TataTeleDetailPage`, import `FAQSection`, compute `faqList`, render section with `Suspense` + fallback before “REMAINING SECTIONS”.
- [ ] Optionally rename or remove the old “FAQs” heading/cards inside “Why Choose Us” to avoid two “FAQ” labels (e.g. call the existing block “Highlights” or “At a glance”).

---

## 8. Summary

- **Types:** `FAQItem` + `ServiceData.faq` in `serviceTypes.ts`.
- **Component:** `FAQSection` in `services/` with section layout, DotGrid, and accordion behaviour aligned with your client.
- **Data:** Populate `serviceData.faq` in `tataTeleServices.ts` and/or a page-level default.
- **Integration:** One new block in `TataTeleDetailPage`; optionally lazy-loaded with `ShimmerSection` fallback.

Once these are in place, you can reuse `FAQSection` on other pages (e.g. `ServiceDetailPage` or a generic service template) by passing `items` and optional `title`/`subtitle`.
