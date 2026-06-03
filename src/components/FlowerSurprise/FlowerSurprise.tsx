import { type CSSProperties, useEffect, useState } from 'react'
import clsx from 'clsx'
import styles from './FlowerSurprise.module.scss'

const petals = Array.from({ length: 8 }, (_, index) => index)
const drops = Array.from({ length: 7 }, (_, index) => index)
const decorItems = Array.from({ length: 12 }, (_, index) => index)
const burstItems = Array.from({ length: 10 }, (_, index) => index)
const gardenStorageKey = 'flower-surprise-garden'

type FlowerVariant = {
  id: string
  name: string
  colors: {
    petalStart: string
    petalMiddle: string
    petalEnd: string
    centerStart: string
    centerEnd: string
  }
}

type GrownFlower = FlowerVariant & {
  gardenId: number
}

const flowerVariants: FlowerVariant[] = [
  {
    id: 'rose',
    name: 'розовый',
    colors: {
      petalStart: '#ffb0d5',
      petalMiddle: '#ff72b2',
      petalEnd: '#ee5598',
      centerStart: '#ffd971',
      centerEnd: '#ffc0d8',
    },
  },
  {
    id: 'blue',
    name: 'голубой',
    colors: {
      petalStart: '#b7edff',
      petalMiddle: '#7ed8f7',
      petalEnd: '#55afd9',
      centerStart: '#fff3a2',
      centerEnd: '#c8f3ff',
    },
  },
  {
    id: 'white',
    name: 'белый',
    colors: {
      petalStart: '#ffffff',
      petalMiddle: '#f8dff0',
      petalEnd: '#d8f1ff',
      centerStart: '#ffe99a',
      centerEnd: '#ffd0b7',
    },
  },
  {
    id: 'violet',
    name: 'сиреневый',
    colors: {
      petalStart: '#e8c8ff',
      petalMiddle: '#c892f3',
      petalEnd: '#a874df',
      centerStart: '#fff0a8',
      centerEnd: '#f0c3ff',
    },
  },
  {
    id: 'peach',
    name: 'персиковый',
    colors: {
      petalStart: '#ffd4b9',
      petalMiddle: '#ff9f9f',
      petalEnd: '#f17d9c',
      centerStart: '#fff09a',
      centerEnd: '#ffd17e',
    },
  },
]

const steps = [
  {
    eyebrow: 'Нежный сюрприз',
    title: 'Маленькое чудо ждёт',
    button: 'Посадить семечко',
  },
  {
    eyebrow: 'Первый секрет',
    title: 'Немного нежной воды',
    button: 'Полить семечко',
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
    button: 'Показать сюрприз',
  },
  {
    eyebrow: 'Только для тебя',
    title: '',
    button: 'Вырастить ещё',
  },
]

type FlowerSurpriseProps = {
  name?: string
  message?: string
}

const getRandomVariant = (previousId?: string) => {
  const variants = flowerVariants.filter((variant) => variant.id !== previousId)
  return variants[Math.floor(Math.random() * variants.length)] ?? flowerVariants[0]
}

const loadGarden = () => {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const savedGarden = window.localStorage.getItem(gardenStorageKey)
    return savedGarden ? (JSON.parse(savedGarden) as GrownFlower[]) : []
  } catch {
    return []
  }
}

const getFlowerStyle = (variant: FlowerVariant) =>
  ({
    '--petal-start': variant.colors.petalStart,
    '--petal-middle': variant.colors.petalMiddle,
    '--petal-end': variant.colors.petalEnd,
    '--center-start': variant.colors.centerStart,
    '--center-end': variant.colors.centerEnd,
  }) as CSSProperties

function MiniFlower({ flower }: { flower: FlowerVariant }) {
  return (
    <div className={styles.miniFlower} style={getFlowerStyle(flower)} aria-hidden="true">
      <div className={styles.miniBloom}>
        {petals.map((petal) => (
          <span key={petal} className={styles.miniPetal} />
        ))}
        <span className={styles.miniCenter} />
      </div>
      <span className={styles.miniStem} />
    </div>
  )
}

