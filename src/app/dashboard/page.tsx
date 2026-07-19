"use client";

import { BottomNav } from "@/components/ui/BottomNav";
import { Card } from "@/components/ui/Card";
import { TrustRatingRing } from "@/components/ui/TrustRatingRing";
import { formatRub } from "@/lib/format";
import { useAppState } from "@/state/AppStateContext";
import { ProfileSwitcher } from "./_components/ProfileSwitcher";

export default function DashboardPage() {
  const { activeProfile } = useAppState();
  const { trustRating } = activeProfile;

  return (
    <div className="flex justify-center bg-surface">
      <div className="w-full max-w-md bg-white pb-28">
        <div className="flex items-center justify-between px-6 pt-6">
          <div>
            <p className="text-caption text-text-secondary">Контур доверия</p>
            <p className="text-card-title text-ink">{activeProfile.ownerName}</p>
          </div>
          <ProfileSwitcher />
        </div>

        <div className="px-6 pt-5">
          <Card className="flex items-center justify-between">
            <div>
              <p className="text-body font-semibold text-ink">
                {activeProfile.legalForm} · {activeProfile.city}
              </p>
              <p className="mt-1 text-caption text-text-secondary">{activeProfile.industryLabel}</p>
            </div>
            <span className="rounded-full bg-white px-3 py-1 text-caption font-medium text-ink">
              {activeProfile.legalStatusLabel}
            </span>
          </Card>
        </div>

        <div className="mt-6 flex flex-col items-center px-6">
          <TrustRatingRing
            percent={trustRating.progressPercent}
            level={trustRating.level}
            nextLevel={trustRating.nextLevel}
          />
        </div>

        <div className="mt-6 px-6">
          <Card>
            <p className="text-caption font-semibold uppercase text-text-secondary">Из чего складывается рейтинг</p>
            <div className="mt-3 flex flex-col gap-3">
              <div className="text-body text-ink">
                <p>Обороты по счёту</p>
                <p className="mt-0.5 text-caption text-text-secondary">{trustRating.turnoverNote}</p>
              </div>
              <div className="flex items-center justify-between text-body text-ink">
                <span>Подключённые продукты</span>
                <span className="text-caption text-text-secondary">
                  {trustRating.productsConnected} из {trustRating.productsTotal}
                </span>
              </div>
              <div className="flex items-center justify-between text-body text-ink">
                <span>Касса / эквайринг</span>
                <span className="text-caption text-text-secondary">
                  {activeProfile.products.some((p) => /касс|эквайринг|pay/i.test(p)) ? "Подключены" : "Не подключены"}
                </span>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 px-6">
          <Card>
            <p className="text-caption uppercase text-text-secondary">Текущий счёт</p>
            <p className="mt-1 text-[26px] font-bold text-ink">{formatRub(activeProfile.accountBalance)}</p>
          </Card>
          <Card inverse>
            <p className="text-caption uppercase text-white/70">Фонд стабильности</p>
            <p className="mt-1 text-[26px] font-bold">{formatRub(activeProfile.stabilityFund)}</p>
          </Card>
        </div>
      </div>
      <BottomNav active="main" />
    </div>
  );
}
