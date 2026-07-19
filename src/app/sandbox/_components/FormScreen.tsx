import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ProgressDots } from "@/components/ui/ProgressDots";
import { NICHES } from "@/lib/niches";
import type { IndustryId, SandboxInputs } from "@/types";

const FIELD_TITLES = [
  "В какой нише планируешь запускаться?",
  "В каком городе будешь работать?",
  "Сколько выручки ждёшь в месяц?",
  "Какие постоянные расходы в месяц?",
  "Какой средний чек?",
  "Сколько клиентов ждёшь в месяц?",
];

interface FormScreenProps {
  step: number;
  values: SandboxInputs;
  onChange: (patch: Partial<SandboxInputs>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function FormScreen({ step, values, onChange, onNext, onBack }: FormScreenProps) {
  const isLast = step === FIELD_TITLES.length - 1;
  const canProceed =
    step === 0
      ? !!values.niche
      : step === 1
        ? values.city.trim().length > 0
        : step === 2
          ? values.revenue.trim().length > 0
          : step === 3
            ? values.expenses.trim().length > 0
            : step === 4
              ? values.avgCheck.trim().length > 0
              : values.clients.trim().length > 0;

  return (
    <div className="flex min-h-screen flex-col px-6 py-6">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="text-2xl leading-none text-ink" aria-label="Назад">
          ‹
        </button>
        <ProgressDots total={FIELD_TITLES.length} current={step} />
      </div>

      <div className="flex flex-1 flex-col justify-center py-10">
        <h2 className="mb-6 text-h2 text-ink">{FIELD_TITLES[step]}</h2>

        {step === 0 && (
          <div className="flex flex-col gap-3">
            {NICHES.map((niche) => {
              const selected = values.niche === niche.id;
              return (
                <button
                  key={niche.id}
                  onClick={() => onChange({ niche: niche.id as IndustryId })}
                  className={`flex items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                    selected ? "border-ink bg-surface" : "border-border-default bg-white"
                  }`}
                >
                  <span className={`flex h-10 w-10 items-center justify-center rounded-md text-xl ${niche.badgeBg}`}>
                    {niche.glyph}
                  </span>
                  <span className="text-body font-medium text-ink">{niche.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {step === 1 && (
          <Input
            autoFocus
            placeholder="Например, Казань"
            value={values.city}
            onChange={(e) => onChange({ city: e.target.value })}
          />
        )}

        {step === 2 && (
          <Input
            autoFocus
            inputMode="numeric"
            placeholder="450 000"
            suffix="₽/мес"
            value={values.revenue}
            onChange={(e) => onChange({ revenue: e.target.value })}
          />
        )}

        {step === 3 && (
          <Input
            autoFocus
            inputMode="numeric"
            placeholder="310 000"
            suffix="₽/мес"
            value={values.expenses}
            onChange={(e) => onChange({ expenses: e.target.value })}
          />
        )}

        {step === 4 && (
          <Input
            autoFocus
            inputMode="numeric"
            placeholder="1 800"
            suffix="₽"
            value={values.avgCheck}
            onChange={(e) => onChange({ avgCheck: e.target.value })}
          />
        )}

        {step === 5 && (
          <Input
            autoFocus
            inputMode="numeric"
            placeholder="250"
            suffix="чел/мес"
            value={values.clients}
            onChange={(e) => onChange({ clients: e.target.value })}
          />
        )}
      </div>

      <Button fullWidth disabled={!canProceed} onClick={onNext}>
        {isLast ? "Готово" : "Далее"}
      </Button>
    </div>
  );
}