export function FlowerSurprise({
  name,
  message = 'Этот цветок не завянет,\nпотому что он для тебя ❤️',
}: FlowerSurpriseProps) {
  const [step, setStep] = useState(0)
  const [burstKey, setBurstKey] = useState(0)
  const [currentVariant, setCurrentVariant] = useState(() => getRandomVariant())
  const [grownFlowers, setGrownFlowers] = useState<GrownFlower[]>(loadGarden)
  const [isBouquetOpen, setIsBouquetOpen] = useState(false)

  const isOpen = step >= steps.length - 2
  const isFinal = step === steps.length - 1
  const currentStep = steps[step]
  const messageLines = message.split('\n')
  const bouquetFlowers = isOpen
    ? [...grownFlowers, { ...currentVariant, gardenId: -1 }]
    : grownFlowers

  useEffect(() => {
    window.localStorage.setItem(gardenStorageKey, JSON.stringify(grownFlowers))
  }, [grownFlowers])

  const handleNextStep = () => {
    if (isFinal) {
      setGrownFlowers((flowers) => [
        ...flowers,
        { ...currentVariant, gardenId: Date.now() },
      ])
      setCurrentVariant((variant) => getRandomVariant(variant.id))
      setStep(0)
      setIsBouquetOpen(false)
    } else {
      setStep((current) => current + 1)
    }

    setBurstKey(0)
  }

  const handleFlowerClick = () => {
    if (isOpen) {
      setBurstKey((current) => current + 1)
    }
  }

  return (
    <main className={styles.screen}>
      <div className={styles.glow} />

      <section
        className={clsx(styles.card, {
          [styles.watered]: step >= 1,
          [styles.sprout]: step >= 2,
          [styles.bud]: step >= 3,
          [styles.open]: isOpen,
          [styles.final]: isFinal,
        })}
      >
        <div className={styles.sun} aria-hidden="true" />

        {grownFlowers.length > 0 && (
          <div className={styles.garden} aria-hidden="true">
            {grownFlowers.map((flower) => (
              <div key={flower.gardenId} className={styles.gardenSlot}>
                <MiniFlower flower={flower} />
              </div>
            ))}
          </div>
        )}

        <div className={styles.decor} aria-hidden="true">
          {decorItems.map((item) => (
            <span key={item} className={styles.decorItem} />
          ))}
        </div>

        <div className={styles.content}>
          <div
            className={clsx(styles.flower, {
              [styles.watered]: step >= 1,
              [styles.sprout]: step >= 2,
              [styles.bud]: step >= 3,
              [styles.open]: isOpen,
              [styles.final]: isFinal,
            })}
            style={getFlowerStyle(currentVariant)}
            onClick={handleFlowerClick}
            aria-hidden="true"
          >
            <div className={styles.soil} />
            <div className={styles.seed} />
            <div className={styles.rain}>
              {drops.map((drop) => (
                <span key={drop} className={styles.drop} />
              ))}
            </div>
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

            {isOpen && (
              <div key={burstKey} className={styles.burst}>
                {burstItems.map((item) => (
                  <span key={item} className={styles.burstHeart} />
                ))}
              </div>
            )}
          </div>

          <div className={styles.textBlock}>
            <p className={styles.eyebrow}>
              {name && isOpen
                ? `${currentStep.eyebrow}, ${name}`
                : `${currentStep.eyebrow} · ${currentVariant.name}`}
            </p>
            {currentStep.title && <h1>{currentStep.title}</h1>}

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

            {!isFinal && (
              <p
                className={clsx(styles.message, {
                  [styles.visible]: isOpen,
                })}
              >
                {messageLines.map((line, index) => (
                  <span key={`${line}-${index}`}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            )}

            {isOpen && <p className={styles.hint}>Тапни по цветку</p>}

            <button
              className={styles.button}
              type="button"
              onClick={handleNextStep}
            >
              {currentStep.button}
            </button>

            <div className={styles.secondaryActions}>
              <button
                className={styles.ghostButton}
                type="button"
                onClick={() => setIsBouquetOpen((value) => !value)}
              >
                Букетик · {bouquetFlowers.length}
              </button>

              {grownFlowers.length > 0 && (
                <button
                  className={styles.resetButton}
                  type="button"
                  onClick={() => {
                    setGrownFlowers([])
                    setIsBouquetOpen(false)
                  }}
                >
                  Сбросить сад
                </button>
              )}
            </div>
          </div>
        </div>

        {isBouquetOpen && (
          <div className={styles.bouquetPanel}>
            <div className={styles.bouquetHeader}>
              <p>Букетик</p>
              <button
                className={styles.closeButton}
                type="button"
                onClick={() => setIsBouquetOpen(false)}
                aria-label="Закрыть букет"
              >
                ×
              </button>
            </div>

            {bouquetFlowers.length > 0 ? (
              <div className={styles.bouquet}>
                {bouquetFlowers.map((flower, index) => (
                  <div key={`${flower.id}-${index}`} className={styles.bouquetFlower}>
                    <MiniFlower flower={flower} />
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.emptyBouquet}>Сначала вырасти первый цветок</p>
            )}
          </div>
        )}
      </section>
    </main>
  )
}
