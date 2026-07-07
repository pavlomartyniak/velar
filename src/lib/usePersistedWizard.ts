"use client";

import { useEffect, useRef } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

type PersistedState<T> = { activeStep: number; maxReached: number; values: T };

/**
 * Зберігає відповіді багатокрокового конфігуратора та поточний крок у
 * sessionStorage, і відновлює їх один раз при монтуванні. Дає змозі
 * користувачу, який перейшов за посиланням на статтю в тій самій вкладці
 * (мобільні — див. ArticleLinkHint) і натиснув «назад», повернутись саме
 * туди, де зупинився, а не почати заново.
 *
 * Очищається явно через clearPersistedWizard() після успішної відправки заявки.
 */
export function usePersistedWizard<T extends FieldValues>(
  storageKey: string,
  methods: UseFormReturn<T>,
  activeStep: number,
  maxReached: number,
  setActiveStep: (n: number) => void,
  setMaxReached: (n: number) => void,
) {
  const stepRef = useRef({ activeStep, maxReached });

  useEffect(() => {
    stepRef.current = { activeStep, maxReached };
  }, [activeStep, maxReached]);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw) as PersistedState<T>;
        methods.reset(saved.values);
        setActiveStep(saved.activeStep);
        setMaxReached(saved.maxReached);
      }
    } catch {
      // пошкоджені чи недоступні дані (приватний режим) — просто починаємо заново
    }

    const subscription = methods.watch((values) => {
      try {
        sessionStorage.setItem(
          storageKey,
          JSON.stringify({ ...stepRef.current, values }),
        );
      } catch {
        // сховище недоступне — тихо ігноруємо
      }
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Зберігаємо і тоді, коли змінився лише крок (без редагування полів).
  useEffect(() => {
    try {
      sessionStorage.setItem(
        storageKey,
        JSON.stringify({ activeStep, maxReached, values: methods.getValues() }),
      );
    } catch {
      // ігноруємо
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep, maxReached]);
}

export function clearPersistedWizard(storageKey: string) {
  try {
    sessionStorage.removeItem(storageKey);
  } catch {
    // ігноруємо
  }
}
