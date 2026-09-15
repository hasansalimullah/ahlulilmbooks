"use client";

import { useState } from "react";

/**
 * Coming Soon / launch survey page for
 * كتب أهل العلم — Kutub Ahl al-'Ilm
 *
 * 7-step bilingual (EN/AR) form, modeled on the same flow as the
 * reference site: Name -> Country -> Email -> Books wanted ->
 * Expectations -> Common issues -> Additional notes -> Submit.
 *
 * Drop this in as app/page.tsx (homepage) or move it to
 * app/coming-soon/page.tsx and link to it from wherever you like.
 * Submissions POST to /api/survey — see that route for how to wire
 * up real storage/notifications.
 */

const COUNTRIES = [
  "United States", "United Kingdom", "Canada", "Australia",
  "Saudi Arabia", "United Arab Emirates", "Qatar", "Kuwait",
  "Bahrain", "Oman", "Jordan", "Egypt", "Morocco", "Algeria",
  "Tunisia", "Libya", "Yemen", "Iraq", "Palestine", "Lebanon",
  "Turkey", "Pakistan", "India", "Bangladesh", "Indonesia",
  "Malaysia", "Nigeria", "South Africa", "Germany", "France",
  "Netherlands", "Sweden", "Other",
];

type FormData = {
  firstName: string;
  anonymous: boolean;
  country: string;
  email: string;
  booksWanted: string;
  expectations: string;
  commonIssues: string;
  additionalNotes: string;
};

const initialData: FormData = {
  firstName: "",
  anonymous: false,
  country: "",
  email: "",
  booksWanted: "",
  expectations: "",
  commonIssues: "",
  additionalNotes: "",
};

const TOTAL_STEPS = 7;

