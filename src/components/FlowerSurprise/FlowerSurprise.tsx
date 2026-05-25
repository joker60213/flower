import { useState } from 'react'
import clsx from 'clsx'
import styles from './FlowerSurprise.module.scss'

const petals = Array.from({ length: 8 }, (_, index) => index)
const decorItems = Array.from({ length: 12 }, (_, index) => index)

const steps = [
  {
    eyebrow: 'Нежный сюрприз',
    title: 'Маленькое чудо ждёт',
    button: 'Посадить семечко',
  },
  {
    eyebrow: 'Он уже растёт',
    title: 'Добавим немного тепла',
    button: 'Согреть росток',
  },
  {
    eyebrow: 'Почти готово',
    title: 'Бутон ждёт момента',
    button: 'Раскрыть цветок 🌸',
  },
  {
    eyebrow: 'Для тебя',
    title: 'Цветок раскрылся',
    button: 'Посмотреть ещё раз',
  },
]

export function FlowerSurprise() {
  const [step, setStep] = useState(0)

  const isOpen = step === steps.length - 1
  const currentStep = steps[step]

  const handleNextStep = () => {
    setStep((current) => (current === steps.length - 1 ? 0 : current + 1))
  }

  return (
    <main className={styles.screen}>
      <div className={styles.glow} />

      <section
        className={clsx(styles.card, {
          [styles.sprout]: step >= 1,
          [styles.bud]: step >= 2,
          [styles.open]: isOpen,
        })}
      >
        <div className={styles.decor} aria-hidden="true">
          {decorItems.map((item) => (
            <span key={item} className={styles.decorItem} />
          ))}
        </div>

        <div className={styles.content}>
          <div
            className={clsx(styles.flower, {
              [styles.sprout]: step >= 1,
              [styles.bud]: step >= 2,
              [styles.open]: isOpen,
            })}
            aria-hidden="true"
          >
            <div className={styles.seed} />
            <div className={styles.sun} />
            <div className={styles.bloom}>
              {petals.map((petal) => (
                <div key={petal} className={styles.petal} />
              ))}
              <div className={styles.center} />
            </div>

            <div className={styles.stem}>
              <div className={styles.leafLeft} />
              <div className={styles.leafRight} />
            </div>
          </div>

          <div className={styles.textBlock}>
            <p className={styles.eyebrow}>{currentStep.eyebrow}</p>
            <h1>{currentStep.title}</h1>

            <div className={styles.progress} aria-label={`Шаг ${step + 1} из ${steps.length}`}>
              {steps.map((item, index) => (
                <span
                  key={item.button}
                  className={clsx(styles.progressDot, {
                    [styles.activeDot]: index <= step,
                  })}
                />
              ))}
            </div>

            <p
              className={clsx(styles.message, {
                [styles.visible]: isOpen,
              })}
            >
              Этот цветок не завянет,
              <br />
              потому что он для тебя ❤️
            </p>

            <button
              className={styles.button}
              type="button"
              onClick={handleNextStep}
            >
              {currentStep.button}
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
