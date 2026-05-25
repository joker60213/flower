import { useState } from 'react'
import { testAlias } from '@/shared/lib/test'
import { Button } from '@/shared/ui/Button'

function App() {
  const [isActive, setIsActive] = useState(false)

  return (
    <div>
      <div>{testAlias}</div>
      <Button active={isActive} onClick={() => setIsActive(!isActive)}>
        Кнопка
      </Button>
    </div>
  )
}

export default App