export default function ComingSoonPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const percent = Math.round((step / TOTAL_STEPS) * 100);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function isStepValid(): boolean {
    switch (step) {
      case 1:
        return data.anonymous || data.firstName.trim().length > 0;
      case 2:
        return data.country.trim().length > 0;
      case 3:
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim());
      case 4:
        return data.booksWanted.trim().length > 0;
      case 5:
        return data.expectations.trim().length > 0;
      case 6:
        return data.commonIssues.trim().length > 0;
      case 7:
        return true;
      default:
        return true;
    }
  }

  function goNext() {
    if (!isStepValid()) {
      setError("Please fill out this field before continuing. | الرجاء تعبئة هذا الحقل للمتابعة.");
      return;
    }
    setError(null);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }

  function goBack() {
    setError(null);
    setStep((s) => Math.max(s - 1, 1));
  }

  async function handleSubmit() {
    if (!isStepValid()) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setError(
        "Something went wrong sending your response. Please try again. | حدث خطأ أثناء إرسال ردك. الرجاء المحاولة مرة أخرى."
      );
    } finally {
      setSubmitting(false);
    }
  }

  function resetForm() {
    setData(initialData);
    setStep(1);
    setSubmitted(false);
    setError(null);
  }

  return (
    <main className="min-h-screen bg-[#F0EBE1] text-[#222222] flex flex-col items-center px-5 py-10 sm:py-16">
      <div className="w-full max-w-xl">
        {/* Brand */}
        <div className="text-center mb-8">
          <p
            className="text-[#C9A227] text-2xl sm:text-3xl tracking-wide mb-1"
            dir="rtl"
            style={{ fontFamily: "'Traditional Arabic', 'Amiri', serif" }}
          >
            مكتبة
          </p>
          <h1
            className="text-[#3B2B26] font-bold text-3xl sm:text-4xl mb-2"
            dir="rtl"
          >
            كُتُب أهل العلم
          </h1>
          <p className="text-[#6B5D52] text-sm sm:text-base">
            Kutub Ahl al-&#39;Ilm — Authentic Islamic Books | كتب إسلامية أصيلة
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 my-6">
          <span className="h-px w-16 bg-[#C9A227]/50" />
          <span className="text-[#C9A227] text-lg">&#10038;</span>
          <span className="h-px w-16 bg-[#C9A227]/50" />
        </div>

        <h2 className="text-center text-[#3B2B26] font-extrabold text-4xl sm:text-5xl leading-tight mb-1">
          Coming Soon
        </h2>
        <h2
          className="text-center text-[#3B2B26] font-extrabold text-4xl sm:text-5xl leading-tight mb-8"
          dir="rtl"
        >
          قادمون قريباً
        </h2>

        {!submitted && (
          <div className="flex items-center justify-between text-sm text-[#6B5D52] mb-2">
            <span>Step {step} of {TOTAL_STEPS}</span>
            <span>{percent}%</span>
          </div>
        )}

        {!submitted && (
          <div className="h-2 w-full rounded-full bg-[#E4DCC9] overflow-hidden mb-6">
            <div
              className="h-full rounded-full bg-[#C9A227] transition-all duration-300 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
        )}

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          {!submitted ? (
            <>
              <h3 className="text-center text-[#3B2B26] font-bold text-2xl mb-1">
                Share Your Thoughts | شارك أفكارك
              </h3>
              <p className="text-center text-[#6B5D52] text-sm sm:text-[15px] leading-relaxed mb-6">
                Help us curate the best Islamic books for our shelves. Your
                feedback shapes our selection.
                <br />
                <span dir="rtl" className="block mt-1">
                  ساعدنا في اختيار أفضل الكتب الإسلامية لمكتبتنا. ملاحظاتك تشكل اختياراتنا.
                </span>
              </p>

              {step === 1 && (
                <Field label="First Name | الاسم الأول" required={!data.anonymous}>
                  <input
                    type="text"
                    value={data.firstName}
                    disabled={data.anonymous}
                    onChange={(e) => update("firstName", e.target.value)}
                    placeholder="Muhammad | محمد"
                    className="w-full rounded-lg border border-[#E4DCC9] px-4 py-3 text-[15px] placeholder:text-[#B8AC9A] focus:outline-none focus:ring-2 focus:ring-[#C9A227] disabled:bg-[#F5F2EA] disabled:text-[#B8AC9A]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      update("anonymous", !data.anonymous);
                      update("firstName", "");
                    }}
                    className={`mt-3 w-full rounded-lg border px-4 py-3 text-[15px] font-medium transition-colors ${
                      data.anonymous
                        ? "border-[#3B2B26] bg-[#3B2B26] text-white"
                        : "border-[#E4DCC9] text-[#3B2B26] hover:bg-[#F5F2EA]"
                    }`}
                  >
                    Anonymous
                  </button>
                </Field>
              )}

              {step === 2 && (
                <Field label="Country | الدولة" required>
                  <select
                    value={data.country}
                    onChange={(e) => update("country", e.target.value)}
                    className="w-full rounded-lg border border-[#E4DCC9] px-4 py-3 text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                  >
                    <option value="">Select your country | اختر دولتك</option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
              )}

              {step === 3 && (
                <Field label="Email | البريد الإلكتروني" required>
                  <input
                    type="email"
                    value={data.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-[#E4DCC9] px-4 py-3 text-[15px] placeholder:text-[#B8AC9A] focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                  />
                </Field>
              )}

              {step === 4 && (
                <Field label="Books You Want | الكتب التي تريدها" required>
                  <textarea
                    value={data.booksWanted}
                    onChange={(e) => update("booksWanted", e.target.value)}
                    rows={4}
                    placeholder="Which Islamic books are you looking for? (e.g., Riyad al-Salihin, Tafsir, Fiqh manuals, etc.) | أي كتب إسلامية تبحث عنها؟"
                    className="w-full rounded-lg border border-[#E4DCC9] px-4 py-3 text-[15px] placeholder:text-[#B8AC9A] focus:outline-none focus:ring-2 focus:ring-[#C9A227] resize-none"
                  />
                </Field>
              )}

              {step === 5 && (
                <Field label="Your Expectations | توقعاتك" required>
                  <textarea
                    value={data.expectations}
                    onChange={(e) => update("expectations", e.target.value)}
                    rows={4}
                    placeholder="What do you expect from us? (e.g., authentic sourcing, fair pricing, fast shipping, knowledgeable service, etc.) | ما تتوقعه منا؟"
                    className="w-full rounded-lg border border-[#E4DCC9] px-4 py-3 text-[15px] placeholder:text-[#B8AC9A] focus:outline-none focus:ring-2 focus:ring-[#C9A227] resize-none"
                  />
                </Field>
              )}

              {step === 6 && (
                <Field
                  label="Common Issues with Other Bookstores | المشاكل الشائعة مع المكتبات الأخرى"
                  required
                >
                  <textarea
                    value={data.commonIssues}
                    onChange={(e) => update("commonIssues", e.target.value)}
                    rows={4}
                    placeholder="What problems have you faced? (e.g., unauthentic books, high prices, slow shipping, poor customer service, limited selection, etc.) | ما المشاكل التي واجهتها؟"
                    className="w-full rounded-lg border border-[#E4DCC9] px-4 py-3 text-[15px] placeholder:text-[#B8AC9A] focus:outline-none focus:ring-2 focus:ring-[#C9A227] resize-none"
                  />
                </Field>
              )}

              {step === 7 && (
                <Field label="Additional Notes | ملاحظات إضافية">
                  <textarea
                    value={data.additionalNotes}
                    onChange={(e) => update("additionalNotes", e.target.value)}
                    rows={4}
                    placeholder="Anything else you'd like to share? | أي شيء آخر تود مشاركته؟"
                    className="w-full rounded-lg border border-[#E4DCC9] px-4 py-3 text-[15px] placeholder:text-[#B8AC9A] focus:outline-none focus:ring-2 focus:ring-[#C9A227] resize-none"
                  />
                </Field>
              )}

              {error && (
                <p className="text-[#8B0000] text-sm mt-3">{error}</p>
              )}

              <div className="h-px bg-[#EDE7D9] my-6" />

              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={step === 1}
                  className="flex items-center gap-1 text-[#C9A227] font-semibold px-2 py-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  &#8249; Back
                </button>

                {step < TOTAL_STEPS ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="flex items-center gap-1 rounded-xl bg-[#3B2B26] text-white font-semibold px-6 py-3 hover:bg-[#2C2019] transition-colors"
                  >
                    Next &#8250;
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="rounded-xl bg-[#3B2B26] text-white font-semibold px-6 py-3 hover:bg-[#2C2019] transition-colors disabled:opacity-60"
                  >
                    {submitting
                      ? "Submitting..."
                      : "Submit Survey | إرسال الاستطلاع"}
                  </button>
                )}
              </div>

              <p className="text-center text-[#B8AC9A] text-xs mt-6 leading-relaxed">
                By submitting, you agree to receive a one-time launch
                notification. No spam. | بإرسالك، أنت توافق على استلام إشعار
                واحد عند الإطلاق. لا رسائل مزعجة.
              </p>
            </>
          ) : (
            <div className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-[#EDE7D9] flex items-center justify-center mb-6">
                <span className="text-[#5A6B4F] text-3xl">&#10003;</span>
              </div>
              <h3 className="text-[#3B2B26] font-bold text-2xl mb-1">
                Jazākallāhu Khayran!
              </h3>
              <p dir="rtl" className="text-[#3B2B26] font-bold text-2xl mb-4">
                جَزَاكُمُ اللَّهُ خَيْراً
              </p>
              <p className="text-[#6B5D52] text-[15px] leading-relaxed mb-1">
                Your response has been submitted successfully. Our team will
                review your input carefully as we prepare for launch.
              </p>
              <p dir="rtl" className="text-[#6B5D52] text-[15px] leading-relaxed mb-6">
                تم إرسال ردك بنجاح. سيقوم فريقنا بمراجعة مداخلاتك بعناية أثناء
                استعدادنا للإطلاق.
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-full bg-[#3B2B26] text-white font-semibold px-6 py-3 hover:bg-[#2C2019] transition-colors"
              >
                Submit Another Response | إرسال رد آخر
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-[#8A7D6C] text-xs mt-8 leading-relaxed">
          No spam. Just a single note when we open our doors. | لا رسائل
          مزعجة. فقط إشعار واحد عند فتح أبوابنا.
        </p>
      </div>
    </main>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-2">
      <label className="block text-[#3B2B26] font-semibold text-[15px] mb-2">
        {label} {required && <span className="text-[#C9A227]">*</span>}
      </label>
      {children}
    </div>
  );
}
